import { ReactNode, createContext, useState } from "react";
import { TodoContextType } from "../types/todo.context";
import { Todo } from "../types/todo";
import { Task } from "../types/task";

type PropsType = {
  children: ReactNode;
};

export const TodoContext = createContext<TodoContextType>({
  todoList: null,
  taskList: null,
  createTask: async () => {},
  createTodo: async () => {},
  removeTask: async () => {},
  removeTodo: async () => {},
  updateTask: async () => {},
  updateTaskList: async () => {},
  updateTodo: async () => {},
});

export function TodoProvider({ children }: PropsType) {
  const [todoList, setTodoList] = useState<Array<Todo> | null>(null);
  const [taskList, setTaskList] = useState<Array<Task> | null>(null);

  async function createTask() {}

  async function createTodo() {}

  async function removeTask() {}

  async function removeTodo() {}

  async function updateTask() {}

  async function updateTaskList() {}
  
  async function updateTodo() {}

  return (
    <TodoContext.Provider
      value={{
        todoList,
        taskList,
        createTask,
        createTodo,
        removeTask,
        removeTodo,
        updateTask,
        updateTaskList,
        updateTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
