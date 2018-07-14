import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemonstrativoComponent } from './demonstrativo.component';
import { MatDatepickerModule, MatInputModule, MatDialogModule, MatSelectModule } from '@angular/material';



@NgModule({
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatSelectModule
  ],
  declarations: [DemonstrativoComponent],
  exports: [
    DemonstrativoComponent,
    MatDatepickerModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatSelectModule
  ],
})
export class DemonstrativoModule { }
