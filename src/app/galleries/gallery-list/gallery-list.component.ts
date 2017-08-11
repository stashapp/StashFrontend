import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { StashService } from '../../core/stash.service';
import { GalleriesService } from '../galleries.service';

import { Gallery } from '../../shared/models/gallery.model';

@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html'
})
export class GalleryListComponent implements OnInit {
  state = this.galleriesService.listState;

  constructor(private stashService: StashService,
              private galleriesService: GalleriesService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {}

  onClickNew() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

}
