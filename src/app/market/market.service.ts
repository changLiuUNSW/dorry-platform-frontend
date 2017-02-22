import { Injectable } from '@angular/core';
import { Headers, Http, Response, Request, RequestMethod, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Constant } from '../constant';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MarketService {

  constructor(private http: Http) { }

  NgOninit() {
  }

  listApplication(): Observable<any> {
    return this.http
      .get(Constant.KUBE_API + '/listmarketapplication')
      .map(this.extractData)
      .catch(this.handleError);
  }

  downloadApplication(id: string): Observable<any> {
    return this.http
      .get(Constant.KUBE_API + '/downloadapplication/' + id)
      .map(res => res);
  }

  // pullImage(name: string, tag: string, image: Object): Observable<any> {
  //   console.log(name, tag, image);
  //   return this.http.request(
  //     new Request({
  //       method: RequestMethod.Post,
  //       url: Constant.DORRYAPI + '/api/registry/pull/' + name + '/' + tag,
  //       body: image
  //     }))
  //     .map(this.extractData)
  // }

  // Function extractData() extracts the data from the http response, which is
  // a json array, then return as an object.
  //
  // param      {Response} res
  // returns    None
  private extractData(res: Response) {
    // console.log(res.toString());
    let body = res.json();
    // console.log(res.json());
    return body;
  }

  // Function handleError() takes error at run time if exists, then it prints
  // out debug messages on the browser console.
  //
  // param      {any} error
  // returns    None
  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Promise.reject(errMsg);
  }

}
