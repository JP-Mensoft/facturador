import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../service/storage.service';
import { UsuariosService } from '../../service/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['../../dashboard.component.scss', './navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter();
  @Input() clase: Boolean = true;

  public esAdmin: boolean;
  public esLogout: boolean;

  constructor(private _storage: StorageService, private _api: UsuariosService, private _router: Router) { }

  ngOnInit(): void {
    this.esAdmin = false;
    this.esLogout = false;
    this.comprobarAdmin();
  }

  public comprobarAdmin(): void {
    if (this._storage.estaAutenticado) {
      this._api.checkAdmin().subscribe({
        next: (resultado: any) => {
          if (resultado.estado)
            this.esAdmin = true;
        },
        error: () => { },
        complete: () => { }
      });
    }
  }

  sidebar(estado: boolean) {
    if (estado) {
      this.newItemEvent.emit('')
    } else {
      this.newItemEvent.emit('sb-sidenav-toggled')
    }
    this.clase = !this.clase;
  }

  logout() {
    this.esLogout = true;
    setTimeout(() => {
      this._storage.desconectarSesion();
      this._router.navigate(["/#/au/login"]);
    }, 600);
  }

}
