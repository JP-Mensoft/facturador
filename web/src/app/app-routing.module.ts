import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardGuard } from './guards/dashboard.guard';

/**
 * loadChildren (Lazy Loading), debe importar y cargar siempre el module, no el routing.module.
 * Los comodines ('', '**'), van al final del array de rutas, cuando busca la ruta recorre el array de arriba a abajo.
 * El guard solo permite o no activar la ruta especificada, hace referencia a la ruta y no al componente o módulo.
 * Los módulos deben cargar todo lo necesario para sus componentes.
 * El orden correcto es module -> routing.module -> component. Y puede ser una buena arquitectura para organizar el proyecto.
 * forRoot para routing.modules con rutas padre, debería haber solo uno en app.
 * forChild para routing.modules de rutas hijas, para módulos que tienen rutas children.
 * Solo app-routing debería tener rutas padre, el resto, todas las que definan y carguen componentes deberían ir en children.
 */

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import("./components/auth/auth.module").then(r => r.AuthModule)
  },
  {
    path: 'dashboard',
    canActivate: [DashboardGuard],
    loadChildren: () => import("./components/dashboard/dashboard.module").then(r => r.DashboardModule)
  },
  {
    path: '',
    pathMatch: "full",
    redirectTo: 'auth'
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
