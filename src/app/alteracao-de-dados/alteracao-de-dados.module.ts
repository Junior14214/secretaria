import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatProgressSpinnerModule } from '../../../node_modules/@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  declarations: []
})
export class AlteracaoDeDadosModule { }
