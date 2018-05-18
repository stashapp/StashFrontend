import { Component, OnInit, OnChanges, SimpleChanges, ViewChild, Input, Output } from '@angular/core';

import { StashService } from '../../core/stash.service';

import { MarkerStringsQuery, SceneMarkerDataFragment, SceneDataFragment, TagDataFragment } from '../../core/graphql-generated';

@Component({
  selector: 'app-scene-detail-marker-manager',
  templateUrl: './scene-detail-marker-manager.component.html',
  styleUrls: ['./scene-detail-marker-manager.component.css']
})
export class SceneDetailMarkerManagerComponent implements OnInit, OnChanges {
  @Input() scene: SceneDataFragment;
  @Input() player: any;

  showingMarkerModal = false;
  markerOptions: MarkerStringsQuery['markerStrings'];
  editingMarker: SceneMarkerDataFragment;

  // Form input
  title: string;
  seconds: number;
  primary_tag_id: string;
  tag_ids: string[] = [];

  // From the network
  tags: TagDataFragment[];

  constructor(private stashService: StashService) {}

  ngOnInit() {
    this.stashService.allTags().valueChanges.subscribe(result => {
      this.tags = result.data.allTags;
    });

    this.stashService.markerStrings().valueChanges.subscribe(result => {
      this.markerOptions = result.data.markerStrings;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['scene']) {
    }
  }

  onSubmit() {
    const input = {
      id: null,
      title: this.title,
      seconds: this.seconds,
      scene_id: this.scene.id,
      primary_tag_id: this.primary_tag_id,
      tag_ids: this.tag_ids
    };

    if (this.editingMarker == null) {
      this.stashService.markerCreate(input).subscribe(response => {
        console.log(response);
        this.hideModal();
      }, error => {
        console.log(error);
      });
    } else {
      input.id = this.editingMarker.id;
      this.stashService.markerUpdate(input).subscribe(response => {
        console.log(response);
        this.hideModal();
      }, error => {
        console.log(error);
      });
    }
  }

  onCancel() {
    this.hideModal();
  }

  onDestroy() {
    // TODO renable and add two steps to delete
    // this.stashService.markerDestroy(this.editingMarker.id, this.scene.id).subscribe(response => {
    //   console.log('Delete successfull:', response);
    //   this.hideModal();
    // });
  }

  onClickAddMarker() {
    this.player.pause();
    this.showModal();
  }

  onClickMarker(marker: SceneMarkerDataFragment) {
    this.player.seek(marker.seconds);
  }

  onClickEditMarker(marker: SceneMarkerDataFragment) {
    this.showModal(marker);
  }

  private hideModal() {
    this.showingMarkerModal = false;
    this.editingMarker = null;
  }

  private showModal(marker: SceneMarkerDataFragment = null) {
    this.showingMarkerModal = true;
    this.seconds = Math.round(this.player.getPosition());
    if (marker == null) { return; }

    this.editingMarker = marker;

    this.title = marker.title;
    this.seconds = marker.seconds;
    this.primary_tag_id = marker.primary_tag.id;
    this.tag_ids = marker.tags.map(value => value.id);
  }
}
