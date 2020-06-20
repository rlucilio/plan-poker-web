import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormRoomComponent } from './components/form-room/form-room.component';

@NgModule({
  declarations: [HomeComponent, FormRoomComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class HomeModule { }
