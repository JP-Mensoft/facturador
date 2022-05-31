import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseModel } from 'src/app/models/responseModel';
import { UserAccessModel } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;

  public displayedPassword: boolean;
  public showSpinnerLogin: boolean;
  public showErrorLogin: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    private _auth: AuthService,
    private _storage: StorageService,
    private _router: Router
  ) {
    this.displayedPassword = false;
    this.showSpinnerLogin = false;
    this.showErrorLogin = false;
  }

  ngOnInit(): void {
    this.buildForms();
  }

  public buildForms(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  public showPassword(): void {
    this.displayedPassword = !this.displayedPassword;
  }

  public attemptAccess() {
    this.showSpinnerLogin = true;
    const loginData: UserAccessModel = new UserAccessModel(
      this.loginForm.get('email').value,
      this.loginForm.get('password').value
    );
    this._auth.attempAccess(loginData).subscribe({
      next: (response: ResponseModel) => {
        if (response.success) {
          this._storage.set("token", response.result).then(() => {
            this._router.navigate(["/dashboard"]);
            this.clearForm();
            this.showSpinnerLogin = false;
          });
        }
      },
      error: () => {
        setTimeout(() => {
          this.showSpinnerLogin = false;
          this.showErrorLogin = true;
        }, 1000);
        setTimeout(() => {
          this.showErrorLogin = false;
        }, 2000);
      },
      complete: () => { }
    });
  }

  public clearForm(): void {
    this.loginForm.reset();
  }

  public goRegister(): void {
    this.clearForm();
    this._router.navigate(['auth/register']);
  }

}
