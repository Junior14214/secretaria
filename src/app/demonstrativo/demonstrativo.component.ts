import { FinanceiroMensal } from './../model/financeiro_mensal';
import { Congregacoes } from './../model/congregacoes';
import { MembroService } from './../membro/membro.service';
import { Globals } from './../globals';
import { Dizimistas } from './../model/dizimista';
import { RelatorioService } from './../relatorio/relatorio.service';
import { Component, OnInit, Input } from '@angular/core';
import * as jsPDF from 'jspdf';
import * as html2canvas from "html2canvas";
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-demonstrativo',
  templateUrl: './demonstrativo.component.html',
  styleUrls: ['./demonstrativo.component.css']
})
export class DemonstrativoComponent implements OnInit {

  private congregacao: string;
  private congregacoes: Congregacoes[];
  meses = new Array("Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto",
    "Setembro", "Outubro", "Novembro", "Dezembro");
  private mesAtual: string;
  private data1 = new Date();
  private data2 = new Date();
  private dataFormatada1: string;
  private dataFormatada2: string;
  private dataRelatorio1: string;
  private dataRelatorio2: string;
  private service: RelatorioService;
  private membroService: MembroService;
  private totalDizimos: number;
  private totalOfertas: number;
  private totalOfertasEspeciais: number;
  private totalOutros: number;
  private totalSaidas: number;
  private totalMesAnterior: FinanceiroMensal;
  private saida: Dizimistas[] = [];
  private globals: Globals;
  private fimDeMes: boolean = false;
  @Input() testeNaTela: string;

  constructor(service: RelatorioService, globals: Globals, membroService: MembroService) {

    this.service = service;
    this.globals = globals;
    this.congregacao = this.globals.informacoesUsuarioLogado.congregacao;
    this.membroService = membroService;

    this.membroService.listarCongregacoes()
      .subscribe(res => {
        this.congregacoes = res;
      });
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

    this.mesAtual = this.meses[this.data1.getMonth()];

    if (number == 1) {
      this.dataFormatada1 = ano + mesFormatado + dia;
      this.dataRelatorio1 = dia + '/' + mesFormatado + '/' + ano;
    } else {
      this.dataFormatada2 = ano + mesFormatado + dia;
      this.dataRelatorio2 = dia + '/' + mesFormatado + '/' + ano;
    }
  }

  public submit(data1, data2) {

    this.formatarData(data1, 1);
    this.formatarData(data2, 2);

    this.service.relatorioGeral(1, this.congregacao, this.dataFormatada1, this.dataFormatada2)
      .subscribe(res => {
        this.totalDizimos = res;
      })

    let date = new Date();
    let ultimoDiaMesAtual = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let ultimoDiaMesAnterior = new Date(date.getFullYear(), date.getMonth(), 0);

    if (this.dataFormatada1.substring(5, 6) == (date.getMonth() + 1).toString() && this.dataFormatada2.substring(5, 6) == (date.getMonth() + 1).toString() && ultimoDiaMesAtual.getDate() == date.getDate()
  || parseInt(this.dataFormatada1.substring(5, 6))-1 == date.getMonth() && parseInt(this.dataFormatada2.substring(5, 6))-1 == date.getMonth() && this.dataFormatada2.substring(6, 8) == ultimoDiaMesAnterior.getDate().toString() && date.getDate() <= 5) {
      this.fimDeMes = true;
    };

    this.totalGeralOfertas(2, this.dataFormatada1, this.dataFormatada2);
  }

  public totalGeralOfertas(tipo, data1, data2) {

    this.service.relatorioGeral(tipo, this.congregacao, data1, data2)
      .subscribe(res => {
        this.totalOfertas = res;
      })

    this.totalGeralOfertasEspeciais(3, data1, data2)
  }

  public totalGeralOfertasEspeciais(tipo, data1, data2) {

    this.service.relatorioGeral(tipo, this.congregacao, data1, data2)
      .subscribe(res => {
        this.totalOfertasEspeciais = res;
      })

    this.totalGeralOutros(4, data1, data2)
  }

  public totalGeralOutros(tipo, data1, data2) {

    this.service.relatorioGeral(tipo, this.congregacao, data1, data2)
      .subscribe(res => {
        this.totalOutros = res;
      })

    this.totalGeralSaidas(5, data1, data2)
  }

  public totalGeralSaidas(tipo, data1, data2) {

    this.service.relatorioGeral(tipo, this.congregacao, data1, data2)
      .subscribe(res => {
        this.totalSaidas = res;
      })
    this.listaDeSaidas(5, data1, data2);

  }

  public listaDeSaidas(tipo, data1, data2) {
    console.log(tipo, data1, data2);

    this.service.relatorio(tipo, this.congregacao, data1, data2)
      .subscribe(res => {
        console.log(res);
        this.saida = res;
      })

    if (this.saida.length == 0) {
      this.globals.abrirAlerta('warning', 'Não foram encontrados relatórios para o período selecionado!')
    }

    this.saldoMesAnterior(this.congregacao);
  }

  public saldoMesAnterior(congregacao) {
    this.service.relatorioFinanceiroMensal(congregacao)
      .subscribe(res => {
        this.totalMesAnterior = res;
      })
  }

  public novoRelatorio() {
    this.saida = [];
    this.totalDizimos = 0;
    this.totalOfertas = 0;
    this.totalOfertasEspeciais = 0;
    this.totalOutros = 0;
    this.totalSaidas = 0;
  }

  public gerarPDF() {
    var element = document.getElementById('capture');
    var opt = {
      margin: 0.2,
      filename: 'Demonstrativo_finançeiro_mensal.pdf',
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
