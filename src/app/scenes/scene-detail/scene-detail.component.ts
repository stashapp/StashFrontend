import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { StashService } from '../../core/stash.service';

import { Scene, SceneMarker } from '../../shared/models/scene.model';

@Component({
  selector: 'app-scene-detail',
  templateUrl: './scene-detail.component.html',
  styleUrls: ['./scene-detail.component.css']
})
export class SceneDetailComponent implements OnInit, AfterViewInit {
  scene: Scene;
  isDeleteMarkerEnabled: boolean = false;
  markerOptions: any[];
  isMarkerOverlayOpen: boolean = false;

  @ViewChild('jwplayer') jwplayer: any;
  @ViewChild('markerInput') markerInput: any;

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
      this.jwplayer.setupPlayer(this.streamPath(), this.imagePath(), this.vttPath(), this.chaptersVttPath());

      this.stashService.getPerformersWithIds(this.scene.performer_ids).subscribe(performers => {
        this.scene.fetchedPerformers = performers;
      });

      this.stashService.getTagsWithIds(this.scene.tag_ids).subscribe(tags => {
        this.scene.fetchedTags = tags;
      });

      this.stashService.getStudio(this.scene.studio_id).subscribe(studio => {
        this.scene.fetchedStudio = studio;
      }, error => {});

      this.stashService.getGallery(this.scene.gallery_id).subscribe(gallery => {
        this.scene.fetchedGallery = gallery;
      });
    }, error => {
      console.log(error);
    });

    this.stashService.getAllMarkerStrings().subscribe(markers => {
      this.markerOptions = markers
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

  chaptersVttPath(): string {
    return !!this.scene ? `${this.stashService.url}${this.scene.paths.chapters_vtt}` : '';
  }

  onClickEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onTime(time) {
    console.log('on time', time);
  }

  markerStreamPath(marker: SceneMarker): string {
    return !!marker ? `${this.stashService.url}${marker.stream}` : '';
  }

  onClickAddMarker() {
    let sceneMarker = new SceneMarker();
    sceneMarker.title = this.markerInput.query;
    sceneMarker.seconds = Math.round(this.jwplayer.player.getPosition());
    sceneMarker.scene_id = this.scene.id;
    console.log(sceneMarker);
    this.markerInput.query = null;

    this.stashService.createSceneMarker(sceneMarker).subscribe(response => {
      if (!!response && !!response.errors) {
        console.log(response.errors);
      } else {
        console.log(response);
        let marker = new SceneMarker();
        marker.id = response.id;
        marker.seconds = response.seconds;
        marker.title = response.title;
        this.scene.scene_markers.push(marker);
      }
    });
  }

  onClickMarker(marker: SceneMarker) {
    if (this.isMarkerOverlayOpen) {
      this.isMarkerOverlayOpen = false;
    }
    this.jwplayer.player.seek(marker.seconds)
  }

  onClickDeleteMarker(marker: SceneMarker) {
    marker.scene_id = this.scene.id;
    this.stashService.deleteSceneMarker(marker).subscribe(response => {
      if (!!response && !!response.errors) {
        console.log(response.errors);
      } else {
        this.scene.scene_markers = this.scene.scene_markers.filter(item => item.id !== marker.id);
      }
    });
  }
}
