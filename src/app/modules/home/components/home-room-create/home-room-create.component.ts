import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoomValidatorsService } from 'src/app/shared/services/room/room-validators.service';
import { RoomEventsService } from 'src/app/shared/services/room/room-events.service';
import { RoomService } from 'src/app/shared/services/room/room.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './home-room-create.component.html',
  styleUrls: ['./home-room-create.component.scss']
})
export class HomeRoomCreateComponent implements OnInit {
  formRoom: FormGroup;
  formTask: FormGroup;
  formVotes: FormGroup;

  constructor(
    private fb: FormBuilder,
    private roomValidator: RoomValidatorsService,
    private roomService: RoomService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.createFormRoom();
    this.createFormTask();
    this.createFormVotes();
  }

  createRoom() {
    const roomCreateRequest = {
      room: Object.assign({}, this.formRoom.value),
      task: Object.assign({}, this.formTask.value),
      votes: Object.assign({}, this.formVotes.value)
    };

    this.roomService.create(roomCreateRequest).subscribe({
      next: () => {
        this.toast.success('Sala Criada');
        this.toast.show('Redirecionando...');
      },
      error: err => this.toast.error('Erro ao criar a sala')
    });
  }

  private createFormVotes() {
    this.formRoom = this.fb.group({
      nameRoom: ['', [Validators.required , Validators.minLength(3)], this.roomValidator.verifyRoomExist()],
      description: ['', [Validators.minLength(60)]],
      observables: ['', []]
    });
  }

  private createFormTask() {
    this.formTask = this.fb.group({
      timeout: ['', []],
      timeForTimeout: ['', [Validators.min(1)]],
      history: ['', []],
    });
  }

  private createFormRoom() {
    this.formVotes = this.fb.group({
      alterVotesAfter: ['', []],
      autoFlip: ['', []],
      typeVote: ['', []]
    });
  }

}
