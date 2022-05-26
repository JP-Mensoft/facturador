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
  public loginError: boolean;
  public loginSuccess: boolean;
  public displayedPassword: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private _auth: AuthService,
    private _storage: StorageService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
    this.loginError = false;
    this.loginSuccess = false;
    this.displayedPassword = false;
  }

  public buildForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  public showPassword(): void {
    this.displayedPassword = !this.displayedPassword;
  }

  public attemptAccess() {
    this.loginError = false;
    this.loginSuccess = false;
    const loginData: UserAccessModel = new UserAccessModel(this.loginForm.get('email').value, this.loginForm.get('password').value);
    this._auth.attempAccess(loginData).subscribe({
      next: async (response: ResponseModel) => {
        if (response.success) {
          this.loginSuccess = true;
          await this._storage.set("token", response.result);
          setTimeout(() => {
            this._router.navigate(["/dashboard"]);
          }, 400);
        }
      },
      error: () => {
        this.loginError = true;
      },
      complete: () => { }
    });
  }

  public goRegister(): void {
    this._router.navigate(['auth/register']);
  }

}
