import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseModel } from 'src/app/models/responseModel';
import { UserSetModel } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public passVer: boolean = false;
  public error: boolean = false;
  public registroCorrecto: boolean = false;

  constructor(
    private _formB: FormBuilder,
    private _storage: StorageService,
    private _auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.crearFormulario();
  }

  crearFormulario() {
    this.registerForm = this._formB.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required,]],
      phone: ['', [Validators.required,]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      reNewPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  cambioVerPass() {
    this.passVer = !this.passVer;
  }

  public async addUser() {
    this.error = false;
    this.registroCorrecto = false;
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
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 500);
    }
  }

  public async addUserSub(user: UserSetModel) {
    this._auth.addUser(user).subscribe({
      next: async (response: ResponseModel) => {
        if (response.success) {
          this.registroCorrecto = true;
          this._storage.set("token", response.result.token);
          this._storage.set("email", response.result.email);
          setTimeout(() => {
            this._router.navigate(["dashboard/user"]);
          }, 500);
          setTimeout(() => {
            this.registroCorrecto = false;
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

  public goLogin(): void {
    this._router.navigate(['auth/login']);
    this.clearForm();
  }

  public clearForm(): void {
    this.registerForm.reset();
  }

}
