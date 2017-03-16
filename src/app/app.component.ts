import { Component, ViewContainerRef } from '@angular/core';
import { ConfigService } from './config.service';
import { ConfigObject } from './configObject';
import { Constant } from './constant';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { LoginDataService } from './login/logindata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private user: Object;

  constructor(private loginDataService: LoginDataService, private configService: ConfigService, public toastr: ToastsManager, vRef: ViewContainerRef, private router: Router) {
    this.toastr.setRootViewContainerRef(vRef);
    this.loginDataService.loginMethodCalled$.subscribe(
      () => {
        this.getUser();
      }
    );
  }

  ngOnInit() {
    this.getUser();
  }

  // Function: logout
  // Logout user
  // Clean the user data from local storage.
  logout() {
    localStorage.clear();
    this.router.navigate(['/login'], { queryParams: { returnUrl: "" } });
    this.getUser();
  }

  // Get user object, include username and password
  getUser() {
    let userString = localStorage.getItem('currentUser');
    this.user = JSON.parse(userString);
  }
}
