import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PerformersService } from '../performers.service';

import { DisplayMode, ListFilter, PerformerListState } from '../../shared/models/list-state.model';

@Component({
  selector: 'app-performer-list',
  templateUrl: './performer-list.component.html'
})
export class PerformerListComponent implements OnInit {
  state = this.performersService.performerListState;

  constructor(private performersService: PerformersService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {}

  onClickNew() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

}
