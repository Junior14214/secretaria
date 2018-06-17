import { FormsModule } from '@angular/forms';
import {
  MatInputModule,
  MatSelectModule
 } from '@angular/material';
import { UsuarioService } from './usuario.service';
import { UsuarioComponent } from './usuario.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatSelectModule,
    FormsModule
  ],
  declarations: [
    UsuarioComponent
  ],
  exports: [
    UsuarioComponent,
    MatInputModule,
    MatSelectModule
  ],
  providers: [
    UsuarioService
  ]
})
export class UsuarioModule { }
