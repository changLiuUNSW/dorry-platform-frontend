import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/';

import { ConfigService } from './app/config.service';
import { ConfigObject } from './app/configObject';
import { Constant } from './app/constant';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
  // .then(() => {
  //
  //   let configService = new ConfigService(this._http);
  //   configService.load().then(data => {
  //     this.configObject = data;
  //     Constant.initConfig(this.configObject);
  //   });
  // });
