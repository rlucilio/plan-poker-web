import { Injectable } from '@angular/core';
import { RoomGatewayService } from 'src/app/shared/services/room-gateway/room-gateway.service';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface ICreateRoomModel {
  nameOwner: string;
  nameRoom: string;
}

@Injectable()
export class CreateRoomUsecaseService {

  constructor(
    private roomGateway: RoomGatewayService
  ) { }

  execute(createRoomModel: ICreateRoomModel): Observable<{create: boolean}> {
    return this.roomGateway.createRoom({
      name: createRoomModel.nameRoom,
      owner: createRoomModel.nameOwner
    }).pipe(
      tap(response => localStorage.setItem('room', JSON.stringify(response))),
      map(() => ({create: true}))
    );
  }
}
