import { Component, OnInit, OnDestroy, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { StashService } from '../../core/stash.service';

import { Scene, SceneMarker } from '../../shared/models/scene.model';

export enum WallMode {
  Scenes,
  Markers
}

@Component({
  selector: 'app-scene-wall',
  templateUrl: './scene-wall.component.html',
  styleUrls: ['./scene-wall.component.css']
})
export class SceneWallComponent implements OnInit {
  WallMode = WallMode;
  items: any[]; // scenes or scene markers
  markerOptions: any[];
  showingMarkerList = false;
  searchTerm = '';
  searchFormControl = new FormControl();
  mode: WallMode = WallMode.Markers;

  constructor(
    private router: Router,
    private el: ElementRef,
    private stashService: StashService
  ) {}

  ngOnInit() {
    this.searchFormControl.valueChanges
                      .debounceTime(1000)
                      .distinctUntilChanged()
                      .subscribe(term => {
                        this.getScenes(term);
                      });
    this.stashService.markerStrings().valueChanges.subscribe(result => {
      this.markerOptions = result.data.markerStrings;
    });
  }

  getScenes(q: string) {
    this.items = null;
    if (this.mode === WallMode.Scenes) {
      this.stashService.sceneWall(q).valueChanges.subscribe(response => {
        this.items = response.data.sceneWall;
      });
    } else {
      this.stashService.markerWall(q).valueChanges.subscribe(response => {
        this.items = response.data.markerWall;
      });
    }
  }

  toggleMode() {
    if (this.mode === WallMode.Scenes) {
      this.mode = WallMode.Markers;
    } else {
      this.mode = WallMode.Scenes;
    }
    this.getScenes(this.searchTerm);
  }

  toggleMarkerList() {
    this.showingMarkerList = !this.showingMarkerList;
  }

  refresh() {
    this.getScenes(this.searchTerm);
  }

  onClickMarker(marker) {
    this.searchTerm = `"${marker.title}"`;
    this.showingMarkerList = false;
  }

  async sortMarkers(by) {
    const result = await this.stashService.markerStrings(null, by).result()
    this.markerOptions = result.data.markerStrings;

    // this.markerOptions = this.markerOptions.sort((a, b) => {
    //   if (by === 'count') {
    //     return b.count - a.count;
    //   } else {
    //     if (a.title > b.title) { return 1; }
    //     if (a.title < b.title) { return -1; }
    //     return 0;
    //   }
    // });
  }

}
