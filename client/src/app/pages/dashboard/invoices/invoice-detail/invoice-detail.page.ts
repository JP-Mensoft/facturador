import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceModel } from 'src/app/models/invoiceModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { DashboardService } from 'src/app/services/dashboard.service';
import { InvoicesService } from 'src/app/services/invoices.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { PdfInvoiceModel } from 'src/app/models/pdfInvoiceModel';
import { UserSetModel } from 'src/app/models/userModel';
import { CompanyModel } from 'src/app/models/companyModel';
import { Platform, ToastController } from '@ionic/angular';
// PDFMake
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
// Capacitor
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.page.html',
  styleUrls: ['./invoice-detail.page.scss'],
})
export class InvoiceDetailPage implements OnInit {

  public invoice: InvoiceModel;
  public user: UserSetModel;
  public company: CompanyModel
  private invoiceId: number;
  private pdfObject: any;
  private pdfInvoiceModel: PdfInvoiceModel;

  constructor(
    private _section: DashboardService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _storage: StorageService,
    private _user: UserService,
    private _invoices: InvoicesService,
    private _dashboard: DashboardService,
    private _platform: Platform,
    private _toast: ToastController
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
    this.getUser();
    this.getCompany();
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

  // Generate & Share Invoice

  public async shareInvoice() {
    if (this.invoice != undefined && this.company != undefined && this.user != undefined) {
      this.pdfInvoiceModel = new PdfInvoiceModel(this.invoice, this.company, this.user);
      const pdfDocumentStructure = this.pdfInvoiceModel.generateDocumentStructure();
      const pdfName: string = this.generateInvoiceFileName();
      this.pdfObject = pdfMake.createPdf(pdfDocumentStructure);
      if (this._platform.is('cordova')) {
        this.pdfObject.getBase64(async (data: any) => {
          try {
            const path = "facturas/" + pdfName;
            const directory = Directory.Documents;
            const writeResult = await Filesystem.writeFile({
              path,
              data,
              directory,
              recursive: true
            });
            await Share.share({
              title: "Factura",
              url: writeResult.uri
            });
          } catch (error) {
            const toast = await this._toast.create({
              message: error,
              duration: 2000
            });
            toast.present();
          }
        });
      } else {
        //this.pdfObject.download(pdfName);
        this.pdfObject.open();
      }
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
    this._user.getUser(await this._storage.get("token")).subscribe({
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
    this._user.getUserCompany(await this._storage.get("token")).subscribe({
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
