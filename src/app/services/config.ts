import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ConfigurationService {

    private baseUrl: string = '';
    private authToken: string = '';    
    private headers: Headers = null;
    private servletUrl: string = '';
    private contextHub: any = '';
    private cartId: string = '';
    private cartEditUrl: string = '';

    /**
     * Constructor - we set the basic config options from window properties
     */
    constructor() {
        //todo: this could be better most likely. BUT, I've done some research and a more obvious answer isn't yet clear
        this.baseUrl = window['booksApp'].apiUrl;
        let lastChar = this.baseUrl.substr(-1); // Selects the last character
        if (lastChar != '/') {         // If the last character is not a slash
            this.baseUrl = this.baseUrl + '/';            // Append a slash to it.
        }
    }

    public getBaseUrl() : string {
        return this.baseUrl;
    }

    public setAuthToken(token: string) : void {
        localStorage.setItem('token', token);
    }

    public clearAuthToken() : void {
        return localStorage.removeItem('token');
    }

    public getAuthToken() : string {
        return localStorage.getItem('token');
    }

}
