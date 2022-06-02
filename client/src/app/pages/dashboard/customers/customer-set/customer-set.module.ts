import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CustomerSetPageRoutingModule } from './customer-set-routing.module';
import { CustomerSetPage } from './customer-set.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerSetPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CustomerSetPage]
})
export class CustomerSetPageModule { }
