import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StashService } from '../../core/stash.service';

import { TagDataFragment } from '../../core/graphql-generated';

@Component({
  selector: 'app-tag-detail',
  template: `
  <!-- TODO: New tag detail screen... -->
  {{tag?.name}}
  `
})
export class TagDetailComponent implements OnInit {
  tag: TagDataFragment;

  constructor(
    private route: ActivatedRoute,
    private stashService: StashService
  ) {}

  ngOnInit() {
    const id = parseInt(this.route.snapshot.params['id'], 10);
    this.getTag(id);
  }

  async getTag(id: number) {
    if (!!id === false) {
      console.error('no id?');
      return;
    }

    const result = await this.stashService.findTag(id).result();
    this.tag = result.data.findTag;
  }
}
