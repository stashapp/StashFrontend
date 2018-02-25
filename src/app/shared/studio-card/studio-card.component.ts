import { Component, OnInit, Input, HostBinding, HostListener, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { StashService } from '../../core/stash.service';
import { Studio } from '../../shared/models/studio.model';

@Component({
  selector: 'app-studio-card',
  templateUrl: './studio-card.component.html',
  styleUrls: ['./studio-card.component.css']
})
export class StudioCardComponent implements OnInit {
  @Input() studio: Studio;

  // The host class needs to be card
  @HostBinding('class') class = 'card';

  constructor(
    private router: Router,
    private el: ElementRef,
    private stashService: StashService
  ) {}

  ngOnInit() {
  }

  imagePath(): string {
    if (!this.studio) { return ''; }
    return `${this.stashService.url}${this.studio.image_path}`
  }

  onSelect(): void {
    this.router.navigate(['/studios', this.studio.id]);
  }

}
