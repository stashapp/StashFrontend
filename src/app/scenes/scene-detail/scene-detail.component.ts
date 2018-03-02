import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { StashService } from '../../core/stash.service';

import { Scene, SceneMarker } from '../../shared/models/scene.model';
import { FindSceneQuery } from '../../core/graphql-generated';
import { QueryRef } from 'apollo-angular';

@Component({
  selector: 'app-scene-detail',
  templateUrl: './scene-detail.component.html',
  styleUrls: ['./scene-detail.component.css']
})
export class SceneDetailComponent implements OnInit {
  scene: Scene;
  isDeleteMarkerEnabled = false;
  markerOptions: any[];
  isMarkerOverlayOpen = false;

  private lastTime = 0;

  private isPlayerSetup = false;

  @ViewChild('jwplayer') jwplayer: any;
  @ViewChild('markerInput') markerInput: any;
  @ViewChild('scrubber') scrubber: any;

  constructor(private route: ActivatedRoute, private stashService: StashService, private router: Router) { }

  ngOnInit() {
    this.getScene();
    window.scrollTo(0, 0);
  }

  getScene() {
    const id = parseInt(this.route.snapshot.params['id'], 10);

    this.stashService.findScene(id).valueChanges.subscribe(result => {
      this.scene = result.data.findScene;

      // TODO: Check this, this didn't matter before...
      if (!this.isPlayerSetup) {
        const streamPath = this.scene.paths.stream;
        const screenshotPath = this.scene.paths.screenshot;
        const vttPath = this.scene.paths.vtt;
        const chaptersVttPath = this.scene.paths.chapters_vtt;
        this.jwplayer.setupPlayer(streamPath, screenshotPath, vttPath, chaptersVttPath);
        this.isPlayerSetup = true;
      }
    }, error => {
      console.log(error);
    });

    this.stashService.markerStrings().valueChanges.subscribe(result => {
      this.markerOptions = result.data.markerStrings;
    });
  }

  onClickEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onSeeked() {
    const position = this.jwplayer.player.getPosition();
    this.scrubber.scrollTo(position);
    this.jwplayer.player.play();
  }

  onTime(data) {
    const position = this.jwplayer.player.getPosition();
    const difference = Math.abs(position - this.lastTime);
    if (difference > 5) {
      this.lastTime = position;
      this.scrubber.scrollTo(position);
    }
  }

  onClickAddMarker() {
    const title = this.markerInput.query;
    const seconds = Math.round(this.jwplayer.player.getPosition());
    const scene_id = Number(this.scene.id);
    this.markerInput.query = null;

    this.stashService.markerCreate(title, seconds, scene_id).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  onClickMarker(marker: SceneMarker) {
    if (this.isMarkerOverlayOpen) {
      this.isMarkerOverlayOpen = false;
    }
    this.jwplayer.player.seek(marker.seconds);
  }

  onClickDeleteMarker(marker: SceneMarker) {
    this.stashService.markerDestory(marker.id, this.scene.id).subscribe(response => {
      console.log('Delete successfull:', response);
    });
  }

  scrubberSeek(seconds) {
    this.jwplayer.player.seek(seconds);
  }

  scrubberScrolled() {
    this.jwplayer.player.pause();
  }
}
