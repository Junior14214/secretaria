import { FormsModule } from '@angular/forms';
import { DizimistaService } from './dizimista.service';
import { DizimistaComponent } from './dizimista.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatInputModule,
  MatIconModule,
  MatSelectModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule
  ],
  declarations: [DizimistaComponent],
  exports: [
    DizimistaComponent,
    MatInputModule,
    MatIconModule,
    MatSelectModule
  ],
  providers: [DizimistaService]
})
export class DizimistaModule { }
