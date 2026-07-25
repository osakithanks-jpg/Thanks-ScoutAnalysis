/**
 * サンクスパートナーズ スカウト実績・求人管理一元化ツール - 定数・マスタ定義
 */

export const APP_VERSION = '3.3.0';
export const DATA_FORMAT_VERSION = '1.0';

// 初期7媒体（媒体ID, 表示名, 表示順, 利用状態, 固定カラー）
export const DEFAULT_MEDIA_LIST = [
  { id: 'bizreach', name: 'ビズリーチ', order: 1, status: 'active', color: '#1A365D' }, // ディープネイビー
  { id: 'middle', name: 'ミドル', order: 2, status: 'active', color: '#2B6CB0' },    // ブルー
  { id: 'ambi', name: 'AMBI', order: 3, status: 'active', color: '#C5A059' },      // ゴールド
  { id: 'rds', name: 'RDS', order: 4, status: 'active', color: '#2F855A' },       // グリーン
  { id: 'db', name: 'DB', order: 5, status: 'active', color: '#805AD5' },        // パープル
  { id: 'ix', name: 'IX', order: 6, status: 'active', color: '#DD6B20' },        // オレンジ
  { id: 'maps', name: 'Maps', order: 7, status: 'active', color: '#319795' }       // ティール
];

// 求人ステータス（準備中, スカウト実施中, 一時停止, 募集終了）
export const JOB_STATUSES = ['準備中', 'スカウト実施中', '一時停止', '募集終了'];

// 業種マスタ (11種)
export const INDUSTRIES = [
  'メーカー',
  '商社',
  '小売・サービス',
  '運輸・物流',
  '金融・保険',
  '建設・不動産',
  'IT・インターネット',
  'マスコミ・メディア',
  'エンターテインメント',
  'エネルギー',
  'その他'
];

// 職種マスタ (32種)
export const POSITIONS = [
  '法人営業',
  '個人営業',
  '営業企画',
  '営業事務',
  '海外営業',
  'サービス',
  '経営企画',
  '経理（財務会計）',
  '財務',
  '管理会計',
  '監査',
  '総務',
  '一般事務',
  '秘書',
  '購買・調達',
  '貿易',
  '採用',
  '労務',
  '商品企画',
  '商品開発',
  'MD',
  'バイヤー',
  '研究・開発',
  '生産技術',
  '生産管理',
  '品質管理',
  '品質保証',
  '工場長',
  'セールス・サービスエンジニア',
  '機械設計',
  '電気・電子制御設計',
  'その他'
];

// 対象年齢 (3種)
export const TARGET_AGES = ['若手（U35）', '35～45', 'ミドル'];

// 役職 (6種)
export const EXECUTIVE_ROLES = ['メンバー', '主任', '係長', '課長', '部長', '役員'];

// 年収帯 (7種)
export const SALARY_RANGES = [
  '300～400万円',
  '400～500万円',
  '500～600万円',
  '600～750万円',
  '750～1000万円',
  '1000～1250万円',
  '1250～1500万円'
];

// ナレッジ種別 (11種)
export const KNOWLEDGE_TYPES = [
  '求人理解',
  'ターゲット',
  '検索条件',
  'スカウト文面',
  '送信結果',
  '返信傾向',
  '成功事例',
  '失敗・課題',
  '改善案',
  '企業からの情報',
  'その他'
];

// 推奨ナレッジタグ
export const RECOMMEND_KNOWLEDGE_TAGS = [
  '若手向け',
  '高年収',
  '管理職',
  '地方求人',
  'ニッチ職種',
  '返信率改善',
  '件名改善',
  '検索条件改善',
  'ターゲット修正'
];

// 管理者パスワード & 確認文字列
export const ADMIN_PASSWORD = 'Thanks5877';
export const RESET_CONFIRM_TEXT = '全データをリセット';
export const RESTORE_CONFIRM_TEXT = 'バックアップから復元';
export const ADMIN_SESSION_TIMEOUT_MINUTES = 30;

// 企業の注力ランクマスタ (5段階)
export const PRIORITY_RANKS = {
  SS: { id: 'SS', label: '最重点', fullLabel: 'SS｜最重点', weight: 5, color: '#C5A059', textColor: '#FFFFFF' },
  S:  { id: 'S',  label: '重点',   fullLabel: 'S｜重点',   weight: 4, color: '#1B2A4A', textColor: '#FFFFFF' },
  A:  { id: 'A',  label: '標準',   fullLabel: 'A｜標準',   weight: 3, color: '#E6D5B8', textColor: '#1B2A4A' },
  B:  { id: 'B',  label: '低頻度運用', fullLabel: 'B｜低頻度運用', weight: 2, color: '#A0AEC0', textColor: '#FFFFFF' },
  UNSET: { id: 'UNSET', label: '未設定', fullLabel: '未設定', weight: 1, color: '#CBD5E0', textColor: '#4A5568' }
};

export const PRIORITY_RANK_LIST = ['SS', 'S', 'A', 'B', 'UNSET'];

// インバウンド流入経路マスタ（経路ID, 表示名, 表示順, カラー）
export const DEFAULT_INBOUND_ROUTES = [
  { id: 'indeed', name: 'Indeed', order: 1, color: '#003A9B' },
  { id: 'own', name: '自社', order: 2, color: '#1B2A4A' },
  { id: 'bizreach', name: 'ビズリーチ', order: 3, color: '#C5A059' },
  { id: 'middle', name: 'ミドル', order: 4, color: '#2B6CB0' },
  { id: 'ambi', name: 'AMBI', order: 5, color: '#805AD5' },
  { id: 'ix', name: 'IX', order: 6, color: '#DD6B20' },
  { id: 'other', name: 'その他', order: 7, color: '#718096' }
];

export const KEYS = {
  USERS: 'tp_scout_users_v2',
  COMPANIES: 'tp_scout_companies_v2',
  JOBS: 'tp_scout_jobs_v2',
  USER_JOBS: 'tp_scout_user_jobs_v2',
  MEDIA: 'tp_scout_media_v2',
  RESULTS: 'tp_scout_results_v2',
  AUTO_RESULTS: 'tp_scout_auto_weekly_results_v2',
  AUTO_TARGET_JOBS: 'tp_scout_auto_target_jobs_v2',
  AUTO_SCOUT_PERMISSIONS: 'tp_scout_auto_permissions_v2',
  INBOUND_RESULTS: 'tp_scout_inbound_results_v2',
  KNOWLEDGE: 'tp_scout_knowledge_v2',
  MESSAGES: 'tp_scout_messages_v2',
  MESSAGE_VERSIONS: 'tp_scout_message_versions_v2',
  MESSAGE_ASSIGNMENTS: 'tp_scout_message_assignments_v2',
  NOTIFICATIONS: 'tp_scout_notifications_v2',
  CHANGE_LOGS: 'tp_scout_change_logs_v2',
  SETTINGS: 'tp_scout_settings_v2',
  CURRENT_STAFF_ID: 'tp_scout_current_staff_id_v2'
};

