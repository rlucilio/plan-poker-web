import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

interface IBodyCreateRoom {
  owner: string;
  name: string;
}

interface IResponseRoom {
  name: string;
  ownerName: string;
  expireInSeconds: number;
  users: Array<{
    name: string
  }>;
}

@Injectable()
export class RoomGatewayService {

  constructor(
    private http: HttpClient
  ) { }

  createRoom(bodyCreateRoom: IBodyCreateRoom): Observable<IResponseRoom> {
    return this
      .http
      .post<IResponseRoom>(`${environment.room_api.base_path}${environment.room_api.entrypoints.create_room}`, bodyCreateRoom);
  }

  findRoom(nameSession: string): Observable<IResponseRoom> {
    return this.http.get<IResponseRoom>(`${environment.room_api.base_path}${environment.room_api.entrypoints.find_room}/${nameSession}`);
  }
}
