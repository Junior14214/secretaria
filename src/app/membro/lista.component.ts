import { Router } from '@angular/router';
import { Membros } from './../model/membro';
import { MembroService } from './membro.service';
import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  membro: Membros[] = [];
  service: MembroService;
  displayedColumns = ['position', 'Foto', 'Rol', 'Nome', 'Cargo', 'Congregação', 'Telefone', 'Acao'];
  router: Router;

  constructor(service: MembroService, router: Router) {
    this.service = service;
    this.router = router;

    this.service
      .lista()
      .subscribe(res => {
        this.membro = res;
      }, erro => {
        console.log(erro)
      })
  }

  public editarMembro(id) {
    this.router.navigate(['cadastro/' + id]);
  }

  public excluirMembro(membro) {

    this.service
      .excluir(membro)
      .subscribe(res => {

        let novaLista = this.membro.slice(0);
        let indice = novaLista.indexOf(membro);
        novaLista.splice(indice, 1);
        this.membro = novaLista;

      })

  }

  ngOnInit() {
  }

}
