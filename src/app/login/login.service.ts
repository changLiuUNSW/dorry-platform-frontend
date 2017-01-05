import { Injectable } from '@angular/core';
import { Headers, Http, Response, Request, RequestMethod, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Constant } from '../constant';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {

  constructor(private http: Http) { }

  NgOninit() {
  }

  login(username: string, password: string) {
    console.log(username, password);
    return this.http.request(
      new Request({
        method: RequestMethod.Post,
        url: Constant.DORRYAPI + '/users/login',
        body: {
          'username': username,
          'password': password
        }
      }))
      .map(this.extractData);
  }

  checkSession() {
    return this.http.request(
      new Request({
        method: RequestMethod.Get,
        url: Constant.DORRYAPI + '/users/session'
      }))
      .map(this.extractData);
  }

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
