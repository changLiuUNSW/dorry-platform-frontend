import { Injectable } from '@angular/core';
import { Headers, Http, Response, Request, RequestMethod, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Item } from './market';
import { Constant } from '../constant';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MarketService {
  private address = Constant.REGISTRYADDR;
  private host = Constant.REGISTRYHOST;
  private pull = '/images/create?fromImage={registry_host}/{imagename}&tag={tag}';

  private paramList = '/v2/_catalog';
  private tags = '/v2/{name}/tags/list';

  constructor(private http: Http) { }

  listItems(): Observable<any> {
    return this.http
      .get(this.address + this.paramList)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getTags(item: Item): Observable<any> {
    return this.http
      .get(this.address + this.tags.replace("{name}", item.name))
      .map(this.extractData)
      .catch(this.handleError);
  }

  pullImage(name: string, tag: string): Observable<any> {
    console.log(name);
    return this.http
      .post(Constant.DAEMONADDR + this.pull.replace("{imagename}", name).replace("{tag}", tag).replace("{registry_host}", Constant.REGISTRYHOST), "")
    //.map(this.extractData)
    //.catch(this.handleError);
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
