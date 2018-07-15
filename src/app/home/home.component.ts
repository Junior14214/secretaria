import { FinanceiroDiario } from './../model/financeiro_diario';
import { Globals } from './../globals';
import { RelatorioService } from './../relatorio/relatorio.service';
import { Component, OnInit, AfterContentInit, AfterViewInit, OnChanges, AfterContentChecked } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterContentChecked {

  dataAtual = new Date();
  dataInicial: string;
  service: RelatorioService;
  globals: Globals;
  resumo: FinanceiroDiario;
  contador = 0;

  constructor(service: RelatorioService, globals: Globals) {
    this.service = service;
    this.globals = globals;
    let mes: number = this.dataAtual.getMonth() + 1
    this.dataInicial = (mes < 10) ? '01' + '/' + '0' + mes + '/' + this.dataAtual.getFullYear() : '01' + '/' + mes + '/' + this.dataAtual.getFullYear()
  }

  ngAfterContentChecked() {

    if (this.globals.informacoesUsuarioLogado.congregacao != null && this.contador == 0) {
      this.service.relatorioFinanceiroDiario(this.globals.informacoesUsuarioLogado.congregacao)
        .subscribe(res => {
          this.resumo = res;
        })
        this.contador++;
    }




  }

}
