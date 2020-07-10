import { Injectable } from '@angular/core';
import { SocketService } from '../socket/socket.service';
import { StorageService } from '../storage/storage.service';
import { EventsRoom } from './eventsRoom';
import { ToastrService } from 'ngx-toastr';
import { Subscription, Observable, ReplaySubject } from 'rxjs';
import { tap, map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private subjectConnect = new ReplaySubject<boolean>(1);
  events: Subscription[] = [];

  constructor(
    private socketService: SocketService,
    private storage: StorageService,
    private toast: ToastrService
  ) { }

  connect(room: string, nameUser?: string): Observable<boolean> {
    this.socketService.createConnectionRoom(room, nameUser);

    this.events.push(this.socketService.fromEvent(EventsRoom.returnRoom).subscribe(result => {
      console.log(result);
    }));

    this.events.push(this.socketService.fromEvent(EventsRoom.error_socket).subscribe(
      (result: { event: string; msg?: string, error: any, params: any }) => {
        this.sendError(result);
      }));

    this.events.push(this.socketService.fromEvent(EventsRoom.error).subscribe(
      (result: { event: string; error: any, params: any }) => {
        this.sendError(result);
      }));

    this.socketService.connect();
    this.subjectConnect.next(true);
    return this.subjectConnect.pipe(take(2));
  }

  get onConnectObserver(): Observable<boolean> {
    return this.subjectConnect.pipe(
      switchMap(() => this.socketService.fromEvent(EventsRoom.newObserver).pipe(
        tap((response: { msg: string, user: string, socketId: string }) => {
          this.storage.setObject(response.socketId, {
            id: response.socketId
          });
        }),
        map(response => !!response)
      ))
    );
  }

  get onConnectUser(): Observable<{ msg: string, user: string, socketId: string }> {
    return this.subjectConnect.pipe(
      switchMap(() => this.socketService.fromEvent(EventsRoom.joinRoom).pipe(
        tap((response: { msg: string, user: string, socketId: string }) => {
          this.storage.setObject(response.socketId, {
            id: response.socketId
          });
        }),
      ))
    );
  }

  private sendError(result: { event: string; error: any; params: any; }) {
    console.log('Event -> ', result.event);
    console.log('Error -> ', result.error);
    console.log('Params -> ', result.params);
    this.subjectConnect.error(result);

    if (result.event === 'Connect') { this.events.forEach(event => event.unsubscribe()); }
  }
}
