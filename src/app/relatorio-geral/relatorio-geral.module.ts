import { AlertasModule } from './../alertas/alertas.module';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule, MatSelectModule, MatInputModule } from '@angular/material';
import { RelatorioGeralComponent } from './relatorio-geral.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    AlertasModule
  ],
  declarations: [RelatorioGeralComponent],
  exports: [
    RelatorioGeralComponent,
    MatDatepickerModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    AlertasModule
  ]
})
export class RelatorioGeralModule { }
