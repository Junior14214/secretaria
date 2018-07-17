import { AlertasModule } from './../alertas/alertas.module';
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
    MatSelectModule,
    AlertasModule
  ],
  declarations: [DemonstrativoComponent],
  exports: [
    DemonstrativoComponent,
    MatDatepickerModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatSelectModule,
    AlertasModule
  ],
})
export class DemonstrativoModule { }
