import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicesComponent } from './services/services.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { ApplicationDetailsComponent } from './application-details/application-details.component';
import { ImagesComponent } from './images/images.component';
import { MarketComponent } from './market/market.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './authguard/auth.guard';

//File: app.routing.ts
// 
//Define routing of dorry web
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/services',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'services',
    component: ServicesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'service/:name',
    component: ServiceDetailsComponent
  },
  {
    path: 'applications',
    component: ImagesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'application/:id',
    component: ApplicationDetailsComponent
  },
  {
    path: 'market',
    component: MarketComponent,
    canActivate: [AuthGuard],
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
