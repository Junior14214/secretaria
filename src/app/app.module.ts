import { ListaComponent } from './membro/lista.component';
import { MembroComponent } from './membro/membro.component';
import { MembroModule } from './membro/membro.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule, MatGridListModule} from '@angular/material';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MenuModule } from './menu/menu.module';


@NgModule({
  declarations: [
    AppComponent,
    MembroComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MembroModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatGridListModule,
    MenuModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
