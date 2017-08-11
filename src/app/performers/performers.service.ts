import { Injectable } from '@angular/core';

import { PerformerListState } from '../shared/models/list-state.model';

@Injectable()
export class PerformersService {
  performerListState: PerformerListState = new PerformerListState();

  constructor() {}

}
