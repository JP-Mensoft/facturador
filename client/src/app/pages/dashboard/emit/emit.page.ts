import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  // User & Company
  public user: UserSetModel;
  public company: CompanyModel;
  // Customers
  public customer: CustomerModel;
  public customers: CustomerModel[];

  constructor(
    private _dashboard: DashboardService,
    private _storage: StorageService,
    private _invoice: InvoicesService,
    private _customers: CustomersService,
    private _user: UserService,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {
    this.company = new CompanyModel("", "", "", "");
    this.user = new UserSetModel("", "", "", "", "");
    this.customer = new CustomerModel("", "", "", "", "", "", "", 0);
    this.concept = new ConceptModel("", 0, 0);
    this.invoice = new InvoiceModel(new Date(), 0, 0, "", false, new Date(), 0, 0, [], 0);
    this.today = new Date().toDateString();
    this.customers = [];
    this.concepts = [];
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

  public getToday(): void {
    this.today = new Date().toLocaleDateString();
  }

  public addInvoice(): void {
    console.log(this.concepts);
  }

  public resetInvoice(): void {
    this.customer = new CustomerModel("", "", "", "", "", "", "", 0);
    this.concepts = [];
  }

  public addConcept(): void {
    this.concepts.push(new ConceptModel("", 0));
  }

  public deleteConcept(index: number): void {
    if (this.concepts.length != 0) {
      this.concepts.splice(index, 1);
    }
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
