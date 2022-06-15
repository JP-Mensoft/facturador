import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsuariosService } from '../../service/usuarios.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  group: string;
  rol: string;
  barco: boolean;
}

export const ROUTES: RouteInfo[] = [
  { path: '/m/auction-house', title: 'Casa de Subastas', icon: 'iconoNav bi bi-house-door', class: 'sb-nav-link-icon', group: 'Navegación', rol: '0000', barco: false },
  { path: '/m/mis-subastas', title: 'Mis Subastas', icon: 'iconoNav bi bi-house-door-fill', class: 'sb-nav-link-icon', group: 'Navegación', rol: '0001', barco: true },
  { path: '/m/mis-pujas', title: 'Mis Pujas', icon: 'iconoNav bi bi-house-door-fill', class: 'sb-nav-link-icon', group: 'Navegación', rol: '0001', barco: false }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../../dashboard.component.scss', './sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter();
  @Input() clase: Boolean = true;

  usuario: any = {};
  menuItems: any[] = [];
  titleItems: any[] = [];

  constructor(private _api: UsuariosService) { }

  ngOnInit(): void {
    this._api.checkjwt().subscribe((result: any) => {
      let titulos = [];
      if (result.estado) {
        this.usuario = result.resultado;
        if (this.usuario.rol === '0000') {
          this.menuItems = ROUTES.filter(menuItem => menuItem);
        } else if (this.usuario.id_barco != '0') {
          this.menuItems = ROUTES.filter(menuItem => { return menuItem.barco || menuItem.rol === "0000" });
        } else {
          this.menuItems = ROUTES.filter(menuItem => { return !menuItem.barco && (menuItem.rol === this.usuario.rol || menuItem.rol === "0000") });
        }
        for (let i = 0; i < this.menuItems.length; i++) {
          const item = this.menuItems[i];
          titulos.push(item.group);
        }
        this.titleItems = [...new Set(titulos)];
      };
    });
  }

  sidebar(estado: boolean) {
    if (estado) {
      this.newItemEvent.emit('')
    } else {
      this.newItemEvent.emit('sb-sidenav-toggled')
    }
    this.clase = !this.clase;
  }
}
