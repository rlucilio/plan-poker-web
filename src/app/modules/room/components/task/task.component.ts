import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IRoom } from 'src/app/shared/models/room';
import { IGetLastTask } from 'src/app/shared/services/room/models/provider-room-responses';
import { RoomProviderService } from 'src/app/shared/services/room/room-provider.service';
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

  @Output()
  changeTask = new EventEmitter<IGetLastTask>();

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
      this.task.title = this.task.title.replace(/_/g, ' ');
      this.infoRoom.task = {
        id: task.id
      };
      this.storage.setObject('room', this.infoRoom);
      this.cdr.detectChanges();
      this.changeTask.emit(task);
    });
  }

}
