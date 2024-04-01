import { Task } from "./task";

export interface CreateTodo {
  title: string;
  description: string;
}

export interface Todo {
  idTodo: string;
  userId: string;
  title: string;
  description: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
  taskList: Array<Task>;
}
