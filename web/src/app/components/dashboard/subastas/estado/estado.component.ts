import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { SubastasService } from '../../../service/subastas.service';
import { UsuariosService } from '../../../service/usuarios.service';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.scss']
})
export class EstadoComponent implements OnInit {
  @Input() id_evento: any;
  @Input() precio_inicial: any;
  @Output() newItemEvent = new EventEmitter();
  id_usuario = 'X';
  id_ultimaPuja = 'O';
  precio = 0;
  resultado: any;

  constructor(
    public _apiUsu: UsuariosService,
    public _apiSub: SubastasService
  ) { }

  ngOnInit(): void {
    this.descargarEstado();
    this.resultado = setInterval(() => {
      this.descargarEstado();
    }, 3000);
  }

  ngOnDestroy(): void {
    clearInterval(this.resultado);
  }

  descargarEstado() {
    this._apiUsu.checkjwt().subscribe({
      next: (u: any) => {
        if (u.estado) {
          this.extraerIdUsuario(u.resultado._id);
          this._apiSub.getUltimaPuja(this.id_evento).subscribe({
            next: (r: any) => {
              if (r.estado) {
                this.estadoSubasta(r.resultado);
              } else {
                this.precio = this.precio_inicial;
              }
            },
            error: (r: any) => {
              console.log(r);
            },
            complete: () => {

            }
          });
        }
      },
      error: (u: any) => {
        console.log(u);
      },
      complete: () => {
      }
    });
  }

  estadoSubasta(e: any) {
    if (e.precio != this.precio) {
      this.newItemEvent.emit(e.precio);
      this.precio = e.precio;
    }
    this.id_ultimaPuja = e.id_usuario;
  }

  extraerIdUsuario(id_usuario: any) {
    this.id_usuario = id_usuario;
  }
}
