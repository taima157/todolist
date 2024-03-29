import { Task } from "./task";

export interface Todo {
  idTodo: string;
  title: string;
  description: string;
  done: boolean;
  taskList: Array<Task>;
}
