var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Output } from '@angular/core';
import { ContainerService } from '../containers/container.service';
export var ContainersStoppedComponent = (function () {
    function ContainersStoppedComponent(containerService) {
        this.containerService = containerService;
        this.reloadEvent = new EventEmitter();
    }
    ContainersStoppedComponent.prototype.ngOnInit = function () {
        this.getStoppedContainers();
    };
    ContainersStoppedComponent.prototype.showNot = function (msg) {
        this.notState = true;
        this.notification = msg;
        setTimeout(function () {
            this.notState = false;
            this.isError = false;
        }.bind(this), 3000);
    };
    ContainersStoppedComponent.prototype.getStoppedContainers = function () {
        var _this = this;
        this.containerService.getStoppedContainers()
            .then(function (data) { return _this.containers = data; })
            .then(function (data) {
            _this.hasStoppedService = (_this.containers.length !== 0);
        });
    };
    ContainersStoppedComponent.prototype.restartContainer = function (id) {
        var _this = this;
        this.containerService.restartContainer(id)
            .then(function (data) { return _this.getStoppedContainers(); }, function (err) { return _this.errMsg(err.status); })
            .then(function (data) {
            if (!_this.isError) {
                _this.showNot("Service restarted");
            }
            setTimeout(function () {
                this.reloadEvent.emit(true);
            }.bind(_this), 300);
        });
    };
    ContainersStoppedComponent.prototype.errMsg = function (statusCode) {
        this.isError = true;
        if (statusCode == 404) {
            this.showNot("No such container");
        }
        else if (statusCode == 500) {
            this.showNot("Server error");
        }
    };
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], ContainersStoppedComponent.prototype, "reloadEvent", void 0);
    ContainersStoppedComponent = __decorate([
        Component({
            selector: 'app-containers-stopped',
            templateUrl: './containers-stopped.component.html',
            styleUrls: [
                './containers-stopped.component.css',
                '../containers/containers.component.css',
                '../app.component.css'
            ]
        }), 
        __metadata('design:paramtypes', [ContainerService])
    ], ContainersStoppedComponent);
    return ContainersStoppedComponent;
}());
//# sourceMappingURL=../../../../src/app/containers-stopped/containers-stopped.component.js.map