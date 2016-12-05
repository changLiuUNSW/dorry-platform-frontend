import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { Location, LocationStrategy, HashLocationStrategy, PathLocationStrategy} from '@angular/common';

import { AppComponent } from './app.component';
import { ImagesComponent } from './images/images.component';
import { ContainersComponent } from './containers/containers.component';
import { ContainersErrorComponent } from './containers-error/containers-error.component';
import { ContainersStoppedComponent } from './containers-stopped/containers-stopped.component';
import { ContainersRunningComponent } from './containers-running/containers-running.component';
import { ContainerDetailsComponent } from './container-details/container-details.component';
import { MarketComponent } from './market/market.component';
import { MastheadComponent } from './masthead/masthead.component';
import { FooterComponent } from './footer/footer.component';
import { JQueryTestComponent } from './j-query-test/j-query-test.component';

import { ConfigService } from './config.service';
import { ImagesService } from './images/images.service';
import { ContainerService } from './containers/container.service';
import { AppService } from './app.service';
import { MarketService } from './market/market.service'
import { routing } from './app.routing';

//third-part plugin
import { PopoverModule } from 'ng2-popover';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

@NgModule({
  declarations: [
    AppComponent,
    ImagesComponent,
    ContainersComponent,
    ContainersErrorComponent,
    ContainersStoppedComponent,
    ContainersRunningComponent,
    MarketComponent,
    MastheadComponent,
    FooterComponent,
    JQueryTestComponent,
    ContainerDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    routing,
    PopoverModule,
    ToastModule
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: (config: ConfigService) => () => config.load(),
      deps: [ConfigService],
      multi: true
    },
    ImagesService,
    ContainerService,
    AppService,
    MarketService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
