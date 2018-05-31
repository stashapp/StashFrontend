import { Component, OnInit } from '@angular/core';

import { ScenesService } from '../scenes.service';

import { Scene } from '../../shared/models/scene.model';
import { SceneListState } from '../../shared/models/list-state.model';

@Component({
  selector: 'app-scene-list',
  template: '<app-list [state]="state"></app-list>'
})
export class SceneListComponent implements OnInit {
  state = this.scenesService.sceneListState;

  constructor(private scenesService: ScenesService) {}

  ngOnInit() {}

}
