import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import { Studio } from '../../shared/models/studio.model';

@Component({
  selector: 'app-studio-card',
  templateUrl: './studio-card.component.html',
  styleUrls: ['./studio-card.component.css']
})
export class StudioCardComponent implements OnInit {
  @Input() studio: Studio;

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
