import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginForm: FormGroup;
  public loginError: boolean;
  public loginSuccess: boolean;
  public showPassword: boolean;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
    this.loginError = false;
    this.loginSuccess = false;
    this.showPassword = false;
  }

  public buildForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  public attemptAccess(): void {
    this.loginError = !this.loginError;
  }

}
