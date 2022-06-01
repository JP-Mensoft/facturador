import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyModel } from 'src/app/models/companyModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { UserSetModel } from 'src/app/models/userModel';
import { DashboardService } from 'src/app/services/dashboard.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss']
})
export class UserPage implements OnInit {

  public companyForm: FormGroup;
  public userForm: FormGroup;
  public userData: UserSetModel;
  public userCompany: CompanyModel;

  public showSpinnerCompany: boolean;
  public showSpinnerUser: boolean;
  public showCorrectCompany: boolean;
  public showCorrectUser: boolean;
  public showErrorCompany: boolean;
  public showErrorUser: boolean;

  constructor(
    private _section: DashboardService,
    private _formBuilder: FormBuilder,
    private _user: UserService,
    private _storage: StorageService
  ) {
    this.showSpinnerCompany = false;
    this.showSpinnerUser = false;
    this.showCorrectCompany = false;
    this.showCorrectUser = false;
    this.showErrorCompany = false;
    this.showErrorUser = false;
  }

  ngOnInit() {
    this._section.setSectionName("Usuario");
    this.userData = new UserSetModel("", "", "", "", "");
    this.userCompany = new CompanyModel("", "", "", "", "");
    this.buildForms();
    this.getUserData();
    this.getUserCompany();
  }

  public buildForms(): void {
    this.companyForm = this._formBuilder.group({
      name: ['', []],
      logoURL: ['', []],
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

  public async getUserData() {
    this._user.getUser(await this._storage.get("token")).subscribe({
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
    this._user.getUserCompany(await this._storage.get("token")).subscribe({
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
    this.showSpinnerCompany = true;
    this.showCorrectCompany = false;
    this.showErrorCompany = false;
    this.userCompany.name = this.companyForm.get("name").value;
    this.userCompany.logoURL = this.companyForm.get("logoURL").value;
    this.userCompany.address = this.companyForm.get("address").value;
    this.userCompany.cif = this.companyForm.get("cif").value;
    this.userCompany.iban = this.companyForm.get("iban").value;
    this._user.setUserCompany(await this._storage.get("token"), this.userCompany).subscribe({
      next: (result: ResponseModel) => {
        if (result.success) {
          setTimeout(() => {
            this.loadCompanyData();
            this.showSpinnerCompany = false;
            this.showCorrectCompany = true;
          }, 500);
          setTimeout(() => {
            this.showCorrectCompany = false;
          }, 1000);
        }
      },
      error: () => {
        setTimeout(() => {
          this.showSpinnerCompany = false;
          this.showErrorCompany = true;
        }, 500);
        setTimeout(() => {
          this.showErrorCompany = false;
        }, 1000);
      },
      complete: () => { }
    });
  }

  public async saveUser() {
    this.showSpinnerUser = true;
    this.showCorrectUser = false;
    this.showErrorUser = false;
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
        setTimeout(() => {
          this.showSpinnerUser = false;
          this.showErrorUser = true;
        }, 500);
        setTimeout(() => {
          this.showErrorUser = false;
        }, 1000);
      }
    }
  }

  public async saveUserSub() {
    this._user.setUserData(await this._storage.get("token"), this.userData).subscribe({
      next: (result: ResponseModel) => {
        if (result.success) {
          setTimeout(() => {
            this.loadUserData();
            this.showSpinnerUser = false;
            this.showCorrectUser = true;
          }, 500);
          setTimeout(() => {
            this.showCorrectUser = false;
          }, 1000);
        }
      },
      error: () => {
        setTimeout(() => {
          this.showSpinnerUser = false;
          this.showErrorUser = true;
        }, 500);
        setTimeout(() => {
          this.showErrorUser = false;
        }, 1000);
      },
      complete: () => { }
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
    this.companyForm.get("logoURL").setValue(this.userCompany.logoURL);
    this.companyForm.get("address").setValue(this.userCompany.address);
    this.companyForm.get("cif").setValue(this.userCompany.cif);
    this.companyForm.get("iban").setValue(this.userCompany.iban);
  }

}
