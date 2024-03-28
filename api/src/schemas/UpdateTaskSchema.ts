import { boolean, object, string } from "yup";

const UpdateTaskSchema = object({
  todoId: string().required("O campo id do todo é obrigatório."),
  description: string().required("O campo descrição é obrigatório."),
  done: boolean().required("O campo done é obrigatório."),
});

export default UpdateTaskSchema;
