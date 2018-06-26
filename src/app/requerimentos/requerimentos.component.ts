import { UsuarioService } from './../usuario/usuario.service';
import { MembroService } from './../membro/membro.service';
import { Membros } from './../model/membro';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import * as jsPDF from 'jspdf'
import * as html2canvas from "html2canvas"
import * as html2pdf from "html2pdf.js"

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
    var element = document.getElementById('element-to-print');
    var opt = {
      margin: 0.2,
      filename: 'Ficha_de_requerimento_' + this.tipoDeRequerimento + '.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { width: 1000},
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // New Promise-based usage:
    html2pdf().from(element).set(opt).save();
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
