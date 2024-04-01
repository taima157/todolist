import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Todo } from "../types/todo";
import colors from "../constants/colors";
import { Link, router } from "expo-router";

interface TodoCardProps {
  todo: Todo;
}

export default function TodoCard({ todo }: TodoCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => router.push(`/todo/${todo.idTodo}`)}
    >
      <View style={style.todoList}>
        <View style={style.verticalLine} />
        <View style={style.mainContent}>
          <Text style={style.title}>{todo.title}</Text>
          <Text style={style.description}>{todo.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  todoList: {
    flexDirection: "row",
    backgroundColor: colors.backgroundSecundary,
    borderRadius: 5,
    overflow: "hidden",
    gap: 5,
    borderColor: colors.gray,
    borderWidth: 1,
    elevation: 10,
  },
  verticalLine: {
    height: "auto",
    width: 3,
    backgroundColor: colors.orange,
  },
  mainContent: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 10,
    paddingBottom: 10,
    gap: 5,
  },
  title: {
    fontSize: 16,
    fontFamily: "Montserrat_600SemiBold",
    color: colors.orange,
  },
  description: {
    fontSize: 12,
    fontFamily: "Montserrat_600SemiBold",
    color: colors.textPrimary,
  },
});
