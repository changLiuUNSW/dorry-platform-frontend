import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicesComponent } from './services/services.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { ContainersComponent } from './containers/containers.component';
import { ImagesComponent } from './images/images.component';
import { MarketComponent } from './market/market.component';
import { ContainerDetailsComponent } from './container-details/container-details.component';
import { StartingFormComponent } from './starting-form/starting-form.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './authguard/auth.guard';

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
    path: 'services/:name',
    component: ServiceDetailsComponent
  },
  {
    path: 'applications',
    component: ImagesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'applications/:id',
    component: StartingFormComponent
  },
  {
    path: 'market',
    component: MarketComponent,
    canActivate: [AuthGuard],
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
