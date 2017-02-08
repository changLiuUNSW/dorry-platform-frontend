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
        url: Constant.KUBE_API + '/listapplication'
      }))
      .map(this.extractData)
      .catch(this.handleError);
  }

  //remove image by image name
  removeImage(name: string) {
    return this.http.request(
      new Request({
        method: RequestMethod.Post,
        url: Constant.KUBE_API + '/deleteapplication',
        body: {
          'name': name
        }
      }))
      .map(this.extractData)
  }

  //inspect image by image id
  //get the json object after call the function
  //the create form : 2016-09-23T16:29:57.276868291Z
  inspectImage(id: string) {
    return this.http.request(
      new Request({
        method: RequestMethod.Get,
        url: Constant.DORRYAPI + '/api/images/inspect/' + id
      }))
      .map(this.extractData)
  }

  // get remove image response code
  // reponse code:
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

  //start an application
  startImage(name: string) {
    return this.http.request(
      new Request({
        method: RequestMethod.Post,
        url: Constant.KUBE_API + '/startapplication',
        body: {
          "name": name
        }
      }))
    //.map(this.extractData)
  }

  getData(id: string) {
    return this.http.request(
      new Request({
        method: RequestMethod.Get,
        url: Constant.DORRYAPI + '/api/images/db/' + id,
      }))
      .map(this.extractData)
  }

  startWithConfig(config: Object) {
    console.log(config);
    return this.http.request(
      new Request({
        method: RequestMethod.Post,
        url: Constant.DORRYAPI + '/api/images/db/startwithconfig',
        body: config
      }))
      .map(this.extractData)
  }

  saveConfig(profile: Object, image_id: string) {
    console.log(profile, image_id);
    return this.http.request(
      new Request({
        method: RequestMethod.Post,
        url: Constant.DORRYAPI + '/api/images/db/saveconfig',
        body: {
          'profile': profile,
          'image_id': image_id
        }
      }))
      .map(this.extractData)
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
