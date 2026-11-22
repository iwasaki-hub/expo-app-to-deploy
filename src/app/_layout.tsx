import { Tabs, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { GlassTabIndicator } from "../components/glass-tab-indicator";
import { colors } from "../components/preview-colors";

export default function RootLayout() {
  const pathname = usePathname();

  return (
    <>
      <StatusBar style="light" />
      <Tabs
        backBehavior="history"
        screenOptions={{
          headerShown: false,
          sceneStyle: { backgroundColor: colors.background },
          tabBarActiveTintColor: colors.text,
          tabBarInactiveTintColor: colors.muted,
          tabBarBackground: () => <GlassTabIndicator guideSelected={pathname === "/guide"} />,
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
