import { Congregacoes } from './../model/congregacoes';
import { Membros } from './../model/membro';
import { MembroService } from './membro.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Globals } from '../globals';

@Component({
  selector: 'app-membro',
  templateUrl: './membro.component.html',
  styleUrls: ['./membro.component.css']
})
export class MembroComponent implements OnInit {

  membro: Membros = new Membros();
  listaCongregacoes: Congregacoes[];
  service: MembroService;
  route: ActivatedRoute;
  router: Router;
  base64textString: string = "";

  constructor(service: MembroService, route: ActivatedRoute, router: Router, private globals: Globals) {
    this.service = service;
    this.route = route;
    this.router = router;
    this.membro.situacao = 'Pre Cadastro';

    this.route.params.subscribe(params => {
      let id = params['id'];

      if (id) {
        this.service
          .buscarPorId(id)
          .subscribe(membro => this.membro = membro, erro => console.log(erro));
      }
    })

    this.service.listarCongregacoes()
      .subscribe(lista => this.listaCongregacoes = lista, erro => console.log(erro));
  }

  public salvar(event) {

    event.preventDefault();

    this.service
      .salvar(this.membro)
      .subscribe(res => {
        this.membro = new Membros();
        this.membro.situacao = 'Pre Cadastro';
        this.base64textString = '';
      }, erro => {
        console.log(erro);
      })
  }

  public upload() {

  }

  handleFileSelect(evt) {
    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();

      reader.onload = this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = "data:image/png;base64," + btoa(binaryString);
    this.membro.foto = this.base64textString;

  }


  ngOnInit() {
  }

}
