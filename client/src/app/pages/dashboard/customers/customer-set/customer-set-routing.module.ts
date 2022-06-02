import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerSetPage } from './customer-set.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerSetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerSetPageRoutingModule {}
