import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-task-history',
  templateUrl: './task-history.component.html',
  styleUrls: ['./task-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskHistoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
