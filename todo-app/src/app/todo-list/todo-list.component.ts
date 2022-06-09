import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize, Observable } from 'rxjs';
import { sortArrayByFalsyValuesFirst } from 'src/util/filter-util';
import { Todo } from './models/todo.model';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'todo-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todoForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl<string>('', [Validators.required, Validators.minLength(3)])
  });
  loading = true;
  hideCompleted = false;

  get todos() {
    const todos = this.hideCompleted
      ? this._todos.filter(todo => !todo.isComplete)
      : this._todos;
    
    sortArrayByFalsyValuesFirst(todos, todo => todo.isComplete);

    return todos;
  }

  private _todos: Todo[] = [];

  constructor(private readonly todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService
      .getTodos()
      .pipe(finalize(() => this.loading = false))
      .subscribe(todos => {
        this._todos = todos;
      });
  }

  registerTodo(): void {
    if (!this.todoForm.valid) {
      return;
    }
    
    this.todoForm.disable();
    this.loading = true;

    const saveObs$ = this.todoForm.controls.id.value
      ? this.updateTodo()
      : this.createTodo();

    saveObs$
      .pipe(
        finalize(() => {
          this.loading = false;
          this.todoForm.reset();
          this.todoForm.enable();
        })
      )
      .subscribe(todo => this.updateTodoOnList(todo));
  }

  onToggleTodo(isComplete: boolean, todo: Todo): void {
    // Update todo in a immutable way
    this.updateTodoOnList({ ...todo, isComplete });

    // Optimistic update
    this.todoService.toggleTodo(todo.id).subscribe();
  }

  onEdit(todo: Todo): void {
    this.todoForm.setValue(todo);
  }

  onRemove(todo: Todo): void {
    this._todos = this.filterTodoFromList(todo);
    
    // If removed todo is selected to edit, reset form
    if (this.todoForm.controls.id.value === todo.id) {
      this.todoForm.reset();
    }

    // Optimistic deletion
    this.todoService.deleteTodo(todo.id).subscribe();
  }

  private createTodo(): Observable<Todo> {
    const formValues = this.todoForm.getRawValue();

    return this.todoService.createTodo({
      name: formValues.name as string
    });
  }

  private updateTodo(): Observable<Todo> {
    const formValues = this.todoForm.getRawValue();

    return this.todoService.updateTodo(formValues.id as string, {
      name: formValues.name as string
    });
  }

  private updateTodoOnList(todo: Todo): void {
    const updatedList = this.filterTodoFromList(todo);
    updatedList.push(todo);

    this._todos = updatedList;
  }

  private filterTodoFromList(todo: Todo): Todo[] {
    // Remove todo from list in a immutable way
    return this._todos.filter(x => x.id !== todo.id);
  }
}
