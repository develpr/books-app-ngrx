import { Routes } from '@angular/router';

import { ExchangePageComponent } from './containers/exchange-page';
import { AuthenticationPageComponent } from './containers/authentication-page';
import { NotFoundPageComponent } from './containers/not-found-page';
import { LoggedInGuard } from './guards/logged-in';

export const routes: Routes = [
  {
    path: '',
    component: ExchangePageComponent,
    canActivate: [LoggedInGuard]
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
