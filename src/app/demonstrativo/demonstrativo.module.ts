import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemonstrativoComponent } from './demonstrativo.component';
import { MatDatepickerModule, MatInputModule } from '@angular/material';



@NgModule({
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    FormsModule
  ],
  declarations: [DemonstrativoComponent],
  exports: [
    DemonstrativoComponent,
    MatDatepickerModule,
    MatInputModule,
    FormsModule
  ],
})
export class DemonstrativoModule { }
