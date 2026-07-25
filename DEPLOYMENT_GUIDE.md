# サンクスパートナーズ スカウト実績管理・分析ツール デプロイ手順書 & 構築ドキュメント

作成日: 2026年7月25日

---

## 1. Firebase Consoleの初期設定

### Firebase Auth の設定
1. [Firebase Console](https://console.firebase.google.com/) にアクセスし、プロジェクト `thanks-scout-analytics` を作成（または選択）。
2. **Authentication** ＞ **Get Started** をクリック。
3. **Sign-in method** タブで **メール/パスワード** を有効化します（匿名やセルフサインアップは無効のまま）。

### Cloud Firestore の設定
1. **Firestore Database** ＞ **データベースの作成** を選択。
2. データベース作成場所: `asia-northeast1 (Tokyo)` を推奨。
3. セキュリティルールにプロジェクト直下の `firestore.rules` の内容を貼り付けて **公開 (Publish)** します。
4. インデックス設定にプロジェクト直下の `firestore.indexes.json` を適用します。

### 初回管理者ユーザーの作成方法
1. Firebase Authentication ＞ **ユーザーを追加** から、管理者のメールアドレス（例: `admin@thanks.co.jp`）と初期パスワードを登録します。
2. Firebase Console の **Firestore** で `users` コレクションを開き、Authentication で発行された `UID` をドキュメントIDとして以下のドキュメントを作成します:
   ```json
   {
     "uid": "<AuthのUID>",
     "email": "admin@thanks.co.jp",
     "displayName": "サンクス管理者",
     "role": "admin",
     "status": "active",
     "createdAt": "2026-07-25T00:00:00Z",
     "updatedAt": "2026-07-25T00:00:00Z"
   }
   ```

---

## 2. Firebase Cloud Functions のデプロイ手順

1. CLI ターミナルで `functions` ディレクトリへ移動します:
   ```bash
   cd functions
   npm install
   ```
2. Firebase CLI でログイン後、Cloud Functions をデプロイします:
   ```bash
   firebase deploy --only functions
   ```
3. デプロイされる関数:
   - `onScoutResultWrite`: 個人実績変更時の `team_aggregates` アトミック更新
   - `adminResetAllData`: パスワード `Thanks5877` による業務データ安全リセット

---

## 3. GitHub & Vercel への公開手順

### 1. GitHub リポジトリへのプッシュ
```bash
git init
git add .
git commit -m "Initial commit of Scout Analytics App"
git branch -M main
git remote add origin https://github.com/YOUR_ORGANIZATION/scout-analytics-app.git
git push -u origin main
```

### 2. Vercel デプロイ設定
1. [Vercel Dashboard](https://vercel.com/) にログインし、**Add New Project** をクリック。
2. GitHub リポジトリ `scout-analytics-app` をインポート。
3. **Environment Variables** に以下を登録:
   - `VITE_FIREBASE_API_KEY`: Firebase Console の Web API Key
   - `VITE_FIREBASE_AUTH_DOMAIN`: `thanks-scout-analytics.firebaseapp.com`
   - `VITE_FIREBASE_PROJECT_ID`: `thanks-scout-analytics`
   - `VITE_FIREBASE_STORAGE_BUCKET`: `thanks-scout-analytics.appspot.com`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`: Messaging Sender ID
   - `VITE_FIREBASE_APP_ID`: App ID
4. **Deploy** ボタンを押下すると、数秒で全世界へ本番公開されます。

---

## 4. 今後AI機能を追加する際の変更箇所

指示書「3．今回実装しない機能」に従い、今回AI機能は完全に除外されています。将来生成AI（Gemini API等）を接続する場合の変更ポイント:

1. **データ構造の拡張**:
   - `jobs` コレクション: `aiAnalysisResult: { targetSummary, recommendedMedia, predictedSendCount }` フィールドを追加。
   - `knowledge` コレクション: `aiSummary: string` フィールドを追加。
2. **Cloud Functions への追加**:
   - `functions/src/aiServices.ts` を新規作成し、Google Generative AI SDK (`@google/genai`) を読み込み。
   - 求人更新時またはボタン発信で分析を実行する Callable Function を構築。
3. **フロントエンド UI**:
   - 求人詳細タブに「AI分析・推奨媒体」タブを追加。
