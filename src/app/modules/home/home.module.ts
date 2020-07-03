import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { HomeRoomComponent } from './components/home-room/home-room.component';
import { HomeRoomCreateComponent } from './components/home-room-create/home-room-create.component';


@NgModule({
  declarations: [HomeComponent, HomeRoomComponent, HomeRoomCreateComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class HomeModule { }
