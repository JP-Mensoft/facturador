import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerModel } from 'src/app/models/customerModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { CustomersService } from 'src/app/services/customers.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  public customersFilter: string;
  public customers: CustomerModel[];

  constructor(
    private _router: Router,
    private _customers: CustomersService,
    private _storage: StorageService,
  ) {
    this.customersFilter = "";
    this.customers = [];
  }

  ngOnInit(): void {
    this.getUserCustomers();
  }

  public async getUserCustomers() {
    this._customers.getAllCustomers(this._storage.get("token")).subscribe({
      next: (result: ResponseModel) => {
        if (result.success) {
          this.customers = result.result;
        }
      },
      error: () => { },
      complete: () => { }
    });
  }

  public async confirmDeleteCustomer(customerId: number) {
    await this.deleteCustomer(customerId);
  }

  public async deleteCustomer(customerId: number) {
    this._customers.deleteCustomer(this._storage.get("token"), customerId).subscribe({
      next: (result: ResponseModel) => {
        if (result.success) {
          this.getUserCustomers();
        }
      },
      error: async () => {

      },
      complete: () => { }
    });
  }

  public goSetCustomer(customerId: number): void {
    this._router.navigate(['dashboard/customers/customer-set', customerId]);
  }

  public goDetail(customerId: number): void {
    this._router.navigate(['dashboard/customers/customer-detail', customerId]);
  }

  public goAdd(): void {
    this._router.navigate(['dashboard/customers/customer-add']);
  }

}
