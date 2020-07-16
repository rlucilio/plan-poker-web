import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoadingService } from 'src/app/shared/services/loading/loading.service';
import { TaskCreateComponent } from '../task-create/task-create.component';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private loading: LoadingService
  ) { }

  ngOnInit(): void {
    this.loading.hide();
  }

  addTask() {
    this.dialog.open(TaskCreateComponent);
  }

}
