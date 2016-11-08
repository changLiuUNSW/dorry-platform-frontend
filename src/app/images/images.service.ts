import { Injectable, Injector } from '@angular/core';
import { Headers, Http, Response, Request, RequestMethod, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ImageInfo } from './imageInfo';
import { MAGIC_BOXES } from './MagicBox';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Constant } from '../constant';

@Injectable()
export class ImagesService {
  private address = Constant.DAEMONADDR;

  //docker remote api part
  private list = '/images/json?all=0';//[GET]  list images
  private remove = '/images/{id}?force=1';//[DELETE]  remove image ,add image id after the url
  private inspect = '/images/{id}/json';//[GET] inspect image;
  private create = '/containers/create';
  private start = '/containers/{id}/start';

  constructor(private http: Http) { }

  //get all image infoes from docker daemon
  getImageInfoes() {
    return this.http.request(
      new Request({
        method: RequestMethod.Get,
        url: this.address + this.list
      }))
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  //remove image by image id
  removeImage(id: string) {
    return this.http.delete(this.address + this.remove.replace("{id}", id))
      .toPromise()
      .then(
      //this.getRemoveImageResMsg,
      this.extractData
      )
    //.catch(this.handleError);
  }

  //inspect image by image id
  //get the json object after call the function
  //the create form : 2016-09-23T16:29:57.276868291Z
  inspectImage(id: string) {
    return this.http.get(this.address + this.inspect.replace("{id}", id))
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  //get remove image response code
  //reponse code:
  //200 - no error
  //404 - no such image
  //409 - conflict
  //500 - server error
  //   getRemoveImageResMsg(res: Response) {
  //     if (res.status) {
  //       console.log(res.status);
  //       return "Remove the app successfully";
  //     }
  //     else {
  //       return res.json();
  //     }
  // }

  // Create a container
  createContainer(id: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    console.log(id);
    console.log(MAGIC_BOXES[id]);
    return this.http.post((this.address + this.create), MAGIC_BOXES[id], options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  // Start a container
  startContainer(id: string) {
    return this.http.post((this.address + this.start.replace('{id}', id)), {})
      .map(this.extractData)
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
    console.error(">>>>>>>>>>" + errMsg + "<<<<<<<<<<<"); // log to console instead
    return Promise.reject(errMsg);
  }
}
