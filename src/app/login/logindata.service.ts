import { Injectable, EventEmitter } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class LoginDataService {
  private loginMethodCallSource = new Subject<any>();

  loginMethodCalled$ = this.loginMethodCallSource.asObservable();

  // Service message commands
  callComponentMethod() {
    this.loginMethodCallSource.next();
  }
}
