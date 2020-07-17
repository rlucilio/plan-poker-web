import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

export declare type TypesCard = 'ballon' | 'sword' | 'littleFlower' | 'heart';


@Component({
  selector: 'app-vote-card',
  templateUrl: './vote-card.component.html',
  styleUrls: ['./vote-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VoteCardComponent implements OnInit {
  @Input() typeCard: TypesCard;
  @Input() value: number;
  @Input() hide: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
