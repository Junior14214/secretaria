import { Router } from '@angular/router';
import { Globals } from './../globals';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-alteracao-de-senha',
  templateUrl: './alteracao-de-senha.component.html',
  styleUrls: ['./alteracao-de-senha.component.css']
})
export class AlteracaoDeSenhaComponent implements OnInit {

  user = firebase.auth().currentUser;
  globals: Globals;

  senhaAntiga: string;
  novaSenha: string;
  repetirNovaSenha: string;
  router: Router;

  constructor(globals: Globals, router: Router) {
    this.globals = globals;
    this.router = router;
  }

  public reautenticar() {
    var credencial = firebase.auth.EmailAuthProvider.credential(this.user.email, this.senhaAntiga);

    this.user.reauthenticateWithCredential(credencial)
      .then(() => {
        this.alterarSenha();
      }, error => {
        this.globals.abrirAlerta('error', 'Senha antiga incorreta!')
      });

  }

  public alterarSenha() {
    this.user.updatePassword(this.novaSenha)
      .then(() => {
        this.globals.abrirAlerta('success', 'Senha alterada com Sucesso! Por favor faça o login novamente');

        setTimeout(() => {
          this.router.navigate(['/login']);
      }, 3000)

      }, error => {
        this.globals.abrirAlerta('error', 'Não foi possivel alterar a senha ' + error);
      });
  }

  ngOnInit() {
  }

}
