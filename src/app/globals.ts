import { Usuario } from './model/usuario';
import { UsuarioService } from './usuario/usuario.service';
import { Injectable } from "@angular/core";
import * as firebase from 'firebase/app';

@Injectable()
export class Globals {
    role: string = 'teste';
    private idUsuarioLogado = firebase.auth().currentUser.uid;
    private service: UsuarioService;
    informacoesUsuarioLogado: Usuario;

    constructor(service: UsuarioService) {
        this.service = service;

        this.service.buscarInformacoesUsuarioLogado(this.idUsuarioLogado)
            .subscribe(res => {
                this.informacoesUsuarioLogado = res;
            })
    }
}