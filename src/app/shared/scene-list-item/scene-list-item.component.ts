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
    this.videoTag.nativeElement.volume = 0.05;
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
}
