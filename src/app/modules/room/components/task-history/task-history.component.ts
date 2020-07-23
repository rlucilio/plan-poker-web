import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IRoom } from 'src/app/shared/models/room';
import { IGetHistoryTask, IGetLastTask } from 'src/app/shared/services/room/models/provider-room-responses';
import { RoomProviderService } from 'src/app/shared/services/room/room-provider.service';
import { StorageService } from 'src/app/shared/services/storage/storage.service';

@Component({
  selector: 'app-task-history',
  templateUrl: './task-history.component.html',
  styleUrls: ['./task-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHistoryComponent implements OnInit {
  infoRoom: IRoom;
  tasks: IGetHistoryTask[];

  constructor(
    private storage: StorageService,
    private roomProvider: RoomProviderService,
  ) { }

  ngOnInit(): void {
    this.infoRoom = this.storage.getObject<IRoom>('room');
  }

  get total(): number {
    return this.tasks?.reduce((valuePrev, task) => valuePrev += task.resultVoting,  0);
  }

  update() {
    this.roomProvider.getHistoryTasks(this.infoRoom.roomName)
      .pipe(catchError(() => of([])))
      .subscribe(tasks => {
        this.tasks = tasks;
      });
  }

}
