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
  public displayedPassword: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    private _auth: AuthService,
    private _storage: StorageService,
    private _router: Router
  ) {
    this.displayedPassword = false;
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

  public async registerUser() {
    const user = new UserSetModel(
      this.registerForm.get("email").value,
      this.registerForm.get("name").value,
      this.registerForm.get("phone").value,
      this.registerForm.get("newPassword").value,
      this.registerForm.get("reNewPassword").value
    );
    if (user.newPassword != "" && user.newPassword === user.reNewPassword) {
      this.registerUserSub(user);
    }
  }

  public async registerUserSub(user: UserSetModel) {
    this._auth.registerUser(user).subscribe({
      next: async (result: ResponseModel) => {
        if (result.success) {
          this._storage.set("token", result.result).then(() => {
            this._router.navigate(["dashboard/user"]);
            this.clearForm();
          });
        }
      },
      error: () => { },
      complete: () => { }
    });
  }

  public clearForm(): void {
    this.registerForm.get("email").setValue("");
    this.registerForm.get("name").setValue("");
    this.registerForm.get("phone").setValue("");
    this.registerForm.get("newPassword").setValue("");
    this.registerForm.get("reNewPassword").setValue("");
  }

  public goLogin(): void {
    this._router.navigate(['auth/login']);
    this.clearForm();
  }

}
