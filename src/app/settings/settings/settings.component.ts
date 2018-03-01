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
    // TODO
    // this.statusObservable = Observable.interval(5000).switchMap(() => {
    //   return this.stashService.getStatus();
    // }).subscribe(data => {
    //   this.progress = data.progress;
    //   this.message = data.message;
    //   this.logs = data.logs;
    // });
  }

  ngOnDestroy() {
    this.statusObservable.unsubscribe();
  }

  onClickScan() {
    // TODO
    // this.stashService.startScan();
  }

}
