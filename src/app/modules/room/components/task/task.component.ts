import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IRoom } from 'src/app/shared/models/room';
import { IGetLastTask, RoomProviderService } from 'src/app/shared/services/room/room-provider.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent implements OnInit {
  infoRoom: IRoom;
  task: IGetLastTask;

  constructor(
    private storage: StorageService,
    private roomProvider: RoomProviderService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.infoRoom = this.storage.getObject<IRoom>('room');

    this.roomProvider.getLastTask(this.infoRoom.roomName)
    .pipe(catchError(() => of({title: 'Crie uma nova task, para começar...'} as IGetLastTask)))
    .subscribe(task => {
      this.task = task;
      this.cdr.detectChanges();
    });
  }

}
