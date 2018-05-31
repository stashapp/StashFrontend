import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import { StudioDataFragment } from '../../core/graphql-generated';

@Component({
  selector: 'app-studio-card',
  templateUrl: './studio-card.component.html',
  styleUrls: ['./studio-card.component.css']
})
export class StudioCardComponent implements OnInit {
  @Input() studio: StudioDataFragment;

  // The host class needs to be card
  @HostBinding('class') class = 'card';

  constructor(
    private router: Router
  ) {}

  ngOnInit() {}

  onSelect(): void {
    this.router.navigate(['/studios', this.studio.id]);
  }

}
