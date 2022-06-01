import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerAddPage } from './customer-add.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerAddPageRoutingModule {}
