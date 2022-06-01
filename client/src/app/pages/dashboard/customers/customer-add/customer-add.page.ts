import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.page.html',
  styleUrls: ['./customer-add.page.scss'],
})
export class CustomerAddPage implements OnInit {

  constructor(private _section: DashboardService) { }

  ngOnInit() {
    this._section.setSectionName("Clientes");
  }

}
