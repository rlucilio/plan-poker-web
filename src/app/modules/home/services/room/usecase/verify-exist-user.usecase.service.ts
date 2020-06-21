import { Injectable } from '@angular/core';
import { RoomGatewayService } from 'src/app/shared/services/room-gateway/room-gateway.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class UsecaseService {

  constructor(
    private roomGateway: RoomGatewayService
  ) { }

  execute(roomName: string, userName: string): Observable<boolean> {
    return this.roomGateway.findRoom(roomName).pipe(
      map(res => !!res.users.find(user => user.name === userName)),
      catchError(() => of(false))
    );
  }
}
