import { ChangeDetectorRef, Component, ContentChild, OnInit, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IRoom } from 'src/app/shared/models/room';
import { LoadingService } from 'src/app/shared/services/loading/loading.service';
import { IGetRoomResponse, IGetLastTask } from 'src/app/shared/services/room/models/provider-room-responses';
import { RoomEventsService } from 'src/app/shared/services/room/room-events.service';
import { RoomService } from 'src/app/shared/services/room/room.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { TaskCreateComponent } from '../task-create/task-create.component';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  @ViewChildren(UserCardComponent) playersCards: UserCardComponent[];

  room: IGetRoomResponse;
  private infoRoom: IRoom;
  players: {
    idSocket: string;
    name: string;
    voted?: boolean;
  }[];

  constructor(
    private dialog: MatDialog,
    private loading: LoadingService,
    private roomService: RoomService,
    private router: Router,
    private storage: StorageService,
    private roomEvents: RoomEventsService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.infoRoom = this.storage.getObject<IRoom>('room');
    this.roomEvents
    .connect(this.infoRoom.roomName, this.infoRoom.user?.name)
    .subscribe({
      next: () => this.toast.success('Bem-vindo à sala ' + this.infoRoom.roomName.replace(/_/g, ' ')),
      error: result => {
        this.router.navigate(['/home']);
        this.loading.hide();
        this.toast.error(result.error.msg, 'Erro ao conectar');
      }
    });

    this.getRoom();
  }


  private getRoom() {
    this.roomService.getRoom(this.infoRoom.roomName).subscribe({
      next: response => {
        this.room = response;

        this.players = this.room
          ? this.room.users.map(user => ({ idSocket: user.idSocket, name: user.name, voted: false }))
          : [];

        this.loading.hide();
      },
      error: () => {
        this.router.navigate(['/home']);
        this.loading.hide();
      }
    });
  }

  get title(): string {
    return this.room ? this.room.name.replace(/_/g, ' ') : '';
  }

  get isPlayer(): boolean {
    return !!this.infoRoom.user?.name;
  }

  changeTask(task: IGetLastTask) {
    task?.votes?.forEach(vote => {
      const player = this.players?.find(plr => plr.idSocket === vote.user.idSocket);

      if (player) {
        player.voted = true;
      }
    });
    this.playersCards?.forEach(playerCard => playerCard.update());
  }

  addTask() {
    this.dialog.open(TaskCreateComponent);
  }

}
