import { useContext, useRef } from "react";
import { SafeAreaView, Text, TextInput, View, StyleSheet } from "react-native";
import { AuthContext } from "../context/auth.context";
import { Redirect } from "expo-router/build/link/Link";
import colors from "../constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Control,
  Field,
  FieldValues,
  Resolver,
  useForm,
} from "react-hook-form";
import { Link } from "expo-router";
import { Form } from "../components/Form";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

type UserLogin = {
  email: string;
  password: string;
};

export default function Login() {
  const { login, user } = useContext(AuthContext);

  async function handleLogin(userLogin: UserLogin) {
    try {
      await login(userLogin);
    } catch (error) {
      console.log(error);
    }
  }

  const yupSchema = yup.object({
    email: yup
      .string()
      .email("E-mail inválido.")
      .required("Preencha o campo e-mail."),
    password: yup.string().required("Preencha o campo senha."),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(yupSchema),
  });

  if (user) {
    return <Redirect href="/(tabs)/" />;
  }

  return (
    <SafeAreaView style={style.containter}>
      <View style={style.formView}>
        <View style={style.titleBox}>
          <Text style={style.title}>Login</Text>
          <Text style={style.subtitle}>Por favor entre para continuar.</Text>
        </View>

        <Form.Root>
          <Input.Controller control={control} name="email">
            <Input.Icon icon={MaterialIcons} name="email" size={24} />
            <Input.Field label="Email" keyboardType="email-address" />
          </Input.Controller>
          <Input.Controller control={control} name="password">
            <Input.Icon icon={MaterialIcons} name="lock" size={24} />
            <Input.Field label="Senha" secureTextEntry />
          </Input.Controller>
          <Button.Root text="Login" onPress={handleSubmit(handleLogin)}>
            <Button.Icon icon={MaterialIcons} name="login" size={20} />
          </Button.Root>
        </Form.Root>

        <Text style={style.signupMessage}>
          Não tem uma conta?{" "}
          <Link style={{ color: colors.orange }} href="/signup">
            Cadastre-se
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  containter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.backgroundPrimary,
  },
  formView: {
    width: "90%",
    gap: 60,
    padding: 10,
    elevation: 10,
    borderRadius: 5,
  },
  titleBox: {
    gap: 5,
  },
  title: {
    fontSize: 30,
    fontFamily: "Montserrat_700Bold",
    color: colors.orange,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: "Montserrat_600SemiBold",
    color: colors.textPrimary,
  },
  signupMessage: {
    textAlign: "center",
    fontFamily: "Montserrat_600SemiBold",
    color: colors.textPrimary,
  },
});
