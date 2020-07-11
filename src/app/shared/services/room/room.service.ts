import { ErrorHandler, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ICreateRoomRequest, RoomProviderService } from './room-provider.service';

interface ICreateRoom {
  room: {
    nameRoom: string;
    observables: boolean;
    description: string;
  };
  task: {
    history: boolean;
    timeForTimeout: number;
    timeout: boolean;
  };
  votes: {
    alterVotesAfter: boolean;
    autoFlip: boolean;
    typeVote: string;
  };
}
@Injectable()
export class RoomService {

  constructor(
    private roomProvider: RoomProviderService
  ) { }

  create(createRoom: ICreateRoom): Observable<boolean> {
    if (createRoom.task.timeout && !createRoom.task.timeForTimeout) { createRoom.task.timeForTimeout = 1; }

    const request: ICreateRoomRequest = {
      description: createRoom.room.description,
      name: createRoom.room.nameRoom,
      settingsRoom: {
        autoFlipCards: createRoom.votes.autoFlip,
        changeVoteAfterReveal: createRoom.votes.alterVotesAfter,
        enableFlipCardsTimeout: createRoom.task.timeout,
        enableObserver: createRoom.room.observables,
        keepHistory: createRoom.task.history,
        timeoutFlipCards: (createRoom.task.timeForTimeout * 60000),
        typeRoom: createRoom.votes.typeVote
      }
    };

    return this.roomProvider.createRoom(request)
    .pipe(catchError(error => {
      console.log(error);
      return throwError(error);
    }))
    .pipe(map(room => !!room));
  }
}
