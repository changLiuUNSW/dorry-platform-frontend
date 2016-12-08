import { Component, ViewContainerRef } from '@angular/core';
import { ConfigService } from './config.service';
import { ConfigObject } from './configObject';
import { Constant } from './constant';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private configService: ConfigService, public toastr: ToastsManager, vRef: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vRef);
  }

  ngOnInit() {
    window.open(Constant.REGISTRYADDR);
  }
}
