import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';

import { StashService } from '../../core/stash.service';
import { StudiosService } from '../studios.service';

import { Scene } from '../../shared/models/scene.model';
import { DisplayMode, ListFilter, SceneListState } from '../../shared/models/list-state.model';

@Component({
  selector: 'app-studio-list',
  templateUrl: './studio-list.component.html'
})
export class StudioListComponent implements OnInit {
  state = this.studiosService.listState;

  constructor(private stashService: StashService,
              private studiosService: StudiosService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {}

  onClickNew() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

}
