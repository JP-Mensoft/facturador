import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseModel } from 'src/app/models/responseModel';
import { UserSetModel } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss', '../auth.page.scss'],
})
export class RegisterPage implements OnInit {

  public registerForm: FormGroup;

  public displayedPassword: boolean;
  public showSpinnerRegister: boolean;
  public showCorrectRegister: boolean;
  public showErrorRegister: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    private _auth: AuthService,
    private _storage: StorageService,
    private _router: Router
  ) {
    this.displayedPassword = false;
    this.showSpinnerRegister = false;
    this.showCorrectRegister = false;
    this.showErrorRegister = false;
  }

  ngOnInit() {
    this.buildForms();
  }

  public buildForms(): void {
    this.registerForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required,]],
      phone: ['', [Validators.required,]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      reNewPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  public showPassword(): void {
    this.displayedPassword = !this.displayedPassword;
  }

  public async addUser() {
    this.showSpinnerRegister = true;
    this.showCorrectRegister = false;
    this.showErrorRegister = false;
    const user = new UserSetModel(
      this.registerForm.get("email").value,
      this.registerForm.get("name").value,
      this.registerForm.get("phone").value,
      this.registerForm.get("newPassword").value,
      this.registerForm.get("reNewPassword").value
    );
    if (user.newPassword != "" && user.newPassword === user.reNewPassword) {
      this.addUserSub(user);
    } else {
      setTimeout(() => {
        this.showSpinnerRegister = false;
        this.showErrorRegister = true;
      }, 500);
      setTimeout(() => {
        this.showErrorRegister = false;
      }, 1000);
    }
  }

  public async addUserSub(user: UserSetModel) {
    this._auth.addUser(user).subscribe({
      next: async (result: ResponseModel) => {
        if (result.success) {
          setTimeout(() => {
            this.showSpinnerRegister = false;
            this.showCorrectRegister = true;
          }, 500);
          setTimeout(() => {
            this.showCorrectRegister = false;
            this._storage.set("token", result.result).then(() => {
              this._router.navigate(["dashboard/user"]);
              this.clearForm();
            });
          }, 1000);
        }
      },
      error: () => {
        setTimeout(() => {
          this.showSpinnerRegister = false;
          this.showErrorRegister = true;
        }, 500);
        setTimeout(() => {
          this.showErrorRegister = false;
        }, 1000);
      },
      complete: () => { }
    });
  }

  public clearForm(): void {
    this.registerForm.reset();
  }

  public goLogin(): void {
    this._router.navigate(['auth/login']);
    this.clearForm();
  }

}
