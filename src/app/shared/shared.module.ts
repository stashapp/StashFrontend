import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SuiModule } from 'ng2-semantic-ui';
import { NgxPaginationModule } from 'ngx-pagination';
import { ClipboardModule } from 'ngx-clipboard';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { SuiPaginationComponent } from './sui-pagination/sui-pagination.component';
import { JwplayerComponent } from './jwplayer/jwplayer.component';
import { SceneCardComponent } from './scene-card/scene-card.component';
import { PerformerCardComponent } from './performer-card/performer-card.component';
import { ListFilterComponent } from './list-filter/list-filter.component';
import { TruncatePipe } from './truncate.pipe';
import { CapitalizePipe } from './capitalize.pipe';
import { AgePipe } from './age.pipe';
import { GalleryImageCardComponent } from './gallery-image-card/gallery-image-card.component';
import { StudioCardComponent } from './studio-card/studio-card.component';
import { GalleryPreviewComponent } from './gallery-preview/gallery-preview.component';
import { GalleryCardComponent } from './gallery-card/gallery-card.component';
import { ListComponent } from './list/list.component';
import { SceneListItemComponent } from './scene-list-item/scene-list-item.component';
import { SecondsPipe } from './seconds.pipe';
import { VisibleDirective } from './visible.directive';
import { FileSizePipe } from './file-size.pipe';
import { SceneMarkerCardComponent } from './scene-marker-card/scene-marker-card.component';

// Import blah.  Include in dec and exports (https://angular.io/guide/ngmodule#shared-modules)

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SuiModule,
    NgxPaginationModule,
    ClipboardModule,
    LazyLoadImageModule
  ],
  declarations: [
    TruncatePipe,
    SuiPaginationComponent,
    JwplayerComponent,
    SceneCardComponent,
    PerformerCardComponent,
    ListFilterComponent,
    CapitalizePipe,
    AgePipe,
    GalleryImageCardComponent,
    StudioCardComponent,
    GalleryPreviewComponent,
    GalleryCardComponent,
    ListComponent,
    SceneListItemComponent,
    SecondsPipe,
    VisibleDirective,
    FileSizePipe,
    SceneMarkerCardComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SuiModule,
    NgxPaginationModule,
    ClipboardModule,
    LazyLoadImageModule,
    SuiPaginationComponent,
    JwplayerComponent,
    SceneCardComponent,
    PerformerCardComponent,
    ListFilterComponent,
    TruncatePipe,
    CapitalizePipe,
    AgePipe,
    GalleryImageCardComponent,
    StudioCardComponent,
    GalleryPreviewComponent,
    GalleryCardComponent,
    ListComponent,
    SceneListItemComponent,
    SecondsPipe,
    VisibleDirective,
    FileSizePipe
  ]
})
export class SharedModule { }
