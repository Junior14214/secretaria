import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormControl, Validators } from '@angular/forms';

import { Observable } from 'rxjs/observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: Observable<firebase.User>;
  login: string;
  senha: string;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.user = this.afAuth.authState;
  }

  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Favor digitar um email válido' :
        '';
  }

  public entrar() {
    firebase.auth().signInWithEmailAndPassword(this.login, this.senha).then(() => {
      this.router.navigate(['']);
    });
  }


}
