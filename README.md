# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **src/app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Expo Hosting に Web プレビューをデプロイする

このリポジトリの Web 版は、[Expo の `@masa-practice/expo-app-to-deploy` プロジェクト](https://expo.dev/accounts/masa-practice/projects/expo-app-to-deploy)に紐づいています。以下の手順で、ローカルのコードを Safari や Chrome で確認できるプレビュー URL に公開できます。

### 1. 依存関係をインストールして Expo にログインする

リポジトリのルートで実行します。

```bash
npm ci
npx eas-cli@latest login
npx eas-cli@latest whoami
npx eas-cli@latest project:info
```

`project:info` に `@masa-practice/expo-app-to-deploy` が表示されることを確認します。このリポジトリの [app.json](app.json) には `expo.owner` と `expo.extra.eas.projectId` が設定済みです。

初回のセットアップなどで `EAS project not configured` が表示された場合は、Expo ダッシュボードで対象プロジェクトの Project ID を確認し、既存のプロジェクトに紐づけます。

```bash
npx eas-cli@latest init --id 200513de-0587-41c5-bf74-dbad4d538415 --non-interactive
npx eas-cli@latest project:info
```

### 2. Web 版を出力してプレビューを公開する

このプロジェクトでは `expo.web.output` に `server` を設定しています。Web 版を `dist/` に出力し、Expo Hosting にアップロードします。

```bash
npx expo export --platform web
npx eas-cli@latest deploy
```

初回にプレビュー用のサブドメインを求められたら選択します。完了後、ターミナルに表示される `https://…expo.app` の URL を Safari や Chrome で開きます。デプロイ履歴は [Expo ダッシュボード](https://expo.dev/accounts/masa-practice/projects/expo-app-to-deploy)で確認できます。

コードを変更したら、Web 版の出力とデプロイの両方を再実行します。iPhone にインストールするネイティブ版のビルドには [EAS Build](https://docs.expo.dev/build/setup/) を使います。

[Expo 公式の Web デプロイ手順](https://docs.expo.dev/deploy/web/)

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **example** directory and create a blank **src/app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
