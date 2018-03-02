import { Component, OnInit, Input, HostBinding, HostListener, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { StashService } from '../../core/stash.service';
import { Performer } from '../../shared/models/performer.model';

@Component({
  selector: 'app-performer-card',
  templateUrl: './performer-card.component.html',
  styleUrls: ['./performer-card.component.css']
})
export class PerformerCardComponent implements OnInit {
  @Input() performer: Performer;
  @Input() ageFromDate: string;

  // The host class needs to be card
  @HostBinding('class') class = 'card';

  constructor(
    private router: Router,
    private el: ElementRef,
    private stashService: StashService
  ) {}

  ngOnInit() {
  }

  onSelect(): void {
    this.router.navigate(['/performers', this.performer.id]);
  }

}
