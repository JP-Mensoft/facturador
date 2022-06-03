import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public subSectionName: Subject<string>;
  public subCustomers: Subject<boolean>;
  public subInvoices: Subject<boolean>;
  public subEmit: Subject<boolean>;

  public customersStatus: boolean;
  public invoicesStatus: boolean;
  public emitStatus: boolean;

  constructor() {
    this.subSectionName = new Subject<string>();
    this.subCustomers = new Subject<boolean>();
    this.subInvoices = new Subject<boolean>();
    this.subEmit = new Subject<boolean>();
  }

  public setSectionName(sectionName: string): void {
    this.subSectionName.next(sectionName);
  }

  public switchCustomers(): void {
    this.customersStatus = !this.customersStatus;
    this.subCustomers.next(this.customersStatus);
  }

  public switchInvoices(): void {
    this.invoicesStatus = !this.invoicesStatus;
    this.subInvoices.next(this.invoicesStatus);
  }

  public switchEmit(): void {
    this.emitStatus = !this.emitStatus;
    this.subEmit.next(this.emitStatus);
  }

}
