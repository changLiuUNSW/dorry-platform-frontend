import { Injectable } from '@angular/core';
import { Headers, Http, Response, Request, RequestMethod, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Item } from './market';
import { Constant } from '../constant';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MarketService {
  private address = Constant.REGISTRYADDR
  private paramList = '/v2/_catalog';
  private tags = '/v2/{name}/tags/list';
  private manifest = '/v2/{name}/manifests/{ref}';
  private blob = '/v2/{name}/blobs/{digest}';

  constructor(private http: Http) { }

  listItems(): Observable<any> {
    return this.http
      .get(this.address + this.paramList)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getTags(name: string): Observable<any> {
    return this.http
      .get(this.address + this.tags.replace("{name}", name))
      .map(this.extractData)
      .catch(this.handleError);
  }

  pullManifest(name: string, ref: string): Observable<any> {
    return this.http
      .get(this.address + this.manifest.replace("{name}", name).replace("{ref}", ref))
      .map(this.extractData)
      .catch(this.handleError);
  }

  pullBlobs(name: string, digest: string): Observable<any> {
    // console.log(this.address + this.blob.replace("{name}", name).replace("{digest}", digest));
    return this.http
      .get(this.address + this.blob.replace("{name}", name).replace("{digest}", digest));
  }

  /***************************************************************************/

  delManifest(name: string, ref: string): Observable<any> {
    return this.http
      .delete(this.address + this.manifest.replace("{name}", name).replace("{ref}", ref))
      .map(this.extractData)
      .catch(this.handleError);
  }

  delBlobs(name: string, digest: string): Observable<any> {
    return this.http
      .delete(this.address + this.blob.replace("{name}", name).replace("{digest}", digest));
  }

  /***************************************************************************/

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
