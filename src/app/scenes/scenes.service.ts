import { Injectable } from '@angular/core';

import { SceneListState } from '../shared/models/list-state.model';

@Injectable()
export class ScenesService {
  sceneListState: SceneListState = new SceneListState();

  constructor() {}
}
