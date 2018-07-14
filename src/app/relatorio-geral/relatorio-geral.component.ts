import { Globals } from './../globals';
import { Dizimistas } from './../model/dizimista';
import { Component, OnInit } from '@angular/core';
import { RelatorioService } from '../relatorio/relatorio.service';
import * as jsPDF from 'jspdf';
import * as html2canvas from "html2canvas";
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-relatorio-geral',
  templateUrl: './relatorio-geral.component.html',
  styleUrls: ['./relatorio-geral.component.css']
})
export class RelatorioGeralComponent implements OnInit {

  private data1 = new Date();
  private data2 = new Date();
  private service: RelatorioService;
  private dataFormatada1: string;
  private dataFormatada2: string;
  private listaDeDizimistasObreiros = [];
  private listaDeDizimistasMembros = [];
  private congregacoes: string;
  private repasse_congregacoes: Object[] = [];
  private globals: Globals;
  private valorTotalDizimos: number;
  private valorTotalOfertas: number;
  private valorTotalOfertasEspeciais: number;
  private valorTotalOutros: number;
  private valorTotalDespesas: number;
  private totalRepasseCongregacoes: number;
  private listaSaidas: Dizimistas[] = [];

  constructor(service: RelatorioService, globals: Globals) {
    this.service = service;
    this.globals = globals;
  }

  public formatarData(data, number) {
    let dataString = data.toString();
    let dia = dataString.slice(8, 10)
    let mes = dataString.slice(4, 7)
    let mesFormatado = ''
    let ano = dataString.slice(11, 15)

    if (mes == 'Jan') {
      mesFormatado = '01';
    } if (mes == 'Feb') {
      mesFormatado = '02';
    } if (mes == 'Mar') {
      mesFormatado = '03';
    } if (mes == 'Apr') {
      mesFormatado = '04';
    } if (mes == 'May') {
      mesFormatado = '05';
    } if (mes == 'Jun') {
      mesFormatado = '06';
    } if (mes == 'Jul') {
      mesFormatado = '07';
    } if (mes == 'Aug') {
      mesFormatado = '08';
    } if (mes == 'Sep') {
      mesFormatado = '09';
    } if (mes == 'Oct') {
      mesFormatado = '10';
    } if (mes == 'Nov') {
      mesFormatado = '11';
    } if (mes == 'Dec') {
      mesFormatado = '12';
    }


    if (number == 1) {
      this.dataFormatada1 = ano + mesFormatado + dia;
    } else {
      this.dataFormatada2 = ano + mesFormatado + dia;
    }
  }

  public relatorioDizimistas(data1, data2) {
    this.formatarData(data1, 1);
    this.formatarData(data2, 2);

    this.service.relatorio(1, this.globals.informacoesUsuarioLogado.congregacao, this.dataFormatada1, this.dataFormatada2)
      .subscribe(res => {

        res.forEach((item) => {
          if (item.tipo_membro == 'Membro') {
            this.listaDeDizimistasMembros.push(item);
            console.log(item);
          } else {
            this.listaDeDizimistasObreiros.push(item);
            console.log(item);
          }
        })

      })

    this.repasseCongregacoes(1, this.dataFormatada1, this.dataFormatada2)

  }

  public repasseCongregacoes(tipo, data1, data2) {

    this.service.relatorioGeralaSede(tipo, data1, data2)
      .subscribe(res => {
        this.repasse_congregacoes = res;

        let total = 0;

        this.repasse_congregacoes.forEach(function (item) {
          total += item[1];
        })

        this.totalRepasseCongregacoes = total;

        console.log(total);
      })
    this.totalDizimos(1, this.globals.informacoesUsuarioLogado.congregacao, data1, data2);
  }

  public totalDizimos(tipo, congregacao, data1, data2) {
    this.service.relatorioGeral(tipo, congregacao, data1, data2)
      .subscribe(res => {
        this.valorTotalDizimos = res;
      })
    this.totalOfertas(2, congregacao, data1, data2);
  }

  public totalOfertas(tipo, congregacao, data1, data2) {
    this.service.relatorioGeral(tipo, congregacao, data1, data2)
      .subscribe(res => {
        this.valorTotalOfertas = res;
      })
    this.totalOfertasEspeciais(3, congregacao, data1, data2);
  }

  public totalOfertasEspeciais(tipo, congregacao, data1, data2) {
    this.service.relatorioGeral(tipo, congregacao, data1, data2)
      .subscribe(res => {
        this.valorTotalOfertasEspeciais = res;
      })
    this.totalOutros(4, congregacao, data1, data2);
  }

  public totalOutros(tipo, congregacao, data1, data2) {
    this.service.relatorioGeral(tipo, congregacao, data1, data2)
      .subscribe(res => {
        this.valorTotalOutros = res;
      })
    this.descricaoSaidas(5, congregacao, data1, data2);
  }

  public descricaoSaidas(tipo, congregacao, data1, data2) {
    this.service.relatorio(tipo, congregacao, data1, data2)
      .subscribe(res => {
        this.listaSaidas = res;
      })
    this.totalDespesas(5, congregacao, data1, data2);
  }

  public totalDespesas(tipo, congregacao, data1, data2) {
    this.service.relatorioGeral(tipo, congregacao, data1, data2)
      .subscribe(res => {
        this.valorTotalDespesas = res;
      })
  }

  public novoRelatorio() {
    this.listaDeDizimistasObreiros = [];
    this.listaDeDizimistasMembros = [];
    this.congregacoes = '';
    this.repasse_congregacoes = [];
    this.valorTotalDizimos = 0;
    this.valorTotalOfertas = 0;
    this.valorTotalOfertasEspeciais = 0;
    this.valorTotalOutros = 0;
    this.valorTotalDespesas = 0;
    this.totalRepasseCongregacoes = 0;
    this.listaSaidas = [];
  };

  public gerarPDF() {
    var element = document.getElementById('capture');
    var opt = {
      margin: 0.2,
      filename: 'Relatorio_Mensal_Dizimistas.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { width: 1000 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // New Promise-based usage:
    html2pdf().from(element).set(opt).save();
  }


  ngOnInit() {
  }

}
