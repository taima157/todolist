import { MaterialIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../constants/colors";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Redirect } from "expo-router/build/link/Link";
import { SignupUser } from "../types/auth.context";

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
    password: yup.string().required("Preencha o campo senha."),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
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
      <View style={style.form}>
        <View style={style.titleBox}>
          <Text style={style.title}>Cadastrar Conta</Text>
          <Text style={style.subtitle}>
            Cadastre-se para utilizar o aplicativo.
          </Text>
        </View>

        <View style={style.inputs}>
          <View style={style.inputError}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              name="name"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { invalid },
              }) => (
                <View
                  style={[
                    style.inputBox,
                    value != null && value != "" && style.filledField,
                    invalid && style.invalidInput,
                  ]}
                >
                  <MaterialIcons name="person" size={24} color="#404040" />
                  <View style={style.inputField}>
                    <Text style={style.label}>Nome</Text>
                    <TextInput
                      placeholderTextColor="#c4c4c4"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      style={style.input}
                      inputMode="text"
                    />
                  </View>
                </View>
              )}
            />
            {errors.name && (
              <Text style={style.errorMessage}>{errors.name.message}</Text>
            )}
          </View>

          <View style={style.inputError}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              name="email"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { invalid },
              }) => (
                <View
                  style={[
                    style.inputBox,
                    value != null && value != "" && style.filledField,
                    invalid && style.invalidInput,
                  ]}
                >
                  <MaterialIcons name="email" size={24} color="#404040" />
                  <View style={style.inputField}>
                    <Text style={style.label}>Email</Text>
                    <TextInput
                      placeholderTextColor="#c4c4c4"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      style={style.input}
                      inputMode="email"
                    />
                  </View>
                </View>
              )}
            />
            {errors.email && (
              <Text style={style.errorMessage}>{errors.email.message}</Text>
            )}
          </View>

          <View style={style.inputError}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              name="password"
              render={({
                field: { onChange, onBlur, value },
                fieldState: { invalid },
              }) => (
                <View
                  style={[
                    style.inputBox,
                    value != null && value != "" && style.filledField,
                    invalid && style.invalidInput,
                  ]}
                >
                  <MaterialIcons name="lock" size={24} color="#404040" />
                  <View style={style.inputField}>
                    <Text style={style.label}>Senha</Text>
                    <TextInput
                      placeholderTextColor="#c4c4c4"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      style={style.input}
                      secureTextEntry
                    />
                  </View>
                </View>
              )}
            />
            {errors.password && (
              <Text style={style.errorMessage}>{errors.password.message}</Text>
            )}
          </View>
        </View>

        <TouchableOpacity
          style={style.buttonLogin}
          onPress={handleSubmit(handleSignup)}
        >
          <Text style={style.buttonLoginText}>Cadastrar</Text>
          <MaterialIcons name="login" size={20} color={colors.textPrimary} />
        </TouchableOpacity>
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
  form: {
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
  inputBox: {
    flexDirection: "row",
    gap: 5,
    alignItems: "flex-end",
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: colors.neutral,
    borderRadius: 2,
    position: "relative",
  },
  filledField: {
    backgroundColor: colors.backgroundSecundary,
    borderBottomColor: colors.orange,
  },
  invalidInput: {
    backgroundColor: colors.backgroundSecundary,
    borderBottomColor: colors.red,
  },
  inputs: {
    gap: 30,
  },
  inputError: {
    gap: 5,
  },
  errorMessage: {
    color: colors.red,
    fontFamily: "Montserrat_600SemiBold",
    textTransform: "uppercase",
    fontSize: 10,
    alignSelf: "flex-end",
    position: "absolute",
    bottom: -20,
  },
  inputField: {
    width: "100%",
  },
  label: {
    color: colors.orange,
    fontFamily: "Montserrat_600SemiBold",
    textTransform: "uppercase",
    fontSize: 10,
  },
  input: {
    paddingTop: 8,
    height: 35,
    width: "100%",
    color: colors.textPrimary,
    fontFamily: "Montserrat_600SemiBold",
  },
  buttonLogin: {
    backgroundColor: colors.orange,
    width: "50%",
    borderRadius: 5,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 5,
    alignSelf: "flex-end",
  },
  buttonLoginText: {
    fontFamily: "Montserrat_600SemiBold",
    color: colors.textPrimary,
    textTransform: "uppercase",
  },
  signupMessage: {
    textAlign: "center",
    fontFamily: "Montserrat_600SemiBold",
    color: colors.textPrimary,
  },
});
