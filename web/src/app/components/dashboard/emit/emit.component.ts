import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyModel } from 'src/app/models/companyModel';
import { ConceptModel } from 'src/app/models/conceptModel';
import { CustomerModel } from 'src/app/models/customerModel';
import { InvoiceModel } from 'src/app/models/invoiceModel';
import { ResponseModel } from 'src/app/models/responseModel';
import { UserSetModel } from 'src/app/models/userModel';
import { CustomersService } from 'src/app/services/customers.service';
import { InvoicesService } from 'src/app/services/invoices.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-emit',
  templateUrl: './emit.component.html',
  styleUrls: ['./emit.component.scss']
})
export class EmitComponent implements OnInit {

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
  // Checks
  public error: boolean;

  constructor(
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
    this.error = false;
  }

  ngOnInit(): void {
    this.getUserData();
    this.getUserCompany();
    this.getUserCustomers();
    this.getToday();
  }

  // Invoice

  public goInvoice(invoiceId: number): void {
    this._router.navigate(["dashboard/invoices-detail", invoiceId]);
  }

  public getToday(): void {
    this.today = new Date().toLocaleDateString();
  }

  public async addInvoice() {
    this.error = false;
    this.updateTotalAmount();
    if (this.checkInvoice()) {
      this.generateInvoice();
      this._invoice.addInvoice(this._storage.get("token"), this.invoice).subscribe({
        next: (result: ResponseModel) => {
          if (result.success) {
            this.resetInvoice();
            this.goInvoice(result.result.invoiceId);
          }
        },
        error: () => {
          this.error = true;
        },
        complete: () => {
          setTimeout(() => {
            this.error = false;
          }, 900);
        }
      });
    } else {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 900);
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
    if (this.taxableIncome === 0 || this.taxableIncome === null || this.taxableIncome === undefined) {
      this.invoice.taxableIncome = 0;
    } else {
      this.invoice.taxableIncome = this.taxableIncome;
    }
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

  public async getUserCompany() {
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

  public goUser(): void {
    this._router.navigate(['dashboard/user']);
  }

  // Customers

  public async getUserCustomers() {
    this._customers.getAllCustomers(this._storage.get("token")).subscribe({
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
      this._router.navigate(['dashboard/customers-detail', this.customer.customerId]);
    }
  }

}
