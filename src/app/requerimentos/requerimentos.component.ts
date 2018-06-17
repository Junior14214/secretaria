import { UsuarioService } from './../usuario/usuario.service';
import { MembroService } from './../membro/membro.service';
import { Membros } from './../model/membro';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-requerimentos',
  templateUrl: './requerimentos.component.html',
  styleUrls: ['./requerimentos.component.css']
})
export class RequerimentosComponent implements OnInit {

  private membro = new Membros();
  private service: MembroService;
  private tipoDeRequerimento: string;
  private uidUsuarioLogado = firebase.auth().currentUser.uid;
  private usuarioLogado;
  private usuarioService: UsuarioService;

  constructor(service: MembroService, usuarioService: UsuarioService) {
    this.service = service;
    this.usuarioService = usuarioService;

    this.usuarioService.buscarInformacoesUsuarioLogado(this.uidUsuarioLogado)
      .subscribe(res => {
        this.usuarioLogado = res;
      })
  }

  public pesquisarMembro() {
    this.service.buscarPorId(this.membro.id)
      .subscribe(res => {
        this.membro = res;
      })
  }

  ngOnInit() {
  }

}
