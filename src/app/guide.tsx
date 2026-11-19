import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "../components/preview-colors";

type GuideStep = {
  title: string;
  before: string;
  commands: string[];
  after?: string;
};

const steps: GuideStep[] = [
  {
    title: "Expo プロジェクトを作成",
    before: "Node.js LTS を用意し、ターミナルで Expo Router を含む標準テンプレートからアプリを作ります。my-expo-app は好きなアプリ名に置き換えます。",
    commands: ["npx create-expo-app@latest my-expo-app", "cd my-expo-app"],
  },
  {
    title: "iPhone で動作確認",
    before: "iPhone に Expo Go を入れます。PC と iPhone を同じ Wi-Fi に接続して開発サーバーを起動し、表示された QR コードを iPhone で読み取ります。",
    commands: ["npx expo start"],
    after: "iPhone では Expo CLI と Expo Go に同じ Expo アカウントでログインしてください。PC のブラウザで確認する場合は、開発サーバーで w を押します。",
  },
  {
    title: "Expo アカウントに登録",
    before: "開発サーバーを停止するか別のターミナルを開き、プロジェクトのルートで実行します。init の案内に沿って、公開先の Expo アカウントを選びます。",
    commands: [
      "npx eas-cli@latest login",
      "npx eas-cli@latest init",
      "npx eas-cli@latest project:info",
    ],
    after: "最後のコマンドで、意図したアカウントとプロジェクトに紐づいていることを確認します。",
  },
  {
    title: "Web プレビューを公開",
    before: "app.json の expo.web.output を static または server に設定します。このリポジトリでは server を使っています。",
    commands: ["npx expo export --platform web", "npx eas-cli@latest deploy"],
    after: "初回はサブドメインを求められたら選び、完了後に表示されるプレビュー URL を Safari や Chrome で開きます。プレビュー URL はデプロイごとに発行されます。",
  },
  {
    title: "固定の本番 URL に公開",
    before: "プレビューを確認したら、公開するソースから Web 版を出力し、本番にデプロイします。",
    commands: ["npx expo export --platform web", "npx eas-cli@latest deploy --prod"],
    after: "完了後に表示される固定の本番 URL を開きます。ソースを更新したら同じ手順で本番 URL に反映できます。",
  },
];

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
        <Text style={styles.intro}>
          新しい Expo アプリを作り、実機で確認してから Expo Hosting に Web 版を公開します。
        </Text>

        {steps.map(({ title, before, commands, after }, index) => (
          <View key={title} style={styles.step}>
            <Text accessibilityRole="header" style={styles.guideTitle}>
              {index + 1}. {title}
            </Text>
            <Text style={styles.body}>{before}</Text>
            <View style={styles.commands}>
              {commands.map((command) => (
                <Text key={command} selectable style={styles.command}>
                  {command}
                </Text>
              ))}
            </View>
            {after && <Text style={styles.body}>{after}</Text>}
          </View>
        ))}

        <View style={styles.step}>
          <Text accessibilityRole="header" style={styles.guideTitle}>
            このリポジトリの自動デプロイ
          </Text>
          <Text style={styles.body}>
            GitHub と Expo Workflows を連携済みです。PR の作成・更新で Web プレビューを公開し、
            main への push（PR のマージを含む）で本番 URL が更新されます。
            結果と公開 URL は Expo ダッシュボードで確認できます。
          </Text>
        </View>

        <Text accessibilityRole="header" style={styles.sectionTitle}>
          Expo 公式ドキュメント
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
  intro: { color: colors.muted, fontSize: 16, lineHeight: 25, marginBottom: 8 },
  step: {
    padding: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    backgroundColor: colors.panel,
  },
  body: { color: colors.muted, fontSize: 15, lineHeight: 24 },
  commands: { gap: 6, padding: 12, borderRadius: 10, backgroundColor: colors.background },
  command: { color: colors.accent, fontSize: 14, lineHeight: 21 },
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
