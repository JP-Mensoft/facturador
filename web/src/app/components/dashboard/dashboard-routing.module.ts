import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Guards
import { DashboardGuard } from 'src/app/guards/dashboard.guard';

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

/**
 * canActivateChild no sería necesario, todas las rutas hijas cargan dentro de la ruta padre (padre/hija).
 * Al no permitir desde el app-routing cargar el dashboard-routing, ya no cargarian sus hijas.
 * Los guards pueden servir también para controlar dónde está el usuario (ruta) y cargar o guardar lo que queramos.
 */

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivateChild: [DashboardGuard],
    children: [
      {
        path: 'customers',
        component: CustomersComponent
      },
      {
        path: 'customers-detail/:customerId',
        component: CustomersDetailComponent
      },
      {
        path: 'customers-add',
        component: CustomersAddComponent
      },
      {
        path: 'customers-set/:customerId',
        component: CustomersSetComponent
      },
      {
        path: 'invoices',
        component: InvoicesComponent,
      },
      {
        path: 'invoices-detail/:invoiceId',
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
      },
      {
        path: '**',
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
