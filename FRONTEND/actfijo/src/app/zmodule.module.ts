import { NzButtonModule } from 'ng-zorro-antd/button';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
const zorromodules = [
  NzFormModule,
  NzInputModule,
  NzMenuModule,
  NzAlertModule,
  NzButtonModule,
  NzCardModule,
  NzLayoutModule,
  NzBreadCrumbModule,
  NzTableModule,
  NzDividerModule,
  NzGridModule,
  NzIconModule,
  NzModalModule,
  NzSelectModule,
  NzSkeletonModule
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
