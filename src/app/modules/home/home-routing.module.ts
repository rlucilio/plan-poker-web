import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { FormRoomComponent } from './components/form-room/form-room.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'form',
        component: FormRoomComponent
      },
      {
        path: '',
        redirectTo: 'form',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'form',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
