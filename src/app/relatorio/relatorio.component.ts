import { Dizimistas } from './../model/dizimista';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material';
import { RelatorioService } from './relatorio.service';
import * as jsPDF from 'jspdf';
import * as html2canvas from "html2canvas";
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {
  data1 = new Date();
  data2 = new Date();
  dataFormatada1: string;
  dataFormatada2: string;
  service: RelatorioService
  listaDeDizimistas: Dizimistas[] = [];
  total: number = 0;
  teste: string = "teste";
  /*   dia = this.data.getDate();
    mes = this.data.getMonth()+1;
    ano = this.data.getFullYear(); */

  constructor(service: RelatorioService) {
    this.service = service;
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
      this.dataFormatada1 = dia + mesFormatado + ano;
    } else {
      this.dataFormatada2 = dia + mesFormatado + ano;
    }
  }

  public submit(data1, data2) {

    this.formatarData(data1, 1);
    this.formatarData(data2, 2);

    this.service
      .relatorio(1, this.dataFormatada1, this.dataFormatada2)
      .subscribe(res => {

        this.listaDeDizimistas = res;

        if (this.listaDeDizimistas.length < 32) {
          let obj = { id: 0, nome: '', valor: 0, data: '', tipo: 0 }
          for (let i = this.listaDeDizimistas.length; i < 32; i++) {
            this.listaDeDizimistas.push(obj);
          }
        }

        let g = 0;

        this.listaDeDizimistas.forEach(function (item) {
          g += item.valor
        });

        this.total = g;
      });
  };

  public gerarPDF() {
    var element = document.getElementById('capture');
    var opt = {
      margin: 0.2,
      filename: 'Relatorio_Mensal_Dizimistas.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { width: 1000},
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // New Promise-based usage:
    html2pdf().from(element).set(opt).save();
  }

  public novoRelatorio() {
    this.listaDeDizimistas = [];
    this.total = 0;
  }

  ngOnInit() {
  }

}
