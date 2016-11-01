var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Request, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { Constant } from '../constant';
export var ContainerService = (function () {
    function ContainerService(http) {
        this.http = http;
        this.address = Constant.DAEMONADDR;
        this.paramRunning = '/containers/json?all=0';
        this.paramStopped = '/containers/json?filters={"status":["exited"]}';
        this.paramError = '/containers/json?filters={"status":["exited","dead","restarting"]}';
        this.paramAll = '/containers/json?all=1';
        this.toBeRemoved = '/containers/{id}?v=1?force=1';
        this.toBeStopped = '/containers/{id}/stop?t=5';
        this.toBeRestarted = '/containers/{id}/restart?t=5';
    }
    ContainerService.prototype.getRunningContainers = function () {
        return this.http.request(new Request({
            method: RequestMethod.Get,
            url: this.address + this.paramRunning
        }))
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    ContainerService.prototype.getStoppedContainers = function () {
        return this.http.request(new Request({
            method: RequestMethod.Get,
            url: this.address + this.paramStopped
        }))
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    ContainerService.prototype.getErrorContainers = function () {
        return this.http.request(new Request({
            method: RequestMethod.Get,
            url: this.address + this.paramError
        }))
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    ContainerService.prototype.getAllContainers = function () {
        return this.http.request(new Request({
            method: RequestMethod.Get,
            url: this.address + this.paramAll
        }))
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    ContainerService.prototype.removeContainer = function (id) {
        return this.http.request(new Request({
            method: RequestMethod.Delete,
            url: this.address + this.toBeRemoved.replace("{id}", id)
        }))
            .toPromise();
    };
    ContainerService.prototype.stopContainer = function (id) {
        return this.http.request(new Request({
            method: RequestMethod.Post,
            url: this.address + this.toBeStopped.replace("{id}", id)
        }))
            .toPromise();
    };
    ContainerService.prototype.restartContainer = function (id) {
        return this.http.request(new Request({
            method: RequestMethod.Post,
            url: this.address + this.toBeRestarted.replace("{id}", id)
        }))
            .toPromise();
    };
    ContainerService.prototype.extractData = function (res) {
        var body = res.json();
        return body;
    };
    ContainerService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg);
        return Promise.reject(errMsg);
    };
    ContainerService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Http])
    ], ContainerService);
    return ContainerService;
}());
//# sourceMappingURL=../../../../src/app/containers/container.service.js.map