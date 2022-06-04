import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InvoiceModel } from 'src/app/models/invoiceModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { DashboardService } from 'src/app/services/dashboard.service';
import { InvoicesService } from 'src/app/services/invoices.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.page.html',
  styleUrls: ['./invoices.page.scss'],
})
export class InvoicesPage implements OnInit, OnDestroy {

  private switchInvoicesSub: Subscription;
  public invoicesFilter: string;
  public collectedFilter: string;
  public invoices: InvoiceModel[];

  constructor(
    private _dashboard: DashboardService,
    private _router: Router,
    private _invoices: InvoicesService,
    private _storage: StorageService
  ) {
    this.invoicesFilter = "";
    this.collectedFilter = "all";
  }

  ngOnInit() {
    this._dashboard.setSectionName("Facturas");
    this.getUserInvoices();
    this.monitoringSwitchInvoices();
  }

  ngOnDestroy() {
    this.switchInvoicesSub.unsubscribe();
  }

  public monitoringSwitchInvoices(): void {
    this.switchInvoicesSub = this._dashboard.subInvoices.subscribe({
      next: async () => {
        await this.getUserInvoices();
        this.collectedFilter = "all";
      },
      error: () => { },
      complete: () => { }
    });
  }

  public async getUserInvoices() {
    this._invoices.getAllInvoices(await this._storage.get("token")).subscribe({
      next: (result: ResponseModel) => {
        if (result.success) {
          this.invoices = result.result;
        }
      },
      error: () => { },
      complete: () => { }
    });
  }

  public goDetail(invoiceId: number): void {
    this._router.navigate(['dashboard/invoices/invoice-detail', invoiceId]);
  }

}
