import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, switchMap, map, catchError, tap, first } from 'rxjs/operators';
import { RoomProviderService, IGetRoomResponse } from './room-provider.service';
import { of } from 'rxjs';

@Injectable()
export class RoomValidatorsService  {

  constructor(
    private roomProvider: RoomProviderService
  ) { }

  verifyRoomExist() {
    return (control: AbstractControl) => control
      .valueChanges
      .pipe(debounceTime(500))
      .pipe(switchMap((room: string) => this.roomProvider.getRoom(room.replace(/ /g, '_'))))
      .pipe(catchError(() => null))
      .pipe(map((room: IGetRoomResponse | null) => room ? { roomExist: true } : null));
  }

  verifyRoomNotExist() {
    return (control: AbstractControl) => control
      .valueChanges
      .pipe(debounceTime(500))
      .pipe(switchMap((room: string) => this.roomProvider.getRoom(room.replace(/ /g, '_'))))
      .pipe(catchError(() => of(null)))
      .pipe(map((room: IGetRoomResponse | null) => !room ? { roomNotExist: true } : null))
      .pipe(first());
  }
}
