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

    public login(credentials:Credentials): Observable<string> {                
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
        let self = this;
        return this.httpClient.delete("oauth/tokens/mine");
    }

    public updateAccount(account: Account): Observable<Account> {

        console.info("updatedAccount in service called with account", account);
        
        let self = this;
        return this.httpClient.put("users/me", account)
        .map(function(res) { 
            return self.transform(res.json());                      
        })
    }

    /*
    * Load the profile of the currently authorized user
    */
    public getAccount(): Observable<Account> {       
        const self = this; 
        return this.httpClient.get(
            this.serviceEndpoint
        ).map(function(res){
            return self.transform(res.json());
        });
    }
    /*
    * Normalize results to known model for templating
    */
    private transform(response): Account {
        /*
        * Build an account from the defined model
        */
        let account: Account = {
            email: response.email,
            firstname: response.first_name,
            lastname: response.last_name
        }

        if(response.id) {
            account.id = response.id;
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
