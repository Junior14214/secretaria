import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material';
import { RelatorioService } from './relatorio.service';

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
      mesFormatado = '1';
    } if (mes == 'Feb') {
      mesFormatado = '2';
    } if (mes == 'Mar') {
      mesFormatado = '3';
    } if (mes == 'Apr') {
      mesFormatado = '4';
    } if (mes == 'May') {
      mesFormatado = '5';
    } if (mes == 'Jun') {
      mesFormatado = '6';
    } if (mes == 'Jul') {
      mesFormatado = '7';
    } if (mes == 'Aug') {
      mesFormatado = '8';
    } if (mes == 'Sep') {
      mesFormatado = '9';
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
      .relatorio(this.dataFormatada1, this.dataFormatada2)
      .subscribe(res => {
        console.log(res);
      });
  }

  ngOnInit() {
  }

}
