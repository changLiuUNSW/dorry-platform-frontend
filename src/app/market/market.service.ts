import { Injectable } from '@angular/core';
import { Headers, Http, Response, Request, RequestMethod, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Item } from './market';
import { Constant } from '../constant';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MarketService {
  // private address = 'https://DorryCloud:5000';
  private address = Constant.REGISTRYADDR
  private paramList = '/v2/_catalog';

  constructor(private http: Http) { }

  listItems(): Observable<any> {
    let headers = new Headers();
    headers.append('Authorization', ' Basic ZG9ycnk6YWJjMTIzXw==');
    let options = new RequestOptions({ headers: headers });
    return this.http
      .get((this.address + this.paramList), options)
      .map(this.extractData)
      .catch(this.handleError);
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
