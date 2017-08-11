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
  selector: 'app-studio-form',
  templateUrl: './studio-form.component.html',
  styleUrls: ['./studio-form.component.css']
})
export class StudioFormComponent implements OnInit, OnDestroy {
  loading: Boolean = true;
  studio: Studio = new Studio();
  imagePreview: string;

  constructor(private route: ActivatedRoute, private stashService: StashService, private router: Router) { }

  ngOnInit() {
    this.getStudio();
  }

  ngOnDestroy() {
  }

  getStudio() {
    const id = parseInt(this.route.snapshot.params['id'], 10);
    if (!!id === false) {
      console.log('new studio');
      this.loading = false;
      return;
    }

    this.stashService.getStudio(id).subscribe(studio => {
      this.studio = studio;
      this.loading = false;
      this.imagePreview = this.imagePath();
    }, error => {
      console.log(error);
    });
  }

  imagePath(): string {
    if (!!this.studio.image_path) {
      return `${this.stashService.url}${this.studio.image_path}`
    } else {
      return null;
    }
  }

  onImageChange(event) {
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onloadend = (e) => {
      this.studio.image = reader.result;
      this.imagePreview = this.studio.image;
    }
    reader.readAsDataURL(file);
  }

  onResetImage(imageInput) {
    imageInput.value = ''
    this.imagePreview = this.imagePath();
    this.studio.image = null;
  }

  // onFavoriteChange() {
  //   this.studio.favorite = !this.studio.favorite;
  // }

  onSubmit() {
    console.log(this.studio);

    if (!!this.studio.id) {
      this.stashService.updateStudio(this.studio).subscribe(response => {
        this.router.navigate(['/studios', this.studio.id]);
      }, error => {
        console.log(error)
      });
    } else {
      this.stashService.createStudio(this.studio).subscribe(response => {
        this.router.navigate(['/studios', response.id]);
      }, error => {
        console.log(error)
      });
    }
  }
}
