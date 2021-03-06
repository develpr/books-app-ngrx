import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/let';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { go } from '@ngrx/router-store';

import { AccountService } from '../services/account';
import * as fromRoot from '../reducers';
import * as account from '../actions/account';


/**
 * Guards are hooks into the route resolution process, providing an opportunity
 * to inform the router's navigation process whether the route should continue
 * to activate this route. Guards must return an observable of true or false.
 */
@Injectable()
export class AccountLoadedGuard implements CanActivate {
  constructor(
    private store: Store<fromRoot.State>,
    private accountService: AccountService,
    private router: Router
  ) { }

  /**
   * This method creates an observable that waits for the `loaded` property
   * of the collection state to turn `true`, emitting one time once loading
   * has finished.
   */
  waitForAccountToLoad(): Observable<boolean> {
    return this.store.select(fromRoot.getAccountLoaded)
      .filter(loaded => loaded)
      .take(1);
  }

  /**
   * This method checks if a book with the given ID is already registered
   * in the Store
   */
  accountInState(): Observable<boolean> {
    return this.store.select(fromRoot.getAccountLoaded).map(result => result)
      .take(1);
  }

  /**
   * This method loads a book with the given ID from the API and caches
   * it in the store, returning `true` or `false` if it was found.
   */
  loadAccount(): Observable<boolean> {
    return this.accountService.getAccount()
      .map(loadedAccount => new account.SetAccountAction(loadedAccount))
      .do((action: account.SetAccountAction) => this.store.dispatch(action))
      .map(account => !!account)
      .catch(() => {          
        this.store.dispatch(go('/authenticate'));
        return of(false);
      });
  }

  /**
   * `hasBook` composes `hasBookInStore` and `hasBookInApi`. It first checks
   * if the book is in store, and if not it then checks if it is in the
   * API.
   */
  accountLoaded(): Observable<boolean> {
    return this.accountInState()
      .switchMap(loaded => {
          
        if (loaded) {
          return of(loaded);
        }
        
        return this.loadAccount();
      });
  }

  /**
   * This is the actual method the router will call when our guard is run.
   *
   * Our guard waits for the collection to load, then it checks if we need
   * to request a book from the API or if we already have it in our cache.
   * If it finds it in the cache or in the API, it returns an Observable
   * of `true` and the route is rendered successfully.
   *
   * If it was unable to find it in our cache or in the API, this guard
   * will return an Observable of `false`, causing the router to move
   * on to the next candidate route. In this case, it will move on
   * to the 404 page.
   */
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {      
    return this.accountLoaded();
  }
}
