import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardGuard } from './guards/dashboard.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: "full",
    redirectTo: 'auth'
  },
  {
    path: 'auth',
    loadChildren: () => import("./components/auth/auth-routing.module").then(r => r.AuthRoutingModule)
  },
  {
    path: 'dashboard',
    canActivate: [DashboardGuard],
    canActivateChild: [DashboardGuard],
    loadChildren: () => import("./components/dashboard/dashboard-routing.module").then(r => r.DashboardRoutingModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
