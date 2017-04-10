import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ComponentsModule } from './components';
// import { Http, Headers, RequestOptions } from '@angular/http';

import { AppComponent } from './containers/app';
import { AuthenticationPageComponent } from './containers/authentication-page';
import { ExchangePageComponent } from './containers/exchange-page';
import { NotFoundPageComponent } from './containers/not-found-page';

import { AccountService } from './services/account';
import { ConfigurationService } from './services/config';

import { EffectsModule } from '@ngrx/effects';

import { AccountEffects } from './effects/account';

import { HttpClient } from './http/http-client';

import { routes } from './routes';
import { reducer } from './reducers';


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ComponentsModule,    
    HttpModule,
    RouterModule.forRoot(routes, { useHash: true }),

    /**
     * StoreModule.provideStore is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.provideStore(reducer),


    EffectsModule.run(AccountEffects),


    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    StoreDevtoolsModule.instrumentOnlyWithExtension()

  ],
  declarations: [
    AppComponent,
    AuthenticationPageComponent,
    ExchangePageComponent,
    NotFoundPageComponent
  ],
  providers: [    
    AccountService,
    ConfigurationService,
    HttpClient
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
