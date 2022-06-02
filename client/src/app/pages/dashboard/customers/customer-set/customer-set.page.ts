import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerModel } from 'src/app/models/customerModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { CustomersService } from 'src/app/services/customers.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-customer-set',
  templateUrl: './customer-set.page.html',
  styleUrls: ['./customer-set.page.scss'],
})
export class CustomerSetPage implements OnInit {

  private customerId: number;
  public customer: CustomerModel;
  public customerForm: FormGroup;

  public showSpinnerCustomer: boolean;
  public showCorrectCustomer: boolean;
  public showErrorCustomer: boolean;

  constructor(
    private _dashboard: DashboardService,
    private _route: ActivatedRoute,
    private _storage: StorageService,
    private _customers: CustomersService,
    private _router: Router,
    private _formBuilder: FormBuilder
  ) {
    this.customerId = 0;
    this.customer = new CustomerModel("", "", "", "", "", "", "");
    this.buildForms();
  }

  ngOnInit() {
    this._dashboard.setSectionName("Clientes");
    this.customerId = this._route.snapshot.params["customerId"];
    this.getOneCustomer();
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

  public async getOneCustomer() {
    this._customers.getOneCustomer(await this._storage.get("token"), this.customerId).subscribe({
      next: (result: ResponseModel) => {
        if (result.success) {
          this.customer = result.result;
          this.setForm();
        }
      },
      error: () => { },
      complete: () => { }
    });
  }

  public async setCustomer() {
    this.showSpinnerCustomer = true;
    this.showErrorCustomer = false;
    this.showCorrectCustomer = false;
    this.customer.name = this.customerForm.get("name").value;
    this.customer.email = this.customerForm.get("email").value;
    this.customer.contact = this.customerForm.get("contact").value;
    this.customer.phone = this.customerForm.get("phone").value;
    this.customer.address = this.customerForm.get("address").value;
    this.customer.cif = this.customerForm.get("cif").value;
    this.customer.remarks = this.customerForm.get("remarks").value;
    this._customers.setCustomer(await this._storage.get("token"), this.customer).subscribe({
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

  public setForm(): void {
    this.customerForm.get("name").setValue(this.customer.name);
    this.customerForm.get("email").setValue(this.customer.email);
    this.customerForm.get("contact").setValue(this.customer.contact);
    this.customerForm.get("phone").setValue(this.customer.phone);
    this.customerForm.get("address").setValue(this.customer.address);
    this.customerForm.get("cif").setValue(this.customer.cif);
    this.customerForm.get("remarks").setValue(this.customer.remarks);
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
