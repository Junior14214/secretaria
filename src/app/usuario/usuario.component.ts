import { UsuarioService } from './usuario.service';
import { Usuario } from './../model/usuario';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app'

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  user: Observable<firebase.User>;
  base64textString: string = "";
  usuario: Usuario = new Usuario();
  senha: string;
  service: UsuarioService;

  constructor(service: UsuarioService, public afAuth: AngularFireAuth) {
    this.service = service;
    this.user = this.afAuth.authState;
  }

  public cadastroEmail() {
    firebase.auth().createUserWithEmailAndPassword(this.usuario.email, this.senha).then((response: any) => {
      this.cadastrarUsuario();
    }).catch((erro: any) => {
      console.log(erro);
    })
  }

  public cadastrarUsuario() {
    this.usuario.uid = firebase.auth().currentUser.uid;
    console.log(this.usuario);
    this.service.cadastrar(this.usuario).subscribe(res => {
      console.log('Cadastrou');
    });
  }

  handleFileSelect(evt) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = "data:image/png;base64," + btoa(binaryString);
    this.usuario.foto = this.base64textString;

  }

  ngOnInit() {
  }

}
