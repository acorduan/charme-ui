import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  id = crypto.randomUUID()

  closeOthers$ = new Subject<void>()
  onCloseOthers$ = this.closeOthers$.asObservable()
}
