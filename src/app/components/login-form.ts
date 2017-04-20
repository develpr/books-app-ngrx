import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { Credentials } from '../models/credentials';
import { NgForm } from '@angular/forms';
import { Component, Output, Input, EventEmitter } from '@angular/core';


@Component({
  selector: 'login-form',
  template: `   <h1>HELLO</h1>
<form #form="ngForm" (ngSubmit)="handleLogin(form)" novalidate>

      <div *ngIf="error"><h2>{{getMessage()}}</h2></div>

        <input type="text" id="email" required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
          name="email" [(ngModel)]="credentials.email"
          #email="ngModel" >

       <input type="password" id="password" required
          name="password" [(ngModel)]="credentials.password"
          #password="ngModel" >  

      <div *ngIf="authenticating">attemping authentication...</div>

        <button type="submit">login</button>
</form>
  `,
  styles: [`
    
  `]
})
export class LoginFormComponent {  
  @Input() authenticating = false;  
  @Input() error = null;  
  @Output() login = new EventEmitter<Credentials>();

  credentials: Credentials = {email: "test@test.com", password: "password123"};  

  private getMessage() {    
    if(this.error && this.error.email){      
      return this.error.email;
    }
  }

  private handleLogin(form: NgForm) { 
    console.info("logging in again");              
    this.login.emit(form.value);
  }
}
