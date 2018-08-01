import { MembroService } from './membro/membro.service';
import { Usuario } from './model/usuario';
import { UsuarioService } from './usuario/usuario.service';
import { Injectable } from "@angular/core";
import * as firebase from 'firebase/app';
import { Congregacoes } from './model/congregacoes';

@Injectable()
export class Globals {
    private idUsuarioLogado = firebase.auth().currentUser.uid;
    private service: UsuarioService;
    private congregacaoService: MembroService;
    informacoesUsuarioLogado: Usuario;
    private mensagens = [];


    constructor(service: UsuarioService, congregacaoService: MembroService) {
        this.service = service;
        this.congregacaoService = congregacaoService;

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