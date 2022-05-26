import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmitPage } from './emit.page';

const routes: Routes = [
  {
    path: '',
    component: EmitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmitPageRoutingModule {}
