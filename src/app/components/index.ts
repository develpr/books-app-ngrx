import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LoginFormComponent } from './login-form';
import { AccountConfigurationTextComponent } from './account-configuration-text';
import { ExchangeConfigurationTextComponent } from './exchange-configuration-text';
import { PipesModule } from '../pipes';

import { ContenteditableModel } from '../directives/contenteditable-model';
import { HighlightDirective } from '../directives/highlight';



export const COMPONENTS = [
  LoginFormComponent,
  AccountConfigurationTextComponent,
  ExchangeConfigurationTextComponent,
  ContenteditableModel,
  HighlightDirective
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PipesModule,
    FormsModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class ComponentsModule { }
