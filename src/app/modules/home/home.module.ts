import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { HomeRoomComponent } from './components/home-room/home-room.component';
import { HomeRoomCreateComponent } from './components/home-room-create/home-room-create.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';



@NgModule({
  declarations: [HomeComponent, HomeRoomComponent, HomeRoomCreateComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    ComponentsModule,
    MatStepperModule,
    MatSelectModule,
    MatSlideToggleModule
  ]
})
export class HomeModule { }
