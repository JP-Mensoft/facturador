import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerModel } from 'src/app/models/customerModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { CustomersService } from 'src/app/services/customers.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.page.html',
  styleUrls: ['./customer-detail.page.scss'],
})
export class CustomerDetailPage implements OnInit {

  private customerId: number;
  public customer: CustomerModel;

  constructor(
    private _dashboard: DashboardService,
    private _route: ActivatedRoute,
    private _storage: StorageService,
    private _customers: CustomersService
  ) {
    this.customerId = 0;
    this.customer = new CustomerModel("", "", "", "", "", "", "");
  }

  ngOnInit() {
    this._dashboard.setSectionName("Clientes");
    this.customerId = this._route.snapshot.params["customerId"];
    this.getOneCustomer();
  }

  public async getOneCustomer() {
    this._customers.getOneCustomer(await this._storage.get("token"), this.customerId).subscribe({
      next: (result: ResponseModel) => {
        if (result.success) {
          this.customer = result.result;
        }
      },
      error: () => { },
      complete: () => { }
    });
  }

}
