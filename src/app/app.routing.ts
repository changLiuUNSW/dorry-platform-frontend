import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContainersComponent } from './containers/containers.component';
import { ImagesComponent } from './images/images.component';
import { MarketComponent } from './market/market.component';
import { ContainerDetailsComponent } from './container-details/container-details.component';
import { StartingFormComponent } from './starting-form/starting-form.component';
import { LoginComponent } from './login/login.component';

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
    component: ContainersComponent
  },
  {
    path: 'services/:id',
    component: ContainerDetailsComponent
  },
  {
    path: 'apps',
    component: ImagesComponent
  },
  {
    path: 'apps/:id',
    component: StartingFormComponent
  },
  {
    path: 'market',
    component: MarketComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
