import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const colors = {
  background: "#10111A",
  panel: "#191B28",
  border: "#333548",
  text: "#FAF9FF",
  muted: "#B8B9CD",
  accent: "#D5C8FF",
  ink: "#211738",
};

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

export default function Index() {
  const { top, bottom, left, right } = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.screen}
      contentInsetAdjustmentBehavior="never"
      contentContainerStyle={{
        paddingTop: top + 24,
        paddingBottom: bottom + 32,
        paddingLeft: left + 20,
        paddingRight: right + 20,
      }}
    >
      <StatusBar style="light" />
      <View style={styles.content}>
        <View style={styles.brand}>
          <View style={styles.brandIcon} />
          <Text style={styles.brandName}>Expo Preview</Text>
        </View>

        <View style={styles.hero}>
          <View
            accessible={false}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            pointerEvents="none"
            style={styles.art}
          >
            <View style={[styles.orbit, styles.outerOrbit]} />
            <View style={[styles.orbit, styles.innerOrbit]} />
            <View style={styles.planet} />
            <View style={styles.moon} />
          </View>
          <View style={styles.intro}>
            <Text accessibilityRole="header" style={styles.title}>
              アプリを{"\n"}プレビュー
            </Text>
            <Text style={styles.description}>
              iOS・Android・Web に向けた Expo アプリのプレビュー画面です。
            </Text>
          </View>
        </View>

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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { width: "100%", maxWidth: 760, alignSelf: "center", gap: 26 },
  brand: { flexDirection: "row", alignItems: "center", gap: 10 },
  brandIcon: {
    width: 14,
    height: 14,
    borderRadius: 4,
    backgroundColor: colors.accent,
    transform: [{ rotate: "45deg" }],
    marginHorizontal: 3,
  },
  brandName: { color: colors.text, fontSize: 17, fontWeight: "700" },
  hero: {
    borderRadius: 28,
    borderCurve: "continuous",
    backgroundColor: colors.accent,
    overflow: "hidden",
  },
  art: { height: 142, overflow: "hidden" },
  orbit: { position: "absolute", borderWidth: 1, borderColor: "#8873C2" },
  outerOrbit: { width: 340, height: 340, borderRadius: 170, top: -103, right: -86 },
  innerOrbit: { width: 258, height: 258, borderRadius: 129, top: -62, right: -45 },
  planet: {
    position: "absolute",
    width: 152,
    height: 152,
    borderRadius: 76,
    right: 8,
    top: -9,
    backgroundColor: "#724CC6",
    borderWidth: 22,
    borderColor: "#A58AE8",
  },
  moon: {
    position: "absolute",
    width: 23,
    height: 23,
    borderRadius: 12,
    top: 36,
    right: 203,
    backgroundColor: colors.ink,
  },
  intro: { gap: 14, paddingHorizontal: 24, paddingBottom: 28 },
  title: { color: colors.ink, fontSize: 38, fontWeight: "800" },
  description: { color: "#493766", fontSize: 15, lineHeight: 24, maxWidth: 400 },
  resources: { gap: 10 },
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
