import { AlteracaoDeDadosComponent } from './alteracao-de-dados/alteracao-de-dados.component';
import { AlteracaoDeSenhaComponent } from './alteracao-de-senha/alteracao-de-senha.component';
import { CongregacoesComponent } from './congregacoes/congregacoes.component';
import { ContextualizarMembroComponent } from './contextualizar-membro/contextualizar-membro.component';
import { RequerimentosComponent } from './requerimentos/requerimentos.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { MembroComponent } from './membro/membro.component';
import { ListaComponent } from './membro/lista.component';
import { Routes, RouterModule, CanActivate } from '@angular/router'
import { ModuleWithProviders } from "@angular/core/src/metadata";

import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from './auth.guard';


export const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'alterar_senha', component: AlteracaoDeSenhaComponent },
  { path: 'alterar_dados', component: AlteracaoDeDadosComponent },
  { path: 'lista', component: ListaComponent, canActivate: [AuthGuard] },
  { path: 'cadastro', component: MembroComponent, canActivate: [AuthGuard] },
  { path: 'cadastro/:id', component: MembroComponent, canActivate: [AuthGuard] },
  { path: 'relatorio', component: RelatorioComponent, canActivate: [AuthGuard] },
  { path: 'requerimentos', component: RequerimentosComponent, canActivate: [AuthGuard] },
  { path: 'contextualizar/:id', component: ContextualizarMembroComponent, canActivate: [AuthGuard] },
  { path: 'lista/:id', component: CongregacoesComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home' },


]


export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);