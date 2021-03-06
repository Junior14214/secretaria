import { CongregacoesService } from './../congregacoes/congregacoes.service';
import { Congregacoes } from './../model/congregacoes';
import { Globals } from './../globals';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Membros } from './../model/membro';
import { MembroService } from './membro.service';
import { Component, AfterContentChecked, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements AfterContentChecked {

  displayedColumns = ['Foto', 'Rol', 'Nome', 'Cargo', 'Congregação', 'Telefone', 'Acao'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
  membro: Membros[] = [];
  service: MembroService;
  congregacaoService: CongregacoesService;
  router: Router;
  globals: Globals;
  validador = true;
  congregacoes: Congregacoes[];
  congregacaoSelecionada: string;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(service: MembroService, router: Router, globals: Globals, congregacaoService: CongregacoesService) {
    this.service = service;
    this.router = router;
    this.globals = globals;
    this.congregacaoService = congregacaoService;

    this.service.listarCongregacoes()
      .subscribe(res => {
        this.congregacoes = res;
      });

  }

  public editarCongregacao(id) {
    this.router.navigate(['/lista/' + id])
  }

  public teste(congregacao) {
    this.service.listarMembrosPorCongregacao(congregacao)
      .subscribe(res => {
        let novaLista;
        novaLista = res;
        this.dataSource.data = novaLista;
      })
  }

  public editarMembro(id) {
    ELEMENT_DATA = [];
    this.router.navigate(['cadastro/' + id]);
  }

  public contextualizarMembro(id) {
    this.router.navigate(['contextualizar/' + id]);
  }

  public excluirMembro(membro) {

    this.service
      .excluir(membro)
      .subscribe(res => {
        let novaLista = this.dataSource.data.slice(0);
        let indice = novaLista.indexOf(membro);
        novaLista.splice(indice, 1);
        this.dataSource.data = novaLista;
        this.globals.abrirAlerta('success', 'Membro excluído com sucesso!');
      }, error => {
        this.globals.abrirAlerta('error', 'Não foi possível excluir o membro ' + error);
      })

  }

  public excluirCongregacao(congregacoes) {
    this.congregacaoService.excluir(congregacoes)
      .subscribe(res => {
        let nova_lista = this.congregacoes.slice(0);
        let indice = nova_lista.indexOf(congregacoes);
        nova_lista.splice(indice, 1);
        this.congregacoes = nova_lista;
      })
  }

  ngAfterContentChecked() {
    //Verifica se o método já foi acessado
    if (this.validador) {
      let congregacao = '';
      //Verifica se a lista de membros já foi preenchida, caso não esteja ele seta o valor da congregação do usuário logado na variavel congregacao
      if (ELEMENT_DATA.length == 0) {
        congregacao = this.globals.informacoesUsuarioLogado.congregacao;
      }
      this.service
        .lista()
        .subscribe(res => {
          res.forEach(function (item) {
            //Apenas as congregações do usuário logado são inseridas na lista
            if (item.congregacao == congregacao) {
              ELEMENT_DATA.push({ foto: item.foto, id: item.id, rol: item.rol, nome: item.nome, cargo: item.cargo, congregacao: item.congregacao, telefone: item.telefone, situacao: item.situacao })
            }
          })
          //Seta as propriedaes da lista preenchida na paginação
          this.dataSource.paginator = this.paginator;
        }, erro => {
          console.log(erro)
        })
      //Depois que a lista já foi preenchida seta false no validador para que o método seja acessado uma única vez quando a página é carregada
      this.validador = false;
    }
  }
}

export interface Element {
  foto: string,
  id: number,
  rol: number,
  nome: string,
  cargo: string;
  congregacao: string
  telefone: string,
  situacao: string
}

let ELEMENT_DATA: Element[] = [];