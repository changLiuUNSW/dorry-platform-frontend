import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { Headers, Http, Response, Request, RequestMethod, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ConfigObject } from './configObject';
import { Constant } from './constant';

@Injectable()
export class ConfigService {
  private configObject: ConfigObject;

  constructor(private http: Http) {

  }

  load(): Promise<ConfigObject> {
    // return this.http.get('/assets/config/env.json').toPromise()
    //   .then(data => {
    //     this.configObject = data.json();
    //     Constant.initConfig(this.configObject);
    //   });
    var promise = this.http.get('/assets/config/env.json').map(res => res.json()).toPromise();
    promise.then(site => {
      this.configObject = site;
      Constant.initConfig(this.configObject);
    });
    return promise;
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
