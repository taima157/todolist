export interface CreateTask {
  todoId: string;
  description: string;
}

export interface Task {
  idTask: string;
  todoId: string;
  description: string;
  done: boolean;
}
