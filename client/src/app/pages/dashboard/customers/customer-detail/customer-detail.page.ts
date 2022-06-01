import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.page.html',
  styleUrls: ['./customer-detail.page.scss'],
})
export class CustomerDetailPage implements OnInit {

  constructor(private _section: DashboardService) { }

  ngOnInit() {
    this._section.setSectionName("Clientes");
  }

}
