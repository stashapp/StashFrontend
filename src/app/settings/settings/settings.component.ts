import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/interval';

import { StashService } from '../../core/stash.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {
  progress: number;
  message: string;
  logs: string[];
  statusObservable: Subscription;

  constructor(private stashService: StashService) {}

  ngOnInit() {
    this.statusObservable = this.stashService.metadataUpdate().subscribe(response => {
      const result = JSON.parse(response.data.metadataUpdate);

      this.progress = result.progress;
      this.message = result.message;
      this.logs = result.logs;
    });
  }

  ngOnDestroy() {
    if (!this.statusObservable) { return; }
    this.statusObservable.unsubscribe();
  }

  onClickScan() {
    this.stashService.metadataScan().refetch();
  }

}
