# expo-app-to-deploy 引き継ぎ

## 次回の再開に使う依頼文

次の文をそのまま Codex に貼り付けてください。

```text
iwasaki-hub/expo-app-to-deploy の開発を再開してください。
まずリポジトリの HANDOFF.md と AGENTS.md を読み、main の最新コミットと Expo Workflows の本番デプロイ状況を確認してください。
確認できた状態を共有してから、今回依頼する作業を進めてください。
```

- **開発を始める** → [ローカルで再開する](#ローカルで再開する)
- **公開状況を見る** → [Expo Workflows](https://expo.dev/accounts/masa-practice/projects/expo-app-to-deploy/workflows) · [本番の公開ガイド](https://expo-app-to-deploy.expo.app/guide)
- **変更を公開する** → [変更を確認して公開する](#変更を確認して公開する)

2026年11月22日（日本時間）時点の記録です。再開時は GitHub の `main` と Expo の Workflows で最新状態を確認してください。

## プロジェクトと公開先

| 項目 | 内容 |
| --- | --- |
| 目的 | Expo アプリの実機確認と、Web 版の手動・自動公開を試せるサンプル |
| GitHub | [iwasaki-hub/expo-app-to-deploy](https://github.com/iwasaki-hub/expo-app-to-deploy) |
| Expo | [@masa-practice/expo-app-to-deploy](https://expo.dev/accounts/masa-practice/projects/expo-app-to-deploy) |
| Web 本番 | [ホーム](https://expo-app-to-deploy.expo.app/) · [公開ガイド](https://expo-app-to-deploy.expo.app/guide) |
| 構成 | Expo SDK 58、Expo Router、React Native、TypeScript、npm |
| Web 出力 | [app.json](app.json) の `expo.web.output` は `server` |

確認済みのアプリ変更は [PR #6](https://github.com/iwasaki-hub/expo-app-to-deploy/pull/6)（`de841d2`）までです。「公開ガイド」には新規作成、Expo Go、EAS 登録、手動公開、GitHub 連携による自動公開が載っています。PR #6 の [プレビュー](https://expo.dev/accounts/masa-practice/projects/expo-app-to-deploy/workflows/01a1f268-8e7e-70e0-af04-52846badbfcf) と [本番デプロイ](https://expo.dev/accounts/masa-practice/projects/expo-app-to-deploy/workflows/01a1f269-2cd8-7677-a798-a61e1d1d8496) はいずれも成功を確認済みです。

[PR #7](https://github.com/iwasaki-hub/expo-app-to-deploy/pull/7)（`c0cc973`）で ESLint 設定と PR チェックを追加しました。GitHub Actions の Lint と型チェック、EAS の Web プレビュー、マージ後の EAS 本番公開が成功しました。[GitHub Actions](https://github.com/iwasaki-hub/expo-app-to-deploy/actions/runs/44990393862) · [EAS Web プレビュー](https://expo.dev/accounts/masa-practice/projects/expo-app-to-deploy/workflows/01a201c4-d059-75e6-b55c-d3af48bd4397) · [EAS 本番公開](https://expo.dev/accounts/masa-practice/projects/expo-app-to-deploy/workflows/01a201c6-30be-74bd-9e9d-b0b4060e08bb)

ESLint 9 のサポート終了に伴い、`npm ci` で警告が出ます。Expo の ESLint 設定が使うプラグインの ESLint 10 対応を待つため、更新は保留中です。

## ローカルで再開する

Node.js LTS と npm を用意します。既存の作業コピーがある場合は、未コミットの変更を確認してから最新の `main` を取得してください。新しい PC では以下から始めます。

```bash
git clone https://github.com/iwasaki-hub/expo-app-to-deploy.git
cd expo-app-to-deploy
npm ci
npm start
```

PC のブラウザで開くにはターミナルで `w` を押します。iPhone では PC と同じ Wi-Fi に接続し、Expo CLI と Expo Go に同じ Expo アカウントでログインして QR コードを読み取ります。実機ではタブの切り替え、VoiceOver、文字サイズを拡大したときの表示も確認できます。

## 主なファイル

| ファイル | 役割 |
| --- | --- |
| [src/app/_layout.tsx](src/app/_layout.tsx) | 「ホーム」「公開ガイド」の下部タブ |
| [src/app/index.tsx](src/app/index.tsx) | ホーム画面（`/`） |
| [src/app/guide.tsx](src/app/guide.tsx) | 公開ガイド（`/guide`）。表示する YAML 例は実際の設定と揃える |
| [src/components/preview-colors.ts](src/components/preview-colors.ts) | 画面とタブで共有する配色 |
| [README.md](README.md) | 操作手順、GitHub 連携、実機と Web の使い分け |
| [AGENTS.md](AGENTS.md) | 開発ルールと検証コマンド |

## 変更を確認して公開する

```bash
npm ci
npm run lint
npx tsc --noEmit
npx expo export --platform web
npx expo serve
```

ローカルで `/` と `/guide` を開き、変更箇所とタブの切り替えを確認します。

- [PR チェック](.github/workflows/pr-checks.yml) は `main` 向けの PR で Lint と型チェックを実行します。
- [PR プレビュー](.eas/workflows/pr-preview.yml) は PR の作成・再オープン・更新で起動します。
- [本番公開](.eas/workflows/deploy-production.yml) は `main` への push で起動します。README などの文書だけの変更でも起動します。
- 公開結果は [Workflows](https://expo.dev/accounts/masa-practice/projects/expo-app-to-deploy/workflows) で確認します。無料枠のキューで待機中の場合は実行開始を待ち、失敗時は対象ジョブのログを確認します。
- 急ぎの Web プレビューは、プロジェクトのルートで `npx expo export --platform web` の後に `npx eas-cli@latest deploy` を実行します。本番を手動で更新するときは `deploy --prod` を使います。

Expo プロジェクトは [app.json](app.json) の `owner` と `extra.eas.projectId` で紐づいています。手動公開の前に `npx eas-cli@latest project:info` で `fullName` が `@masa-practice/expo-app-to-deploy` であることを確認してください。認証情報はリポジトリに保存せず、必要に応じて Expo CLI でログインします。
