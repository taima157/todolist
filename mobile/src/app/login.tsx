import { useContext, useRef, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../context/auth.context";
import { router } from "expo-router";
import useAuth from "../hooks/useAuth";

type UserLogin = {
  email: string;
  password: string;
};

export default function Login() {
  const { login } = useContext(AuthContext);

  const [userLogin, setUserLogin] = useState<UserLogin>({
    email: "",
    password: "",
  });

  async function handleLogin() {
    try {
      console.log("teste");
      await login(userLogin);

      // router.push("/(tabs)/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{marginTop: 50}}>
      <Text>Login</Text>
      <TextInput
        value={userLogin.email}
        onChangeText={(text) => setUserLogin({ ...userLogin, email: text })}
        style={{ borderColor: "black", borderWidth: 1 }}
      />
      <TextInput
        value={userLogin.password}
        onChangeText={(text) => setUserLogin({ ...userLogin, password: text })}
        style={{ borderColor: "black", borderWidth: 1 }}
      />
      <TouchableOpacity onPress={handleLogin}>
        <Text>Fazer Login</Text>
      </TouchableOpacity>
    </View>
  );
}
