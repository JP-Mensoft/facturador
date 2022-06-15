// MODULES
import { DashboardRoutingModule } from './dashboard-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

// COMPONENTS
import { SortDirective } from './sort-directive/sort.directive';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminComponent } from './components/admin/admin.component';
import { AuctionHouseComponent } from './components/subastas/auction-house.component';
import { SubastaComponent } from './components/subastas/subasta.component';
import { EstadoComponent } from './components/subastas/estado/estado.component';
import { MisSubastasComponent } from './components/mis-subastas/mis-subastas.component';
import { AjustesComponent } from './components/ajustes/ajustes.component';
import { HistorialComponent } from './components/historial/historial.component';

// PIPES
import { FiltroProductosPipe } from '../pipes/filtro-productos.pipe';
import { FiltroPrecioPipe } from '../pipes/filtro-precio.pipe';
import { MisPujasComponent } from './components/mis-pujas/mis-pujas.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SortDirective,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    AdminComponent,
    AuctionHouseComponent,
    SubastaComponent,
    EstadoComponent,
    MisSubastasComponent,
    FiltroProductosPipe,
    FiltroPrecioPipe,
    AjustesComponent,
    HistorialComponent,
    MisPujasComponent
  ],
  exports: [
    DashboardComponent,
    SortDirective,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    AdminComponent,
    AuctionHouseComponent,
    SubastaComponent,
    EstadoComponent,
    MisSubastasComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class DashboardModule { }
