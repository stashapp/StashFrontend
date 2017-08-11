import { Component, OnInit, OnDestroy, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { StashService } from '../../core/stash.service';

import { Scene } from '../../shared/models/scene.model';

@Component({
  selector: 'app-scene-wall',
  templateUrl: './scene-wall.component.html',
  styleUrls: ['./scene-wall.component.css']
})
export class SceneWallComponent implements OnInit {
  scenes: Scene[];
  searchTerm: string = '';
  searchFormControl = new FormControl();

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

  }

  getScenes(q: string) {
    this.stashService.getScenesForWall(q).subscribe(scenes => {
      this.scenes = scenes;
    });
  }

  onClick(scene): void {
    this.router.navigate(['/scenes', scene.id]);
  }

  previewPath(scene): string {
    return `${this.stashService.url}${scene.paths.preview}`
  }

}
