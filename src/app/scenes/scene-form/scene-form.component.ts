import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { StashService } from '../../core/stash.service';
import { ArtooService } from '../../core/artoo.service';

import { Scene } from '../../shared/models/scene.model';
import { Performer } from '../../shared/models/performer.model';
import { Tag } from '../../shared/models/tag.model';
import { Studio } from '../../shared/models/studio.model';
import { Gallery } from '../../shared/models/gallery.model';

@Component({
  selector: 'app-scene-form',
  templateUrl: './scene-form.component.html',
  styleUrls: ['./scene-form.component.css']
})
export class SceneFormComponent implements OnInit {
  loading = true;
  loadingPerformers = true;
  loadingTags = true;
  loadingStudios = true;
  loadingGalleries = true;
  scene: Scene = new Scene();

  performers: Performer[];
  tags: Tag[];
  studios: Studio[];
  galleries: Gallery[];


  constructor(private route: ActivatedRoute, private stashService: StashService, private router: Router, private artooService: ArtooService) {}

  ngOnInit() {
    this.getScene();
    // TODO: http patch to update
  }

  getScene() {
    const id = parseInt(this.route.snapshot.params['id'], 10);
    if (!!id === false) {
      console.log('new scene');
      return;
    }

    this.stashService.getScene(id).subscribe(scene => {
      this.scene = scene;
      this.loading = false;

      // TODO: better way then hardcoding
      this.stashService.getAllPerformers().subscribe(apiResponse => {
        this.performers = apiResponse.data
        this.loadingPerformers = false;
      });
      this.stashService.getTags(null, 1, 1000).subscribe(apiResponse => {
        this.tags = apiResponse.data
        this.loadingTags = false;
      });
      this.stashService.getAllStudios().subscribe(apiResponse => {
        this.studios = apiResponse.data
        this.loadingStudios = false;
      });
      this.stashService.getValidGalleriesForScene(id).subscribe(apiResponse => {
        this.galleries = apiResponse.data;
        this.loadingGalleries = false;
      })

      // this.stashService.getPerformersWithIds(this.scene.performer_ids).subscribe(performers => {
      //   this.scene.fetchedPerformers = performers;
      // });
    }, error => {
      console.log(error);
    });
  }

  onSubmit() {
    console.log(this.scene);

    this.stashService.updateScene(this.scene).subscribe(response => {
      if (!!response && !!response.errors) {
        console.log(response.errors);
      } else {
        this.router.navigate(['/scenes', this.scene.id]);
      }
    });
  }

  onScrape() {
    console.log('scrape', this.scene.url);

    this.artooService.scrape(this.scene.url, this.studios, this.tags).then(response => {
      this.scene.title = response.title;
      this.scene.date = response.date;
      this.scene.studio_id = response.studio_id;
      this.scene.tag_ids = response.tag_ids;
      this.scene.details = response.details;
    });
  }

}
