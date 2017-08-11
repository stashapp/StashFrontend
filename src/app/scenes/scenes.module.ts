import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ScenesRoutingModule } from './scenes-routing.module';
import { ScenesService } from './scenes.service';

import { ScenesComponent } from './scenes/scenes.component';
import { SceneListComponent } from './scene-list/scene-list.component';
import { SceneDetailComponent } from './scene-detail/scene-detail.component';
import { SceneFormComponent } from './scene-form/scene-form.component';

@NgModule({
  imports: [
    SharedModule,
    ScenesRoutingModule
  ],
  declarations: [
    ScenesComponent,
    SceneListComponent,
    SceneDetailComponent,
    SceneFormComponent
  ],
  providers: [
    ScenesService
  ]
})
export class ScenesModule { }
