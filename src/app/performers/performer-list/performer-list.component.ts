import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';

import { StashService } from '../../core/stash.service';
import { PerformersService } from '../performers.service';

import { DisplayMode, ListFilter, PerformerListState } from '../../shared/models/list-state.model';
import { Performer } from '../../shared/models/performer.model';

@Component({
  selector: 'app-performer-list',
  templateUrl: './performer-list.component.html',
  styleUrls: ['./performer-list.component.css']
})
export class PerformerListComponent implements OnInit {
  state = this.performersService.performerListState;

  constructor(private stashService: StashService,
              private performersService: PerformersService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {}

  onClickNew() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

}
