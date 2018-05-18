import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { StashService } from '../../core/stash.service';

import { Scene, SceneMarker } from '../../shared/models/scene.model';
import { FindSceneQuery, SceneDataFragment } from '../../core/graphql-generated';
import { QueryRef } from 'apollo-angular';

@Component({
  selector: 'app-scene-detail',
  templateUrl: './scene-detail.component.html',
  styleUrls: ['./scene-detail.component.css']
})
export class SceneDetailComponent implements OnInit {
  scene: SceneDataFragment;

  private lastTime = 0;

  private isPlayerSetup = false;

  @ViewChild('jwplayer') jwplayer: any;
  @ViewChild('scrubber') scrubber: any;

  constructor(private route: ActivatedRoute, private stashService: StashService, private router: Router) { }

  ngOnInit() {
    this.getScene();
    window.scrollTo(0, 0);
  }

  getScene() {
    const id = parseInt(this.route.snapshot.params['id'], 10);

    this.stashService.findScene(id).valueChanges.subscribe(result => {
      // TODO
      // this.scene = Object.assign({scene_marker_tags: result.data.sceneMarkerTags}, result.data.findScene);
      this.scene = result.data.findScene;

      // TODO: Check this, this didn't matter before...
      if (!this.isPlayerSetup) {
        const streamPath = this.scene.paths.stream;
        const screenshotPath = this.scene.paths.screenshot;
        const vttPath = this.scene.paths.vtt;
        const chaptersVttPath = this.scene.paths.chapters_vtt;
        this.jwplayer.setupPlayer(streamPath, screenshotPath, vttPath, chaptersVttPath);
        this.isPlayerSetup = true;

        this.route.queryParams.subscribe(params => {
          if (params['t'] != null) {
            this.jwplayer.player.seek(params['t']);
          }
        });
      }
    }, error => {
      console.log(error);
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
    if (difference > 1) {
      this.lastTime = position;
      this.scrubber.scrollTo(position);
    }
  }

  scrubberSeek(seconds) {
    this.jwplayer.player.seek(seconds);
  }

  scrubberScrolled() {
    this.jwplayer.player.pause();
  }
}
