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
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public registerForm: FormGroup;

  public successRegister: boolean;
  public errorRegister: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    private _auth: AuthService,
    private _storage: StorageService,
    private _router: Router
  ) {
    this.successRegister = false;
    this.errorRegister = false;
  }

  ngOnInit() {
    this.buildForms();
  }

  public buildForms(): void {
    this.registerForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', []],
      phone: ['', []],
      newPassword: ['', [Validators.required]],
      reNewPassword: ['', [Validators.required]]
    });
  }

  public async registerUser() {
    this.successRegister = false;
    this.errorRegister = false;
    const user = new UserSetModel(
      this.registerForm.get("email").value,
      this.registerForm.get("name").value,
      this.registerForm.get("phone").value,
      this.registerForm.get("newPassword").value,
      this.registerForm.get("reNewPassword").value
    );
    if (user.newPassword != "") {
      this.registerUserSub(user);
    } else {
      if (user.newPassword === user.reNewPassword) {
        this.registerUserSub(user);
      } else {
        setTimeout(() => {
          this.errorRegister = true;
        }, 10);
      }
    }
  }

  public async registerUserSub(user: UserSetModel) {
    this._auth.registerUser(user).subscribe({
      next: async (result: ResponseModel) => {
        if (result.success) {
          this.successRegister = true;
          setTimeout(() => {
            this._storage.set("token", result.result).then(() => {
              this._router.navigate(["dashboard/user"]);
            });
          }, 700);
        }
      },
      error: () => {
        this.errorRegister = true;
      },
      complete: () => { }
    });
  }

}
