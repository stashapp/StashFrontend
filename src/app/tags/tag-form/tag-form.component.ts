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
    loading: Boolean = true;
    tag: Tag = new Tag();

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

    this.stashService.getTag(id).subscribe(tag => {
      this.tag = tag;
      this.loading = false;
    }, error => {
      console.log(error);
    });
  }

  onSubmit() {
    console.log(this.tag);

    if (!!this.tag.id) {
      this.stashService.updateTag(this.tag).subscribe(response => {
        this.router.navigate(['/tags', this.tag.id]);
      }, error => {
        console.log(error)
      });
    } else {
      this.stashService.createTag(this.tag).subscribe(response => {
        this.router.navigate(['/tags', response.id]);
      }, error => {
        console.log(error)
      });
    }
  }

}
