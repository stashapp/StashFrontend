import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { StashService } from '../../core/stash.service';

import { Scene } from '../../shared/models/scene.model';

@Component({
  selector: 'app-scene-detail',
  templateUrl: './scene-detail.component.html',
  styleUrls: ['./scene-detail.component.css']
})
export class SceneDetailComponent implements OnInit, AfterViewInit {
  scene: Scene;

  @ViewChild('jwplayer') jwplayer: any;

  constructor(private route: ActivatedRoute, private stashService: StashService, private router: Router) { }

  ngOnInit() {
    this.getScene();
    window.scrollTo(0, 0);
  }

  ngAfterViewInit() {
    // this.temp();
  }

  getScene() {
    const id = parseInt(this.route.snapshot.params['id'], 10);
    this.stashService.getScene(id).subscribe(scene => {
      this.scene = scene;
      this.scene.paths.stream += '.mp4';
      this.jwplayer.setupPlayer(this.streamPath(), this.imagePath(), this.vttPath());

      this.stashService.getPerformersWithIds(this.scene.performer_ids).subscribe(performers => {
        this.scene.fetchedPerformers = performers;
      });

      this.stashService.getTagsWithIds(this.scene.tag_ids).subscribe(tags => {
        this.scene.fetchedTags = tags;
      });

      this.stashService.getGallery(this.scene.gallery_id).subscribe(gallery => {
        this.scene.fetchedGallery = gallery;
      });
    }, error => {
      console.log(error);
    });
  }

  streamPath(): string {
    return !!this.scene ? `${this.stashService.url}${this.scene.paths.stream}` : '';
  }

  imagePath(): string {
    return !!this.scene ? `${this.stashService.url}${this.scene.paths.screenshot}` : '';
  }

  vttPath(): string {
    // todo: don't hardcode this
    return !!this.scene ? `${this.stashService.url}${this.scene.paths.vtt}` : '';
  }

  onClickEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onTime(time) {
    console.log('on time', time);
  }
}
