import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerModel } from 'src/app/models/customerModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { CustomersService } from 'src/app/services/customers.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-customers-detail',
  templateUrl: './customers-detail.component.html',
  styleUrls: ['./customers-detail.component.scss']
})
export class CustomersDetailComponent implements OnInit {

  private customerId: number;
  public customer: CustomerModel;

  constructor(
    private _route: ActivatedRoute,
    private _storage: StorageService,
    private _customers: CustomersService
  ) {
    this.customerId = 0;
    this.customer = new CustomerModel("", "", "", "", "", "", "");
  }

  ngOnInit() {
    this.customerId = this._route.snapshot.params["customerId"];
    this.getOneCustomer();
  }

  public async getOneCustomer() {
    this._customers.getOneCustomer(this._storage.get("token"), this.customerId).subscribe({
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
