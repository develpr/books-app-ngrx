import { Routes } from '@angular/router';

import { ExchangePageComponent } from './containers/exchange-page';
import { AuthenticationPageComponent } from './containers/authentication-page';
import { NotFoundPageComponent } from './containers/not-found-page';

export const routes: Routes = [
  {
    path: '',
    component: ExchangePageComponent
  },
  {
    path: 'authenticate',
    component: AuthenticationPageComponent
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];
