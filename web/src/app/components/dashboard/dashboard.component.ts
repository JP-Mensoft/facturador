import { Component, OnInit } from '@angular/core';
import { UsuariosService } from './service/usuarios.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  clase: Boolean = true;
  evento: String = '';
  constructor(public _api: UsuariosService) { }

  ngOnInit(): void {

  }

  sidebar(evento: any) {
    this.evento = evento;
    this.clase = !this.clase;
  }

  onActivate(event: any) {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
