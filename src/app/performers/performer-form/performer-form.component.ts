import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';

import { StashService } from '../../core/stash.service';
import { ArtooService } from '../../core/artoo.service';

import { Scene } from '../../shared/models/scene.model';
import { Performer } from '../../shared/models/performer.model';
import { Tag } from '../../shared/models/tag.model';
import { Studio } from '../../shared/models/studio.model';
import { Gallery } from '../../shared/models/gallery.model';

@Component({
  selector: 'app-performer-form',
  templateUrl: './performer-form.component.html',
  styleUrls: ['./performer-form.component.css']
})
export class PerformerFormComponent implements OnInit, OnDestroy {
  loading: Boolean = true;
  performer: Performer = new Performer();
  imagePreview: string;
  ethnicityOptions: string[] = ['white', 'black', 'asian', 'hispanic'];

  constructor(private route: ActivatedRoute, private stashService: StashService, private artooService: ArtooService, private router: Router) { }

  ngOnInit() {
    this.getPerformer();
  }

  ngOnDestroy() {
  }

  getPerformer() {
    const id = parseInt(this.route.snapshot.params['id'], 10);
    if (!!id === false) {
      console.log('new performer');
      this.loading = false;
      return;
    }

    this.stashService.getPerformer(id).subscribe(performer => {
      this.performer = performer;
      this.loading = false;
      this.imagePreview = this.imagePath();
    }, error => {
      console.log(error);
    });
  }

  imagePath(): string {
    if (!!this.performer.image_path) {
      return `${this.stashService.url}${this.performer.image_path}`
    } else {
      return null;
    }
  }

  onImageChange(event) {
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onloadend = (e) => {
      this.performer.image = reader.result;
      this.imagePreview = this.performer.image;
    }
    reader.readAsDataURL(file);
  }

  onResetImage(imageInput) {
    imageInput.value = ''
    this.imagePreview = this.imagePath();
    this.performer.image = null;
  }

  onFavoriteChange() {
    this.performer.favorite = !this.performer.favorite;
  }

  onSubmit() {
    console.log(this.performer);

    if (!!this.performer.id) {
      this.stashService.updatePerformer(this.performer).subscribe(response => {
        this.router.navigate(['/performers', this.performer.id]);
      }, error => {
        console.log(error)
      });
    } else {
      this.stashService.createPerformer(this.performer).subscribe(response => {
        this.router.navigate(['/performers', response.id]);
      }, error => {
        console.log(error)
      });
    }
  }

  onScrape() {
    console.log('scrape', this.performer.url);

    this.artooService.scrapeFreeones(this.performer.url).then(response => {
      this.performer.name = response.name;
      this.performer.aliases = response.aliases;
      this.performer.country = response.country;
      this.performer.birthdate = response.birthdate;
      this.performer.ethnicity = response.ethnicity;
      this.performer.eye_color = response.eye_color;
      this.performer.height = response.height;
      this.performer.measurements = response.measurements;
      this.performer.fake_tits = response.fake_tits;
      this.performer.career_length = response.career_length;
      this.performer.tattoos = response.tattoos;
      this.performer.piercings = response.piercings;
      this.performer.twitter = response.twitter;
      this.performer.instagram = response.instagram;
    });
  }

}
