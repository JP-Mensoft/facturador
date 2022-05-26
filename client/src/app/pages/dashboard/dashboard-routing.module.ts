import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'emit',
        loadChildren: () => import('./emit/emit.module').then(m => m.EmitPageModule)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'emit'
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule { }
