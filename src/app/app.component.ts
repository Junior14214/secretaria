import { UsuarioService } from './usuario/usuario.service';
import { Router } from '@angular/router';
import { Component, AfterContentChecked } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Usuario } from './model/usuario';
import { MembroComponent } from './membro/membro.component';

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

  constructor(public afAuth: AngularFireAuth, private route: Router, service: UsuarioService) {
    this.user = afAuth.authState;
    this.service = service;

  }

  public sair() {
    this.afAuth.auth.signOut().then(() => {
      this.route.navigate(['/login']);
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
      }
    }

    /* if(uid.length && count == 0){
      this.service.buscarInformacoesUsuarioLogado(uid)
      .subscribe(res => {
        this.usuario = res;
        console.log(res);
      });
      count++;
    } */

    /* this.service.buscarInformacoesUsuarioLogado(firebase.auth().currentUser.uid)
      .subscribe(res => {
        this.usuario = res;
      }); */
  }

}
