import { RelatorioComponent } from './relatorio/relatorio.component';
import { ListaComponent } from './membro/lista.component';
import { MembroComponent } from './membro/membro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: 'lista', component: ListaComponent},
  {path: 'cadastro', component: MembroComponent},
  {path: 'cadastro/:id', component: MembroComponent},
  {path: 'relatorio', component: RelatorioComponent},
  {path: '**', redirectTo: ''}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
