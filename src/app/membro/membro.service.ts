import { Router } from '@angular/router';
import { Membros } from './../model/membro';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/observable';
import { Response } from '@angular/http/src/static_response';
import 'rxjs/add/operator/map';
import { Congregacoes } from '../model/congregacoes';

@Injectable()
export class MembroService {

  private http: Http;
  private headers: Headers;
  private url: string = 'http://localhost:8080/secretaria/membro';
  private urlCongregacao = 'http://localhost:8080/congregacoes/lista';
  private urlListarCongregacoesPorNome = 'http://localhost:8080/secretaria/membro/listar'
  private router: Router;

  constructor(http: Http, router: Router) {
    this.http = http;
    this.router = router;
  }

  public lista(): Observable<Membros[]> {

    return this.http
      .get(this.url)
      .map(res => res.json());
  }


  public salvar(membro: Membros): Observable<Response> {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');

    if (membro.id) {
      this.router.navigate(['lista']);
      return this.http
        .put(this.url, JSON.stringify(membro), { headers: this.headers });
    } else {
      return this.http
        .post(this.url, JSON.stringify(membro), { headers: this.headers });
    }
  }

  public buscarPorId(id: number): Observable<Membros> {

    return this.http
      .get(this.url + '/' + id)
      .map(res => res.json());
  }

  public excluir(membro) {

    return this.http
      .delete(this.url + '/' + membro.rol);
  }

  public listarCongregacoes(): Observable<Congregacoes[]> {
    return this.http
      .get(this.urlCongregacao)
      .map(res => res.json());
  }

  public listarMembrosPorCongregacao(congregacao): Observable<Membros[]> {
    return this.http
      .get(this.urlListarCongregacoesPorNome + '/' + congregacao)
      .map(res => res.json());
  }
}
