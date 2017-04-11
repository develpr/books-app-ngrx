import * as account from '../actions/account';
import { Account } from '../models/account';


export interface State {
  account: Account,
  loggedIn: boolean,
  authenticating: boolean,
  error: any,
};

const initialState: State = {
  account: null,
  loggedIn: false,
  authenticating: false,
  error: null
};

export function reducer(state = initialState, action: account.Actions): State {
  switch (action.type) {
    case account.ActionTypes.LOGIN: {
      const credentials = action.payload;
      
      return Object.assign({}, state, {
        authenticating: true
      });
    }

    case account.ActionTypes.LOGIN_ERROR: {
      const error = action.payload;
      
      return Object.assign({}, state, {
        error: error,
        loggedIn: false,
        authenticating: false
      });
    }

    case account.ActionTypes.COMPLETE_LOGIN: {  
      return Object.assign({}, state, {
        authenticating: false,
        loggedIn: true
      });
    }

    case account.ActionTypes.LOGOUT: {
      return {
        account:null,
        loggedIn: false,
        authenticating: false,
        error:null
      };
    }

    case account.ActionTypes.UPDATE: {
      const account = action.payload;

      return {
        account: account,
        loggedIn: account,
        authenticating: false,
        error:null
      };
    }

    default: {
      return state;
    }
  }
}


export const getId = (state: State) => state.account.id;

export const getName = (state: State) => state.account.firstname;

export const getAccount = (state: State) => state.account;

export const getAuthenticating = (state: State) => state.authenticating;

export const getError = (state: State) => state.error;
