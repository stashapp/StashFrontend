import { Component, OnInit, Input, HostListener, ElementRef, ViewChild } from '@angular/core';

import { SceneMarkerDataFragment } from '../../core/graphql-generated';

@Component({
  selector: 'app-scene-marker-card',
  templateUrl: './scene-marker-card.component.html',
  styleUrls: ['./scene-marker-card.component.css']
})
export class SceneMarkerCardComponent implements OnInit {
  @Input() sceneMarker: SceneMarkerDataFragment;

  private video: any;
  private hoverTimeout: any = null;
  isHovering = false;

  title = '';
  imagePath = '';
  videoPath = '';

  constructor() {}

  ngOnInit() {
    if (!!this.sceneMarker) {
      this.title = this.sceneMarker.title;
      this.imagePath = this.sceneMarker.preview;
      this.videoPath = this.sceneMarker.stream;
    } else {
      this.title = '';
      this.imagePath = '';
    }
  }

  @ViewChild('videoTag')
  set videoTag(videoTag: ElementRef) {
    if (videoTag === undefined) { return; }
    this.video = videoTag.nativeElement;
    this.video.volume = 0.05;
    this.video.loop = true;
    this.video.oncanplay = () => {
      this.video.play();
    };
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(e) {
    if (!!this.hoverTimeout) { return; }

    const that = this;
    this.hoverTimeout = setTimeout(function() {
      that.configureTimeout(e);
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

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!!this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }
    this.configureTimeout(event);
  }

  transitionEnd(event) {
    if (event.target.classList.contains('double-scale')) {
      event.target.style.zIndex = 2;
    } else {
      event.target.style.zIndex = null;
    }
  }

  private configureTimeout(event: MouseEvent) {
    const that = this;
    this.hoverTimeout = setTimeout(function() {
      if (event.target instanceof HTMLElement) {
        const target: HTMLElement = event.target;
        if (target.className === 'scene-wall-item-text-container' ||
            target.offsetParent.className === 'scene-wall-item-text-container') {
          that.configureTimeout(event);
          return;
        }
      }
      that.isHovering = true;
    }, 1000);
  }
}
