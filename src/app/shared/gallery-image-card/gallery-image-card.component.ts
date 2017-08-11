import { Component, OnInit, Input, Output, EventEmitter, HostBinding, HostListener, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { StashService } from '../../core/stash.service';
import { Gallery, GalleryImage } from '../../shared/models/gallery.model';

@Component({
  selector: 'app-gallery-image-card',
  templateUrl: './gallery-image-card.component.html',
  styleUrls: ['./gallery-image-card.component.css']
})
export class GalleryImageCardComponent implements OnInit {

  // @Input() gallery: Gallery;
  @Input() galleryImage: GalleryImage;
  @Output() onClick: EventEmitter<GalleryImage> = new EventEmitter();

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
    return `${this.stashService.url}${this.galleryImage.path}?thumb=true`
  }

  onSelect(): void {
    this.onClick.emit(this.galleryImage);
  }

}
