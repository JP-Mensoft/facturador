import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.page.html',
  styleUrls: ['./invoices.page.scss'],
})
export class InvoicesPage implements OnInit {

  public invoicesFilter: string;

  constructor(private _dashboard: DashboardService, private _router: Router) {
    this.invoicesFilter = "";
  }

  ngOnInit() {
    this._dashboard.setSectionName("Facturas");
  }

  public goDetail(): void {
    this._router.navigate(['dashboard/invoices/invoice-detail']);
  }

}
