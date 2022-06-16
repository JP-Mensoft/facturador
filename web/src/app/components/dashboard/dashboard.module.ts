import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';

// Components
import { DashboardComponent } from './dashboard.component';
import { CustomersComponent } from './customers/customers.component';
import { EmitComponent } from './emit/emit.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { UserComponent } from './user/user.component';
import { NavComponent } from './layout/nav/nav.component';
import { SideComponent } from './layout/side/side.component';
import { FooterComponent } from './layout/footer/footer.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CustomersComponent,
    EmitComponent,
    InvoicesComponent,
    UserComponent,
    NavComponent,
    SideComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
