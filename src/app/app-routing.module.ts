import { ListaComponent } from './membro/lista.component';
import { MembroComponent } from './membro/membro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: 'lista', component: ListaComponent},
  {path: 'cadastro', component: MembroComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
