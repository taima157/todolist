import colors from "@/src/constants/colors";
import { Children, ReactNode } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";

interface ButtonRootProps extends TouchableOpacityProps {
  text?: string;
  textColor?: string;
  alignSelf?: ViewStyle["alignSelf"];
}

export default function ButtonRoot(props: ButtonRootProps) {
  return (
    <TouchableOpacity {...props} style={[style.button, props.style]}>
      {props.text && (
        <Text
          style={[
            style.buttonText,
            props.textColor ? { color: props.textColor } : null,
          ]}
        >
          {props.text}
        </Text>
      )}
      {props.children}
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  button: {
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
  buttonText: {
    fontFamily: "Montserrat_600SemiBold",
    color: colors.textPrimary,
    textTransform: "uppercase",
  },
});
