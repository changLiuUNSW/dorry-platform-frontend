import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContainersComponent } from './containers/containers.component';
import { ImagesComponent } from './images/images.component';
import { MarketComponent } from './market/market.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/services',
    pathMatch: 'full'
  },
  {
    path: 'services',
    component: ContainersComponent
  },
  {
    path: 'apps',
    component: ImagesComponent
  },
  {
    path: 'market',
    component: MarketComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
