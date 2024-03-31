import { AuthContext } from "@/src/context/auth.context";
import { Redirect, Tabs } from "expo-router";
import { useContext, useEffect } from "react";

export default function AppLayout() {
  const { user } = useContext(AuthContext);

  if (!user) return <Redirect href="/login" />;

  return <Tab />;
}

function Tab() {
  return (
    <Tabs options={{}}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
}
