import { Component, OnInit } from '@angular/core';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.page.html',
  styleUrls: ['./invoices.page.scss'],
})
export class InvoicesPage implements OnInit {

  constructor(private _section: SectionService) { }

  ngOnInit() {
    this._section.setSectionName("Facturas");
  }

}
