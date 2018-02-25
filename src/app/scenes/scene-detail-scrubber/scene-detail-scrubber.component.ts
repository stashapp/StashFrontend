import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, HostBinding, HostListener, ElementRef, ViewChild, EventEmitter } from '@angular/core';
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

  private mouseDown: boolean = false;
  private last: MouseEvent;
  private start: MouseEvent;
  private velocity: number = 0;

  private _position: number = 0;
  getPostion(): number { return this._position; }
  setPosition(newPostion: number, shouldEmit: boolean = true) {
    if (shouldEmit) { this.scrolled.emit(); }

    let bounds = this.getBounds() * -1
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
    if (!this.start) { return }
    this.mouseDown = false;
    let delta = Math.abs(event.clientX - this.start.clientX);
    if (delta < 1 && event.target instanceof HTMLDivElement) {
      let target: HTMLDivElement = event.target;
      let seekSeconds: number = null;

      let spriteIdString = target.getAttribute("data-sprite-item-id");
      if (spriteIdString != null) {
        let sprite = this.spriteItems[Number(spriteIdString)];
        let spriteLength = sprite.end - sprite.start;
        let percentage = event.offsetX / target.clientWidth;
        let seconds = spriteLength * percentage;
        seekSeconds = sprite.start + seconds;
      }
      
      let markerIdString = target.getAttribute("data-marker-id");
      if (markerIdString != null) {
        let marker = this.scene.scene_markers[Number(markerIdString)];
        seekSeconds = marker.seconds;
      }

      if (!!seekSeconds) { this.seek.emit(seekSeconds); }
    } else if (Math.abs(this.velocity) > 0) {
      this.dragInertia(0, this.velocity * 5);
    }
  }

  dragInertia(iteration: number, delta: number) {
    let multiplier = Math.acos(iteration) * 0.33;
    let movement = multiplier * this.velocity;
    let newDelta = movement + delta;

    if (iteration < 0.9) {
      this.dragInertia(iteration + 0.1, newDelta)
    } else {
      let newPosition = this.getPostion() + newDelta;
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
    let delta = event.clientX - this.last.clientX;

    let movement = event.movementX;
    if (Math.abs(movement) > Math.abs(this.velocity)) {
      this.velocity = movement;
    }

    let newPostion = this.getPostion() + delta;
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
    if (!this.scene) { return }

    let url = `${this.stashService.url}${this.scene.paths.vtt}`;
    this.http.get(url, {responseType: 'text'}).subscribe(res => {
      // TODO: This is gnarly
      let lines = res.split('\n');
      if (lines.shift() != 'WEBVTT') { return; }
      if (lines.shift() != '') { return; }
      var item = new SceneSpriteItem()
      this.spriteItems = [];
      while(lines.length) {
        let line = lines.shift();

        if (line.includes('#') && line.includes('=') && line.includes(',')) {
          let size = line.split('#')[1].split('=')[1].split(',')
          item.x = Number(size[0]);
          item.y = Number(size[1]);
          item.w = Number(size[2]);
          item.h = Number(size[3]);

          this.spriteItems.push(item);
          item = new SceneSpriteItem();
        } else if (line.includes(' --> ')) {
          let times = line.split(' --> ');

          var start = times[0].split(':');
          item.start = (+start[0]) * 60 * 60 + (+start[1]) * 60 + (+start[2]);

          var end = times[1].split(':');
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
    let sprite = this.spriteItems[i];
    let left = sprite.w * i;
    let path = this.scene.paths.vtt.replace('_thumbs.vtt', '_sprite.jpg'); // TODO: Gnarly
    return {
      'width.px': sprite.w,
      'height.px': sprite.h,
      'margin': '0px auto',
      'background-position': -sprite.x + 'px ' + -sprite.y + 'px',
      'background-image': `url(${this.stashService.url}${path})`,
      'left.px': left
    };
  }

  getTagStyle(tag: HTMLDivElement, i: number) {
    if (!this.slider || this.spriteItems.length == 0 || this.getBounds() == 0) { return }

    let marker = this.scene.scene_markers[i];
    let duration = Number(this.scene.file.duration);
    let percentage = marker.seconds / duration;

    // Need to offset from the left margin or the tags are slightly off.
    let offset = Number(window.getComputedStyle(this.slider.offsetParent).marginLeft.replace('px', ''));

    let left = (this.slider.scrollWidth * percentage) - (tag.clientWidth / 2) + offset;
    return {
      'left.px': left,
      'height.px': 20
    };
  }

  goBack() {
    let newPosition = this.getPostion() + this.slider.clientWidth;
    this.setPosition(newPosition);
  }

  goForward() {
    let newPosition = this.getPostion() - this.slider.clientWidth;
    this.setPosition(newPosition);
  }

  public scrollTo(seconds: number) {
    let duration = Number(this.scene.file.duration);
    let percentage = seconds / duration;
    let position = ((this.slider.scrollWidth * percentage) - (this.slider.clientWidth / 2)) * -1;
    this.setPosition(position, false);
  }

}
