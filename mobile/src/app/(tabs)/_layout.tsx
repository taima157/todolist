import colors from "@/src/constants/colors";
import { AuthContext } from "@/src/context/auth.context";
import { TodoProvider } from "@/src/context/todo.context";
import { MaterialIcons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { useContext, useEffect } from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";

export default function AppLayout() {
  const { user } = useContext(AuthContext);

  if (!user) return <Redirect href="/login" />;

  return <Tab />;
}

function Tab() {
  return (
    <Tabs
      screenOptions={
        {
          tabBarStyle: {
            backgroundColor: colors.backgroundSecundary,
            borderTopWidth: 0,
          },
          tabBarLabelStyle: {
            fontFamily: "Montserrat_600SemiBold",
          },
          tabBarActiveTintColor: colors.orange,
          tabBarInactiveTintColor: colors.neutralSecundary,
        } as { tabBarStyle: StyleProp<ViewStyle> }
      }
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Afazeres",
          headerShown: false,
          tabBarIcon: ({ color }: { color: string }) => {
            return <MaterialIcons name="checklist" size={26} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }: { color: string }) => {
            return <MaterialIcons name="person" size={26} color={color} />;
          },
        }}
      />
    </Tabs>
  );
}
