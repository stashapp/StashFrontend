import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';

import { StashService } from '../../core/stash.service';

import { Scene } from '../../shared/models/scene.model';
import { Performer } from '../../shared/models/performer.model';
import { Tag } from '../../shared/models/tag.model';
import { Studio } from '../../shared/models/studio.model';
import { Gallery } from '../../shared/models/gallery.model';

@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.css']
})
export class TagFormComponent implements OnInit {
  name: string;

  loading: Boolean = true;

  constructor(private route: ActivatedRoute, private stashService: StashService, private router: Router) {}

  ngOnInit() {
    this.getTag();
  }

  getTag() {
    const id = parseInt(this.route.snapshot.params['id'], 10);
    if (!!id === false) {
      console.log('new tag');
      this.loading = false;
      return;
    }

    // TODO: Fetch tag for editing
  }

  onSubmit() {
    const id = this.route.snapshot.params['id'];

    if (!!id) {
      // TODO: Edit the tag
    } else {
      this.stashService.tagCreate({
        name: this.name
      }).subscribe(result => {
        this.router.navigate(['/tags', result.data.tagCreate.tag.id]);
      });
    }
  }

}
