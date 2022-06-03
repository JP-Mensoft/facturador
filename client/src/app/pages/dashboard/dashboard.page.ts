import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {

  private sectionNameSub: Subscription;
  public sectionName: string;

  constructor(
    private _dashboard: DashboardService
  ) {
    this.sectionName = "";
  }

  ngOnInit(): void {
    this.monitoringSectionName();
  }

  ngOnDestroy(): void {
    this.sectionNameSub.unsubscribe();
  }

  public monitoringSectionName(): void {
    this.sectionNameSub = this._dashboard.subSectionName.subscribe({
      next: (name) => {
        this.sectionName = name;
      },
      error: () => { },
      complete: () => { }
    });
  }

  public goEmit(): void {
    this.sectionName = "Emitir";
    this._dashboard.switchEmit();
  }

  public goInvoices(): void {
    this.sectionName = "Facturas";
    this._dashboard.switchInvoices();
  }

  public goCustomers(): void {
    this.sectionName = "Clientes";
    this._dashboard.switchCustomers();
  }

  public goUser(): void {
    this.sectionName = "Usuario";
  }

}
