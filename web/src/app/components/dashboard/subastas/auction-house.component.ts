import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../service/utils.service';
import { EventosService } from '../../service/eventos.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './auction-house.component.html',
  styleUrls: ['./auction-house.component.scss']
})
export class AuctionHouseComponent implements OnInit {

  eventos: any[] = [];
  buscarActivo: boolean = false;
  filtroFE: string = "";
  filtroPRComparador: string = "";
  filtroPRCantidad: number = null;

  constructor(
    private _api: EventosService,
    private _utils: UtilsService
  ) { }

  ngOnInit(): void {
    this._api.getAllEventos().subscribe((result: any) => {
      this.eventos = this.filtrarEstado(result.resultado.reverse());
      this.eventos.forEach(evento => {
        evento.fecha = this._utils.transformarFecha(evento.fecha);
        evento.especie = this._utils.transformarEspecie(evento.especie);
      });
    });
  }

  calcularTiempo(interval: any, fecha: any) {
    return this._utils.calcularTiempo(interval, fecha);
  }

  filtrarEstado(eventosOld: any[]): any[] {
    const eventosNew: any[] = [];
    eventosOld.forEach(e => {
      if (e.estado) {
        eventosNew.push(e);
      }
    });
    return eventosNew;
  }

  public activarBuscar(): void {
    this.buscarActivo = !this.buscarActivo;
    this.filtroFE = "";
    this.filtroPRComparador = "";
    this.filtroPRCantidad = null;
  }

}
