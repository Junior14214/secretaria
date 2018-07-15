import { RelatorioGeralModule } from './relatorio-geral/relatorio-geral.module';
import { Globals } from './globals';
import { RequerimentosModule } from './requerimentos/requerimentos.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthGuard } from './auth.guard';
import { routing } from './app-routing.module';
import { DizimistaModule } from './dizimista/dizimista.module';
import { ListaComponent } from './membro/lista.component';
import { MembroComponent } from './membro/membro.component';
import { MembroModule } from './membro/membro.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatGridListModule } from '@angular/material';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { RelatorioModule } from './relatorio/relatorio.module';

import { HomeComponent } from './home/home.component';
import { LoginModule } from './login/login.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { RequerimentosComponent } from './requerimentos/requerimentos.component';
import { VisualizarMembroComponent } from './visualizar-membro/visualizar-membro.component';
import { RelatorioGeralComponent } from './relatorio-geral/relatorio-geral.component';
import { ContextualizarMembroComponent } from './contextualizar-membro/contextualizar-membro.component';

export const firebaseConfig = {
  apiKey: "AIzaSyBkVH-_4pVdyOqtLKh6KuD-38d_qwLvob4",
  authDomain: "secretariaapp-aa38a.firebaseapp.com",
  databaseURL: "https://secretariaapp-aa38a.firebaseio.com",
  projectId: "secretariaapp-aa38a",
  storageBucket: "secretariaapp-aa38a.appspot.com",
  messagingSenderId: "501878039484"
}

@NgModule({
  declarations: [
    AppComponent,
    MembroComponent,
    HomeComponent,
    VisualizarMembroComponent,
    ContextualizarMembroComponent,

  ],
  imports: [
    BrowserModule,
    routing,
    MembroModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatGridListModule,
    DizimistaModule,
    RelatorioModule,
    LoginModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    UsuarioModule,
    RequerimentosModule,
    RelatorioGeralModule

  ],
  providers: [AuthGuard, Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
