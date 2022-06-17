import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InvoiceModel } from 'src/app/models/invoiceModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { InvoicesService } from 'src/app/services/invoices.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  public invoicesFilter: string;
  public collectedFilter: string;
  public invoices: InvoiceModel[];

  constructor(
    private _router: Router,
    private _invoices: InvoicesService,
    private _storage: StorageService
  ) {
    this.invoicesFilter = "";
    this.collectedFilter = "all";
  }

  ngOnInit() {
    this.getUserInvoices();
  }

  public async getUserInvoices() {
    this._invoices.getAllInvoices(this._storage.get("token")).subscribe({
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
    this._router.navigate(['dashboard/invoices-detail', invoiceId]);
  }

  public setCollectedFilter(filter: string): void {
    this.collectedFilter = filter;
  }

}
