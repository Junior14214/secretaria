import { MembroService } from './membro/membro.service';
import { UsuarioService } from './usuario/usuario.service';
import { Router } from '@angular/router';
import { Component, AfterContentChecked, Input } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Usuario } from './model/usuario';
import { Globals } from './globals';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentChecked {
  title = 'app';
  user: Observable<firebase.User>;
  private service: UsuarioService;
  usuario: Usuario = new Usuario();
  verificaSessao;
  count: number = 0;
  contador = 0;
  membroService: MembroService;
  inadimplente: boolean = false;

  constructor(public afAuth: AngularFireAuth, private route: Router, service: UsuarioService, membroService: MembroService) {
    this.user = afAuth.authState;
    this.service = service;
    this.membroService = membroService;

  }

  public sair() {
    this.afAuth.auth.signOut().then(() => {
      this.route.navigate(['/login']);
      this.usuario = new Usuario();
      this.count = 0;
    });
  }

  ngAfterContentChecked() {

    this.verificaSessao = firebase.auth().currentUser;
    if (firebase.auth().currentUser) {
      let uid = firebase.auth().currentUser.uid;
      if (uid != null && this.count == 0) {
        this.service.buscarInformacoesUsuarioLogado(uid)
          .subscribe(res => {
            this.usuario = res;
            console.log(res);
          });
        this.count++;

        this.membroService.listarCongregacoes()
          .subscribe(res => {
            res.forEach((item) => {
              if (item.congregacao == this.usuario.congregacao && this.usuario.permissao == 'DIRIGENTE' && item.repasse == 'Inadimplente') {
                this.inadimplente = true;
              }
            })
          })
      }
      if (this.contador === 0) {
        this.route.navigate(['/home']);
        this.contador++;
      }
    }
  }
}
