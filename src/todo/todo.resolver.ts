import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Todo } from './todo.model';
import { TodoService } from './todo.service';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo], { name: 'todos' })
  findAll(): Todo[] {
    return this.todoService.findAll();
  }

  @Query(() => Todo, { name: 'todo' })
  findOne(@Args('id', { type: () => Int }) id: number): Todo {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo)
  createTodo(@Args('input') input: CreateTodoInput): Todo {
    return this.todoService.create(input);
  }

  @Mutation(() => Todo)
  updateTodo(@Args('input') input: UpdateTodoInput): Todo {
    return this.todoService.update(input);
  }

  @Mutation(() => Boolean)
  removeTodo(@Args('id', { type: () => Int }) id: number): boolean {
    return this.todoService.remove(id);
  }
}