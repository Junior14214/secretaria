import { Globals } from './../globals';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../model/usuario';
import { UsuarioService } from '../usuario/usuario.service';

@Component({
  selector: 'app-alteracao-de-dados',
  templateUrl: './alteracao-de-dados.component.html',
  styleUrls: ['./alteracao-de-dados.component.css']
})
export class AlteracaoDeDadosComponent implements OnInit {

  globals: Globals;
  usuario: Usuario = new Usuario();
  usuarioService: UsuarioService;
  base64textString: string = "";
  progressBar: boolean = false;

  constructor(globals: Globals, usuarioService: UsuarioService) {
    this.globals = globals;
    this.usuarioService = usuarioService;

    this.usuario = this.globals.informacoesUsuarioLogado;
  }

  public alterarUsuario() {
    this.progressBar = true;

    this.usuarioService.cadastrar(this.usuario)
      .subscribe(res => {
        this.globals.abrirAlerta('success', 'Dados alterados com sucesso!');
        this.progressBar = false;
      })
  }

  handleFileSelect(evt) {
    var files = evt.target.files;
    var file = files[0];

    if (file.size <= 512000) {
      if (files && file) {
        var reader = new FileReader();

        reader.onload = this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
      }
    } else {
      this.globals.abrirAlerta('error', 'A imagem deve ter no máximo 500Kb');
    }


  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = "data:image/png;base64," + btoa(binaryString);
    this.usuario.foto = this.base64textString;

  }

  ngOnInit() {
  }

}
