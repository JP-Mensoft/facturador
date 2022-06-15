import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/dashboard/service/storage.service';
import { RespuestaModel } from 'src/app/models/respuesta.model';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  passVer: boolean = false;
  error: boolean = false;
  loginCorrecto: boolean = false;

  constructor(private _formB: FormBuilder, private _storage: StorageService, private _login: LoginService, private _router: Router) { }

  ngOnInit() {
    this.crearFormulario();
  }

  crearFormulario() {
    this.loginForm = this._formB.group({
      email: [this._storage.extraerEmail(), [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(200)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      guardarEmail: [this._storage.extraerGuardarEmail()]
    });
  }

  cambioVerPass() {
    this.passVer = !this.passVer;
  }

  login() {
    this.error = false;
    this.loginCorrecto = false;
    this.loginForm.get('email').setValue(this.loginForm.get('email').value.toLowerCase());
    this._login.accesoUsuario(this.loginForm.value).subscribe((result: RespuestaModel) => {
      if (result.estado) {
        this.loginCorrecto = true;
        this._storage.guardarEmail(this.loginForm.get('email').value);
        setTimeout(() => {
          this._storage.guardarTokenSesion(result.resultado);
          this._router.navigate(["/m/eventos"]);
        }, 700);
        setTimeout(() => {
          this.loginCorrecto = false;
        }, 1000);
      } else {
        this.error = true;
      }
    }, (error: any) => {
      this.error = true;
    });
  }

  getError(controlName: string): string {
    let error = '';
    const control: any = this.loginForm.get(controlName);
    if (control.touched && control.errors != null) {
      error = JSON.stringify(control.errors);
    }
    return error;
  }

}