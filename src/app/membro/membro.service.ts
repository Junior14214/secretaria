import { Membros } from './../../model/membro';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/observable';
import { Response } from '@angular/http/src/static_response';
import 'rxjs/add/operator/map';

@Injectable()
export class MembroService {

  private http: Http;
  private headers: Headers;
  private url: string = 'http://localhost:8080/secretaria/membro';

  constructor(http: Http) {
    this.http = http;
  }

  public lista(): Observable<Membros[]> {

    return this.http
      .get(this.url)
      .map(res => res.json());
  }


  public salvar(membro: Membros): Observable<Response> {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');

    return this.http
      .post(this.url, JSON.stringify(membro), { headers: this.headers });
  }
}
