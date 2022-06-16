import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyModel } from 'src/app/models/companyModel';
import { InvoiceModel } from 'src/app/models/invoiceModel';
import { PdfInvoiceModel } from 'src/app/models/pdfInvoiceModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { UserSetModel } from 'src/app/models/userModel';
import { InvoicesService } from 'src/app/services/invoices.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
// PDFMake
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-invoices-detail',
  templateUrl: './invoices-detail.component.html',
  styleUrls: ['./invoices-detail.component.scss']
})
export class InvoicesDetailComponent implements OnInit {

  public invoice: InvoiceModel;
  public user: UserSetModel;
  public company: CompanyModel
  private invoiceId: number;
  private pdfObject: any;
  private pdfInvoiceModel: PdfInvoiceModel;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _storage: StorageService,
    private _user: UserService,
    private _invoices: InvoicesService
  ) {
    this.invoiceId = 0;
    this.invoice = new InvoiceModel(new Date(), "", false, 0, 0, [], 0);
    this.pdfObject = null;
    this.pdfInvoiceModel = new PdfInvoiceModel();
  }

  ngOnInit() {
    this.invoiceId = this._route.snapshot.params["invoiceId"];
    this.getOneInvoice();
    this.getUser();
    this.getCompany();
  }

  public async getOneInvoice() {
    this._invoices.getOneInvoice(this._storage.get("token"), this.invoiceId).subscribe({
      next: (result: ResponseModel) => {
        if (result.success) {
          this.invoice = result.result;
        }
      },
      error: () => { },
      complete: () => { }
    });
  }

  public async confirmDeleteInvoice() {
    await this.deleteInvoice();
  }

  public async deleteInvoice() {
    this._invoices.deleteInvoice(this._storage.get("token"), this.invoiceId).subscribe({
      next: (result: ResponseModel) => {
        if (result.success) {
          this.goInvoices();
        }
      },
      error: () => { },
      complete: () => { }
    });
  }

  public async confirmCollectInvoice() {
    await this.collectInvoice();
  }

  public async collectInvoice() {
    if (!this.invoice.collected) {
      this._invoices.setCollectedInvoice(this._storage.get("token"), this.invoiceId).subscribe({
        next: (result: ResponseModel) => {
          if (result.success) {
            this.getOneInvoice();
          }
        },
        error: () => { },
        complete: () => { }
      });
    }
  }

  public goInvoices(): void {
    this._router.navigate(["dashboard/invoices"]);
  }

  // Generate & Share Invoice

  public async shareInvoice() {
    if (this.invoice != undefined && this.company != undefined && this.user != undefined) {
      this.pdfInvoiceModel = new PdfInvoiceModel(this.invoice, this.company, this.user);
      const pdfDocumentStructure = this.pdfInvoiceModel.generateDocumentStructure();
      const pdfName: string = this.generateInvoiceFileName();
      this.pdfObject = pdfMake.createPdf(pdfDocumentStructure);
      //this.pdfObject.download(pdfName);
      this.pdfObject.open();
    }
  }

  public generateInvoiceFileName(): string {
    const invoiceDate: Date = new Date(this.invoice.date);
    const invoiceTitle: string = "F" + this.invoice.invoiceId;
    const customerName: string = this.invoice.customerId.name;
    const customerNameCompact: string = customerName.replace(" ", "");
    const invoiceYear: string = String(invoiceDate.getFullYear());
    const invoiceMonth: string = String(invoiceDate.getMonth());
    const invoiceDay: string = String(invoiceDate.getDate());
    const fileName = invoiceTitle + customerNameCompact + invoiceDay + invoiceMonth + invoiceYear + ".pdf";
    return fileName;
  }

  // Get Company & User

  public async getUser() {
    this._user.getUser(this._storage.get("token")).subscribe({
      next: (result: ResponseModel) => {
        if (result.success) {
          this.user = result.result;
        }
      },
      error: () => { },
      complete: () => { }
    });
  }

  public async getCompany() {
    this._user.getUserCompany(this._storage.get("token")).subscribe({
      next: (result: ResponseModel) => {
        if (result.success) {
          this.company = result.result;
        }
      },
      error: () => { },
      complete: () => { }
    });
  }

}
