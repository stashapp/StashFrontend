import { Component, OnInit, OnDestroy, Input, ViewChild, AfterViewInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';

import { StashService } from '../../core/stash.service';

import { Scene } from '../../shared/models/scene.model';
import {
  DisplayMode,
  FilterMode,
  ListFilter,
  ListState,
  SceneListState,
  GalleryListState,
  PerformerListState,
  StudioListState
} from '../../shared/models/list-state.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy, AfterViewInit {
  DisplayMode = DisplayMode;
  FilterMode = FilterMode;

  @Input() state: ListState<any>;

  loading = true;

  constructor(private stashService: StashService) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.loading = true;
    this.state.reset();
    this.state.scrollY = window.scrollY;
  }

  ngAfterViewInit() {
    window.scroll(0, this.state.scrollY);
    this.getData();
  }

  async getData() {
    this.loading = true;

    if (this.state instanceof SceneListState) {
      const result = await this.stashService.findScenes(this.state.currentPage, this.state.filter).result();
      this.state.data = result.data.findScenes.scenes;
      this.state.totalCount = result.data.findScenes.count;
    } else if (this.state instanceof GalleryListState) {
      const result = await this.stashService.findGalleries(this.state.currentPage, this.state.filter).result();
      this.state.data = result.data.findGalleries.galleries;
      this.state.totalCount = result.data.findGalleries.count;
    } else if (this.state instanceof PerformerListState) {
      const result = await this.stashService.findPerformers(this.state.currentPage, this.state.filter).result();
      this.state.data = result.data.findPerformers.performers;
      this.state.totalCount = result.data.findPerformers.count;
    } else if (this.state instanceof StudioListState) {
      const result = await this.stashService.findStudios(this.state.currentPage, this.state.filter).result();
      this.state.data = result.data.findStudios.studios;
      this.state.totalCount = result.data.findStudios.count;
    }

    this.loading = false;
  }

  onFilterUpdate(filter: ListFilter) {
    console.log('filter update', filter);
    this.state.filter = filter;
    this.getData();
  }

  getPage(page: number) {
    this.state.currentPage = page;
    this.getData();
  }

}
