import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root',
})
export class DasboardSocket {
  constructor() {}
  connect() : Observable<any> {
    // Socket.io connection logic can be implemented here
    return new Observable<any>((observer) => {
      let socket = io('http://localhost:3000');
      
      socket.on('scoreUpdate', (data: any) => {
        console.log("Punteggio aggiornato ricevuto: ", JSON.stringify(data));
        observer.next(data);
      });
      return () => {
        socket.disconnect();
      };
    });
  }
}
