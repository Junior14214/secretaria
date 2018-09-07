import { Dizimistas } from './../model/dizimista';
import { DizimistaService } from './dizimista.service';
import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';

@Component({
  selector: 'app-dizimista',
  templateUrl: './dizimista.component.html',
  styleUrls: ['./dizimista.component.css']
})
export class DizimistaComponent implements OnInit {

  dizimista: Dizimistas = new Dizimistas();
  service: DizimistaService;
  lista: Dizimistas[] = [];
  data: Date = new Date();
  globals: Globals;

  constructor(service: DizimistaService, globals: Globals) {
    this.service = service;
    this.globals = globals;
  }

  public addInput() {
    if (this.dizimista.tipo == 5) {
      let valor = this.dizimista.valor;
      this.dizimista.valor = -1 * valor;
    }
    let dia;

    if (this.data.getDate() >= 10) {
      dia = this.data.getDate();
    } else {
      dia = '0' + this.data.getDate();
    }

    let mes = this.data.getMonth();
    let mesFormatado;

    if (mes + 1 >= 10) {
      mesFormatado = mes + 1;
    } else {
      mesFormatado = '0' + (mes + 1);
    }

    this.dizimista.data = this.data.getFullYear() + '/' + mesFormatado + '/' + dia;
    console.log('data', this.dizimista.data);
    this.dizimista.congregacao = this.globals.informacoesUsuarioLogado.congregacao;
    this.lista.push(this.dizimista);
    this.dizimista = new Dizimistas();

    console.log(dia);
  }

  public removeLinha(membro) {
    let index = this.lista.indexOf(membro);
    this.lista.splice(index, 1);
  }

  public salvarValores() {

    this.service
      .salvar(this.lista)
      .subscribe(res => {
        this.dizimista = new Dizimistas();
        this.lista = [];
        this.globals.abrirAlerta('success', 'Cadastrado com sucesso!');
      }, erro => {
        this.globals.abrirAlerta('error', 'Não foi possivel cadastrar os valores ' + erro);
      })
  }

  ngOnInit() {
  }

}
