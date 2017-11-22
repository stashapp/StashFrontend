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
  showingMarkerList: boolean = false;
  searchTerm: string = '';
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
    this.stashService.getAllMarkerStrings().subscribe(markers => {
      this.markerOptions = markers
    });
  }

  getScenes(q: string) {
    if (this.mode == WallMode.Scenes) {
      this.stashService.getScenesForWall(q).subscribe(scenes => {
        this.items = scenes;
      });
    } else {
      this.stashService.getSceneMarkersForWall(q).subscribe(markers => {
        this.items = markers;
      })
    }
  }

  onMouseEnter(video: any) {
    video.volume = 0.05;
    video.muted = false;
  }

  onMouseLeave(video: any) {
    video.muted = true;
  }

  onClick(item): void {
    const id = item.scene_id != undefined ? item.scene_id : item.id
    this.router.navigate(['/scenes', id]);
  }

  previewPath(item): string {
    if (this.mode == WallMode.Scenes) {
      return `${this.stashService.url}${item.paths.preview}`
    } else {
      return `${this.stashService.url}${item.stream}`
    }
  }

  toggleMode() {
    if (this.mode == WallMode.Scenes) {
      this.mode = WallMode.Markers;
    } else {
      this.mode = WallMode.Scenes;
    }
    this.getScenes(this.searchTerm);
  }

  toggleMarkerList() {
    this.showingMarkerList = !this.showingMarkerList;
  }

  onClickMarker(marker) {
    this.searchTerm = `"${marker.title}"`;
    this.showingMarkerList = false;
  }

  sortMarkers(by) {
    this.markerOptions = this.markerOptions.sort((a, b) => {
      if (by == 'count') {
        return b.count - a.count;
      } else {
        if (a.title > b.title) { return 1; }
        if (a.title < b.title) { return -1; }
        return 0;
      }
    });
  }

}
