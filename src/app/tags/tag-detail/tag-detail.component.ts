import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { SceneListState, CustomCriteria } from '../../shared/models/list-state.model';

@Component({
  selector: 'app-tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.css']
})
export class TagDetailComponent implements OnInit {
  sceneListState: SceneListState;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.params['id'], 10);
    this.sceneListState = new SceneListState();
    this.sceneListState.filter.customCriteria = [];
    this.sceneListState.filter.customCriteria.push(new CustomCriteria('tag_id', id.toString()));
  }

}
