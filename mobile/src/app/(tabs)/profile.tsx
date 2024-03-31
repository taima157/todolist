import colors from "@/src/constants/colors";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function TabTwoScreen() {
  return <SafeAreaView style={style.container}></SafeAreaView>;
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
});
