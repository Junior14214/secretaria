import { Dizimistas } from './../model/dizimista';
import { DizimistaService } from './dizimista.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dizimista',
  templateUrl: './dizimista.component.html',
  styleUrls: ['./dizimista.component.css']
})
export class DizimistaComponent implements OnInit {

  dizimista: Dizimistas = new Dizimistas();
  service: DizimistaService;
  lista: Dizimistas[] = [];
  data: Date = new Date();

  constructor(service: DizimistaService) {
    this.service = service;
  }

  public addInput() {
    let dia;

    if(this.data.getDate() >= 10){
      dia = this.data.getDate();
    }else{
      dia = '0' + this.data.getDate();
    }
    
    let mes = this.data.getMonth() + 1;
    this.dizimista.data = (mes < 10)? this.data.getDate() + '/' + '0'+mes + '/' + this.data.getFullYear(): this.data.getDate() + '/' + mes + '/' + this.data.getFullYear()
    this.lista.push(this.dizimista);
    this.dizimista = new Dizimistas();

    console.log(dia);
  }

  public removeLinha(membro) {
    let index = this.lista.indexOf(membro);
    this.lista.splice(index, 1);
  }

  public salvarMinhaBenga() {

    this.service
      .salvar(this.lista)
      .subscribe(res => {
        this.dizimista = new Dizimistas();
        this.lista = [];
        console.log('Salvou')
      })
  }

  ngOnInit() {
  }

}
