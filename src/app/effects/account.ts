import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';
import { go } from '@ngrx/router-store';

import { AccountService } from '../services/account';
import * as account from '../actions/account';

import { Account } from '../models/account';


/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 * The `toPayload` helper function returns just
 * the payload of the currently dispatched action, useful in
 * instances where the current state is not necessary.
 *
 * Documentation on `toPayload` can be found here:
 * https://github.com/ngrx/effects/blob/master/docs/api.md#topayload
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class AccountEffects {

  // @Effect()
  // login$: Observable<Action> = this.actions$
  //   .ofType(account.ActionTypes.LOGIN)
  //   .map(toPayload)
  //   .switchMap(credentials => {      
  //     return this.accountService.login(credentials)
  //   }).concatMap(
  //     accountResult => {
  //       return [
  //         new account.CompleteLoginAction(accountResult),
  //         go('/')
  //       ]
  //     }
  //   ).catch(function(error) {        
  //     return of(new account.AuthenticationErrorAction(error.json()))
  //   })
  
  @Effect()
  login$: Observable<Action> = this.actions$
    .ofType(account.ActionTypes.LOGIN)
    .map(toPayload)
    .switchMap(credentials => {
      return this.accountService.login(credentials)
        .concatMap(
        accountResult => {          
          return [            
            new account.CompleteLoginAction(accountResult),            
            new account.FetchAccountAction(),
            go('/')
          ]
        }
        ).catch(function (error) {
          return of(new account.AuthenticationErrorAction(error.json()))
        })
    })

  @Effect()
  logout$: Observable<Action> = this.actions$
    .ofType(account.ActionTypes.LOGOUT)
    .map(toPayload)
    .switchMap(credentials => {
      return this.accountService.logout()
        .concatMap(
        result => {
          return [
            go('/authenticate')
          ]
        }
        ).catch(function (error) {
          return of(new account.AuthenticationErrorAction(error.json()))
        })
    })

  @Effect()
  fetchAccount$: Observable<Action> = this.actions$
    .ofType(account.ActionTypes.FETCH_ACCOUNT)
    .map(toPayload)
    .switchMap(options => {
      return this.accountService.getAccount()
        .concatMap(
        accountResult => {          
          return [
            new account.SetAccountAction(accountResult)            
          ]
        }
        ).catch(function (error) {          
          return of(new account.AuthenticationErrorAction(error.json()))
        })
    })

  @Effect()
  updateAccount$: Observable<Action> = this.actions$
    .ofType(account.ActionTypes.UPDATE)
    .debounceTime(250)
    .map(toPayload)
    .switchMap(updatedAccount => {
      return this.accountService.updateAccount(updatedAccount)
        .concatMap(
        accountResult => {          
          return [
            new account.SetAccountAction(accountResult)            
          ]
        }
        ).catch(function (error) {          
          return of(new account.AuthenticationErrorAction(error.json()))
        })
    })

  constructor(private actions$: Actions, private accountService: AccountService) { }

}


/**
 *      
      .map(accountResult => new account.CompleteLoginAction(accountResult))    
      .catch(function(error) {        
        return of(new account.AuthenticationErrorAction(error.json()))
      });
 */