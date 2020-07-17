import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() player: {
    idSocket: string;
    name: string;
    voted?: boolean;
  };

  constructor() { }

  ngOnInit(): void {
  }

}
