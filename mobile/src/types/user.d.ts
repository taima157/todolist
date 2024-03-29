import { Todo } from "./todo";

export interface User {
  idUser: string;
  name: string;
  email: string;
  todoList: Array<Todo>;
}
