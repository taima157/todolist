import { Todo } from "./todo";

export interface User {
  idUser: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  todoList: Array<Todo>;
}
