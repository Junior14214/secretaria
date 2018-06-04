import { MenuModule } from './../menu/menu.module';
import { MembroService } from './membro.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembroComponent } from './membro.component';
import { ListaComponent } from './lista.component';
import {
  MatCheckboxModule,
  MatTableModule,
  MatDividerModule,
  MatListModule,
  MatPaginatorModule,
  MatGridListModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatTableModule,
    MatGridListModule,
    MatDividerModule,
    MatListModule,
    MatPaginatorModule,
    MenuModule
    
  ],
  
  declarations: [ListaComponent],

  providers: [MembroService],

  exports: [
    MatCheckboxModule,
    MatTableModule,
    MatGridListModule,
    MatDividerModule,
    MatListModule,
    MatPaginatorModule,
    MatGridListModule
  ]
})
export class MembroModule { }
