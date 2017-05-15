import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { Credentials } from '../models/credentials';
import { NgForm } from '@angular/forms';
import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Account } from '../models/account';

@Component({
  selector: 'account-configuration-text',  
  template: `
    <div class="configuration-text">    
    <p *ngIf="account">
    Hello! My name is 
    <span class="text-input" contenteditable="true" (blur)="updateAccount('firstname', $event.target.innerHTML)" [contenteditableModel]="account.firstname"></span>
    &nbsp;&nbsp;(last name 
    <span class="text-input" contenteditable="true" (blur)="updateAccount('lastname', $event.target.innerHTML)" [contenteditableModel]="account.lastname"></span>    
    ) and I really enjoy reading 
    <select (change)="updateAccount('favorite_book_type', $event.target.value)">
      <option value=""></option>
      <option *ngFor="let bookType of account.bookTypes" 
          [value]="bookType.id" 
          [attr.selected]="account.favoriteBookType && account.favoriteBookType.id==bookType.id ? true : null">
        {{bookType.name}}
      </option>
    </select> books<sup><a href="#">?</a></sup>
    .  
    </div>
  `,
  styles: [`    
    .configuration-text .text-input {
      
      border:none;
      border-bottom: 2px solid red;
      padding:0px 20px;
      font-family: 'Raleway', sans-serif;      
      display:inline;

    }

    .configuration-text sup a {
      color:red;
      font-size:75%;
      font-weight:bold;
      text-decoration:none;
    }

    .configuration-text select, .configuration-text option {
      -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      padding:0px 20px;
      background:none;
        border-radius:0px;
      border:none;
      border-bottom:2px solid red;
      font-family: 'Raleway', sans-serif;
      color:#4c4c4c;
      font-size:1em;

    }
    .configuration-text *:focus {
        outline: none;
    }
  `]
})
export class AccountConfigurationTextComponent {  
  @Input() account = null;  
  @Input() nextExchange = null;  
  @Output() accountUpdate = new EventEmitter<Account>();

  

  private updateAccount(property, eventValue) {           
    let updatedAccount = Object.assign({}, this.account);    
    updatedAccount[property] = eventValue;    
    this.accountUpdate.emit(updatedAccount);
  }
}


