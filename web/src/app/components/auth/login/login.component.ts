import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseModel } from 'src/app/models/responseModel';
import { UserAccessModel } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public passVer: boolean = false;
  public error: boolean = false;
  public loginCorrecto: boolean = false;

  constructor(
    private _formB: FormBuilder,
    private _storage: StorageService,
    private _auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.crearFormulario();
    this._storage.clear();
  }

  crearFormulario() {
    this.loginForm = this._formB.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  cambioVerPass() {
    this.passVer = !this.passVer;
  }

  public attemptAccess() {
    this.error = false;
    this.loginCorrecto = false;
    const loginData: UserAccessModel = new UserAccessModel(
      this.loginForm.get('email').value,
      this.loginForm.get('password').value
    );
    this._auth.attempAccess(loginData).subscribe({
      next: (response: ResponseModel) => {
        if (response.success) {
          this.loginCorrecto = true;
          setTimeout(() => {
            this._storage.set("token", response.result.token);
            this._storage.set("email", response.result.email);
            this._router.navigate(["/dashboard"]);
          }, 500);
          setTimeout(() => {
            this.loginCorrecto = false;
            this.clearForm();
          }, 1000);
        }
      },
      error: () => {
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 500);
      },
      complete: () => { }
    });
  }

  public goRegister(): void {
    this._router.navigate(['auth/register']);
    this.clearForm();
  }

  public clearForm(): void {
    this.loginForm.reset();
  }

}