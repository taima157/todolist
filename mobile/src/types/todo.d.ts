import { Task } from "./task";

export interface CreateTodo {
  userId: string;
  title: string;
  description: string;
}

export interface Todo {
  idTodo: string;
  userId: string;
  title: string;
  description: string;
  done: boolean;
  taskList: Array<Task>;
}
