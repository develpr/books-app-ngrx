import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../reducers';
import * as account from '../actions/account';

import { Account } from '../models/account';
import { Credentials } from '../models/credentials';

@Component({
  selector: 'authentication-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>Authentication</div>
    <login-form (login)="login($event)" 
        [authenticating]="authenticating$ | async"
        [error]="error$ | async"></login-form>
  `
})
export class AuthenticationPageComponent { 

    authenticating$: Observable<boolean>;
    account$: Observable<Account>;
    error$: Observable<Response>;

    constructor(private store: Store<fromRoot.State>) {
        this.account$ = store.select(fromRoot.getAccount);    
        this.authenticating$ = store.select(fromRoot.getAuthenticating);         
        this.error$ = store.select(fromRoot.getError);            
    }

    login(credentials: Credentials) {
        this.store.dispatch(new account.LoginAction(credentials));
    }

}
