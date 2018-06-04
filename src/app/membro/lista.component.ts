import { MembroService } from './membro.service';
import { Membros } from './../../model/membro';
import { Component, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  membro: Membros[] = [];
  service: MembroService;
  displayedColumns = ['position' ,'Nome', 'Cargo', 'Congregação', 'Telefone' ];

  constructor(service: MembroService) {
    this.service = service;

    this.service
      .lista()
      .subscribe(res => {
        this.membro = res;
      }, erro => {
        console.log(erro)
      })
  }

  ngOnInit() {
  }

}
