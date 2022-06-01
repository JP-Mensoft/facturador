import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.page.html',
  styleUrls: ['./customer-add.page.scss'],
})
export class CustomerAddPage implements OnInit {

  public customerForm: FormGroup;

  constructor(
    private _section: DashboardService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this._section.setSectionName("Clientes");
    this.buildForms();
  }

  public buildForms(): void {
    this.customerForm = this._formBuilder.group({
      name: [""],
      email: [""],
      phone: [""],
      address: [""],
      cif: [""],
      remarks: [""]
    });
  }

  public clearForm(): void {
    this.customerForm.reset();
  }

}
