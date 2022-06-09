import { NgModule } from '@angular/core';
import { TodoListComponent } from './todo-list.component';
import { TodoListRoutingModule } from './todo-list.routing';
import { NgZorroAntDModule } from '../ngzorro-antd.module';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

@NgModule({
  declarations: [
    TodoListComponent
  ],
  imports: [
    NgZorroAntDModule,
    NzListModule,
    NzCheckboxModule,
    TodoListRoutingModule
  ]
})
export class TodoListModule { }
