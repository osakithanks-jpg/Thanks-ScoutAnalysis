# サンクスパートナーズ スカウト実績管理・分析ツール (チーム共有版)

株式会社サンクスパートナーズ約10名のチーム全体でスカウト実績を一元管理・可視化・分析するための専用Webアプリケーションです。

---

## 0. 開発方針・運用前提とセキュリティ仕様

- **ログイン認証なし（社内信頼ベース運用）**:
  メールアドレス・パスワードログインおよび Firebase Authentication は使用していません。社内の信頼ベースで運用し、利用者はアプリ起動時に自身の「担当者名」を選択して使用を開始します。
- **LocalStorage の保持範囲**:
  - `LocalStorage` には選択した担当者ID、セッション状態、画面表示設定のみを保存します。
  - **業務データ（求人、実績数、返信数、ナレッジ、スカウト文面など）は一切 LocalStorage に保存せず、すべて Firestore クラウドDBで一元管理します。**
- **セキュリティ上の注意書き**:
  ログイン認証を行わないため、Firestoreの設定情報やWebアプリURLを知る第三者がデータアクセス可能な制約があります。信頼できる社内アクセス環境でのご利用をお願いいたします。

---

## 1. ディレクトリ構造・作成ファイル一覧

```
scout-analytics-app/
├── api/
│   └── admin-auth.ts          # Vercel Serverless Function (管理者パスワード検証)
├── src/
│   ├── components/
│   │   ├── Header.tsx         # ヘッダー (担当者切り替え・管理者モード表示)
│   │   ├── Sidebar.tsx        # サイドナビゲーション (6メインメニュー & 管理者メニュー)
│   │   ├── DailyInput.tsx     # 1. 本日の実績入力 (担当求人×7媒体 グリッド & 自動保存)
│   │   ├── Dashboard.tsx      # 2. ダッシュボード (個人/チーム/4タブ/積み上げグラフ)
│   │   ├── Jobs.tsx           # 3. 求人マスタ & 担当求人管理
│   │   ├── Analytics.tsx      # 4. 属性・類似求人スコアリング・求人比較
│   │   ├── Knowledge.tsx      # 5. 求人振り返り・ナレッジ (スナップショット保持)
│   │   ├── Templates.tsx      # 6. スカウト文面 & バージョン履歴・復元
│   │   ├── AdminPanel.tsx     # 管理者専用パネル (担当者マスタ/実績修正/ログ/全リセット)
│   │   ├── StaffSelectionModal.tsx  # 初回担当者選択モーダル
│   │   ├── AdminAuthModal.tsx       # 管理者認証モーダル (Thanks5877)
│   │   ├── QuickMemoModal.tsx       # クイックメモ登録モーダル
│   │   └── UsageGuideModal.tsx      # 使い方画面モーダル
│   ├── context/
│   │   └── AppContext.tsx     # グローバル状態・担当者選択・管理者認証状態管理
│   ├── services/
│   │   ├── firebase.ts        # Firebase Web SDK 初期化
│   │   └── storageService.ts  # Firestore データCRUD・自動Seed・メモリフォールバック
│   ├── types/
│   │   └── index.ts           # 全データ構造の TypeScript インターフェース定義
│   ├── utils/
│   │   ├── constants.ts       # 媒体7件マスタ・業種・職種・役職・配点定数
│   │   ├── dateUtils.ts       # JST日付計算・週範囲・曜日判定
│   │   ├── calcUtils.ts       # 参考返信率計算・類似求人スコア (100点満点)
│   │   └── csvUtils.ts        # BOM付きUTF-8 CSV出力 & JSONバックアップ
│   ├── App.tsx                # ルーティング・全体レイアウト
│   ├── index.css              # ホテルライクな高級CSSデザインシステム
│   └── main.tsx               # アプリケーションエントリーポイント
├── index.html                 # HTML (Google Fonts & file:// 直開き警告スクリプト付き)
├── package.json               # 依存ライブラリ定義
├── firestore.rules            # Firestore セキュリティルール
├── firestore.indexes.json     # Firestore 複合インデックス設定
├── vercel.json                # Vercel 設定 (APIルート・SPA書き換え)
└── .env.example               # 環境変数テンプレート
```

---

## 2. ライブラリ構成

- **React 18 & TypeScript**: 型安全かつ高速なコンポーネント開発
- **Vite 5**: 高速ローカル開発サーバーおよびビルドツール
- **Firebase 10**: Cloud Firestore 接続
- **Lucide React**: ホテルライクな美しく統一感のあるアイコン
- **@vercel/node**: Vercel Serverless Function 型定義

---

## 3. Firestore コレクション一覧 (全12コレクション)

1. `staff`: 担当者マスタ
2. `jobs`: 求人マスタ
3. `staff_jobs`: 担当者と求人の紐づけ (非表示状態管理)
4. `media`: 媒体マスタ (初期7件: ビズリーチ, ミドル, AMBI, RDS, DB, IX, Maps)
5. `scout_results`: スカウト実績 (`担当者ID_求人ID_日付_媒体ID`)
6. `knowledge`: 振り返り・ナレッジ (スナップショット付き)
7. `scout_templates`: スカウト文面本体
8. `template_versions`: 文面バージョン履歴
9. `template_assignments`: 文面適用期間設定
10. `notifications`: 通知
11. `audit_logs`: 変更履歴 (不変ログ)
12. `settings`: システム設定

---

## 4. ローカル起動手順

本アプリは `file://` で `index.html` を直接開いて起動することはできません。Node.js 環境でローカルサーバーを起動してください。

```bash
# 1. 依存ライブラリのインストール
npm install

# 2. 開発サーバーの起動
npm run dev
```

起動後、ブラウザで以下のURLへアクセスします：
`http://localhost:5173`

---

## 5. Firebase Console 設定手順

1. [Firebase Console](https://console.firebase.google.com/) で新規プロジェクトを作成。
2. 「Cloud Firestore」をデータベースとして作成（本番モードまたはテストモード）。
3. 登録された Firebase Web SDK 設定情報をコピーし、Vercel または `.env` ファイルに設定します。
4. `firestore.rules` の内容を Firebase Console の「ルールの編集」に貼り付けてデプロイします。

---

## 6. Vercel 環境変数および管理者パスワード設定方法

Vercel デプロイ時、以下の環境変数を Project Settings -> Environment Variables に追加してください：

- `ADMIN_PASSWORD`: `Thanks5877`
- `VITE_FIREBASE_API_KEY`: Firebase API Key
- `VITE_FIREBASE_AUTH_DOMAIN`: firebaseapp.com ドメイン
- `VITE_FIREBASE_PROJECT_ID`: Firebase プロジェクトID
- `VITE_FIREBASE_STORAGE_BUCKET`: Storage Bucket
- `VITE_FIREBASE_MESSAGING_SENDER_ID`: Sender ID
- `VITE_FIREBASE_APP_ID`: App ID

---

## 7. GitHub へのアップロード & Vercel 公開手順

```bash
# 1. Git リポジトリ初期化 & コミット
git init
git add .
git commit -m "Initial commit: Thanks Partners Scout Analytics Web App"

# 2. GitHub リポジトリを作成してプッシュ
git remote add origin https://github.com/YOUR_ORGANIZATION/thanks-scout-analytics.git
git branch -M main
git push -u origin main
```

Vercel ダッシュボードから「Import Project」を選択し、GitHub リポジトリを連携してデプロイします。

---

## 8. 将来 Firebase Authentication を追加する場合の拡張ポイント

1. `src/services/firebase.ts` で `getAuth(app)` を初期化。
2. `src/context/AppContext.tsx` でログイン状態 (`onAuthStateChanged`) を監視し、`StaffSelectionModal` の代わりにログイン画面を表示。
3. `firestore.rules` で `request.auth != null` を条件に追加し、認証済みユーザーのみにアクセスを限定。
