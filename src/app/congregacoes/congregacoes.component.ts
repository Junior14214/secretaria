import { MembroService } from './../membro/membro.service';
import { Globals } from './../globals';
import { CongregacoesService } from './congregacoes.service';
import { Component, OnInit } from '@angular/core';
import { Congregacoes } from '../model/congregacoes';

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

  constructor(service: CongregacoesService, globals: Globals, membroService: MembroService) {
    this.service = service;
    this.globals = globals;
    this.membroService = membroService;
  }

  public salvar() {
    this.service.salvar(this.congregacoes)
      .subscribe(res => {
        this.congregacoes = new Congregacoes();
        this.globals.abrirAlerta('success', 'Congregação cadastrada com sucesso!')
      })
  }

  ngOnInit() {
  }

}
