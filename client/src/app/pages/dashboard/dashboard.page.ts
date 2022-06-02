import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {

  public sectionName: string;
  public loggedUser: string;
  private sectionNameSub: Subscription;

  constructor(
    private _dashboard: DashboardService,
    private _storage: StorageService
  ) {
    this.sectionName = "";
    this.loggedUser = "";
  }

  ngOnInit(): void {
    this.setLoggedUser();
    this.monitoringSectionName();
  }

  ngOnDestroy(): void {
    this.sectionNameSub.unsubscribe();
  }

  public async setLoggedUser() {
    this.loggedUser = await this._storage.get("email");
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
