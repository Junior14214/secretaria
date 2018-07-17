import { Globals } from './../globals';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements OnInit {

  private globals: Globals;

  constructor(globals: Globals) {
    this.globals = globals;

  }

  ngOnInit() {
  }

}
