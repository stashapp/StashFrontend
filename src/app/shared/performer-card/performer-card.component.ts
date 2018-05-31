import { Component, OnInit, Input, HostBinding } from '@angular/core';

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

  constructor() {}

  ngOnInit() {}

}
