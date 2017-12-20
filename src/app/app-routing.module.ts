import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

const appRoutes: Routes = [
//   {
//     path: 'compose',
//     component: ComposeMessageComponent,
//     outlet: 'popup'
//   },
//   {
//     path: 'admin',
//     loadChildren: 'app/admin/admin.module#AdminModule'
//   },
//   {
//     path: 'crisis-center',
//     loadChildren: 'app/crisis-center/crisis-center.module#CrisisCenterModule',
//     data: { preload: true }
//   },
//   { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'scenes', loadChildren: 'app/scenes/scenes.module#ScenesModule' },
  { path: 'galleries', loadChildren: 'app/galleries/galleries.module#GalleriesModule' },
  { path: 'performers', loadChildren: 'app/performers/performers.module#PerformersModule' },
  { path: 'studios', loadChildren: 'app/studios/studios.module#StudiosModule' },
  { path: 'tags', loadChildren: 'app/tags/tags.module#TagsModule' },
  { path: 'settings', loadChildren: 'app/settings/settings.module#SettingsModule' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
