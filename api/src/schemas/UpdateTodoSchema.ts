import { boolean, object, string } from "yup";

const UpdateTodoSchema = object({
  userId: string().required("O campo id do usuário é obrigatório."),
  title: string().required("O campo título é obrigatório."),
  description: string().required("O campo descrição é obrigatório."),
  done: boolean().required("O campo done é obrigatório."),
});

export default UpdateTodoSchema;
