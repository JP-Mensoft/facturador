import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.page.html',
  styleUrls: ['./invoice-detail.page.scss'],
})
export class InvoiceDetailPage implements OnInit {

  constructor(private _section: DashboardService) { }

  ngOnInit() {
    this._section.setSectionName("Facturas");
  }

}
