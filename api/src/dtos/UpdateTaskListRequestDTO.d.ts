export default interface UpdateTaskListRequestDTO {
  taskList: Array<{
    idTask: string;
    todoId: string;
    description: string;
    done: boolean;
  }>;
}
