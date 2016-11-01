var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ImagesComponent } from './images/images.component';
import { ContainersComponent } from './containers/containers.component';
import { ContainersErrorComponent } from './containers-error/containers-error.component';
import { ContainersStoppedComponent } from './containers-stopped/containers-stopped.component';
import { ContainersRunningComponent } from './containers-running/containers-running.component';
import { MarketComponent } from './market/market.component';
import { MastheadComponent } from './masthead/masthead.component';
import { FooterComponent } from './footer/footer.component';
import { ImagesService } from './images/images.service';
import { ContainerService } from './containers/container.service';
import { AppService } from './app.service';
import { MarketService } from './market/market.service';
import { routing } from './app.routing';
export var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                AppComponent,
                NavbarComponent,
                ImagesComponent,
                ContainersComponent,
                ContainersErrorComponent,
                ContainersStoppedComponent,
                ContainersRunningComponent,
                MarketComponent,
                MastheadComponent,
                FooterComponent
            ],
            imports: [
                BrowserModule,
                FormsModule,
                HttpModule,
                routing
            ],
            providers: [
                ImagesService,
                ContainerService,
                AppService,
                MarketService
            ],
            bootstrap: [AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=../../../src/app/app.module.js.map