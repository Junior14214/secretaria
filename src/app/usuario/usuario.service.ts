import { Response } from '@angular/http/src/static_response';
import { Usuario } from './../model/usuario';
import { Observable } from 'rxjs/Observable';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UsuarioService {

  private http: Http;
  private header: Headers;
  private url: string = "http://localhost:8080/usuario";

  constructor(http: Http) {
    this.http = http;
  }

  public cadastrar(usuario): Observable<Response> {
    this.header = new Headers();
    this.header.append('Content-Type', 'application/json', );

    return this.http.post(this.url, JSON.stringify(usuario), { headers: this.header });
  }

  public buscarInformacoesUsuarioLogado(uid): Observable<Usuario> {
    return this.http
      .get(this.url + "/" + uid)
      .map(res => res.json());
  }

}
