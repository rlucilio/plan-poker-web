import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-vote-card-user',
  templateUrl: './vote-card-user.component.html',
  styleUrls: ['./vote-card-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VoteCardUserComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
