import { Component, OnInit } from '@angular/core';
import { CreateRoomUsecaseService } from '../../services/create-room/usecase/create-room.usecase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-room',
  templateUrl: './form-room.component.html',
  styleUrls: ['./form-room.component.scss']
})
export class FormRoomComponent implements OnInit {
  formRoom: FormGroup;

  constructor(
    private createRoomUsecase: CreateRoomUsecaseService,
    private formBuider: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formRoom = this.formBuider.group({
      user: ['', [Validators.required]],
      room: ['', [Validators.required]],
    });
  }

  createRoom() {
    this.createRoomUsecase.execute({
      nameOwner: this.formRoom.get('user').value,
      nameRoom: this.formRoom.get('room').value,
    }).subscribe(result => console.log(result));
  }

  enterRoom() {
    console.log('enter');
  }

}
