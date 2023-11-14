import { Component, Inject } from '@angular/core';
import { MessageModel, MessageSeverity } from './aiq-message.service';
import { OVERLAY_DATA } from "../overlay";

@Component({
  selector: 'aiq-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {

  iconsPerSeverity: Record<MessageSeverity, string> = {
    [MessageSeverity.SUCCESS]: 'check_circle',
    [MessageSeverity.ERROR]: 'error',
    [MessageSeverity.INFO]: 'info',
    [MessageSeverity.WARNING]: 'warning'
  }

  constructor(@Inject(OVERLAY_DATA) public message: MessageModel) {
  }

}
