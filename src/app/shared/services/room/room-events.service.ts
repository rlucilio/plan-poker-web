import { Injectable } from '@angular/core';
import { SocketService } from '../socket/socket.service';
import { StorageService } from '../storage/storage.service';
import { EventsRoom } from './models/eventsRoom';
import { Subscription, Observable, ReplaySubject } from 'rxjs';
import { tap, map, switchMap, take } from 'rxjs/operators';
import { IRoom } from '../../models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomEventsService {
  private subjectConnect = new ReplaySubject<boolean>(1);
  events: Subscription[] = [];

  constructor(
    private socketService: SocketService,
    private storage: StorageService,
  ) { }

  connect(room: string, nameUser?: string): Observable<boolean> {
    this.socketService.createConnectionRoom(room, nameUser);
    this.events.forEach(event => event.unsubscribe());


    let roomStorage = this.storage.getObject<IRoom>('room');

    if (!roomStorage) {
      roomStorage = {
        roomName: room
      };
    }
    this.storage.setObject('room', roomStorage);

    this.events.push(this.socketService.fromEvent(EventsRoom.error_socket).subscribe(
      (result: { event: string; msg?: string, error: any, params: any }) => {
        this.sendError(result);
      }));

    this.events.push(this.socketService.fromEvent(EventsRoom.error).subscribe(
      (result: { event: string; error: any, params: any }) => {
        this.sendError(result);
      }));

    this.subjectConnect.next(true);
    return this.subjectConnect.pipe(take(2));
  }

  disconnect() {
    this.socketService.disconnect();
  }

  get onConnectObserver(): Observable<boolean> {
    return this.subjectConnect.pipe(
      switchMap(() => this.socketService.fromEvent(EventsRoom.newObserver).pipe(
        tap((response: { msg: string, user: string, socketId: string }) => {
          const room = this.storage.getObject<IRoom>('room');

          room.user = {
            socketID: response.socketId
          };

          this.storage.setObject('room', room);

        }),
        map(response => !!response)
      ))
    );
  }

  get onConnectUser(): Observable<{ msg: string, user: string, socketId: string }> {
    return this.subjectConnect.pipe(
      switchMap(() => this.socketService.fromEvent(EventsRoom.joinRoom).pipe(
        tap((response: { msg: string, user: string, socketId: string }) => {
          const room = this.storage.getObject<IRoom>('room');

          room.user = {
            name: response.user,
            socketID: response.socketId
          };

          this.storage.setObject('room', room);
        }),
      ))
    );
  }

  private sendError(result: any) {
    this.storage.clear();
    console.log('Error -> ', result);
    this.subjectConnect.error(result);

    if (result.event === 'Connect') { this.events.forEach(event => event.unsubscribe()); }
  }
}
