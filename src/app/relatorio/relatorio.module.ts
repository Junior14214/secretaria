import { FormsModule } from '@angular/forms';
import { RelatorioComponent } from './relatorio.component';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule, MatTabsModule, MatInputModule, MAT_DATE_LOCALE } from '@angular/material';

@NgModule({
  imports: [CommonModule, MatDatepickerModule, MatTabsModule, MatInputModule, FormsModule],
  declarations: [RelatorioComponent],
  exports: [RelatorioComponent, MatDatepickerModule, MatTabsModule, MatInputModule],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}]
})
export class RelatorioModule { }
