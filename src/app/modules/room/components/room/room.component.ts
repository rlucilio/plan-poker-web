import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IRoom } from 'src/app/shared/models/room';
import { LoadingService } from 'src/app/shared/services/loading/loading.service';
import { RoomEventsService } from 'src/app/shared/services/room/room-events.service';
import { IGetRoomResponse } from 'src/app/shared/services/room/room-provider.service';
import { RoomService } from 'src/app/shared/services/room/room.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';
import { TaskCreateComponent } from '../task-create/task-create.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  room: IGetRoomResponse;
  private infoRoom: IRoom;
  players: {
    idSocket: string;
    name: string;
    voted?: boolean; }[];

  constructor(
    private dialog: MatDialog,
    private loading: LoadingService,
    private roomService: RoomService,
    private router: Router,
    private storage: StorageService,
    private roomEvents: RoomEventsService
  ) {}

  ngOnInit(): void {
    this.infoRoom = this.storage.getObject<IRoom>('room');
    this.roomEvents.connect(this.infoRoom.roomName, this.infoRoom.user?.name);

    this.roomService.getRoom(this.infoRoom.roomName).subscribe({
      next: response => {
        this.room = response;

        this.players = this.room
        ? this.room.users.map(user => ({idSocket: user.idSocket, name: user.name, voted: false}))
        : [];

        this.loading.hide();
      },
      error: () => {
        this.router.navigate(['/home']);
        this.loading.hide();
      }
    });

    this.loading.hide();
  }


  get title(): string {
    return this.room ? this.room.name.replace(/_/g, ' ') : '';
  }

  get isPlayer(): boolean {
    return !!this.infoRoom.user?.name;
  }

  addTask() {
    this.players.forEach(player => {
      player.voted = !player.voted;
    });
    // this.dialog.open(TaskCreateComponent);
  }

}
