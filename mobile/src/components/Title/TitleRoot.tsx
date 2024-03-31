import { View, ViewProps } from "react-native";

export default function TitleRoot(props: ViewProps) {
  return (
    <View {...props} style={[{ gap: 5 }, props.style]}>
      {props.children}
    </View>
  );
}
