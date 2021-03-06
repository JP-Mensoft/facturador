import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompanyModel } from 'src/app/models/companyModel';
import { ConceptModel } from 'src/app/models/conceptModel';
import { CustomerModel } from 'src/app/models/customerModel';
import { InvoiceModel } from 'src/app/models/invoiceModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { UserSetModel } from 'src/app/models/userModel';
import { CustomersService } from 'src/app/services/customers.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { InvoicesService } from 'src/app/services/invoices.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-emit',
  templateUrl: './emit.page.html',
  styleUrls: ['./emit.page.scss'],
})
export class EmitPage implements OnInit, OnDestroy {

  private switchEmitSub: Subscription;

  // Invoice
  public today: string;
  public invoice: InvoiceModel;
  public concept: ConceptModel;
  public concepts: ConceptModel[];
  public remarks: string;
  public taxableIncome: number;
  public totalAmount: number;
  // User & Company
  public user: UserSetModel;
  public company: CompanyModel;
  // Customers
  public customer: CustomerModel;
  public customers: CustomerModel[];
  // Spinner
  public showSpinnerInvoice: boolean;
  public showCorrectInvoice: boolean;
  public showErrorInvoice: boolean;

  constructor(
    private _dashboard: DashboardService,
    private _storage: StorageService,
    private _invoice: InvoicesService,
    private _customers: CustomersService,
    private _user: UserService,
    private _router: Router
  ) {
    this.company = new CompanyModel("", "", "", "");
    this.user = new UserSetModel("", "", "", "", "");
    this.customer = new CustomerModel("", "", "", "", "", "", "", 0);
    this.concept = new ConceptModel("", 0, 0);
    this.invoice = new InvoiceModel(new Date(), "", false, 0, 0, [], 0);
    this.today = new Date().toDateString();
    this.customers = [];
    this.concepts = [];
    this.remarks = "";
    this.totalAmount = 0;
    this.taxableIncome = 0;
    this.showSpinnerInvoice = false;
    this.showCorrectInvoice = false;
    this.showErrorInvoice = false;
  }

  ngOnInit() {
    this._dashboard.setSectionName("Emitir Factura");
    this.getUserData();
    this.getUserCompany();
    this.getUserCustomers();
    this.getToday();
    this.monitoringSwitchEmit();
  }

  ngOnDestroy() {
    this.switchEmitSub.unsubscribe();
  }

  public monitoringSwitchEmit(): void {
    this.switchEmitSub = this._dashboard.subEmit.subscribe({
      next: () => {
        this.getUserData();
        this.getUserCompany();
        this.getUserCustomers();
        this.getToday();
      },
      error: () => { },
      complete: () => { }
    });
  }

  // Invoice

  public goInvoice(invoiceId: number): void {
    this._router.navigate(["dashboard/invoices/invoice-detail", invoiceId]);
  }

  public getToday(): void {
    this.today = new Date().toLocaleDateString();
  }

  public async addInvoice() {
    this.showSpinnerInvoice = true;
    this.showCorrectInvoice = false;
    this.showErrorInvoice = false;
    this.updateTotalAmount();
    if (this.checkInvoice()) {
      this.generateInvoice();
      this._invoice.addInvoice(await this._storage.get("token"), this.invoice).subscribe({
        next: (result: ResponseModel) => {
          if (result.success) {
            setTimeout(() => {
              this.showSpinnerInvoice = false;
              this.showCorrectInvoice = true;
            }, 500);
            setTimeout(() => {
              this.showCorrectInvoice = false;
              this.resetInvoice();
              this.goInvoice(result.result.invoiceId);
            }, 1000);
          }
        },
        error: () => {
          setTimeout(() => {
            this.showSpinnerInvoice = false;
            this.showErrorInvoice = true;
          }, 500);
          setTimeout(() => {
            this.showErrorInvoice = false;
          }, 1000);
        },
        complete: () => { }
      });
    } else {
      setTimeout(() => {
        this.showSpinnerInvoice = false;
        this.showErrorInvoice = true;
      }, 500);
      setTimeout(() => {
        this.showErrorInvoice = false;
      }, 1000);
    }
  }

  public addConcept(): void {
    this.concepts.push(new ConceptModel("", 0));
  }

  public deleteConcept(index: number): void {
    if (this.concepts.length != 0) {
      this.concepts.splice(index, 1);
      this.updateTotalAmount();
    }
  }

  public checkInvoice(): boolean {
    if (this.customer.customerId != 0
      && this.concepts.length != 0
      && this.company.name != ""
      && this.totalAmount != 0) {
      let checkConcepts: boolean = true;
      this.concepts.forEach(concept => {
        if (concept.concept === "" || concept.amount === 0 || concept.amount === null) {
          checkConcepts = false;
        }
      });
      return checkConcepts;
    } else {
      return false;
    }
  }

  public updateTotalAmount(): void {
    let temporaryTotal: number = 0;
    this.concepts.forEach(concept => {
      temporaryTotal += concept.amount;
    });
    let taxableAmounts: number = (this.taxableIncome / 100) * temporaryTotal;
    this.totalAmount = Math.round(temporaryTotal + taxableAmounts);
  }

  public generateInvoice(): void {
    this.invoice = new InvoiceModel(new Date(), "", false, 0, 0, [], 0);
    this.invoice.customerId = this.customer.customerId;
    this.invoice.concepts = this.concepts;
    this.invoice.taxableIncome = this.taxableIncome;
    this.invoice.totalAmount = this.totalAmount;
    this.invoice.remarks = this.remarks;
  }

  public resetInvoice(): void {
    this.invoice = new InvoiceModel(new Date(), "", false, 0, 0, [], 0);
    this.customer = new CustomerModel("", "", "", "", "", "", "", 0);
    this.concepts = [];
    this.taxableIncome = 0;
    this.totalAmount = 0;
    this.remarks = "";
  }

  // User & Company

  public async getUserData() {
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

  public async getUserCompany() {
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

  public goUser(): void {
    this._router.navigate(['dashboard/user']);
  }

  // Customers

  public async getUserCustomers() {
    this._customers.getAllCustomers(await this._storage.get("token")).subscribe({
      next: (result: ResponseModel) => {
        if (result.success) {
          this.customers = result.result;
        }
      },
      error: () => { },
      complete: () => { }
    });
  }

  public goCustomerDetail(): void {
    if (this.customer.customerId != 0) {
      this._router.navigate(['dashboard/customers/customer-detail', this.customer.customerId]);
    }
  }

}
