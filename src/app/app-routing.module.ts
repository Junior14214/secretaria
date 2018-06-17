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
  { path: '', component: HomeComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'lista', component: ListaComponent, canActivate:[AuthGuard] },
  { path: 'cadastro', component: MembroComponent, canActivate:[AuthGuard] },
  { path: 'cadastro/:id', component: MembroComponent, canActivate:[AuthGuard] },
  { path: 'relatorio', component: RelatorioComponent, canActivate:[AuthGuard] },
  { path: 'requerimentos', component: RequerimentosComponent, canActivate:[AuthGuard] },
  { path: '**', redirectTo: '' },


]


export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);