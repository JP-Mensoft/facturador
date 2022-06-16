import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['../../dashboard.component.scss', './side.component.scss']
})
export class SideComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter();
  @Input() class: Boolean = true;

  public usuario: any = {};
  public menuItems: any[] = [];
  public titleItems: any[] = [];

  constructor() { }

  ngOnInit(): void {
    let titulos = [];
    this.menuItems = ROUTES;
    for (let i = 0; i < this.menuItems.length; i++) {
      const item = this.menuItems[i];
      titulos.push(item.group);
    }
    this.titleItems = [...new Set(titulos)];
  }

  sidebar(status: boolean) {
    if (status) {
      this.newItemEvent.emit('')
    } else {
      this.newItemEvent.emit('sb-sidenav-toggled')
    }
    this.class = !this.class;
  }

}

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  group: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard/emit', title: 'Emitir Factura', icon: 'iconoNav bi-send-fill', class: 'sb-nav-link-icon', group: 'Secciones' },
  { path: '/dashboard/invoices', title: 'Facturas', icon: 'iconoNav bi bi-folder-fill', class: 'sb-nav-link-icon', group: 'Secciones' },
  { path: '/dashboard/customers', title: 'Clientes', icon: 'iconoNav bi bi-people-fill', class: 'sb-nav-link-icon', group: 'Secciones' }
];

