import colors from "@/src/constants/colors";
import { StyleSheet, Text, TextProps } from "react-native";

export default function TitlePrimary(props: TextProps) {
  return (
    <Text {...props} style={[style.titlePrimary, props.style]}>
      {props.children}
    </Text>
  );
}

const style = StyleSheet.create({
  titlePrimary: {
    fontSize: 30,
    fontFamily: "Montserrat_700Bold",
    color: colors.orange,
  },
});
