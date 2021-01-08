import { NzButtonModule } from 'ng-zorro-antd/button';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
const zorromodules = [
  NzFormModule,
  NzInputModule,
  NzMenuModule,
  NzAlertModule,
  NzButtonModule,
  NzCardModule
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    zorromodules
  ]
})
export class ZmoduleModule { }
