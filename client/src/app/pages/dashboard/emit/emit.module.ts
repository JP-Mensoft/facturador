import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmitPageRoutingModule } from './emit-routing.module';

import { EmitPage } from './emit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmitPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EmitPage]
})
export class EmitPageModule { }
