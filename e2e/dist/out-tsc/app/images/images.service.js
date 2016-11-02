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
import { Headers, Http, Request, RequestMethod, RequestOptions } from '@angular/http';
import { MAGIC_BOXES } from './MagicBox';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Constant } from '../constant';
export var ImagesService = (function () {
    function ImagesService(http) {
        this.http = http;
        this.address = Constant.DAEMONADDR;
        this.list = '/images/json?all=0';
        this.remove = '/images/{id}?force=1';
        this.inspect = '/images/{id}/json';
        this.create = '/containers/create';
        this.start = '/containers/{id}/start';
    }
    ImagesService.prototype.getImageInfoes = function () {
        return this.http.request(new Request({
            method: RequestMethod.Get,
            url: this.address + this.list
        }))
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    ImagesService.prototype.removeImage = function (id) {
        return this.http.delete(this.address + this.remove.replace("{id}", id))
            .toPromise()
            .then(this.getRemoveImageResMsg, this.extractData)
            .catch(this.handleError);
    };
    ImagesService.prototype.inspectImage = function (id) {
        return this.http.get(this.address + this.inspect.replace("{id}", id))
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    };
    ImagesService.prototype.getRemoveImageResMsg = function (res) {
        if (res.status) {
            console.log(res.status);
            return "Remove the app successfully";
        }
        else {
            return res.json();
        }
    };
    ImagesService.prototype.createContainer = function (name) {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        console.log(name);
        console.log(MAGIC_BOXES[name]);
        return this.http.post((this.address + this.create), MAGIC_BOXES[name], options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ImagesService.prototype.startContainer = function (id) {
        return this.http.post((this.address + this.start.replace('{id}', id)), {})
            .map(this.extractData)
            .catch(this.handleError);
    };
    ImagesService.prototype.extractData = function (res) {
        var body = res.json();
        return body;
    };
    ImagesService.prototype.handleError = function (error) {
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(">>>>>>>>>>" + errMsg + "<<<<<<<<<<<");
        return Promise.reject(errMsg);
    };
    ImagesService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Http])
    ], ImagesService);
    return ImagesService;
}());
//# sourceMappingURL=../../../../src/app/images/images.service.js.map