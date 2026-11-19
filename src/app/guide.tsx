import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors } from "../components/preview-colors";

type GuideStep = {
  title: string;
  before: string;
  commands: { command: string; description: string }[];
  outputModes?: { mode: string; description: string }[];
  example?: string;
  after?: string;
};

const steps: GuideStep[] = [
  {
    title: "Expo プロジェクトを作成",
    before: "Node.js LTS を用意します。my-expo-app は好きなアプリ名に置き換えてください。",
    commands: [
      {
        command: "npx create-expo-app@latest my-expo-app",
        description: "Expo Router を含む標準テンプレートでアプリを作成します。",
      },
      { command: "cd my-expo-app", description: "作成したプロジェクトのフォルダに移動します。" },
    ],
  },
  {
    title: "iPhone で動作確認",
    before: "iPhone に Expo Go を入れ、PC と iPhone を同じ Wi-Fi に接続します。",
    commands: [
      {
        command: "npm start",
        description: "package.json の start スクリプト（expo start）を実行し、開発サーバーを起動します。",
      },
    ],
    after: "iPhone では Expo CLI と Expo Go に同じ Expo アカウントでログインし、表示された QR コードを読み取ります。PC のブラウザで確認する場合は、開発サーバーで w を押します。",
  },
  {
    title: "Expo アカウントに登録",
    before: "開発サーバーを停止するか別のターミナルを開き、プロジェクトのルートで実行します。",
    commands: [
      { command: "npx eas-cli@latest login", description: "Expo アカウントにログインします。" },
      {
        command: "npx eas-cli@latest init",
        description: "案内に沿ってアカウントを選び、EAS プロジェクトを作成するか既存のプロジェクトに紐づけます。",
      },
      {
        command: "npx eas-cli@latest project:info",
        description: "紐づいたプロジェクトの fullName（@アカウント/スラッグ）と固有の ID を表示します。",
      },
    ],
    example: "fullName  @masa-practice/expo-app-to-deploy\nID        200513de-0587-41c5-bf74-dbad4d538415",
    after: "fullName が意図した公開先か確認します。EAS project not configured と表示された場合は、先に init で紐づけます。",
  },
  {
    title: "Web プレビューを公開",
    before: "app.json の expo.web.output で、Web ページを生成するタイミングを選びます。このリポジトリは SDK 58 の server を使っています。",
    outputModes: [
      {
        mode: "static",
        description: "ビルド時に HTML を生成します。紹介サイトやガイドなど、更新のたびに再ビルドできるページに向いています。",
      },
      {
        mode: "server",
        description: "アクセス時にサーバーで HTML を生成します。ログイン状態など、リクエストごとに内容が変わるページに向いています。Expo Hosting など、サーバー処理を実行できる公開先が必要です。",
      },
    ],
    commands: [
      { command: "npx expo export --platform web", description: "設定に従って Web 版を dist/ に出力します。" },
      { command: "npx eas-cli@latest deploy", description: "Web 版を Expo Hosting にアップロードし、プレビュー URL を発行します。" },
    ],
    after: "初回はサブドメインを求められたら選び、完了後に表示されるプレビュー URL を Safari や Chrome で開きます。",
  },
  {
    title: "固定の本番 URL に公開",
    before: "プレビューで動作を確認したら、本番に公開します。",
    commands: [
      { command: "npx expo export --platform web", description: "公開するソースから Web 版を出力します。" },
      { command: "npx eas-cli@latest deploy --prod", description: "Expo Hosting の固定の本番 URL を最新の Web 版に更新します。" },
    ],
    after: "完了後に表示される本番 URL を開き、反映を確認します。",
  },
];

const workflowExamples = [
  {
    path: ".eas/workflows/pr-preview.yml",
    description: "PR を作成・再オープンしたときや、PR のブランチに push したときにプレビューを公開します。",
    yaml: `name: Web Preview

on:
  pull_request: {}

jobs:
  deploy:
    name: Deploy Web Preview
    type: deploy
    environment: preview
    params:
      prod: false`,
  },
  {
    path: ".eas/workflows/deploy-production.yml",
    description: "main への push（PR のマージを含む）で固定の本番 URL を更新します。",
    yaml: `name: Web Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    name: Deploy Web Production
    type: deploy
    environment: production
    params:
      prod: true`,
  },
] as const;

const guides = [
  {
    href: "https://docs.expo.dev/eas/hosting/workflows/",
    title: "Web 版を自動デプロイ",
    description: "Expo Workflows のトリガーとデプロイ設定を確認する",
  },
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

        {steps.map(({ title, before, commands, outputModes, example, after }, index) => (
          <View key={title} style={styles.step}>
            <Text accessibilityRole="header" style={styles.guideTitle}>
              {index + 1}. {title}
            </Text>
            <Text style={styles.body}>{before}</Text>
            {outputModes?.map(({ mode, description }) => (
              <View key={mode} style={styles.detail}>
                <Text style={styles.guideTitle}>{mode}</Text>
                <Text style={styles.body}>{description}</Text>
              </View>
            ))}
            {commands.map(({ command, description }) => (
              <View key={command} style={styles.commandBlock}>
                <Text selectable style={styles.command}>{command}</Text>
                <Text style={styles.guideDescription}>{description}</Text>
              </View>
            ))}
            {example && (
              <View style={styles.commandBlock}>
                <Text style={styles.guideTitle}>このリポジトリでの表示例</Text>
                <Text selectable style={styles.command}>{example}</Text>
              </View>
            )}
            {after && <Text style={styles.body}>{after}</Text>}
          </View>
        ))}

        <Text accessibilityRole="header" style={styles.sectionTitle}>
          GitHub から自動デプロイ
        </Text>
        <View style={styles.step}>
          <Text accessibilityRole="header" style={styles.guideTitle}>
            1. Expo と GitHub を接続
          </Text>
          <Text style={styles.body}>
            Expo に登録したプロジェクトの GitHub settings を開き、画面の案内に沿って Expo の GitHub App を設定します。
            対象のリポジトリを接続し、app.json と package.json がリポジトリのルートにある場合は Base directory を空欄にします。
            Hosting のサブドメインが未設定なら、Expo ダッシュボードの Hosting で設定します。
          </Text>
          <Link
            href="https://expo.dev/accounts/masa-practice/projects/expo-app-to-deploy/github"
            style={styles.command}
          >
            このプロジェクトの GitHub 設定 ↗
          </Link>
        </View>
        <View style={styles.step}>
          <Text accessibilityRole="header" style={styles.guideTitle}>
            2. ワークフローを追加して push
          </Text>
          <Text style={styles.body}>
            Expo アプリのルートに .eas/workflows/ を作り、以下の YAML を保存して GitHub に push します。
            このリポジトリには両方の設定が入っています。
          </Text>
          {workflowExamples.map(({ path, description, yaml }) => (
            <View key={path} style={styles.commandBlock}>
              <Text selectable style={styles.guideTitle}>{path}</Text>
              <Text style={styles.guideDescription}>{description}</Text>
              <Text selectable style={styles.command}>{yaml}</Text>
            </View>
          ))}
          <Text style={styles.body}>
            type: deploy が Web 版の出力から公開までを実行します。prod: false はプレビュー、prod: true は本番への公開です。
            自動公開ではローカルで export や deploy を実行する必要はありません。
          </Text>
        </View>
        <View style={styles.step}>
          <Text accessibilityRole="header" style={styles.guideTitle}>
            3. プレビューと本番の公開結果を確認
          </Text>
          <Text style={styles.body}>
            作業ブランチから PR を開き、Expo ダッシュボードの Workflows で Web Preview の成功を確認します。
            Hosting でプレビュー URL を開き、動作を確認してから PR を main にマージします。
            Web Production が成功したら、固定の本番 URL を開いて反映を確認します。
          </Text>
          <Text style={styles.body}>
            無料枠では実行待ちになることがあります。失敗した場合は Workflows で対象ジョブのログを開きます。
          </Text>
          <Link
            href="https://expo.dev/accounts/masa-practice/projects/expo-app-to-deploy/workflows"
            style={styles.command}
          >
            このプロジェクトの Workflows ↗
          </Link>
          <Link href="https://expo-app-to-deploy.expo.app/" style={styles.command}>
            このプロジェクトの本番サイト ↗
          </Link>
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
  detail: { gap: 4 },
  commandBlock: { gap: 6, padding: 12, borderRadius: 10, backgroundColor: colors.background },
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
