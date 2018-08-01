import { FinanceiroMensal } from './../model/financeiro_mensal';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MembroService } from './../membro/membro.service';
import { Globals } from './../globals';
import { CongregacoesService } from './congregacoes.service';
import { Component, OnInit } from '@angular/core';
import { Congregacoes } from '../model/congregacoes';
import { Route } from '../../../node_modules/@angular/compiler/src/core';

@Component({
  selector: 'app-congregacoes',
  templateUrl: './congregacoes.component.html',
  styleUrls: ['./congregacoes.component.css']
})
export class CongregacoesComponent implements OnInit {

  private congregacoes: Congregacoes = new Congregacoes();
  private service: CongregacoesService;
  private membroService: MembroService;
  private globals: Globals;
  private route: ActivatedRoute;
  private router: Router;
  private financeiroMensal = new FinanceiroMensal();

  constructor(service: CongregacoesService, globals: Globals, membroService: MembroService, route: ActivatedRoute, router: Router) {
    this.service = service;
    this.globals = globals;
    this.membroService = membroService;
    this.route = route;
    this.router = router;

    this.route.params.subscribe(params => {
      let id = params['id'];

      if (id) {
        this.service.buscarPorId(id)
          .subscribe(res => {
            this.congregacoes = res;
          })
      }
    })
  }

  public salvar() {
    this.service.salvar(this.congregacoes)
      .subscribe(res => {
        if (this.congregacoes.id) {
          this.congregacoes = new Congregacoes();
          this.globals.abrirAlerta('success', 'Alterado com sucesso!');
          this.router.navigate(['lista']);

        } else {
          this.financeiroMensal.congregacao = this.congregacoes.congregacao;
          this.financeiroMensal.data_inicial = '00/00/0000';
          this.financeiroMensal.data_final = '00/00/0000';
          this.financeiroMensal.entradas = 0;
          this.financeiroMensal.saidas = 0;
          this.financeiroMensal.total = 0;

          this.service.cadastrarRelatorioMensal(this.financeiroMensal)
            .subscribe(res => {
              console.log('funcionou');
            });
          this.congregacoes = new Congregacoes();
          this.globals.abrirAlerta('success', 'Congregação cadastrada com sucesso!');
        }

      })
  }

  ngOnInit() {
  }

}
