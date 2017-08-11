import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { StashService } from '../../core/stash.service';

import { Tag } from '../../shared/models/tag.model';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css']
})
export class TagListComponent implements OnInit {

  tags: Tag[];

  constructor(private stashService: StashService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.getTags();
  }

  getTags() {
    this.stashService.getAllTags()
                     .subscribe(
                        apiResult => {
                          this.tags = apiResult.data;
                        },
                        error => console.log('tag list error', error)
                     );
  }

  onClickTag(tag: Tag) {
    this.router.navigate([tag.id], { relativeTo: this.route });
  }

  onClickNew() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

}
