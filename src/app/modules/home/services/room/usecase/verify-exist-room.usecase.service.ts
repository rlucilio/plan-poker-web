import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RoomGatewayService } from 'src/app/shared/services/room-gateway/room-gateway.service';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class VerifyExistRoomUsecaseService {

  constructor(
    private roomGateway: RoomGatewayService
  ) { }

  execute(roomName: string): Observable<boolean> {
    return this.roomGateway.findRoom(roomName).pipe(
      map(res => !!res),
      catchError(() => of(false))
    );
  }
}
