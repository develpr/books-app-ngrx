import { Action } from '@ngrx/store';
import { Account } from '../models/account';
import { Credentials } from '../models/credentials';
import { type } from '../utils';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
  LOGIN:           type('[Account] Login'),
  COMPLETE_LOGIN:  type('[Account] Login Complete'),
  LOGOUT:          type('[Account] Logout'),
  UPDATE:          type('[Account] Update'),
  LOGIN_ERROR:     type('[Account] Login Error'),
  FETCH_ACCOUNT:   type('[Account] Fetch Account'),
  SET_ACCOUNT:     type('[Account] Set Account'),
};


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class LoginAction implements Action {
  type = ActionTypes.LOGIN;

  constructor(public payload: Credentials) { }
}

export class CompleteLoginAction implements Action {
  type = ActionTypes.COMPLETE_LOGIN;

  constructor(public payload: string) { }
}

export class FetchAccountAction implements Action {
  type = ActionTypes.FETCH_ACCOUNT;

  constructor() { }
}

export class SetAccountAction implements Action {
  type = ActionTypes.SET_ACCOUNT;

  constructor(public payload: Account) { }
}

export class AuthenticationErrorAction implements Action {
  type = ActionTypes.LOGIN_ERROR;

  constructor(public payload: any) { }
}

export class LogoutAction implements Action {
  type = ActionTypes.LOGOUT;

  constructor(public payload: any) { }
}

export class UpdateAction implements Action {
  type = ActionTypes.UPDATE;

  constructor(public payload: Account) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = LoginAction
  | LogoutAction
  | UpdateAction
  | CompleteLoginAction
  | AuthenticationErrorAction;
