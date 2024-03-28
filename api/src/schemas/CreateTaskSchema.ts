import { object, string } from "yup";

const CreateTaskSchema = object({
  todoId: string().required("O campo id do todo é obrigatório."),
  description: string().required("O campo descrição é obrigatório."),
});

export default CreateTaskSchema;
