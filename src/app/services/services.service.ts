import { Injectable } from '@angular/core';
import { Headers, Http, Response, Request, RequestMethod, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Constant } from '../constant';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class ServicesService {

  constructor(private http: Http) { }

  listService(): Observable<Object[]> {
    return this.http.request(
      new Request({
        method: RequestMethod.Get,
        url: Constant.KUBE_API + '/list-service'
      }))
      .map(this.extractData);
  }

  deleteService(body: Object) {
    return this.http.request(
      new Request({
        method: RequestMethod.Post,
        url: Constant.KUBE_API + '/delete-service',
        body: body
      }))
      .map(res => res);
  }

  extractData(res: Response) {
    console.log("Response Status:" + res.status);
    let body = res.json();
    return body;
  }

  handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Promise.reject(errMsg);
  }

}
