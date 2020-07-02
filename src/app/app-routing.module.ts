import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// const routes: Routes = [
//   {
//     path: 'home',
//     loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
//   },
//   {
//     path: 'room/:name',
//     loadChildren: () => import('./modules/room/room.module').then(m => m.RoomModule)
//   },
//   {
//     path: '',
//     redirectTo: 'home/',
//     pathMatch: 'full'
//   },
//   {
//     path: '**',
//     redirectTo: 'home/',
//     pathMatch: 'full'
//   }
// ];
