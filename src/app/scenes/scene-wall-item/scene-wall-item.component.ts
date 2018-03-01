import { Component, OnInit, Input, HostBinding, HostListener, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { StashService } from '../../core/stash.service';
import { Scene, SceneMarker } from '../../shared/models/scene.model';

@Component({
  selector: 'app-scene-wall-item',
  templateUrl: './scene-wall-item.component.html',
  styleUrls: ['./scene-wall-item.component.css']
})
export class SceneWallItemComponent implements OnInit {

  private video: any
  private hoverTimeout: any = null;
  private isHovering = false;

  title = '';
  imagePath = '';
  videoPath = '';
  @Input() scene: Scene;
  @Input() marker: SceneMarker;

  @ViewChild('videoTag')
  set videoTag(videoTag: ElementRef) {
    if (videoTag === undefined) { return; }
    this.video = videoTag.nativeElement;
    this.video.volume = 0.05;
    this.video.loop = true;
    this.video.oncanplay = () => {
      this.video.play();
    }
  }

  constructor(
    private router: Router,
    private el: ElementRef,
    private stashService: StashService
  ) { }

  ngOnInit() {
    if (!!this.marker) {
      this.title = this.marker.title;
      this.imagePath = this.marker.preview;
      this.videoPath = this.marker.stream;
    } else if (!!this.scene) {
      this.title = this.scene.title;
      this.imagePath = this.scene.paths.webp;
      this.videoPath = this.scene.paths.preview;
    } else {
      this.title = '';
      this.imagePath = '';
    }
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (!!this.hoverTimeout) { return }

    const that = this;
    this.hoverTimeout = setTimeout(function() {
      that.isHovering = true;
    }, 1000);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (!!this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }
    if (this.video !== undefined) {
      this.video.pause();
      this.video.src = '';
    }
    this.isHovering = false;
  }

  transitionEnd(event) {
    if (event.target.classList.contains('double-scale')) {
      event.target.style.zIndex = 2;
    } else {
      event.target.style.zIndex = null;
    }
  }

  onClick(): void {
    const id = this.marker !== undefined ? this.marker.scene.id : this.scene.id
    this.router.navigate(['/scenes', id]);
  }

}
