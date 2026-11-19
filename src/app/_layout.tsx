import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { colors } from "../components/preview-colors";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Tabs
        backBehavior="history"
        screenOptions={{
          headerShown: false,
          sceneStyle: { backgroundColor: colors.background },
          tabBarActiveTintColor: colors.ink,
          tabBarActiveBackgroundColor: colors.accent,
          tabBarInactiveTintColor: colors.muted,
          tabBarStyle: { backgroundColor: colors.panel, borderTopColor: colors.border },
          tabBarItemStyle: { minHeight: 48, borderRadius: 12, marginHorizontal: 4 },
          tabBarLabelStyle: { fontSize: 14, fontWeight: "700" },
          tabBarIconStyle: { display: "none" },
        }}
      >
        <Tabs.Screen name="index" options={{ title: "ホーム" }} />
        <Tabs.Screen name="guide" options={{ title: "公開ガイド" }} />
      </Tabs>
    </>
  );
}
