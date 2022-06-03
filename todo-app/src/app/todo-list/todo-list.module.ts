import { NgModule } from '@angular/core';
import { TodoListComponent } from './todo-list.component';
import { TodoListRoutingModule } from './todo-list.routing';
import { NgZorroAntDModule } from '../ngzorro-antd.module';

@NgModule({
  declarations: [
    TodoListComponent
  ],
  imports: [
    NgZorroAntDModule,
    TodoListRoutingModule
  ]
})
export class TodoListModule { }
