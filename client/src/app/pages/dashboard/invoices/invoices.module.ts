import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InvoicesPageRoutingModule } from './invoices-routing.module';
import { InvoicesPage } from './invoices.page';
import { InvoiceFilterPipe } from 'src/app/pipes/invoice-filter.pipe';
import { CollectedFilterPipe } from 'src/app/pipes/collected-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvoicesPageRoutingModule
  ],
  declarations: [
    InvoicesPage,
    InvoiceFilterPipe,
    CollectedFilterPipe
  ]
})
export class InvoicesPageModule { }
