import { ReactNode } from "react";
import { View, ViewProps } from "react-native";

export default function FormRoot(props: ViewProps) {
  return (
    <View {...props} style={[{ gap: 30 }, props.style]}>
      {props.children}
    </View>
  );
}
