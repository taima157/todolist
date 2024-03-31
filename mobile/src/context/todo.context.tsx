import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { TodoContextType } from "../types/todo.context";
import { CreateTodo, Todo } from "../types/todo";
import { CreateTask, Task } from "../types/task";
import api from "../services/api";
import { AuthContext } from "./auth.context";

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
  const { user } = useContext(AuthContext);

  const todoList = user?.todoList || [];

  const [taskList, setTaskList] = useState<Array<Task> | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  async function getTaskList() {
    try {
      const { data }: { data: Todo } = await api.post(
        `/todo/${selectedTodo?.idTodo}`
      );

      setTaskList(data.taskList);
    } catch (error) {
      throw error;
    }
  }

  async function createTask(task: CreateTask) {
    try {
      await api.post("/task", task);
    } catch (error) {
      throw error;
    }
  }

  async function createTodo(todo: CreateTodo) {
    try {
      await api.post("/todo", todo);
    } catch (error) {
      throw error;
    }
  }

  async function removeTask(idTask: string) {
    try {
      await api.delete(`/task/${idTask}`);
    } catch (error) {
      throw error;
    }
  }

  async function removeTodo(idTodo: string) {
    try {
      await api.delete(`/todo/${idTodo}`);
    } catch (error) {
      throw error;
    }
  }

  async function updateTask(task: Task) {
    try {
      const { idTask, ...body } = task;

      await api.put(`/task/${idTask}`, body);
    } catch (error) {
      throw error;
    }
  }

  async function updateTaskList(taskList: Array<Task>) {
    try {
      await api.put("/task", { taskList });
    } catch (error) {
      throw error;
    }
  }

  async function updateTodo(todo: Todo) {
    try {
      const { idTodo, ...body } = todo;

      await api.put(`/todo/${idTodo}`, body);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    if (selectedTodo) {
      getTaskList();
    }
  }, [selectedTodo]);

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
