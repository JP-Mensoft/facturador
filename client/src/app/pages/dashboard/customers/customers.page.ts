import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomerModel } from 'src/app/models/customerModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { CustomersService } from 'src/app/services/customers.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit, OnDestroy {

  private switchCustomersSub: Subscription;

  public customersFilter: string;
  public customers: CustomerModel[];

  constructor(
    private _dashboard: DashboardService,
    private _router: Router,
    private _customers: CustomersService,
    private _storage: StorageService
  ) {
    this.customersFilter = "";
    this.customers = [];
  }

  ngOnInit() {
    this._dashboard.setSectionName("Clientes");
    this.getUserCustomers();
    this.monitoringSwitchCustomers();
  }

  ngOnDestroy() {
    this.switchCustomersSub.unsubscribe();
  }

  public monitoringSwitchCustomers(): void {
    this.switchCustomersSub = this._dashboard.subCustomers.subscribe({
      next: async () => {
        await this.getUserCustomers();
      },
      error: () => { },
      complete: () => { }
    });
  }

  public async getUserCustomers() {
    this._customers.getAllCustomers(await this._storage.get("token")).subscribe({
      next: (result: ResponseModel) => {
        if (result.success) {
          this.customers = result.result;
        }
      },
      error: () => { },
      complete: () => { }
    });
  }

  public async deleteCustomer(customerId: number) {
    this._customers.deleteCustomer(await this._storage.get("token"), customerId).subscribe({
      next: (result: ResponseModel) => {
        if (result.success) {
          this.getUserCustomers();
        }
      },
      error: () => {

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
