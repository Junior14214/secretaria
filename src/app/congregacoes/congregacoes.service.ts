import { Observable } from 'rxjs/observable';
import { Congregacoes } from './../model/congregacoes';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Router } from '../../../node_modules/@angular/router';
import { Response } from '@angular/http/src/static_response';
import 'rxjs/add/operator/map';


@Injectable()
export class CongregacoesService {

  private http: Http;
  private headers: Headers;
  private urlCadastro: string = 'http://localhost:8080/congregacoes/cadastrar';
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

}
