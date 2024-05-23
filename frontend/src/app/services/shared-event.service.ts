import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedEventService {
 
  private usersClickSubject = new Subject<void>();
  usersClick$ = this.usersClickSubject.asObservable();

  private cliClickSubject = new Subject<void>();
  cliClick$ = this.cliClickSubject.asObservable();

  private actClickSubject = new Subject<void>();
  actClick$ = this.actClickSubject.asObservable();

  private audClickSubject = new Subject<void>();
  audClick$ = this.audClickSubject.asObservable();

  emitUsersClick() {
    this.usersClickSubject.next();
  }

  emitCliClick() {
    this.cliClickSubject.next();
  }
  
  emitActClick() {
    this.actClickSubject.next();
  }

  emitAudClick() {
    this.audClickSubject.next();
  }
}
