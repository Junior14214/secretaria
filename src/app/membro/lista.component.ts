import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { Membros } from './../model/membro';
import { MembroService } from './membro.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements AfterViewInit {

  displayedColumns = ['Foto', 'Rol', 'Nome', 'Cargo', 'Congregação', 'Telefone', 'Acao'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  membro: Membros[] = [];
  service: MembroService;
  router: Router;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(service: MembroService, router: Router) {
    this.service = service;
    this.router = router;

  }

  public editarMembro(id) {
    ELEMENT_DATA = [];
    this.router.navigate(['cadastro/' + id]);
  }

  public excluirMembro(membro) {

    this.service
      .excluir(membro)
      .subscribe(res => {
        let novaLista = this.dataSource.data.slice(0);
        let indice = novaLista.indexOf(membro);
        novaLista.splice(indice, 1);
        this.dataSource.data = novaLista;
        
      })

  }

  ngAfterViewInit() {
    this.service
      .lista()
      .subscribe(res => {
        res.forEach(function (item) {
          ELEMENT_DATA.push({ foto: item.foto, rol: item.id, nome: item.nome, cargo: item.cargo, congregacao: item.congregacao, telefone: item.telefone })
        })
        this.dataSource.paginator = this.paginator;
      }, erro => {
        console.log(erro)
      })

  }
}

export interface Element {
  foto: string,
  rol: number,
  nome: string,
  cargo: string;
  congregacao: string
  telefone: string
}

let ELEMENT_DATA: Element[] = [];