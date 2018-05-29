import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { StashService } from '../../core/stash.service';

import { TagDataFragment } from '../../core/graphql-generated';
import { CriteriaType } from '../../shared/models/list-state.model';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css']
})
export class TagListComponent implements OnInit {
  CriteriaType = CriteriaType;

  tags: TagDataFragment[];

  constructor(private stashService: StashService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.getTags();
  }

  async getTags() {
    const result = await this.stashService.allTags().result();
    this.tags = result.data.allTags;
  }

  onClickNew() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  makeJSONQueryString(tag): string {
    return JSON.stringify({type: CriteriaType.Tags, values: [tag.id]});
  }

  tagCount(tag: TagDataFragment) {
    return tag.scene_count + tag.scene_marker_count;
  }

}
