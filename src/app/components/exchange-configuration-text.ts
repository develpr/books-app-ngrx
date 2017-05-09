import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { Credentials } from '../models/credentials';
import { NgForm } from '@angular/forms';
import { Component, Output, Input, EventEmitter } from '@angular/core';


@Component({
  selector: 'exchange-configuration-text',
  template: `
    <div class="configuration-text">
    <p>I think that I 
    <select><option value="2">will not</option><option value="3">will</option></select>participate in the next ID book exchange, which takes place May 18th.
    </p>
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
export class ExchangeConfigurationTextComponent {  
  @Input() account = null;  
  @Input() nextExchange = null;  
  @Output() login = new EventEmitter<Credentials>();

  private handleLogin(form: NgForm) {              
    this.login.emit(form.value);
  }
}


