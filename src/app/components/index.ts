import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LoginFormComponent } from './login-form';
import { ConfigurationTextComponent } from './configuration-text';
import { PipesModule } from '../pipes';


export const COMPONENTS = [
  LoginFormComponent,
  ConfigurationTextComponent
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
