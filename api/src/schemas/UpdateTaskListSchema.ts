import { boolean, object, string, array } from "yup";

const UpdateTaskListSchema = object({
  taskList: array()
    .of(
      object({
        idTask: string().required(
          "O campo id task é obrigatório. Em algum item da lista."
        ),
        todoId: string().required(
          "O campo id do todo é obrigatório. Em algum item da lista."
        ),
        description: string().required(
          "O campo descrição é obrigatório. Em algum item da lista."
        ),
        done: boolean().required(
          "O campo done é obrigatório. Em algum item da lista."
        ),
      })
    )
    .required("A lista de tarefas é obrigatório."),
});

export default UpdateTaskListSchema;
