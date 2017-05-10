import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../reducers';
import * as account from '../actions/account';

import { Account } from '../models/account';

@Component({
  selector: 'exchange-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>Exhange Page</div>
    <div (click)="logout()">logout</div>
    <account-configuration-text [account]="account$ | async" (accountUpdate)="updateAccount($event)"></account-configuration-text>
  `
})
export class ExchangePageComponent { 
    
  account$: Observable<Account>;
  error$: Observable<Response>;

  constructor(private store: Store<fromRoot.State>) {
    console.info("fetching account in constructor");
    
    this.store.dispatch(new account.FetchAccountAction);
    this.account$ = store.select(fromRoot.getAccount);    
  }

  updateAccount(updatedAccount: Account) {
    console.info("container updateAccout", updatedAccount);
    this.store.dispatch(new account.UpdateAction(updatedAccount));
  }

  logout() {
    this.store.dispatch(new account.LogoutAction());
  }

}
