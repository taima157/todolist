import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Todo() {
  const { idTodo } = useLocalSearchParams();

  return (
    <View>
      <Text>{idTodo}</Text>
    </View>
  );
}
