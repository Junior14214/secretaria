import { Dizimistas } from './../model/dizimista';
import { Observable } from 'rxjs/observable';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RelatorioService {

  private http: Http;
  private headers: Headers;
  private url: string = 'http://localhost:8080/secretaria/dizimista';

  constructor(http: Http) {
    this.http = http;
  }

  public relatorio(data1, data2): Observable<Dizimistas[]> {
    return this.http
      .get(this.url + '/' + data1 + '/' + data2)
      .map(res => res.json())
  }

}
