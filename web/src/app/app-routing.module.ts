import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DashboardGuard } from './guards/dashboard.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  },
  {
    path: 'auth',
    loadChildren: () => import('./components/auth/auth-routing.module').then(m => m.AuthRoutingModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./components/dashboard/dashboard-routing.module').then(m => m.DashboardRoutingModule),
    canActivate: [DashboardGuard],
    canActivateChild: [DashboardGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

