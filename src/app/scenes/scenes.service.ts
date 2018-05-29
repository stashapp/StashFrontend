import { Injectable } from '@angular/core';

import { SceneListState } from '../shared/models/list-state.model';

import { TimerObservable } from 'rxjs/observable/TimerObservable';
import * as localForage from 'localforage';

@Injectable()
export class ScenesService {
  sceneListState: SceneListState = new SceneListState();

  constructor() {}

}
