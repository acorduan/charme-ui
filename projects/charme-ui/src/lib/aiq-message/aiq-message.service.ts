import { inject, Injectable } from '@angular/core';
import { MessageComponent } from './message.component';
import { DialogService } from "../overlay";

export enum MessageSeverity {
  ERROR = 'error',
  WARNING = 'warning',
  SUCCESS = 'success',
  INFO = 'info',
}

export interface MessageModel {
  title?: string;
  text: string;
  severity: MessageSeverity;
}

@Injectable({
  providedIn: 'root',
})
export class AiqMessageService {
  #overlay = inject(DialogService);

  add(message: MessageModel, time = 4000): void {
    this.#overlay.open(MessageComponent, {
      time,
      data: message,
      minWidth: '300px',
      maxWidth: '500px',
      position: {
        top: '25px',
        right: '25px',
      },
      disableClose: true,
      overlay: 'none',
    });
  }
}
