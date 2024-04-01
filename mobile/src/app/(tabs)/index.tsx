import { Button } from "@/src/components/Button";
import { Title } from "@/src/components/Title";
import TodoCard from "@/src/components/TodoCard";
import colors from "@/src/constants/colors";
import { AuthContext } from "@/src/context/auth.context";
import { TodoContext } from "@/src/context/todo.context";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useContext } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

export default function TabOneScreen() {
  const { todoList } = useContext(TodoContext);

  return (
    <SafeAreaView style={style.container}>
      <View style={style.mainContent}>
        <Title.Root style={style.title}>
          <Title.Primary>Afazeres</Title.Primary>
          <Title.Secundary>Essa é sua lista de afazeres.</Title.Secundary>
        </Title.Root>

        <ScrollView style={style.scrollList}>
          <View style={style.todoList}>
            {todoList?.map((todo) => (
              <TodoCard key={todo.idTodo} todo={todo} />
            ))}
          </View>
        </ScrollView>

        <Button.Root
          style={style.buttonAddTodo}
          onPress={() => router.push("/add-todo")}
        >
          <Button.Icon
            icon={MaterialIcons}
            name="add"
            size={40}
            color={colors.backgroundPrimary}
          />
        </Button.Root>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  mainContent: {
    flex: 1,
    position: "relative",
  },
  title: {
    paddingBottom: 15,
    borderBottomColor: colors.gray,
    borderBottomWidth: 2,
    padding: 20,
  },
  scrollList: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  todoList: {
    flex: 1,
    marginTop: 20,
    width: "100%",
    gap: 20,
    paddingBottom: 20,
  },
  buttonAddTodo: {
    width: 55,
    height: 55,
    borderRadius: 50,
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
