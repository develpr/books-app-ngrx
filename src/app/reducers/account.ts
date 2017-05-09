import * as account from '../actions/account';
import { Account } from '../models/account';


export interface State {
  account: Account,
  loggedIn: boolean,
  authenticating: boolean,
  loading: boolean,
  loaded: boolean,
  error: any,
};

const initialState: State = {
  account: null,
  loggedIn: false,
  loading: false,
  loaded: false,
  authenticating: false,
  error: null
};

export function reducer(state = initialState, action: account.Actions): State {
  switch (action.type) {
    case account.ActionTypes.LOGIN: {
      const credentials = action.payload;
      console.info("reducer called for login");
      return Object.assign({}, state, {
        authenticating: true,
        error: null
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
        loading: false,
        loaded: false,
        error:null
      };
    }

    case account.ActionTypes.UPDATE: {
      let account = action.payload; 
      console.info("update reducer called with", account);
      return {
        account: account,
        loggedIn: account,
        authenticating: false,
        loading: false,
        loaded: true,
        error:null
      };
    }

    case account.ActionTypes.FETCH_ACCOUNT: {
      const account = action.payload;

      //todo: set some sort of global loading state?
      return Object.assign({}, state);
    }

    case account.ActionTypes.SET_ACCOUNT: {
      const account = action.payload;
      return Object.assign({}, state, {
          account: account,
          loggedIn: true,
          loaded: true,
          loading: false,
          authenticating: false,
          error:null
      });
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
