import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';
import { AlertasComponent } from './alertas.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AlertasComponent
  ],
  exports: [
    AlertasComponent
  ]
})
export class AlertasModule { }
