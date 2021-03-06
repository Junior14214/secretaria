import { Usuario } from './../model/usuario';
import { Congregacoes } from './../model/congregacoes';
import { DizimistaService } from './../dizimista/dizimista.service';
import { MembroService } from './../membro/membro.service';
import { FinanceiroDiario } from './../model/financeiro_diario';
import { Globals } from './../globals';
import { RelatorioService } from './../relatorio/relatorio.service';
import { Component, OnInit, AfterContentInit, AfterViewInit, OnChanges, AfterContentChecked } from '@angular/core';
import * as firebase from 'firebase/app';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterContentChecked {

  dataAtual = new Date();
  dataInicial: string;
  service: RelatorioService;
  membroService: MembroService;
  dizimistaService: DizimistaService;
  globals: Globals;
  resumo: FinanceiroDiario;
  contador = 0;
  relatorioEntradasCongregacao: Object[] = [];
  relatorioEntradasCampo: Object[] = [];
  membroCongregacaoAtivo: number = 0;
  membroCongregacaoInativo: number = 0;
  membroCampo: number = 0;
  congregacoes: Congregacoes[];
  usuarios: Usuario[];
  inadimplente: boolean = false;
  chart = [];

  constructor(service: RelatorioService, globals: Globals, dizimistaService: DizimistaService, membroService: MembroService) {
    this.service = service;
    this.dizimistaService = dizimistaService;
    this.membroService = membroService;
    this.globals = globals;
    let mes: number = this.dataAtual.getMonth() + 1
    this.dataInicial = (mes < 10) ? '01' + '/' + '0' + mes + '/' + this.dataAtual.getFullYear() : '01' + '/' + mes + '/' + this.dataAtual.getFullYear();

    Chart.defaults.global.legend.display = false;

    this.membroService.relatorioMembrosCampo('Ativo')
      .subscribe(res => {
        this.membroCampo = res;
      });

    this.dizimistaService.relatorioEntradasCampo()
      .subscribe(res => {
        this.relatorioEntradasCampo = res;
      });

    this.membroService.listarCongregacoes()
      .subscribe(res => {
        this.congregacoes = res;
      });

    this.membroService.listarUsuarios()
      .subscribe(res => {
        this.usuarios = res;
      });

  }

  ngAfterContentChecked() {

    if (this.globals.informacoesUsuarioLogado.congregacao != null && this.contador == 0) {

      this.service.relatorioFinanceiroDiario(this.globals.informacoesUsuarioLogado.congregacao)
        .subscribe(res => {
          this.resumo = res;

          this.chart = new Chart('canvas', {
            type: 'bar',
            data: {
              labels: ["Entradas", "Saídas", "Saldo Anterior", "Total"],
              datasets: [{
                label: 'R$: ',
                data: [this.resumo.entradas, this.resumo.saidas, this.resumo.saldo_alterior, this.resumo.total + this.resumo.saldo_alterior],
                backgroundColor: [
                  "rgb(255, 99, 132)",
                  "rgb(54, 162, 235)",
                  "rgb(255, 205, 86)",
                  "rgb(70, 182, 172)"
                ]
              }]
            },
            options: {
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            }
          })
        })
      this.contador++;

      this.dizimistaService.relatorioEntradasCongregacao(this.globals.informacoesUsuarioLogado.congregacao)
        .subscribe(res => {
          this.relatorioEntradasCongregacao = res;
        });

      this.membroService.relatorioMembrosCongregacoes(this.globals.informacoesUsuarioLogado.congregacao, 'Ativo')
        .subscribe(res => {
          this.membroCongregacaoAtivo = res;
        });

      this.membroService.relatorioMembrosCongregacoes(this.globals.informacoesUsuarioLogado.congregacao, 'Inativo')
        .subscribe(res => {
          this.membroCongregacaoInativo = res;
        });

      /*       this.membroService.listarCongregacoes()
              .subscribe(res => {
                this.congregacoes = res;
                this.congregacoes.forEach((item) => {
                  if (item.congregacao === this.globals.informacoesUsuarioLogado.congregacao && this.globals.informacoesUsuarioLogado.permissao == 'DIRIGENTE' && item.repasse == 'Inadimplente') {
                    this.inadimplente = true;
                  }
                })
              }) */
    }




  }

}
