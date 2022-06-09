import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateTodoCommand } from '../models/create-todo.command';
import { Todo } from '../models/todo.model';
import { UpdateTodoCommand } from '../models/update-todo.command';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private readonly httpClient: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(`${environment.api}/todo-items`);
  }
  
  createTodo(createTodoCommand: CreateTodoCommand): Observable<Todo> {
    return this.httpClient.post<Todo>(`${environment.api}/todo-items`, createTodoCommand);
  }

  updateTodo(id: string, updateTodoCommand: UpdateTodoCommand): Observable<Todo> {
    return this.httpClient.put<Todo>(`${environment.api}/todo-items/${id}`, updateTodoCommand);
  }

  deleteTodo(id: string): Observable<Todo> {
    return this.httpClient.delete<Todo>(`${environment.api}/todo-items/${id}`);
  }

  toggleTodo(id: string): Observable<null> {
    return this.httpClient.post<null>(`${environment.api}/todo-items/${id}:toggle`, {});
  }
}
