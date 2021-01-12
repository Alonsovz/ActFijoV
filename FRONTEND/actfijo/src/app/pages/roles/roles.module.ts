import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles/roles.component';
import { ZmoduleModule } from 'src/app/zmodule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RolesComponent],
  imports: [
    CommonModule,
    RolesRoutingModule,
    ZmoduleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RolesModule { }
