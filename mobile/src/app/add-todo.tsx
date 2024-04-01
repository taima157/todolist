import { StyleSheet, View } from "react-native";
import colors from "../constants/colors";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Title } from "../components/Title";
import { Button } from "../components/Button";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Form } from "../components/Form";
import { Input } from "../components/Input";
import { useContext } from "react";
import { TodoContext } from "../context/todo.context";
import { CreateTodo } from "../types/todo";

export default function AddTodo() {
  const { createTodo } = useContext(TodoContext);

  const yupSchema = yup.object({
    title: yup.string().required("Preencha o campo título."),
    description: yup.string().required("Preencha o campo descrição."),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(yupSchema),
  });

  async function handleAddTodo(todo: CreateTodo) {
    try {
      await createTodo(todo);

      router.back();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={style.container}>
      <View style={style.modalHeader}>
        <Title.Root>
          <Title.Primary style={{ fontSize: 20 }}>
            Adicionar afazer
          </Title.Primary>
        </Title.Root>

        <Button.Root style={style.closeButton} onPress={() => router.back()}>
          <Button.Icon
            icon={MaterialIcons}
            name="close"
            size={24}
            color={colors.orange}
          />
        </Button.Root>
      </View>

      <View style={style.modalMain}>
        <Form.Root>
          <Input.Controller control={control} name="title">
            <Input.Icon icon={MaterialIcons} name="title" size={25} />
            <Input.Field label="Título" />
          </Input.Controller>
          <Input.Controller control={control} name="description">
            <Input.Icon icon={MaterialIcons} name="description" size={25} />
            <Input.Field label="Descrição" />
          </Input.Controller>
        </Form.Root>
      </View>

      <View style={style.modalFooter}>
        <Button.Root
          onPress={() => router.back()}
          text="Cancelar"
          textColor={colors.orange}
          style={style.cancelButton}
        >
          <Button.Icon
            icon={MaterialIcons}
            name="close"
            size={25}
            color={colors.orange}
          />
        </Button.Root>
        <Button.Root
          text="Adicionar"
          style={style.addButton}
          onPress={handleSubmit(handleAddTodo)}
        >
          <Button.Icon icon={MaterialIcons} name="add" size={25} />
        </Button.Root>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  modalHeader: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  closeButton: {
    width: 40,
    height: 40,
    backgroundColor: colors.gray,
  },
  modalMain: {
    flex: 1,
    borderTopColor: colors.gray,
    borderTopWidth: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 50,
  },
  modalFooter: {
    flexDirection: "row",
    paddingBottom: 40,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    borderTopColor: colors.gray,
    borderTopWidth: 2,
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: colors.gray,
    width: "45%",
  },
  addButton: {
    width: "45%",
  },
});
