import { Component, OnInit } from '@angular/core';
import { SectionService } from 'src/app/services/section.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {

  constructor(private _section: SectionService) { }

  ngOnInit() {
    this._section.setSectionName("Clientes");
  }

}
