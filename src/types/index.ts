// サンクスパートナーズ スカウト実績管理・分析ツール 型定義ファイル

export type StaffStatus = 'active' | 'inactive';
export type AdminRole = 'admin' | 'member';

export interface Staff {
  staffId: string;
  name: string;
  status: StaffStatus;
  adminRole: AdminRole;
  createdAt: string;
  updatedAt: string;
}

export type JobStatus = '準備中' | 'スカウト実施中' | '一時停止' | '募集終了';

export type IndustryType =
  | 'メーカー'
  | '商社'
  | '小売・サービス'
  | '運輸・物流'
  | '金融・保険'
  | '建設・不動産'
  | 'IT・インターネット'
  | 'マスコミ・メディア'
  | 'エンターテインメント'
  | 'エネルギー'
  | 'その他';

export type PositionType =
  | '法人営業'
  | '個人営業'
  | '営業企画'
  | '営業事務'
  | '海外営業'
  | 'サービス'
  | '経営企画'
  | '経理（財務会計）'
  | '財務'
  | '管理会計'
  | '監査'
  | '総務'
  | '一般事務'
  | '秘書'
  | '購買・調達'
  | '貿易'
  | '採用'
  | '労務'
  | '商品企画'
  | '商品開発'
  | 'MD'
  | 'バイヤー'
  | '研究・開発'
  | '生産技術'
  | '生産管理'
  | '品質管理'
  | '品質保証'
  | '工場長'
  | 'セールス・サービスエンジニア'
  | '機械設計'
  | '電気・電子制御設計'
  | 'その他';

export type TargetAgeType = '若手（U35）' | '35～45' | 'ミドル';

export type ExecutiveRoleType = 'メンバー' | '主任' | '係長' | '課長' | '部長' | '役員';

export type SalaryRangeType =
  | '300～400万円'
  | '400～500万円'
  | '500～600万円'
  | '600～750万円'
  | '750～1000万円'
  | '1000～1250万円'
  | '1250～1500万円';

export interface Job {
  jobId: string;
  companyName: string;
  jobTitle: string;
  industry?: IndustryType | '';
  position?: PositionType | '';
  status: JobStatus;
  targetAge?: TargetAgeType[];
  role?: ExecutiveRoleType | '';
  salaryRange?: SalaryRangeType[];
  archived: boolean;
  createdStaffId: string;
  updatedStaffId: string;
  createdAt: string;
  updatedAt: string;
}

export interface StaffJob {
  staffJobId: string; // 担当者ID_求人ID
  staffId: string;
  jobId: string;
  hidden: boolean;
  pinned: boolean;
  displayOrder: number;
  createdAt: string;
  hiddenAt?: string;
  updatedAt: string;
}

export interface Media {
  mediaId: string;
  name: string;
  status: 'active' | 'inactive';
  displayOrder: number;
}

export type ResultStatus = 'valid' | 'cancelled';

export interface ScoutResult {
  resultId: string; // 担当者ID_求人ID_日付_媒体ID
  staffId: string;
  jobId: string;
  date: string; // YYYY-MM-DD (JST)
  mediaId: string;
  sentCount: number;
  totalReplyCount: number;
  effectiveReplyCount: number;
  status: ResultStatus;
  createdAt: string;
  updatedAt: string;
  lastUpdatedByStaffId: string;
}

export type KnowledgeType = 'quick_memo' | 'periodic' | 'final';

export type KnowledgeTag =
  | '媒体'
  | '検索条件'
  | '候補者像'
  | '件名'
  | '文面'
  | '条件'
  | '改善案'
  | '成功事例'
  | '苦戦要因';

export interface KnowledgeSnapshot {
  sentCount: number;
  totalReplyCount: number;
  effectiveReplyCount: number;
  mediaBreakdown?: Record<string, { sent: number; totalReply: number; effectiveReply: number }>;
}

export interface KnowledgeDetails {
  goodPoints?: string;
  challenges?: string;
  nextActions?: string;
  effectiveMedia?: string;
  ineffectiveMedia?: string;
  targetCandidate?: string;
  searchConditions?: string;
  templateUsed?: string;
  conditionChallenges?: string;
  memo?: string;
}

export interface Knowledge {
  knowledgeId: string;
  jobId: string;
  type: KnowledgeType;
  content: string;
  staffId: string;
  createdAt: string;
  updatedAt: string;
  tags?: KnowledgeTag[];
  snapshotMetrics?: KnowledgeSnapshot;
  isArchived: boolean;
  isPinned: boolean;
  details?: KnowledgeDetails;
  periodLabel?: string;
}

export type TemplateStatus = 'draft' | 'active' | 'inactive' | 'archived';

export interface ScoutTemplate {
  templateId: string;
  title: string;
  subject: string;
  body: string;
  mediaIds: string[];
  jobIds?: string[];
  targetCandidate?: string;
  sellingPoints?: string;
  tags?: string[];
  status: TemplateStatus;
  currentVersion: number;
  startDate?: string;
  endDate?: string;
  createdStaffId: string;
  updatedStaffId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TemplateVersion {
  versionId: string;
  templateId: string;
  versionNumber: number;
  subject: string;
  body: string;
  targetCandidate?: string;
  sellingPoints?: string;
  tags?: string[];
  changedByStaffId: string;
  changeNote?: string;
  createdAt: string;
}

export interface TemplateAssignment {
  assignmentId: string;
  jobId: string;
  mediaId: string;
  templateId: string;
  versionNumber: number;
  startDate: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
  createdAt: string;
}

export type ActionType = 'create' | 'update' | 'delete' | 'reset' | 'correct';
export type TargetDataType =
  | 'scout_results'
  | 'staff'
  | 'jobs'
  | 'staff_jobs'
  | 'knowledge'
  | 'scout_templates'
  | 'settings'
  | 'all_reset';

export interface AuditLog {
  logId: string;
  targetType: TargetDataType;
  targetId: string;
  actionType: ActionType;
  beforeData?: any;
  afterData?: any;
  staffId: string;
  staffName: string;
  reason: string;
  createdAt: string;
}

export interface SystemSettings {
  adminPasswordHash?: string;
  lastUpdated: string;
}

export type DashboardPeriod = 'today' | 'week' | 'month' | '3months' | 'halfYear' | 'year';
