import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyModel } from 'src/app/models/companyModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { UserSetModel } from 'src/app/models/userModel';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public companyForm: FormGroup;
  public userForm: FormGroup;
  public userData: UserSetModel;
  public userCompany: CompanyModel;

  public errorUser: boolean;
  public errorCompany: boolean;
  public correctUser: boolean;
  public correctCompany: boolean;
  public passVer: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _user: UserService,
    private _storage: StorageService
  ) {
    this.errorUser = false;
    this.errorCompany = false;
    this.correctUser = false;
    this.correctCompany = false;
  }

  ngOnInit(): void {
    this.userData = new UserSetModel("", "", "", "", "");
    this.userCompany = new CompanyModel("", "", "", "");
    this.buildForms();
    this.getUserData();
    this.getUserCompany();
  }

  public buildForms(): void {
    this.companyForm = this._formBuilder.group({
      name: ['', []],
      address: ['', []],
      cif: ['', []],
      iban: ['', []]
    });
    this.userForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', []],
      phone: ['', []],
      newPassword: ['', []],
      reNewPassword: ['', []]
    });
  }

  cambioVerPass() {
    this.passVer = !this.passVer;
  }

  public async getUserData() {
    this._user.getUser(this._storage.get("token")).subscribe({
      next: (result: ResponseModel) => {
        if (result.success) {
          this.userData = result.result;
        }
      },
      error: () => { },
      complete: () => {
        this.loadUserData();
      }
    });
  }

  public async getUserCompany() {
    this._user.getUserCompany(this._storage.get("token")).subscribe({
      next: (result: ResponseModel) => {
        if (result.success) {
          this.userCompany = result.result;
        }
      },
      error: () => { },
      complete: () => {
        this.loadCompanyData();
      }
    });
  }

  public async saveCompany() {
    this.correctCompany = false;
    this.errorCompany = false;
    this.userCompany.name = this.companyForm.get("name").value;
    this.userCompany.address = this.companyForm.get("address").value;
    this.userCompany.cif = this.companyForm.get("cif").value;
    this.userCompany.iban = this.companyForm.get("iban").value;
    this._user.setUserCompany(this._storage.get("token"), this.userCompany).subscribe({
      next: (result: ResponseModel) => {
        if (result.success) {
          this.loadCompanyData();
          this.correctCompany = true;
        }
      },
      error: () => {
        this.errorCompany = true;
      },
      complete: () => {
        setTimeout(() => {
          this.correctCompany = false;
          this.errorCompany = false;
        }, 700);
      }
    });
  }

  public async saveUser() {
    this.errorUser = false;
    this.userData.email = this.userForm.get("email").value;
    this.userData.name = this.userForm.get("name").value;
    this.userData.phone = this.userForm.get("phone").value;
    this.userData.newPassword = this.userForm.get("newPassword").value;
    this.userData.reNewPassword = this.userForm.get("reNewPassword").value;
    if (this.userData.newPassword === "") {
      this.saveUserSub();
    } else {
      if (this.userData.newPassword === this.userData.reNewPassword) {
        this.saveUserSub();
      } else {
        this.errorUser = true;
        setTimeout(() => {
          this.errorUser = false;
        }, 700);
      }
    }
  }

  public async saveUserSub() {
    this.correctUser = false;
    this.errorUser = false;
    this._user.setUserData(this._storage.get("token"), this.userData).subscribe({
      next: (result: ResponseModel) => {
        if (result.success) {
          this.loadUserData();
          this.correctUser = true;
        }
      },
      error: () => {
        this.errorUser = true;
      },
      complete: () => {
        setTimeout(() => {
          this.correctUser = false;
          this.errorUser = false;
        }, 700);
      }
    });
  }

  public loadUserData(): void {
    this.userForm.get("email").setValue(this.userData.email);
    this.userForm.get("name").setValue(this.userData.name);
    this.userForm.get("phone").setValue(this.userData.phone);
    this.userForm.get("newPassword").setValue("");
    this.userForm.get("reNewPassword").setValue("");
  }

  public loadCompanyData(): void {
    this.companyForm.get("name").setValue(this.userCompany.name);
    this.companyForm.get("address").setValue(this.userCompany.address);
    this.companyForm.get("cif").setValue(this.userCompany.cif);
    this.companyForm.get("iban").setValue(this.userCompany.iban);
  }

}
