import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { StashService } from '../../core/stash.service';

import { SceneListState, CustomCriteria, SceneMarkerListState } from '../../shared/models/list-state.model';
import { TagDataFragment } from '../../core/graphql-generated';

@Component({
  selector: 'app-tag-detail',
  template: '<app-list [state]="getState()"></app-list>'
})
export class TagDetailComponent implements OnInit {
  sceneListState: SceneListState;
  sceneMarkerListState: SceneMarkerListState;

  tag: TagDataFragment;

  tagListType: string;

  constructor(
    private route: ActivatedRoute,
    private stashService: StashService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = parseInt(this.route.snapshot.params['id'], 10);
    this.getTag(id);

    this.sceneListState = new SceneListState();
    this.sceneListState.filter.customCriteria = [];
    this.sceneListState.filter.customCriteria.push(new CustomCriteria('tag_id', id.toString()));

    this.sceneMarkerListState = new SceneMarkerListState();

    this.route.queryParams.subscribe(params => {
      this.tagListType = params['tag_list_type'];
    });
  }

  async getTag(id: number) {
    if (!!id === false) {
      console.error('no id?');
      return;
    }

    const result = await this.stashService.findTag(id).result();
    this.tag = result.data.findTag;
  }

  getState(): any {
    if (this.tagListType === 'markers') {
      return this.sceneMarkerListState;
    } else {
      return this.sceneListState;
    }
  }
}
