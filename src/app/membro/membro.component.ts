import { Membros } from './../model/membro';
import { MembroService } from './membro.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-membro',
  templateUrl: './membro.component.html',
  styleUrls: ['./membro.component.css']
})
export class MembroComponent implements OnInit {

  membro: Membros = new Membros();
  service: MembroService;
  route: ActivatedRoute;
  router: Router;

  constructor(service: MembroService, route: ActivatedRoute, router: Router) {
    this.service = service;
    this.route = route;
    this.router = router;

    this.route.params.subscribe(params => {
      let id = params['id'];

      if (id) {
        this.service
          .buscarPorId(id)
          .subscribe(membro => this.membro = membro, erro => console.log(erro));
      }
    })
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
