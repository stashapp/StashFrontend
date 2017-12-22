import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ScenesRoutingModule } from './scenes-routing.module';
import { ScenesService } from './scenes.service';

import { ScenesComponent } from './scenes/scenes.component';
import { SceneListComponent } from './scene-list/scene-list.component';
import { SceneDetailComponent } from './scene-detail/scene-detail.component';
import { SceneFormComponent } from './scene-form/scene-form.component';
import { SceneWallComponent } from './scene-wall/scene-wall.component';
import { SceneWallItemComponent } from './scene-wall-item/scene-wall-item.component';

@NgModule({
  imports: [
    SharedModule,
    ScenesRoutingModule
  ],
  declarations: [
    ScenesComponent,
    SceneListComponent,
    SceneDetailComponent,
    SceneFormComponent,
    SceneWallComponent,
    SceneWallItemComponent
  ],
  providers: [
    ScenesService
  ]
})
export class ScenesModule { }
