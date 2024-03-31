import colors from "@/src/constants/colors";
import { StyleSheet, Text, TextProps } from "react-native";

export default function TitleSecundary(props: TextProps) {
  return (
    <Text {...props} style={[style.titleSecundary, props.style]}>
      {props.children}
    </Text>
  );
}

const style = StyleSheet.create({
  titleSecundary: {
    fontSize: 15,
    fontFamily: "Montserrat_600SemiBold",
    color: colors.textPrimary,
  },
});
