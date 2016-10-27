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
import { routing } from './app.routing';

@NgModule({
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
    ContainerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
