import { Observable } from 'rxjs/observable';
import { Congregacoes } from './../model/congregacoes';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { Response } from '@angular/http/src/static_response';
import 'rxjs/add/operator/map';
import { FinanceiroMensal } from '../model/financeiro_mensal';


@Injectable()
export class CongregacoesService {

  private http: Http;
  private headers: Headers;
  private urlCadastro: string = 'http://www.secretariaonlineadmco.com.br//congregacoes/cadastrar';
  private urlBuscarPorId: string = 'http://www.secretariaonlineadmco.com.br//congregacoes/buscar';
  private urlExcluir: string = 'http://www.secretariaonlineadmco.com.br//congregacoes/excluir';
  private urlCadastroRelatorioMensal: string = 'http://www.secretariaonlineadmco.com.br//financeiro/mensal';
  private router: Router;

  constructor(http: Http, router: Router) {
    this.http = http;
    this.router = router;
  }

  public salvar(congregacao: Congregacoes): Observable<Response> {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');

    return this.http
      .post(this.urlCadastro, JSON.stringify(congregacao), { headers: this.headers });
  }

  public buscarPorId(id): Observable<Congregacoes> {
    return this.http
      .get(this.urlBuscarPorId + '/' + id)
      .map(res => res.json());
  }

  public excluir(congregacoes: Congregacoes) {
    return this.http
      .delete(this.urlExcluir + '/' + congregacoes.id)
  }

  public cadastrarRelatorioMensal(relatorioMensal: FinanceiroMensal): Observable<Response> {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');

    return this.http
      .post(this.urlCadastroRelatorioMensal, JSON.stringify(relatorioMensal), { headers: this.headers })
  }

}
