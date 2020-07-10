import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/shared/services/room/room.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RoomValidatorsService } from 'src/app/shared/services/room/room-validators.service';

@Component({
  templateUrl: './home-room.component.html',
  styleUrls: ['./home-room.component.scss']
})
export class HomeRoomComponent implements OnInit {
  formConnect: FormGroup;

  constructor(
    private roomService: RoomService,
    private fb: FormBuilder,
    private toast: ToastrService,
    private roomValidator: RoomValidatorsService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.formConnect.markAllAsTouched();
  }

  private createForm() {
    this.formConnect = this.fb.group({
      room: ['', [Validators.required, Validators.minLength(3)], this.roomValidator.verifyRoomNotExist()],
      user: ['', [Validators.minLength(3)]]
    });
  }

  connectUser() {
    if (this.formConnect.get('room').valid && (this.formConnect.get('user').valid && this.formConnect.get('user').value)) {
      this.connect(this.formConnect.get('room').value.replace(/ /g, '_'), this.formConnect.get('user').value);
    } else {
      this.showWarning();
    }
  }

  private connect(room: string, user?: string) {
    this.roomService.connect(room, user)
    .subscribe({
      next: result => {
        if (result) {
          this.toast.info('Conectando');
        }
      },
      error: result => this.toast.error(result.error.msg, 'Erro ao conectar')
    });

    this.roomService.onConnectObserver.subscribe(result => {
      if (result) {
        this.toast.success('Observador entrando na sala');
      }
    });

    this.roomService.onConnectUser.subscribe(result => {
      if (result) {
        this.toast.success(result.user, 'Usuário entrando na sala');
      }
    });
  }

  private showWarning() {
    this.formConnect.markAllAsTouched();
    this.toast.warning('Campos inválidos', 'Não é possível conectar');
  }

  connectObserver() {
    if (this.formConnect.get('room').valid && this.formConnect.get('room').value) {
      this.connect(this.formConnect.get('room').value.replace(/ /g, '_'));
    } else {
      this.showWarning();
    }
  }
}
