import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedEventService {
  private usersClickSubject = new Subject<void>();
  usersClick$ = this.usersClickSubject.asObservable();

  emitUsersClick() {
    this.usersClickSubject.next();
  }
}
