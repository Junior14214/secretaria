import { Dizimistas } from './../model/dizimista';
import { Observable } from 'rxjs/observable';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RelatorioService {

  private http: Http;
  private headers: Headers;
  private urlRelatorio: string = 'http://localhost:8080/secretaria/dizimista';
  private urlRelatorioGeral: string = 'http://localhost:8080/secretaria/dizimista/total';

  constructor(http: Http) {
    this.http = http;
  }

  public relatorio(tipo ,data1, data2): Observable<Dizimistas[]> {
    return this.http
      .get(this.urlRelatorio + '/' + tipo + '/' + data1 + '/' + data2)
      .map(res => res.json())
  }

  public relatorioGeral(tipo ,data1, data2): Observable<number> {
    return this.http
      .get(this.urlRelatorioGeral + '/' + tipo + '/' + data1 + '/' + data2)
      .map(res => res.json())
  }

}
