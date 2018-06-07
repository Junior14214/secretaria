import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {
  data = new Date();
  /*   dia = this.data.getDate();
    mes = this.data.getMonth()+1;
    ano = this.data.getFullYear(); */

  constructor() {

  }

  public teste() {
    let dataString = this.data.toString();
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

    window.alert(dia + '/' + mesFormatado + '/' + ano);
  }

  ngOnInit() {
  }

}
