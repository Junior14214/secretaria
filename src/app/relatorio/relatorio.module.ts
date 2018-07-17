import { AlertasModule } from './../alertas/alertas.module';
import { RelatorioGeralModule } from './../relatorio-geral/relatorio-geral.module';
import { DemonstrativoModule } from './../demonstrativo/demonstrativo.module';
import { DizimistaModule } from './../dizimista/dizimista.module';
import { RelatorioService } from './relatorio.service';
import { FormsModule } from '@angular/forms';
import { RelatorioComponent } from './relatorio.component';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule, MatTabsModule, MatInputModule, MAT_DATE_LOCALE } from '@angular/material';
import { AlertasComponent } from '../alertas/alertas.component';

@NgModule({
  imports: [CommonModule, MatDatepickerModule, MatTabsModule, MatInputModule, FormsModule, DemonstrativoModule, RelatorioGeralModule, AlertasModule],
  declarations: [RelatorioComponent],
  exports: [RelatorioComponent, MatDatepickerModule, MatTabsModule, MatInputModule, AlertasModule],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}, RelatorioService]
})
export class RelatorioModule { }
