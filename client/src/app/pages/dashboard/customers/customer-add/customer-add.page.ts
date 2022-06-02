import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerModel } from 'src/app/models/customerModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { CustomersService } from 'src/app/services/customers.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.page.html',
  styleUrls: ['./customer-add.page.scss'],
})
export class CustomerAddPage implements OnInit {

  public customerForm: FormGroup;

  public showSpinnerCustomer: boolean;
  public showCorrectCustomer: boolean;
  public showErrorCustomer: boolean;

  constructor(
    private _dashboard: DashboardService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _customers: CustomersService,
    private _storage: StorageService
  ) { }

  ngOnInit() {
    this._dashboard.setSectionName("Clientes");
    this.buildForms();
    this.showSpinnerCustomer = false;
    this.showCorrectCustomer = false;
    this.showErrorCustomer = false;
  }

  public buildForms(): void {
    this.customerForm = this._formBuilder.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      contact: ["", [Validators.required]],
      phone: ["", [Validators.required]],
      address: ["", [Validators.required]],
      cif: ["", [Validators.required]],
      remarks: [""]
    });
  }

  public async saveCustomer() {
    this.showSpinnerCustomer = true;
    this.showErrorCustomer = false;
    this.showCorrectCustomer = false;
    const name = this.customerForm.get("name").value;
    const email = this.customerForm.get("email").value;
    const contact = this.customerForm.get("contact").value;
    const phone = this.customerForm.get("phone").value;
    const address = this.customerForm.get("address").value;
    const cif = this.customerForm.get("cif").value;
    const remarks = this.customerForm.get("remarks").value;
    const customer: CustomerModel = new CustomerModel(name, email, contact, phone, address, cif, remarks);
    this._customers.addCustomer(await this._storage.get("token"), customer).subscribe({
      next: (result: ResponseModel) => {
        if (result.success) {
          setTimeout(() => {
            this.showSpinnerCustomer = false;
            this.showCorrectCustomer = true;
          }, 500);
          setTimeout(() => {
            this.showCorrectCustomer = false;
            this.goCustomers();
          }, 1000);
        }
      },
      error: () => {
        setTimeout(() => {
          this.showSpinnerCustomer = false;
          this.showErrorCustomer = true;
        }, 500);
        setTimeout(() => {
          this.showErrorCustomer = false;
        }, 1000);
      },
      complete: () => { }
    });
  }

  public clearForm(): void {
    this.customerForm.reset();
  }

  public goCustomers(): void {
    this._router.navigate(['dashboard/customers']);
    this._dashboard.switchCustomers();
    this.clearForm();
  }

}
