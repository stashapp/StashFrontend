import { Component, OnInit, Input, HostBinding, HostListener, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { StashService } from '../../core/stash.service';
import { Scene } from '../../shared/models/scene.model';

@Component({
  selector: 'app-scene-list-item',
  templateUrl: './scene-list-item.component.html',
  styleUrls: ['./scene-list-item.component.css']
})
export class SceneListItemComponent implements OnInit {
  @Input() scene: Scene;

  // The host class needs to be card
  @HostBinding('class') class = 'item';
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
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.videoTag.nativeElement.play();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.videoTag.nativeElement.pause();
  }

  onSelect(): void {
    this.router.navigate(['/scenes', this.scene.id]);
  }

  screenshotPath(): string {
    return `${this.stashService.url}${this.scene.paths.screenshot}`
  }

  previewPath(): string {
    return `${this.stashService.url}${this.scene.paths.preview}`
  }

  studioImagePath(): string {
    return `${this.stashService.url}${this.scene.fetchedStudio.image_path}`
  }
}
