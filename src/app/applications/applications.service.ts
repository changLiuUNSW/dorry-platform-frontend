import { Injectable } from '@angular/core';
import { Headers, Http, Response, Request, RequestMethod, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Constant } from '../constant';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

ApplicationsService

// call dorry platform backend application api
// including:
// * get application details
@Injectable()
export class ApplicationsService {

  constructor(private http: Http) { }

  //get application detail from backend api
  getApplicationDetail(id: string): Observable<Object[]> {
    return this.http.request(
      new Request({
        method: RequestMethod.Get,
        url: Constant.KUBE_API + '/getapplicationdetail/' + id
      }))
      .map(this.extractData);
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
