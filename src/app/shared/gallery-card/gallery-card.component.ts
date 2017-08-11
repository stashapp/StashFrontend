import { Component, OnInit, Input, HostBinding, HostListener, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { StashService } from '../../core/stash.service';
import { Gallery } from '../../shared/models/gallery.model';

@Component({
  selector: 'app-gallery-card',
  templateUrl: './gallery-card.component.html',
  styleUrls: ['./gallery-card.component.css']
})
export class GalleryCardComponent implements OnInit {
  @Input() gallery: Gallery;

  // The host class needs to be card
  @HostBinding('class') class = 'card';

  constructor(
    private router: Router,
    private el: ElementRef,
    private stashService: StashService
  ) {}

  ngOnInit() {
  }

  onSelect(): void {
    this.router.navigate(['/galleries', this.gallery.id]);
  }

}
