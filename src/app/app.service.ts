import { Injectable, Injector } from '@angular/core';
import { Headers, Http, Response, Request, RequestMethod, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Constant } from './constant';

@Injectable()
export class AppService {
  // private address: string = Constant.DAEMONADDR;
  private versionUrl: string = "/version";

  constructor(private http: Http) { }

  //get docker daemon version
  getVersion() {
    return this.http.request(
      new Request({
        method: RequestMethod.Get,
        url: Constant.DAEMONADDR + this.versionUrl
      }))
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    // console.log(res.toString())
    let body = res.json();
    // console.log(res.json());
    return body;
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Promise.reject(errMsg);
  }
}
