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
    private mensagens = [];


    constructor(service: UsuarioService) {
        this.service = service;

        this.service.buscarInformacoesUsuarioLogado(this.idUsuarioLogado)
            .subscribe(res => {
                this.informacoesUsuarioLogado = res;
            })
    }

    public abrirAlerta(tipo, texto) {
        this.mensagens.push({ type: tipo, text: texto });

        setTimeout(() => {
            this.mensagens = [];
        }, 5000)

    }
}