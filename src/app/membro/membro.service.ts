import { Usuario } from './../model/usuario';
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
  private url: string = 'http://www.secretariaonlineadmco.com.br//secretaria/membro';
  private urlCongregacao = 'http://www.secretariaonlineadmco.com.br//congregacoes/lista';
  private urlListarCongregacoesPorNome = 'http://www.secretariaonlineadmco.com.br//secretaria/membro/listar';
  private urlRelatorioMembrosCongregacao = 'http://www.secretariaonlineadmco.com.br//secretaria/membro/cogregacao';
  private urlRelatorioMembrosCampo = 'http://www.secretariaonlineadmco.com.br//secretaria/membro/campo';
  private urlListaUsuarios = 'http://www.secretariaonlineadmco.com.br//usuario/listar';
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
      .delete(this.url + '/' + membro.id);
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

  public relatorioMembrosCongregacoes(congregacao, situacao): Observable<number> {
    return this.http
      .get(this.urlRelatorioMembrosCongregacao + '/' + congregacao + '/' + situacao)
      .map(res => res.json());
  }

  public relatorioMembrosCampo(situacao): Observable<number> {
    return this.http
      .get(this.urlRelatorioMembrosCampo + '/' + situacao)
      .map(res => res.json());
  }

  public listarUsuarios(): Observable<Usuario[]> {
    return this.http
      .get(this.urlListaUsuarios)
      .map(res => res.json());
  }
}
