import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { StashService } from '../../core/stash.service';

import { Performer } from '../../shared/models/performer.model';

@Component({
  selector: 'app-performer-detail',
  templateUrl: './performer-detail.component.html',
  styleUrls: ['./performer-detail.component.css']
})
export class PerformerDetailComponent implements OnInit {
  performer: Performer;

  constructor(private route: ActivatedRoute, private stashService: StashService, private router: Router) { }

  ngOnInit() {
    this.getPerformer();
    window.scrollTo(0, 0);
  }

  getPerformer() {
    const id = parseInt(this.route.snapshot.params['id'], 10);
    this.stashService.getPerformer(id).subscribe(performer => {
      this.performer = performer;

      this.stashService.getScenesWithIds(this.performer.scene_ids).subscribe(scenes => {
        this.performer.fetchedScenes = scenes;
      });
    }, error => {
      console.log(error);
    });
  }

  onClickEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  imagePath(): string {
    if (!!this.performer === false) { return ''; }
    return `${this.stashService.url}${this.performer.image_path}`
  }

  twitterLink(): string {
    return 'http://www.twitter.com/' + this.performer.twitter;
  }

  instagramLink(): string {
    return 'http://www.instagram.com/' + this.performer.instagram;
  }
}
