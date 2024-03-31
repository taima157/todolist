import { MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useForm } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../constants/colors";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Redirect } from "expo-router/build/link/Link";
import { SignupUser } from "../types/auth.context";
import { Form } from "../components/Form";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export default function Signup() {
  const { user, signup } = useContext(AuthContext);

  async function handleSignup(signupUser: SignupUser) {
    try {
      await signup(signupUser);

      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  }

  const yupSchema = yup.object({
    name: yup.string().required("Preencha o campo nome."),
    email: yup
      .string()
      .email("E-mail inválido.")
      .required("Preencha o campo e-mail."),
    password: yup
      .string()
      .min(8, "A senha deve conter no minimo 8 caracteres.")
      .required("Preencha o campo senha."),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(yupSchema),
  });

  if (user) {
    return <Redirect href="/(tabs)/" />;
  }

  return (
    <SafeAreaView style={style.containter}>
      <TouchableOpacity style={style.buttonBack} onPress={() => router.back()}>
        <MaterialIcons name="arrow-back" size={30} color={colors.orange} />
      </TouchableOpacity>
      <View style={style.formView}>
        <View style={style.titleBox}>
          <Text style={style.title}>Cadastrar Conta</Text>
          <Text style={style.subtitle}>
            Cadastre-se para utilizar o aplicativo.
          </Text>
        </View>

        <Form.Root>
          <Input.Controller control={control} name="name">
            <Input.Icon icon={MaterialIcons} name="person" size={24} />
            <Input.Field label="Nome" />
          </Input.Controller>
          <Input.Controller control={control} name="email">
            <Input.Icon icon={MaterialIcons} name="email" size={24} />
            <Input.Field label="Email" keyboardType="email-address" />
          </Input.Controller>
          <Input.Controller control={control} name="password">
            <Input.Icon icon={MaterialIcons} name="lock" size={24} />
            <Input.Field label="Senha" secureTextEntry />
          </Input.Controller>
          <Button.Root text="Cadastrar" onPress={handleSubmit(handleSignup)}>
            <Button.Icon icon={MaterialIcons} name="login" size={24} />
          </Button.Root>
        </Form.Root>

        <Text style={style.signupMessage}>
          Já possui uma conta?{" "}
          <Link style={{ color: colors.orange }} href="/login">
            Login
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
    position: "relative",
  },
  buttonBack: {
    position: "absolute",
    left: 15,
    top: 55,
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
