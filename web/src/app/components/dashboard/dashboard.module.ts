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
import { CustomersDetailComponent } from './customers/customers-detail/customers-detail.component';
import { CustomersAddComponent } from './customers/customers-add/customers-add.component';
import { CustomersSetComponent } from './customers/customers-set/customers-set.component';
import { InvoicesDetailComponent } from './invoices/invoices-detail/invoices-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    CustomersComponent,
    EmitComponent,
    InvoicesComponent,
    UserComponent,
    NavComponent,
    SideComponent,
    FooterComponent,
    CustomersDetailComponent,
    CustomersAddComponent,
    CustomersSetComponent,
    InvoicesDetailComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
