import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface IGetListTasksResponse {
  title: string;
  id: string;
}

export interface IGetRoomResponse {
  description: string;
  name: string;
  observers:
  {
    idSocket: string;
  }[]
  ;
  settingsRoom: {
    autoFlipCards: boolean;
    changeVoteAfterReveal: boolean;
    enableFlipCardsTimeout: boolean;
    enableObserver: boolean;
    keepHistory: boolean;
    timeoutFlipCards: number;
    typeRoom: string;
  };
  tasks:
  {
    description: string;
    id: string;
    title: string;
  }[];
  users:
  {
    idSocket: string;
    name: string;
  }[];
}

interface IGetUserResponse {
  name: string;
  id: string;
}

@Injectable()
export class RoomProviderService {

  constructor(
    private http: HttpClient
  ) { }

  getListTasks(room: string): Observable<IGetListTasksResponse[]> {
    return this.http.get<IGetListTasksResponse[]>(`${environment.api.baseUrl}${environment.api.tasks}/${room}`);
  }

  getRoom(room: string): Observable<IGetRoomResponse> {
    return this.http.get<IGetRoomResponse>(`${environment.api.baseUrl}${environment.api.room}/find/${room}`);
  }

  getUsers(room: string): Observable<IGetUserResponse[]> {
    return this.http.get<IGetUserResponse[]>(`${environment.api.baseUrl}/${environment.api.user}/${room}`);
  }
}
