import { MembroService } from './membro.service';
import { Membros } from './../../model/membro';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-membro',
  templateUrl: './membro.component.html',
  styleUrls: ['./membro.component.css']
})
export class MembroComponent implements OnInit {

  membro: Membros = new Membros();
  service: MembroService;

  constructor(service: MembroService) {
    this.service = service;
  }

  public salvar(event) {

    event.preventDefault();

    this.service
      .salvar(this.membro)
      .subscribe(res => {
        this.membro = new Membros();
        console.log('salvou mizeravi');
      }, erro => {
        console.log(erro);
      })
  }

  ngOnInit() {
  }

}
