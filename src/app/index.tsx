import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "../components/preview-colors";

export default function Index() {
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
            <Link href="/guide" asChild style={styles.guideLink}>
              <Pressable accessibilityRole="link">
                <Text style={styles.guideLinkLabel}>公開ガイドを開く</Text>
              </Pressable>
            </Link>
          </View>
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
  guideLink: {
    alignSelf: "flex-start",
    justifyContent: "center",
    maxWidth: "100%",
    minHeight: 48,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: colors.ink,
  },
  guideLinkLabel: { color: colors.text, fontSize: 16, fontWeight: "700" },
});
