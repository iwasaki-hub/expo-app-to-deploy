import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "../components/preview-colors";

const guides = [
  {
    href: "https://docs.expo.dev/deploy/web/",
    title: "Web プレビューを公開",
    description: "Expo Hosting で共有できる URL を作成する",
  },
  {
    href: "https://docs.expo.dev/build/setup/",
    title: "モバイルアプリをビルド",
    description: "iOS・Android 向けのビルドを作成する",
  },
] as const;

export default function Guide() {
  const { top, left, right } = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.screen}
      contentInsetAdjustmentBehavior="never"
      contentContainerStyle={{
        paddingTop: top + 24,
        paddingBottom: 32,
        paddingLeft: left + 20,
        paddingRight: right + 20,
      }}
    >
      <View style={styles.resources}>
        <Text accessibilityRole="header" style={styles.sectionTitle}>
          公開ガイド
        </Text>
        {guides.map(({ href, title, description }) => (
          <Link key={href} href={href} asChild>
            <Pressable
              accessibilityRole="link"
              style={({ pressed }) => [styles.guide, pressed && styles.pressed]}
            >
              <View style={styles.guideCopy}>
                <Text style={styles.guideTitle}>{title}</Text>
                <Text style={styles.guideDescription}>{description}</Text>
              </View>
              <View style={styles.arrowBadge} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
                <Text style={styles.arrow}>↗</Text>
              </View>
            </Pressable>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  resources: { width: "100%", maxWidth: 760, alignSelf: "center", gap: 10 },
  sectionTitle: { color: colors.text, fontSize: 20, fontWeight: "700", marginBottom: 4 },
  guide: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    minHeight: 76,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    borderCurve: "continuous",
    backgroundColor: colors.panel,
  },
  pressed: { backgroundColor: "#29243D", borderColor: colors.accent },
  guideCopy: { flex: 1, gap: 4 },
  guideTitle: { color: colors.text, fontSize: 16, fontWeight: "700" },
  guideDescription: { color: colors.muted, fontSize: 13, lineHeight: 20 },
  arrowBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#302747",
  },
  arrow: { color: colors.accent, fontSize: 19 },
});
