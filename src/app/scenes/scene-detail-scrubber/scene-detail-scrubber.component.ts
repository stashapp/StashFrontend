import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Input,
  Output,
  HostBinding,
  HostListener,
  ElementRef,
  ViewChild,
  EventEmitter
} from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { takeUntil } from 'rxjs/operators';

import { StashService } from '../../core/stash.service';
import { Scene, SceneMarker, SceneSpriteItem } from '../../shared/models/scene.model';

@Component({
  selector: 'app-scene-detail-scrubber',
  templateUrl: './scene-detail-scrubber.component.html',
  styleUrls: ['./scene-detail-scrubber.component.css']
})
export class SceneDetailScrubberComponent implements OnInit, OnChanges {
  @Input() scene: Scene;
  @Output() seek: EventEmitter<number> = new EventEmitter();
  @Output() scrolled: EventEmitter<any> = new EventEmitter();

  slider: HTMLElement;
  @ViewChild('scrubberSlider') sliderTag: any;

  spriteItems: SceneSpriteItem[] = [];

  private mouseDown = false;
  private last: MouseEvent;
  private start: MouseEvent;
  private velocity = 0;

  private _position = 0;
  getPostion(): number { return this._position; }
  setPosition(newPostion: number, shouldEmit: boolean = true) {
    if (shouldEmit) { this.scrolled.emit(); }

    const bounds = this.getBounds() * -1;
    if (newPostion > 0) {
      newPostion = 0;
    } else if (newPostion < bounds) {
      newPostion = bounds;
    }
    this._position = newPostion;
    this.slider.style.transform = `translateX(${this._position}px)`;
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseup(event: MouseEvent) {
    if (!this.start) { return; }
    this.mouseDown = false;
    const delta = Math.abs(event.clientX - this.start.clientX);
    if (delta < 1 && event.target instanceof HTMLDivElement) {
      const target: HTMLDivElement = event.target;
      let seekSeconds: number = null;

      const spriteIdString = target.getAttribute('data-sprite-item-id');
      if (spriteIdString != null) {
        const sprite = this.spriteItems[Number(spriteIdString)];
        const spriteLength = sprite.end - sprite.start;
        const percentage = event.offsetX / target.clientWidth;
        const seconds = spriteLength * percentage;
        seekSeconds = sprite.start + seconds;
      }

      const markerIdString = target.getAttribute('data-marker-id');
      if (markerIdString != null) {
        const marker = this.scene.scene_markers[Number(markerIdString)];
        seekSeconds = marker.seconds;
      }

      if (!!seekSeconds) { this.seek.emit(seekSeconds); }
    } else if (Math.abs(this.velocity) > 0) {
      this.dragInertia(0, this.velocity * 5);
    }
  }

  dragInertia(iteration: number, delta: number) {
    const multiplier = Math.acos(iteration) * 0.33;
    const movement = multiplier * this.velocity;
    const newDelta = movement + delta;

    if (iteration < 0.9) {
      this.dragInertia(iteration + 0.1, newDelta);
    } else {
      const newPosition = this.getPostion() + newDelta;
      this.setPosition(newPosition);
      this.velocity = 0;
    }
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(event) {
    event.preventDefault();
    this.mouseDown = true;
    this.last = event;
    this.start = event;
    this.velocity = 0;
  }

  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    if (!this.mouseDown) { return; }

    // negative dragging right (past), positive left (future)
    const delta = event.clientX - this.last.clientX;

    const movement = event.movementX;
    if (Math.abs(movement) > Math.abs(this.velocity)) {
      this.velocity = movement;
    }

    const newPostion = this.getPostion() + delta;
    this.setPosition(newPostion);
    this.last = event;
  }

  constructor(
    private router: Router,
    private el: ElementRef,
    private stashService: StashService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.slider = this.sliderTag.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['scene']) {
      this.fetchSpriteInfo();
    }
  }

  fetchSpriteInfo() {
    if (!this.scene) { return; }

    this.http.get(this.scene.paths.vtt, {responseType: 'text'}).subscribe(res => {
      // TODO: This is gnarly
      const lines = res.split('\n');
      if (lines.shift() !== 'WEBVTT') { return; }
      if (lines.shift() !== '') { return; }
      let item = new SceneSpriteItem();
      this.spriteItems = [];
      while (lines.length) {
        const line = lines.shift();

        if (line.includes('#') && line.includes('=') && line.includes(',')) {
          const size = line.split('#')[1].split('=')[1].split(',');
          item.x = Number(size[0]);
          item.y = Number(size[1]);
          item.w = Number(size[2]);
          item.h = Number(size[3]);

          this.spriteItems.push(item);
          item = new SceneSpriteItem();
        } else if (line.includes(' --> ')) {
          const times = line.split(' --> ');

          const start = times[0].split(':');
          item.start = (+start[0]) * 60 * 60 + (+start[1]) * 60 + (+start[2]);

          const end = times[1].split(':');
          item.end = (+end[0]) * 60 * 60 + (+end[1]) * 60 + (+end[2]);
        }
      }
    }, error => {
      console.log(error);
    });
  }

  getBounds(): number {
    return this.slider.scrollWidth - this.slider.clientWidth;
  }

  getStyleForSprite(i) {
    const sprite = this.spriteItems[i];
    const left = sprite.w * i;
    const path = this.scene.paths.vtt.replace('_thumbs.vtt', '_sprite.jpg'); // TODO: Gnarly
    return {
      'width.px': sprite.w,
      'height.px': sprite.h,
      'margin': '0px auto',
      'background-position': -sprite.x + 'px ' + -sprite.y + 'px',
      'background-image': `url(${path})`,
      'left.px': left
    };
  }

  getTagStyle(tag: HTMLDivElement, i: number) {
    if (!this.slider || this.spriteItems.length === 0 || this.getBounds() === 0) { return; }

    const marker = this.scene.scene_markers[i];
    const duration = Number(this.scene.file.duration);
    const percentage = marker.seconds / duration;

    // Need to offset from the left margin or the tags are slightly off.
    const offset = Number(window.getComputedStyle(this.slider.offsetParent).marginLeft.replace('px', ''));

    const left = (this.slider.scrollWidth * percentage) - (tag.clientWidth / 2) + offset;
    return {
      'left.px': left,
      'height.px': 20
    };
  }

  goBack() {
    const newPosition = this.getPostion() + this.slider.clientWidth;
    this.setPosition(newPosition);
  }

  goForward() {
    const newPosition = this.getPostion() - this.slider.clientWidth;
    this.setPosition(newPosition);
  }

  public scrollTo(seconds: number) {
    const duration = Number(this.scene.file.duration);
    const percentage = seconds / duration;
    const position = ((this.slider.scrollWidth * percentage) - (this.slider.clientWidth / 2)) * -1;
    this.setPosition(position, false);
  }

}
