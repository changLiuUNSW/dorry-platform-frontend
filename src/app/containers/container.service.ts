import { Injectable, Injector } from '@angular/core';
import { Headers, Http, Response, Request, RequestMethod, RequestOptions } from '@angular/http';
import { Container } from './container';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class ContainerService {
  // private origin = 'http://localhost:5000';
  private origin = 'http://192.168.10.84:5000';
  private paramRunning = '/containers/json?all=0';
  private paramStopped = '/containers/json?filters={"status":["exited"]}';
  private paramError = '/containers/json?filters={"status":["exited","dead","restarting"]}';
  private paramAll = '/containers/json?all=1';
  private toBeRemoved = '/containers/{id}?v=1?force=1';
  private toBeStopped = '/containers/{id}/stop?t=5';
  private toBeRestarted = '/containers/{id}/restart?t=5';

  constructor(private http: Http) { }


  // Function getRunningContainers() sends http GET request and asynchronously
  // obtains running containers.
  //
  // @param      None
  // @returns    Promise<Container[]>
  getRunningContainers(): Promise<Container[]> {
    return this.http.request(
      new Request({
        method: RequestMethod.Get,
        url: this.origin + this.paramRunning
      }))
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  // Function getStoppedContainers() sends http GET request and asynchronously
  // obtains stopped containers.
  //
  // @param      None
  // @returns    Observable<Container[]>
  getStoppedContainers(): Observable<Container[]> {
    return this.http.request(
      new Request({
        method: RequestMethod.Get,
        url: this.origin + this.paramStopped
      }))
      .map(this.extractData)
      .catch(this.handleError);
  }


  // Function getErrorContainers() sends http GET request and asynchronously
  // obtains error containers.
  //
  // @param      None
  // @returns    Promise<Container[]>
  getErrorContainers(): Promise<Container[]> {
    return this.http.request(
      new Request({
        method: RequestMethod.Get,
        url: this.origin + this.paramError
      }))
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  // Function getAllContainers() sends http GET request and asynchronously
  // obtains all containers.
  //
  // @param      None
  // @returns    Promise<Container[]>
  getAllContainers(): Promise<Container[]> {
    return this.http.request(
      new Request({
        method: RequestMethod.Get,
        url: this.origin + this.paramAll
      }))
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }


  // Function removeContainer() sends http DELETE request and asynchronously
  // remove the container with specified id.
  //
  // @param      {string} id
  // @returns    None
  removeContainer(id: string) {
    return this.http.request(
      new Request({
        method: RequestMethod.Delete,
        url: this.origin + this.toBeRemoved.replace("{id}", id)
      }))
      .toPromise();
  }

  // Function stopContainer() sends http POST request and asynchronously
  // stop the container with specified id.
  //
  // @param      {string} id
  // @returns    None
  stopContainer(id: string) {
    return this.http.request(
      new Request({
        method: RequestMethod.Post,
        url: this.origin + this.toBeStopped.replace("{id}", id)
      }))
      .toPromise();
  }

  // Function restartContainer() sends http POST request and asynchronously
  // restart the container with specified id.
  //
  // @param      {string} id
  // @returns    None
  restartContainer(id: string) {
    return this.http.request(
      new Request({
        method: RequestMethod.Post,
        url: this.origin + this.toBeRestarted.replace("{id}", id)
      }))
      .toPromise();
  }

  // Function extractData() extracts the data from the http response, which is
  // a json array, then return as an object.
  //
  // @param      {Response} res
  // @returns    None
  private extractData(res: Response) {
    // console.log(res.toString());
    let body = res.json();
    // console.log(res.json());
    return body;
  }

  // Function handleError() takes error at run time if exists, then it prints
  // out debug messages on the browser console.
  //
  // @param      {any} error
  // @returns    None
  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Promise.reject(errMsg);
  }
}
