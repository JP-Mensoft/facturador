import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { CustomersComponent } from './customers/customers.component';
import { CustomersAddComponent } from './customers/customers-add/customers-add.component';
import { CustomersDetailComponent } from './customers/customers-detail/customers-detail.component';
import { CustomersSetComponent } from './customers/customers-set/customers-set.component';
import { DashboardComponent } from './dashboard.component';
import { EmitComponent } from './emit/emit.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { InvoicesDetailComponent } from './invoices/invoices-detail/invoices-detail.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'customers',
        component: CustomersComponent
      },
      {
        path: 'customers-detail',
        component: CustomersDetailComponent
      },
      {
        path: 'customers-add',
        component: CustomersAddComponent
      },
      {
        path: 'customers-set',
        component: CustomersSetComponent
      },
      {
        path: 'invoices',
        component: InvoicesComponent,
      },
      {
        path: 'invoices-detail',
        component: InvoicesDetailComponent,
      },
      {
        path: 'emit',
        component: EmitComponent
      },
      {
        path: 'user',
        component: UserComponent
      },
      {
        path: '',
        pathMatch: "full",
        redirectTo: 'emit'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
