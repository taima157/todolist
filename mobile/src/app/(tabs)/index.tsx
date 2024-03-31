import { AuthContext } from "@/src/context/auth.context";
import { router } from "expo-router";
import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TabOneScreen() {
  const { logoff } = useContext(AuthContext);

  function handleLogoff() {
    logoff();
    router.push("/login");
  }

  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity onPress={handleLogoff}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
