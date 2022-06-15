import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../service/utils.service';
import { EventosService } from '../../service/eventos.service';

@Component({
  selector: 'app-mis-subastas',
  templateUrl: './mis-subastas.component.html',
  styleUrls: ['./mis-subastas.component.scss']
})
export class MisSubastasComponent implements OnInit {

  subastas: any[] = [];
  filtro: string = "";
  buscarActivo: boolean = false;

  constructor(private _api: EventosService, private _utils: UtilsService) { }

  ngOnInit(): void {
    this._api.getAllEventosBarco().subscribe((result: any) => {
      this.subastas = result.resultado.reverse();
      this.subastas.forEach(evento => {
        evento.fecha = this._utils.transformarFecha(evento.fecha);
        evento.especie = this._utils.transformarEspecie(evento.especie);
      });
    });
  }

  calcularTiempo(interval: any, fecha: any) {
    return this._utils.calcularTiempo(interval, fecha);
  }

  cambiarEstado(i: any) {
    let evento = this.subastas[i];
    if (evento.estado) {
      evento.estado = false;
      this._api.setEvento(evento).subscribe({
        next: (r: any) => {
          if (!r.estado) {
            evento.estado = !evento.estado;
          }
        },
        error: (r: any) => {
          evento.estado = !evento.estado;
        },
        complete: () => {

        }
      });
    }
  }

  cerrarTodas() {
    for (let e = 0; e < this.subastas.length; e++) {
      let evento = this.subastas[e];
      if (evento.estado) {
        evento.estado = false;
        this._api.setEvento(evento).subscribe({
          next: (r: any) => {
            if (!r.estado) {
              evento.estado = !evento.estado;
            }
          },
          error: (r: any) => {
            evento.estado = !evento.estado;
          },
          complete: () => {

          }
        });
      }
    }
  }

  eliminarSubasta(evento: any, i: any) {
    this._api.deleteEvento(evento._id).subscribe({
      next: (r: any) => {
        if (r.estado) {
          this.subastas.splice(i, 1);
        }
      },
      error: () => {

      },
      complete: () => { }
    });
  }

  public activarBuscar(): void {
    this.buscarActivo = !this.buscarActivo;
    this.filtro = "";

  }

}
