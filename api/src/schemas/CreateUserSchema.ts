import { object, string } from "yup";

const CreateUserSchema = object({
  name: string().required("O campo nome é obrigatório."),
  email: string()
    .email("E-mail inválido.")
    .required("O campo e-mail é obrigatório."),
  password: string()
    .min(8, "A senha deve conter pelo menos 8 caracteres.")
    .required("O campo senha é obrigatório."),
});

export default CreateUserSchema;
