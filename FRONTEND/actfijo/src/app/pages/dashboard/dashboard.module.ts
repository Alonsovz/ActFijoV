import { ZmoduleModule } from './../../zmodule.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ZmoduleModule
<<<<<<< HEAD
=======
  ],
  exports: [
    NzButtonModule,
>>>>>>> fbcd2e5dc80bdaaa695db17fe2d171acc2fceefb
  ]
})
export class DashboardModule { }
