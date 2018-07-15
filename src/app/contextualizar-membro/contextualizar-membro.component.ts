import { Membros } from './../model/membro';
import { MembroService } from './../membro/membro.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import * as html2canvas from "html2canvas";
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-contextualizar-membro',
  templateUrl: './contextualizar-membro.component.html',
  styleUrls: ['./contextualizar-membro.component.css']
})
export class ContextualizarMembroComponent implements OnInit {

  private route: ActivatedRoute;
  private service: MembroService;
  private membro: Membros;

  constructor(route: ActivatedRoute, service: MembroService) {
    this.route = route;
    this.service = service;

    this.route.params.subscribe(params => {
      let id = params['id'];

      if (id) {
        this.service.buscarPorId(id)
          .subscribe(res => {
            this.membro = res;
          })
      }
    })
  }

  public gerarPDF() {
    var element = document.getElementById('capture');
    var opt = {
      margin: 0.2,
      filename: 'Ficha_de_membro.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { width: 1000 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // New Promise-based usage:
    html2pdf().from(element).set(opt).save();
  }

  ngOnInit() {
  }

}
