import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormRoomComponent } from './components/form-room/form-room.component';
import { RoomGatewayService } from 'src/app/shared/services/room-gateway/room-gateway.service';
import { CreateRoomUsecaseService } from './services/room/usecase/create-room.usecase.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnterRoomComponent } from './components/enter-room/enter-room.component';
import { CreateRoomComponent } from './components/create-room/create-room.component';

@NgModule({
  declarations: [HomeComponent, FormRoomComponent, EnterRoomComponent, CreateRoomComponent],
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
