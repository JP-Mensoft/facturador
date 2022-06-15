import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuard } from '../guard/rol/admin.guard';
import { AuctionHouseComponent } from './components/subastas/auction-house.component';
import { SubastaComponent } from './components/subastas/subasta.component';
import { MisSubastasComponent } from './components/mis-subastas/mis-subastas.component';
import { AjustesComponent } from './components/ajustes/ajustes.component';
import { HistorialComponent } from './components/historial/historial.component';
import { BarcoGuard } from '../guard/rol/barco.guard';
import { MisPujasComponent } from './components/mis-pujas/mis-pujas.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: 'administracion', component: AdminComponent, data: { titulo: 'Administración' }, canActivate: [AdminGuard] },
      { path: 'auction-house', component: AuctionHouseComponent, data: { titulo: 'Casa de Subastas' } },
      { path: 'subasta/:id', component: SubastaComponent, data: { titulo: 'Subasta' } },
      { path: 'mis-subastas', component: MisSubastasComponent, data: { titulo: 'Mis Subastas' }, canActivate: [BarcoGuard] },
      { path: 'mis-pujas', component: MisPujasComponent, data: { titulo: 'Mis Pujas' } },
      { path: 'ajustes', component: AjustesComponent, data: { titulo: 'Ajustes' } },
      { path: 'historial', component: HistorialComponent, data: { titulo: 'Historial' } },
      { path: '', redirectTo: '/m/auction-house', pathMatch: 'full' },
      { path: '**', redirectTo: '/m/auction-house', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
