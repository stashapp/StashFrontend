import { Component, OnInit, OnDestroy, Input, ViewChild, AfterViewInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';

import { StashService } from '../../core/stash.service';

import { Scene } from '../../shared/models/scene.model';
import { ApiResult } from '../../shared/models/api-result.model'
import { DisplayMode, FilterMode, ListFilter, ListState, SceneListState, GalleryListState, PerformerListState, StudioListState } from '../../shared/models/list-state.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  DisplayMode = DisplayMode;
  FilterMode = FilterMode;

  @Input() state: ListState<any>;

  constructor(private stashService: StashService) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.state.scrollY = window.scrollY;
  }

  ngAfterViewInit() {
    window.scroll(0, this.state.scrollY);
    this.getData();
  }

  getData() {
    let observable: Observable<ApiResult<any>>;
    if (this.state instanceof SceneListState) {
      observable = this.stashService.getScenes(this.state.currentPage, this.state.filter)
    } else if (this.state instanceof GalleryListState) {
      observable = this.stashService.getGalleries(this.state.currentPage, this.state.filter)
    } else if (this.state instanceof PerformerListState) {
      observable = this.stashService.getPerformers(this.state.currentPage, this.state.filter)
    } else if (this.state instanceof StudioListState) {
      observable = this.stashService.getStudios(this.state.currentPage, this.state.filter)
    }

    observable.subscribe(apiResult => {
        this.state.data = apiResult.data;
        this.state.totalCount = apiResult.count;
      },
      error => this.state.errorMessage = <any>error
    );
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
