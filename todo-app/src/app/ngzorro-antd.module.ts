import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NzInputModule,
    NzFormModule,
    NzGridModule,
    NzLayoutModule,
    NzFormModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    NzCheckboxModule,
    NzTableModule
  ]
})
export class NgZorroAntDModule { }
