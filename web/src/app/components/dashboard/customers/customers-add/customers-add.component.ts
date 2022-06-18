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
  public errorUser: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _customers: CustomersService,
    private _storage: StorageService
  ) {
    this.errorUser = false;
  }

  ngOnInit() {
    this.buildForms();
  }

  public buildForms(): void {
    this.customerForm = this._formBuilder.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.email]],
      contact: [""],
      phone: [""],
      address: ["", [Validators.required]],
      cif: ["", [Validators.required]],
      remarks: [""]
    });
  }

  public async saveCustomer() {
    this.errorUser = false;
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
          this.goCustomers();
        }
      },
      error: () => {
        this.errorUser = true;
      },
      complete: () => {
        setTimeout(() => {
          this.errorUser = false;
        }, 700);
      }
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
