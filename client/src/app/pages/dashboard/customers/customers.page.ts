import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {

  public customersFilter: string;

  constructor(private _section: DashboardService, private _router: Router) {
    this.customersFilter = "";
  }

  ngOnInit() {
    this._section.setSectionName("Clientes");
  }

  public goDetail(): void {
    this._router.navigate(['dashboard/customers/customer-detail']);
  }

  public goAdd(): void {
    this._router.navigate(['dashboard/customers/customer-add']);
  }

}
