import { Component, ViewContainerRef } from '@angular/core';
import { ConfigService } from './config.service';
import { ConfigObject } from './configObject';
import { Constant } from './constant';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private configService: ConfigService, public toastr: ToastsManager, vRef: ViewContainerRef, private router: Router) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  ngOnInit() {
    window.open(Constant.REGISTRYADDR);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login'], { queryParams: { returnUrl: "" } });
  }
}
