import { Component, OnInit, Input, HostBinding, HostListener, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { StashService } from '../../core/stash.service';
import { Scene } from '../../shared/models/scene.model';

@Component({
  selector: 'app-scene-card',
  templateUrl: './scene-card.component.html',
  styleUrls: ['./scene-card.component.css']
})
export class SceneCardComponent implements OnInit {
  private isPlaying = false;
  private video: any
  previewPath: string = null;
  @Input() scene: Scene;

  // The host class needs to be card
  @HostBinding('class') class = 'card';
  @ViewChild('videoTag') videoTag: any;

  constructor(
    private router: Router,
    private el: ElementRef,
    private stashService: StashService
  ) { }

  ngOnInit() {
    this.stashService.getPerformersWithIds(this.scene.performer_ids).subscribe(performers => {
      this.scene.fetchedPerformers = performers;
    });
    this.stashService.getTagsWithIds(this.scene.tag_ids).subscribe(tags => {
      this.scene.fetchedTags = tags;
    });
    if (!!this.scene.studio_id) {
      this.stashService.getStudio(this.scene.studio_id).subscribe(studio => {
        this.scene.fetchedStudio = studio;
      });
    }

    this.video = this.videoTag.nativeElement;
    this.video.onplaying = () => this.isPlaying = true;
    this.video.onpause = () => this.isPlaying = false;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (!this.previewPath) {
      this.previewPath = `${this.stashService.url}${this.scene.paths.preview}`
    }
    if (this.video.paused && !this.isPlaying) {
      this.video.play();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (!this.video.paused && this.isPlaying) {
      this.video.pause();
    }
  }

  onSelect(): void {
    this.router.navigate(['/scenes', this.scene.id]);
  }

  screenshotPath(): string {
    return `${this.stashService.url}${this.scene.paths.screenshot}`
  }

  studioImagePath(): string {
    return `${this.stashService.url}${this.scene.fetchedStudio.image_path}`
  }
}
