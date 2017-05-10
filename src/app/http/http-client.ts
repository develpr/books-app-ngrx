import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable, Input } from '@angular/core';
import { ConfigurationService } from '../services/config';

@Injectable()
export class HttpClient {
    
    /*
    * Injecting services for use later
    */ 
    constructor(
        private http: Http,
        private config: ConfigurationService
    ) {
        
    }

    get(url: string, options?: RequestOptions) {
        let finalOptions = this.getRequestOptions();
        finalOptions.method = "GET";
        finalOptions = finalOptions.merge(options);
        return this.http.get(this.config.getBaseUrl() + url, this.getRequestOptions())
    }

    post(url: string, body: any, options?: RequestOptions) {
        let finalOptions = this.getRequestOptions();
        finalOptions.method = "POST";
        finalOptions = finalOptions.merge(options);
        return this.http.post(this.config.getBaseUrl() + url, body, this.getRequestOptions());
    }

    put(url: string, body: any, options?: RequestOptions) {
        let finalOptions = this.getRequestOptions();
        finalOptions.method = "PUT";
        finalOptions = finalOptions.merge(options);
        return this.http.put(this.config.getBaseUrl() + url, body, this.getRequestOptions());
    }

    delete(url: string, options?: RequestOptions) {
        let finalOptions = this.getRequestOptions();
        finalOptions.method = "DELETE";
        finalOptions = finalOptions.merge(options);
        return this.http.delete(this.config.getBaseUrl() + url, this.getRequestOptions());
    }

    private getRequestOptions() : RequestOptions {

        let headers  = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', 'application/json');
        if( this.config.getAuthToken() ) {
            headers.append("Authorization", "Bearer " + this.config.getAuthToken());
        }

        var requestOptions = new RequestOptions({
            headers: headers,
            withCredentials: true
        });

        return requestOptions;
        
    }

    // /*
    // * Load the profile of the currently authorized user
    // */
    // public getAccount() {
    //     /*
    //     * Get options from config service
    //     */
    //     var requestOptions = this.config.getAuthedRequestOptions();
    //     requestOptions.method = "GET";
    //     /*
    //     * Make request and transform response
    //     */
    //     return this.http.get(
    //         `${this.config.getBaseUrl() + this.serviceEndpoint}`,
    //         requestOptions
    //     ).toPromise().then(
    //         response => this.transform(response.json())
    //     );
    // }
    // /*
    // * Normalize results to known model for templating
    // */
    // private transform(response): AccountModel {
    //     /*
    //     * Build an account from the defined model
    //     */
    //     let account: AccountModel = {
    //         givenName: response.givenName,
    //         familyName: response.familyName
    //     }

    //     return account;
    // }
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
