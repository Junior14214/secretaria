import { UsuarioService } from './../usuario/usuario.service';
import { MembroService } from './../membro/membro.service';
import { Membros } from './../model/membro';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import * as jsPDF from 'jspdf'
import * as html2canvas from "html2canvas"

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
  private conjuje: string = '';
  private cargo_consagracao: string = '';

  constructor(service: MembroService, usuarioService: UsuarioService) {
    this.service = service;
    this.usuarioService = usuarioService;

    this.usuarioService.buscarInformacoesUsuarioLogado(this.uidUsuarioLogado)
      .subscribe(res => {
        this.usuarioLogado = res;
      })
  }

  public gerarPDF() {
    html2canvas(document.getElementById('capture')).then(function (canvas) {
      var img = canvas.toDataURL("image/png");
      var doc = new jsPDF('p', 'mm');
      doc.addImage(img, 'PNG', 10, 5, 190, 240);
      doc.save('Relatório_de_Dizimistas_Mensal.pdf');
    });
  }

  public novoRequerimento() {
    this.membro = new Membros();
    this.conjuje = '';
    this.cargo_consagracao = '';
    this.tipoDeRequerimento = '';
}

  public pesquisarMembro(id) {
  this.service.buscarPorId(id)
    .subscribe(res => {
      this.membro = res;
    })
}

ngOnInit() {
}

}
