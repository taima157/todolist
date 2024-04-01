import { useContext } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { InputControlerContext } from "./InputController";
import colors from "@/src/constants/colors";

interface InputFieldProps extends TextInputProps {
  label?: string;
}

export default function InputField(props: InputFieldProps) {
  const { field } = useContext(InputControlerContext);

  return (
    <View style={style.inputField}>
      <Text style={style.label}>{props.label}</Text>
      <TextInput
        {...props}
        placeholderTextColor="#c4c4c4"
        value={field?.value}
        onChangeText={field?.onChange}
        onBlur={field?.onBlur}
        style={style.input}
      />
    </View>
  );
}

const style = StyleSheet.create({
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
});
