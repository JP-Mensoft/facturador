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
  public displayedPassword: boolean;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
    this.loginError = false;
    this.loginSuccess = false;
    this.displayedPassword = false;
  }

  public buildForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  public showPassword(): void {
    this.displayedPassword = !this.displayedPassword;
  }

  public attemptAccess(): void {
    this.loginError = !this.loginError;
    this.loginSuccess = !this.loginSuccess;
  }

}
