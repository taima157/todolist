import { object, string } from "yup";

const LoginSchema = object({
  email: string()
    .email("E-mail inválido.")
    .required("O campo e-mail é obrigatório."),
  password: string().required("O campo senha é obrigatório."),
});

export default LoginSchema;
