import { FinanceiroDiario } from './../model/financeiro_diario';
import { Congregacoes } from './../model/congregacoes';
import { Dizimistas } from './../model/dizimista';
import { Observable } from 'rxjs/observable';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { FinanceiroMensal } from '../model/financeiro_mensal';

@Injectable()
export class RelatorioService {

  private http: Http;
  private headers: Headers;
  private urlRelatorio: string = 'http://www.secretariaonlineadmco.com.br//secretaria/dizimista';
  private urlRelatorioGeral: string = 'http://www.secretariaonlineadmco.com.br//secretaria/dizimista/total';
  private urlRelatorioGeralSede: string = 'http://www.secretariaonlineadmco.com.br//secretaria/repasseCongregacoes'
  private urlRelatorioFinanceiroDiario: string = 'http://www.secretariaonlineadmco.com.br//financeiro/diario'
  private urlRelatorioFinanceiroMensal: string = 'http://www.secretariaonlineadmco.com.br//financeiro/mensal'

  constructor(http: Http) {
    this.http = http;
  }

  public relatorio(tipo, congregacao, data1, data2): Observable<Dizimistas[]> {
    return this.http
      .get(this.urlRelatorio + '/' + tipo + '/' + congregacao + '/' + data1 + '/' + data2)
      .map(res => res.json())
  }

  public relatorioGeral(tipo, congregacao, data1, data2): Observable<number> {
    return this.http
      .get(this.urlRelatorioGeral + '/' + tipo + '/' + congregacao + '/' + data1 + '/' + data2)
      .map(res => res.json())
  }

  public relatorioGeralaSede(tipo, data1, data2): Observable<Response[]> {
    return this.http
      .get(this.urlRelatorioGeralSede + '/' + tipo + '/' + data1 + '/' + data2)
      .map(res => res.json())
  }

  public relatorioFinanceiroDiario(congregacao): Observable<FinanceiroDiario> {
    return this.http
      .get(this.urlRelatorioFinanceiroDiario + '/' + congregacao)
      .map(res => res.json())
  }

  public relatorioFinanceiroMensal(congregacao): Observable<FinanceiroMensal> {
    return this.http
      .get(this.urlRelatorioFinanceiroMensal + '/' + congregacao)
      .map(res => res.json());
  }


}
