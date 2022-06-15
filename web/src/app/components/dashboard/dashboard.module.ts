import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CustomersComponent } from './customers/customers.component';
import { EmitComponent } from './emit/emit.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { UserComponent } from './user/user.component';
import { NavComponent } from './nav/nav.component';
import { SideComponent } from './side/side.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CustomersComponent,
    EmitComponent,
    InvoicesComponent,
    UserComponent,
    NavComponent,
    SideComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
