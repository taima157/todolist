import { Button } from "@/src/components/Button";
import { Title } from "@/src/components/Title";
import colors from "@/src/constants/colors";
import { AuthContext } from "@/src/context/auth.context";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function TabOneScreen() {
  const { logoff } = useContext(AuthContext);

  function handleLogoff() {
    logoff();
    router.push("/login");
  }

  return (
    <SafeAreaView style={style.container}>
      <View style={style.mainContent}>
        <Title.Root style={style.title}>
          <Title.Primary>Afazeres</Title.Primary>
          <Title.Secundary>Essa é sua lista de afazeres.</Title.Secundary>
        </Title.Root>

        {/* <View style={style.titleBox}>
          <Text style={style.title}>Afazeres</Text>
          <Text style={style.subtitle}>Essa é sua lista de afazeres.</Text>
        </View> */}

        <Button.Root
          style={{
            width: 55,
            height: 55,
            borderRadius: 50,
            position: "absolute",
            bottom: 20,
            right: 20,
          }}
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
    padding: 20,
    position: "relative",
  },
  title: {
    paddingBottom: 15,
    borderBottomColor: colors.backgroundSecundary,
    borderBottomWidth: 2,
  },
});
