import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceModel } from 'src/app/models/invoiceModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { DashboardService } from 'src/app/services/dashboard.service';
import { InvoicesService } from 'src/app/services/invoices.service';
import { StorageService } from 'src/app/services/storage.service';
// PDF
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
import { PdfInvoiceModel } from 'src/app/models/pdfInvoiceModel';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.page.html',
  styleUrls: ['./invoice-detail.page.scss'],
})
export class InvoiceDetailPage implements OnInit {

  public invoice: InvoiceModel;
  private invoiceId: number;
  private pdfObject: any;
  private pdfInvoiceModel: PdfInvoiceModel;

  constructor(
    private _section: DashboardService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _storage: StorageService,
    private _invoices: InvoicesService,
    private _dashboard: DashboardService,
    private _fileOpener: FileOpener,
    private _platform: Platform
  ) {
    this.invoiceId = 0;
    this.invoice = new InvoiceModel(new Date(), "", false, 0, 0, [], 0);
    this.pdfObject = null;
    this.pdfInvoiceModel = new PdfInvoiceModel();
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
    if (!this.invoice.collected) {
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
  }

  public goInvoices(): void {
    this._dashboard.switchInvoices();
    this._router.navigate(["dashboard/invoices"]);
  }

  public async shareInvoice() {
    const pdfDocumentStructure = this.pdfInvoiceModel.generateDocumentStructure();
    this.pdfObject = pdfMake.createPdf(pdfDocumentStructure);
    if (this._platform.is('cordova')) {
      this.pdfObject.getBase64(async (pdfData: any) => {
        try {
          const path = "pdfInvoices/" + this.invoice.customerId.name + this.invoice.invoiceId + String(new Date().getMilliseconds()) + ".pdf";
          const writeResult = await Filesystem.writeFile({
            path,
            data: pdfData,
            directory: Directory.Documents,
            recursive: true
          });
          this._fileOpener.open(writeResult.uri, 'application/pdf');
        } catch (error) {
          console.log(error);
        }
      });
    } else {
      //this.pdfObject.download('invoice.pdf');
      this.pdfObject.open();
    }
  }

}
