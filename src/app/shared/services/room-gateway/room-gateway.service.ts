import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface IBodyCreateRoom {
  owner: string;
  name: string;
}

@Injectable()
export class RoomGatewayService {

  constructor(
    private http: HttpClient
  ) { }

  createRoom(bodyCreateRoom: IBodyCreateRoom) {
    return this.http.post(`${environment.room_api.base_path}${environment.room_api.entrypoints.create_room}`, bodyCreateRoom);
  }
}
