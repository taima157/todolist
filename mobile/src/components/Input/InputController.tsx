import colors from "@/src/constants/colors";
import { ReactNode, createContext } from "react";
import {
  Control,
  Controller,
  ControllerFieldState,
  ControllerProps,
  ControllerRenderProps,
  FieldValues,
  UseFormStateReturn,
} from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";

interface InputControllerProps {
  control?: Control<FieldValues> | undefined | any;
  name: string;
  children: ReactNode;
}

export const InputControlerContext = createContext<{
  field: ControllerRenderProps<FieldValues> | null;
  fieldState: ControllerFieldState | null;
  formState: UseFormStateReturn<FieldValues> | null;
}>({
  field: null,
  fieldState: null,
  formState: null,
});

export default function InputController(props: InputControllerProps) {
  return (
    <Controller
      {...props}
      rules={{
        required: true,
      }}
      render={(renderProps) => (
        <InputControlerContext.Provider value={renderProps}>
          <View style={style.inputController}>
            <View
              style={[
                style.inputBox,
                renderProps.field.value != null &&
                  renderProps.field.value != "" &&
                  style.filledField,
                renderProps.fieldState.invalid && style.invalidInput,
              ]}
            >
              {props.children}
            </View>
            {renderProps.fieldState.error && (
              <Text style={style.errorMessage}>
                {renderProps.fieldState.error.message}
              </Text>
            )}
          </View>
        </InputControlerContext.Provider>
      )}
    />
  );
}

const style = StyleSheet.create({
  inputController: {
    gap: 5,
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
  errorMessage: {
    color: colors.red,
    fontFamily: "Montserrat_600SemiBold",
    textTransform: "uppercase",
    fontSize: 10,
    alignSelf: "flex-end",
    position: "absolute",
    bottom: -20,
  },
});
