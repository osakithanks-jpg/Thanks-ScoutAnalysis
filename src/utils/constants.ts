// サンクスパートナーズ 定数・マスタ定義ファイル
import { IndustryType, PositionType, ExecutiveRoleType, SalaryRangeType, Media } from '../types';

export const INITIAL_MEDIA_LIST: Media[] = [
  { mediaId: 'bizreach', name: 'ビズリーチ', status: 'active', displayOrder: 1 },
  { mediaId: 'middle', name: 'ミドル', status: 'active', displayOrder: 2 },
  { mediaId: 'ambi', name: 'AMBI', status: 'active', displayOrder: 3 },
  { mediaId: 'rds', name: 'RDS', status: 'active', displayOrder: 4 },
  { mediaId: 'db', name: 'DB', status: 'active', displayOrder: 5 },
  { mediaId: 'ix', name: 'IX', status: 'active', displayOrder: 6 },
  { mediaId: 'maps', name: 'Maps', status: 'active', displayOrder: 7 },
];

export const INDUSTRIES: IndustryType[] = [
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
  'その他',
];

export const POSITIONS: PositionType[] = [
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
  'その他',
];

export const EXECUTIVE_ROLES: ExecutiveRoleType[] = [
  'メンバー',
  '主任',
  '係長',
  '課長',
  '部長',
  '役員',
];

export const SALARY_RANGES: SalaryRangeType[] = [
  '300～400万円',
  '400～500万円',
  '500～600万円',
  '600～750万円',
  '750～1000万円',
  '1000～1250万円',
  '1250～1500万円',
];

export const TARGET_AGES = ['若手（U35）', '35～45', 'ミドル'] as const;

export const ADMIN_PASSWORD_DEFAULT = 'Thanks5877';

// 類似求人計算のデフォルト重み配点 (100点満点)
export const SIMILARITY_WEIGHTS = {
  position: 30,
  industry: 25,
  targetAge: 20,
  salaryRange: 15,
  role: 10,
};
