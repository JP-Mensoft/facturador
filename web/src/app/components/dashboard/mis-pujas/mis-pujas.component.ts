import { Component, OnInit } from '@angular/core';
import { PujaModel } from 'src/app/models/puja.model';
import { RespuestaModel } from 'src/app/models/respuesta.model';
import { SubastaModel } from 'src/app/models/subasta.model';
import { EventosService } from '../../service/eventos.service';
import { SubastasService } from '../../service/subastas.service';
import { UtilsService } from '../../service/utils.service';

@Component({
  selector: 'app-mis-pujas',
  templateUrl: './mis-pujas.component.html',
  styleUrls: ['./mis-pujas.component.scss']
})
export class MisPujasComponent implements OnInit {

  private pujas: PujaModel[];
  public subastas: SubastaModel[];

  constructor(
    private _subastas: SubastasService,
    private _eventos: EventosService,
    private _utils: UtilsService
  ) { }

  ngOnInit(): void {
    this.getSubastasUsuario();
  }

  public getSubastasUsuario(): void {
    this._subastas.getAllPujasUsuario().subscribe({
      next: (resultado: RespuestaModel) => {
        this.pujas = resultado.resultado;
        console.log(this.pujas);
      },
      error: () => { },
      complete: () => { }
    });
  }

}
