import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdlModule } from 'angular2-mdl';
import { Location, LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { ImagesComponent } from './images/images.component';
import { MarketComponent } from './market/market.component';
import { MastheadComponent } from './masthead/masthead.component';
import { FooterComponent } from './footer/footer.component';

import { ConfigService } from './config.service';
import { ImagesService } from './images/images.service';
import { ServicesService } from './services/services.service';
import { ApplicationsService } from './applications/applications.service';
import { AppService } from './app.service';
import { MarketService } from './market/market.service';
import { LoginService } from './login/login.service';
import { LoginDataService } from './login/logindata.service';
import { routing } from './app.routing';

import { AuthGuard } from './authguard/auth.guard';

// Third party
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { LoginComponent } from './login/login.component';
import { ServicesComponent } from './services/services.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { ApplicationDetailsComponent } from './application-details/application-details.component';
import { ApplicationsComponent } from './applications/applications.component';

@NgModule({
  declarations: [
    AppComponent,
    ImagesComponent,
    MastheadComponent,
    MarketComponent,
    FooterComponent,
    LoginComponent,
    ServicesComponent,
    ServiceDetailsComponent,
    ApplicationDetailsComponent,
    ApplicationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MdlModule,
    routing,
    ToastModule
  ],
  providers: [
    LoginDataService,
    AuthGuard,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: (config: ConfigService) => () => config.load(),
      deps: [ConfigService],
      multi: true
    },
    ImagesService,
    ServicesService,
    ApplicationsService,
    AppService,
    MarketService,
    LoginService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
