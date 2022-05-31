import { AfterViewInit, Component, OnInit } from '@angular/core';
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

  constructor(
    private _formBuilder: FormBuilder,
    private _auth: AuthService,
    private _storage: StorageService,
    private _router: Router
  ) {
    this.displayedPassword = false;
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
          });
        }
      },
      error: () => { },
      complete: () => { }
    });
  }

  public clearForm(): void {
    this.loginForm.get('email').setValue("");
    this.loginForm.get('password').setValue("");
  }

  public goRegister(): void {
    this._router.navigate(['auth/register']);
    this.clearForm();
  }

}
