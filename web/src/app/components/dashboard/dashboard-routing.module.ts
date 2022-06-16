import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { CustomersComponent } from './customers/customers.component';
import { DashboardComponent } from './dashboard.component';
import { EmitComponent } from './emit/emit.component';
import { InvoicesComponent } from './invoices/invoices.component';
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
        path: 'invoices',
        component: InvoicesComponent
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
