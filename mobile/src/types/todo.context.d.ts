import { Task } from "./task";
import { Todo } from "./todo";

export interface CreateTodo {
  userId: string;
  title: string;
  description: string;
}

export interface CreateTask {
  todoId: string;
  description: string;
}

export interface TodoContextType {
  todoList: Array<Todo> | null;
  taskList: Array<Task> | null;
  createTodo: (todo: CreateTodo) => Promise<void>;
  updateTodo: (todo: Todo) => Promise<void>;
  removeTodo: (idTodo: string) => Promise<void>;
  createTask: (task: CreateTask) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  removeTask: (idTodo: string) => Promise<void>;
  updateTaskList: (taskList: Array<Task>) => Promise<void>;
}
