import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { WebSocketService } from './app/web-socket.service';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h1>Hello </h1>
    <button (click)="start()">啟動webSocket</button>
  `,
})
export class App {
  name = 'Angular';

  messageCount = 0
  constructor(public socketService: WebSocketService) { }

  start() {
    this.socketService.createObservableSocket('ws://localhost:8000')
    .pipe(map(event => JSON.parse(event))
    )
    .subscribe(
        event => this.messageCount = event.messageCount
      )
  }

}

bootstrapApplication(App);
