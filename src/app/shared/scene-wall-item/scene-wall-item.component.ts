import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { SceneDataFragment, SceneMarkerDataFragment } from '../../core/graphql-generated';
import { BaseWallItemComponent } from '../base-wall-item/base-wall-item.component';

@Component({
  selector: 'app-scene-wall-item',
  templateUrl: './scene-wall-item.component.html'
})
export class SceneWallItemComponent extends BaseWallItemComponent implements OnInit {
  @Input() scene: SceneDataFragment;
  @Input() marker: SceneMarkerDataFragment;

  constructor(private router: Router) { super(); }

  ngOnInit() {
    if (!!this.marker) {
      this.title = this.marker.title;
      this.imagePath = this.marker.preview;
      this.videoPath = this.marker.stream;
    } else if (!!this.scene) {
      this.title = this.scene.title;
      this.imagePath = this.scene.paths.webp;
      this.videoPath = this.scene.paths.preview;
    } else {
      this.title = '';
      this.imagePath = '';
    }
  }

  onClick(): void {
    const id = this.marker !== undefined ? this.marker.scene.id : this.scene.id;
    this.router.navigate(['/scenes', id]);
  }
}
