import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomersPage } from './customers.page';

const routes: Routes = [
  {
    path: '',
    component: CustomersPage
  },
  {
    path: 'customer-detail/:customerId',
    loadChildren: () => import('./customer-detail/customer-detail.module').then(m => m.CustomerDetailPageModule)
  },
  {
    path: 'customer-add',
    loadChildren: () => import('./customer-add/customer-add.module').then(m => m.CustomerAddPageModule)
  },
  {
    path: 'customer-set/:customerId',
    loadChildren: () => import('./customer-set/customer-set.module').then(m => m.CustomerSetPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersPageRoutingModule { }
