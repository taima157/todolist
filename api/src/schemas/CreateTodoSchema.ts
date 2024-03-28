import { object, string } from "yup";

const CreateTodoSchema = object({
  userId: string().required("O campo id do usuário é obrigatório."),
  title: string().required("O campo título é obrigatório."),
  description: string().required("O campo descrição é obrigatório."),
});

export default CreateTodoSchema;
