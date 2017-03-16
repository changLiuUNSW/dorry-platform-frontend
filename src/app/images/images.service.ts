import { Injectable, Injector } from '@angular/core';
import { Headers, Http, Response, Request, RequestMethod, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ImageInfo } from './imageInfo';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Constant } from '../constant';


@Injectable()
export class ImagesService {

  constructor(private http: Http) { }

  //Function: getImageInfoes
  //
  //Get all image infoes from docker daemon
  getImageInfoes() {
    return this.http.request(
      new Request({
        method: RequestMethod.Get,
        url: Constant.KUBE_API + '/listapplication'
      }))
      .map(this.extractData)
      .catch(this.handleError);
  }

  //Function: removeImage
  //
  //Remove image by image name
  removeImage(name: string) {
    return this.http.request(
      new Request({
        method: RequestMethod.Post,
        url: Constant.KUBE_API + '/deleteapplication',
        body: {
          'name': name
        }
      }))
      .map(res => res, err => err);
  }

  // Function: getRemoveImageResMsg
  //
  // Get remove image response code
  // Reponse code:
  // 200 - no error
  // 404 - no such image
  // 409 - conflict
  // 500 - server error
  getRemoveImageResMsg(res: Response) {
    if (res.status) {
      console.log(res.status);
      return "Remove the app successfully";
    }
    else {
      return res.json();
    }
  }

  //Function: startImage
  //
  //Start an application
  startImage(name: string) {
    return this.http.request(
      new Request({
        method: RequestMethod.Post,
        url: Constant.KUBE_API + '/startapplication',
        body: {
          "name": name
        }
      }))
      .map(res => res);
  }

  private extractData(res: Response) {
    let body = res.json();
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
