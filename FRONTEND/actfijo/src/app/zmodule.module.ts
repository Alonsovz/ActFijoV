import { NzButtonModule } from 'ng-zorro-antd/button';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzInputModule } from 'ng-zorro-antd/input';
<<<<<<< HEAD
import { NzCardModule } from 'ng-zorro-antd/card';
=======

>>>>>>> fbcd2e5dc80bdaaa695db17fe2d171acc2fceefb
const zorromodules = [
  NzFormModule,
  NzInputModule,
  NzMenuModule,
  NzAlertModule,
<<<<<<< HEAD
  NzButtonModule,
  NzCardModule
=======
  NzButtonModule
>>>>>>> fbcd2e5dc80bdaaa695db17fe2d171acc2fceefb
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
