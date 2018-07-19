import { Observable } from 'rxjs/observable';
import { Dizimistas } from './../model/dizimista';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http/src/static_response'
import 'rxjs/add/operator/map';

@Injectable()
export class DizimistaService {

  private http: Http;
  private headers: Headers;
  private url: string = 'http://localhost:8080/secretaria/dizimista';
  private urlRelatorioCongregacao = 'http://localhost:8080/secretaria/relatorio/congregacao';
  private urlRelatorioCampo = 'http://localhost:8080/secretaria/relatorio/campo';


  constructor(http: Http) {

    this.http = http;

  }

  public salvar(dizimista): Observable<Response> {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');

    /* lista.push({"nome": dizimista[0].nome}, {"valor": dizimista[0].valor}); */


    return this.http
      .post(this.url, dizimista, { headers: this.headers });
  }

  public relatorioEntradasCongregacao(congregacao): Observable<Response[]> {
    return this.http
      .get(this.urlRelatorioCongregacao + '/' + congregacao)
      .map(res => res.json());
  }

  public relatorioEntradasCampo(): Observable<Response[]> {
    return this.http
      .get(this.urlRelatorioCampo)
      .map(res => res.json());
  }

  

}
