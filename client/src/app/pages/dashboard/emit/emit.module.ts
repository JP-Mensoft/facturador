import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmitPageRoutingModule } from './emit-routing.module';

import { EmitPage } from './emit.page';
import { LogoutPageModule } from '../logout/logout.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmitPageRoutingModule,
    LogoutPageModule
  ],
  declarations: [EmitPage]
})
export class EmitPageModule { }
