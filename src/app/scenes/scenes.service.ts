import { Injectable } from '@angular/core';

import { SceneListState } from '../shared/models/list-state.model';

import { TimerObservable } from 'rxjs/observable/TimerObservable';
import * as localForage from 'localforage';

@Injectable()
export class ScenesService {
  sceneListState: SceneListState = new SceneListState();
  lf = localForage.createInstance({
    name: 'StashApp',
    version: 1.0,
    storeName: 'scene_list_state', // Should be alphanumeric, with underscores.
    description: 'some description'
  });

  constructor() {
    this.lf.getItem('state').then(val => {
      console.log('restoring state', val);
      this.sceneListState.update(val as SceneListState);
    }, error => {
      console.log('error reading state');
    });

    const timer = TimerObservable.create(5000, 1000 * 15);
    timer.subscribe(t => {
      this.lf.setItem('state', this.sceneListState).then(val => {}, error => {
        console.log('err', error);
      });
    });
  }

}
