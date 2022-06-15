import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from '../../service/utils.service';
import { EventosService } from '../../service/eventos.service';
import { SubastasService } from '../../service/subastas.service';

@Component({
  selector: 'app-subasta',
  templateUrl: './subasta.component.html',
  styleUrls: ['./subasta.component.scss']
})
export class SubastaComponent implements OnInit {

  evento: any = {};
  precio: number = 0;
  precio_puja: number = 0;
  _id: string = '';
  pujaFallida: boolean = false;
  pujaCorrecta: boolean = false;

  constructor(private rutaActiva: ActivatedRoute, private _apiEve: EventosService, private _apiSub: SubastasService, private _utils: UtilsService, private _router: Router) { }

  ngOnInit(): void {
    this._id = this.rutaActiva.snapshot.params['id'];
    this._apiEve.getOneEvento(this._id).subscribe((evento: any) => {
      this.evento = evento.resultado;
      this.evento.fecha = this._utils.transformarFecha(this.evento.fecha);
      this.evento.especie = this._utils.transformarEspecie(this.evento.especie);
      this._apiSub.getUltimaPuja(this._id).subscribe((subasta: any) => {
        if (subasta.estado) {
          this.precio = Number(subasta.resultado.precio);
          this.precio_puja = Number(subasta.resultado.precio) + 1;
        } else {
          this.precio = Number(this.evento.precio);
          this.precio_puja = Number(this.evento.precio) + 1;
        }
      });
      if (!this.evento.estado) {
        this._router.navigateByUrl('/m/eventos');
      }
    });
  }

  estadoSubasta(e: any) {
    this.precio_puja = Number(e) + 1;
  }

  calcularTiempo(interval: any, fecha: any) {
    return this._utils.calcularTiempo(interval, fecha);
  }

  pujar() {
    this.pujaFallida = false;
    this.pujaCorrecta = false;
    if (Number(this.precio) >= Number(this.precio_puja)) {
      this.pujaFallida = true;
    } else {
      this._apiSub.addPuja(this.evento._id, this.precio_puja).subscribe({
        next: (r: any) => {
          if (r.estado) {
            this.pujaCorrecta = true;
            this.precio = this.precio_puja;
          } else {
            this.pujaFallida = true;
          }
        },
        error: () => {
          this.pujaFallida = true;
        },
        complete: () => { }
      });
    }
  }

}

