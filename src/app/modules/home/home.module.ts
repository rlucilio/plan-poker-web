import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormRoomComponent } from './components/form-room/form-room.component';
import { RoomGatewayService } from 'src/app/shared/services/room-gateway/room-gateway.service';
import { CreateRoomUsecaseService } from './services/create-room/usecase/create-room.usecase.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, FormRoomComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    RoomGatewayService,
    CreateRoomUsecaseService
  ]
})
export class HomeModule { }
