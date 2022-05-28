import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    children: [
      {
        path: 'emit',
        loadChildren: () => import('./emit/emit.module').then(m => m.EmitPageModule)
      },
      {
        path: 'customers',
        loadChildren: () => import('./customers/customers.module').then(m => m.CustomersPageModule)
      },
      {
        path: 'invoices',
        loadChildren: () => import('./invoices/invoices.module').then(m => m.InvoicesPageModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./user/user.module').then(m => m.UserPageModule)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'emit'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule { }
