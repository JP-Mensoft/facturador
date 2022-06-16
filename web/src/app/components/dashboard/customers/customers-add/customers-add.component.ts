import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerModel } from 'src/app/models/customerModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { CustomersService } from 'src/app/services/customers.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-customers-add',
  templateUrl: './customers-add.component.html',
  styleUrls: ['./customers-add.component.scss']
})
export class CustomersAddComponent implements OnInit {

  public customerForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _customers: CustomersService,
    private _storage: StorageService
  ) { }

  ngOnInit() {
    this.buildForms();
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
    const name = this.customerForm.get("name").value;
    const email = this.customerForm.get("email").value;
    const contact = this.customerForm.get("contact").value;
    const phone = this.customerForm.get("phone").value;
    const address = this.customerForm.get("address").value;
    const cif = this.customerForm.get("cif").value;
    const remarks = this.customerForm.get("remarks").value;
    const customer: CustomerModel = new CustomerModel(name, email, contact, phone, address, cif, remarks);
    this._customers.addCustomer(this._storage.get("token"), customer).subscribe({
      next: (result: ResponseModel) => {
        if (result.success) {
          setTimeout(() => {
          }, 500);
          setTimeout(() => {
            this.goCustomers();
          }, 1000);
        }
      },
      error: () => {
        setTimeout(() => {
        }, 500);
        setTimeout(() => {
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
    this.clearForm();
  }

}
