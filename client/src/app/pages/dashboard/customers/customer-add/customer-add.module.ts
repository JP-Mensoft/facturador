import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CustomerAddPageRoutingModule } from './customer-add-routing.module';
import { CustomerAddPage } from './customer-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerAddPageRoutingModule,
    FormBuilder
  ],
  declarations: [CustomerAddPage]
})
export class CustomerAddPageModule { }
