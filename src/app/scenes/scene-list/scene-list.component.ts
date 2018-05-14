import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';

import { StashService } from '../../core/stash.service';
import { ScenesService } from '../scenes.service';

import { Scene } from '../../shared/models/scene.model';
import { DisplayMode, ListFilter, SceneListState } from '../../shared/models/list-state.model';

@Component({
  selector: 'app-scene-list',
  templateUrl: './scene-list.component.html'
})
export class SceneListComponent implements OnInit {
  state = this.scenesService.sceneListState;

  constructor(private stashService: StashService, private scenesService: ScenesService) {}

  ngOnInit() {}

}
