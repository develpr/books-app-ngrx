import { Injectable, Input } from '@angular/core';
import { Account } from '../models/account';
import { ConfigurationService} from './config';
import { Credentials } from '../models/credentials';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '../http/http-client';


@Injectable()
export class AccountService {
    /*
    * Vars needed for various things
    */
    private serviceEndpoint = 'users/me';
    private headers = null;    
    /*
    * Injecting services for use later
    */
    constructor(
        private httpClient: HttpClient,
        private config:ConfigurationService
    ) {}

    public isLoggedIn() {
        let token = this.config.getAuthToken();

        if( token && token.length > 0 ) {
            return true;
        }

        return false;
    }

    public login(credentials:Credentials): Observable<Account> {        
        let self = this;
        return this.httpClient.post("oauth/tokens", credentials)
        .map(function(res) { 
            const result = res.json();
            const token = result && result.token ? result.token : null;
            self.config.setAuthToken(token)
            return result || null;
        })
    }

    public logout() {
        console.info("account logout..");
        let self = this;
        return this.httpClient.delete("oauth/tokens/mine");
    }

    /*
    * Load the profile of the currently authorized user
    */
    public getAccount() {        
        return this.httpClient.get(
            this.serviceEndpoint
        );
    }
    /*
    * Normalize results to known model for templating
    */
    private transform(response): Account {
        /*
        * Build an account from the defined model
        */
        let account: Account = {
            id: response.id,
            email: response.email,
            firstname: response.givenName,
            lastname: response.familyName
        }

        return account;
    }
    // /*
    // * Write changes to server from edit account section
    // */
    // public updateAccount(account: any) {
    //     /*
    //     * Get options from config service
    //     */
    //     var requestOptions = this.config.getAuthedRequestOptions();
    //     requestOptions.method = "PUT";

    //     return this.http.put(
    //         `${this.config.getBaseUrl() + this.serviceEndpoint}`,
    //         account,
    //         requestOptions
    //     ).toPromise().then(response => response);
    // }

}
