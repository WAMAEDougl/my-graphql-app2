import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './todo.model';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];
  private idCounter = 1;

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) throw new NotFoundException(`Todo #${id} not found`);
    return todo;
  }

  create(input: CreateTodoInput): Todo {
    const todo: Todo = {
      id: this.idCounter++,
      title: input.title,
      description: input.description,
      completed: false,
    };
    this.todos.push(todo);
    return todo;
  }

  update(input: UpdateTodoInput): Todo {
    const todo = this.findOne(input.id);
    Object.assign(todo, {
      ...input,
      id: todo.id, // prevent id overwrite
    });
    return todo;
  }

  remove(id: number): boolean {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index === -1) return false;
    this.todos.splice(index, 1);
    return true;
  }
}