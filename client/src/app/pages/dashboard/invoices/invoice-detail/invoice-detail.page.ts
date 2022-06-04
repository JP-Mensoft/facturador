import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceModel } from 'src/app/models/invoiceModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { DashboardService } from 'src/app/services/dashboard.service';
import { InvoicesService } from 'src/app/services/invoices.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.page.html',
  styleUrls: ['./invoice-detail.page.scss'],
})
export class InvoiceDetailPage implements OnInit {

  private invoiceId: number;
  public invoice: InvoiceModel;

  constructor(
    private _section: DashboardService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _storage: StorageService,
    private _invoices: InvoicesService,
    private _dashboard: DashboardService
  ) {
    this.invoiceId = 0;
    this.invoice = new InvoiceModel(new Date(), "", false, 0, 0, [], 0);
  }

  ngOnInit() {
    this._section.setSectionName("Facturas");
    this.invoiceId = this._route.snapshot.params["invoiceId"];
    this.getOneInvoice();
  }

  public async getOneInvoice() {
    this._invoices.getOneInvoice(await this._storage.get("token"), this.invoiceId).subscribe({
      next: (result: ResponseModel) => {
        if (result.success) {
          this.invoice = result.result;
        }
      },
      error: () => { },
      complete: () => { }
    });
  }

  public async deleteInvoice() {
    this._invoices.deleteInvoice(await this._storage.get("token"), this.invoiceId).subscribe({
      next: (result: ResponseModel) => {
        if (result.success) {
          this.goInvoices();
        }
      },
      error: () => { },
      complete: () => { }
    });
  }

  public async collectInvoice() {
    this._invoices.setCollectedInvoice(await this._storage.get("token"), this.invoiceId).subscribe({
      next: (result: ResponseModel) => {
        if (result.success) {
          this.getOneInvoice();
        }
      },
      error: () => { },
      complete: () => { }
    });
  }

  public async shareInvoice() {

  }

  public goInvoices(): void {
    this._dashboard.switchInvoices();
    this._router.navigate(["dashboard/invoices"]);
  }

}
