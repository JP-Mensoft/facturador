import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AjustesModel } from 'src/app/models/ajustes.model';
import { RespuestaModel } from 'src/app/models/respuesta.model';
import { StorageService } from '../../service/storage.service';
import { UsuariosService } from '../../service/usuarios.service';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss']
})
export class AjustesComponent implements OnInit {

  public ajustesForm: FormGroup;
  public modPass: boolean;
  public showPass: boolean;
  public modCorrecta: boolean;
  public modIncorrecta: boolean;
  public esBarco: boolean;

  constructor(private _formB: FormBuilder, private _storage: StorageService, private _api: UsuariosService) { }

  ngOnInit(): void {
    this.modPass = false;
    this.showPass = false;
    this.modCorrecta = false;
    this.modIncorrecta = false;
    this.esBarco = false;
    this.crearFormulario();
    this.comprobarBarco();
  }

  public comprobarBarco(): void {
    this._api.comprobarBarco().subscribe({
      next: (resultado) => {
        this.esBarco = resultado.estado;
        if (this.esBarco) {
          this._storage.guardarBarco(resultado.resultado);
          this.ajustesForm.get('barco').setValue(this._storage.extraerBarco());
        }
      },
      error: () => {

      },
      complete: () => { }
    });
  }

  public displayPass(): void {
    this.showPass = !this.showPass;
  }

  public showNewPass(): void {
    this.modPass = !this.modPass;
    this.limpiar();
  }

  public limpiar(): void {
    this.showPass = false;
    this.ajustesForm.get('email').setValue(this._storage.extraerEmail());
    this.ajustesForm.get('barco').setValue(this._storage.extraerBarco());
    this.ajustesForm.get('oldPassword').setValue("");
    this.ajustesForm.get('newPassword').setValue("");
    this.ajustesForm.get('newPassword2').setValue("");
  }

  public crearFormulario(): void {
    this.ajustesForm = this._formB.group({
      email: [this._storage.extraerEmail(), [Validators.required, Validators.email]],
      barco: ["", [Validators.minLength(6)]],
      oldPassword: ["", [Validators.required, Validators.minLength(6)]],
      newPassword: ["", [Validators.minLength(6)]],
      newPassword2: ["", [Validators.minLength(6)]]
    });
  }

  public async modificarDatos() {
    this.modCorrecta = false;
    this.modIncorrecta = false;
    const ajustesUsuario: AjustesModel = new AjustesModel(
      this.ajustesForm.get('email').value,
      this.ajustesForm.get('barco').value,
      this.ajustesForm.get('oldPassword').value,
      this.ajustesForm.get('newPassword').value,
      this.ajustesForm.get('newPassword2').value
    );
    if (this.modPass) {
      if (ajustesUsuario.newPassword != "" && ajustesUsuario.newPassword2 != "" && ajustesUsuario.newPassword === ajustesUsuario.newPassword2) {
        this._api.modificarAjustesUsuario(ajustesUsuario).subscribe({
          next: (result: RespuestaModel) => {
            this._storage.guardarEmail(result.resultado.email);
            this._storage.guardarBarco(result.resultado.id_barco);
            this.lanzarCorrecta();
            this.limpiar();
            this.modPass = false;
          },
          error: () => {
            this.lanzarIncorrecta();
          },
          complete: () => { }
        });
      } else {
        this.lanzarIncorrecta();
      }
    } else {
      this._api.modificarAjustesUsuario(ajustesUsuario).subscribe({
        next: (result: RespuestaModel) => {
          this._storage.guardarEmail(result.resultado.email);
          this._storage.guardarBarco(result.resultado.id_barco);
          this.lanzarCorrecta();
          this.limpiar();
        },
        error: () => {
          this.lanzarIncorrecta();
        },
        complete: () => { }
      });
    }

  }

  public lanzarCorrecta(): void {
    this.modCorrecta = true;
    setTimeout(() => {
      this.modCorrecta = false;
    }, 800);
  }

  public lanzarIncorrecta(): void {
    this.modIncorrecta = true;
    setTimeout(() => {
      this.modIncorrecta = false;
    }, 800);
  }

}
