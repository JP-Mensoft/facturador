import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResponseModel } from 'src/app/models/responseModel';
import { UserAccessModel } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

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
    this.loginError = false;
    this.loginSuccess = false;
    const loginData: UserAccessModel = new UserAccessModel(this.loginForm.get('email').value, this.loginForm.get('password').value);
    this.authService.attempAccess(loginData).subscribe({
      next: (response: ResponseModel) => {
        if (response.success) {
          this.loginSuccess = true;
        }
      },
      error: (error) => {
        this.loginError = true;
      },
      complete: () => { }
    });
  }

}
