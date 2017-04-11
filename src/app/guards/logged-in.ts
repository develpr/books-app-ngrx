import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CanActivate, Router,
         ActivatedRouteSnapshot,
         RouterStateSnapshot } from '@angular/router';
import { ConfigurationService } from '../services/config';
import { go } from '@ngrx/router-store';
import * as fromRoot from '../reducers';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private router: Router,
              private store: Store<fromRoot.State>,
              private configService: ConfigurationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.configService.hasAuthToken()) {
      this.store.dispatch(go('/authenticate'));
      return false;
    }
    return true;
  }

}

