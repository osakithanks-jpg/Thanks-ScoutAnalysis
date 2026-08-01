/**
 * サンクスパートナーズ スカウト実績・求人管理一元化ツール - 定数・マスタ定義
 */

const APP_VERSION = '3.3.0';
const DATA_FORMAT_VERSION = '1.0';

// 初期7媒体（媒体ID, 表示名, 表示順, 利用状態, 固定カラー）
const DEFAULT_MEDIA_LIST = [
  { id: 'bizreach', name: 'ビズリーチ', order: 1, status: 'active', color: '#1A365D' }, // ディープネイビー
  { id: 'middle', name: 'ミドル', order: 2, status: 'active', color: '#2B6CB0' },    // ブルー
  { id: 'ambi', name: 'AMBI', order: 3, status: 'active', color: '#C5A059' },      // ゴールド
  { id: 'rds', name: 'RDS', order: 4, status: 'active', color: '#2F855A' },       // グリーン
  { id: 'db', name: 'DB', order: 5, status: 'active', color: '#805AD5' },        // パープル
  { id: 'ix', name: 'IX', order: 6, status: 'active', color: '#DD6B20' },        // オレンジ
  { id: 'maps', name: 'Maps', order: 7, status: 'active', color: '#319795' }       // ティール
];

// 求人ステータス（準備中, スカウト実施中, 一時停止, 募集終了）
const JOB_STATUSES = ['準備中', 'スカウト実施中', '一時停止', '募集終了'];

// 業種マスタ (11種)
const INDUSTRIES = [
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
const POSITIONS = [
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
const TARGET_AGES = ['若手（U35）', '35～45', 'ミドル'];

// 役職 (6種)
const EXECUTIVE_ROLES = ['メンバー', '主任', '係長', '課長', '部長', '役員'];

// 年収帯 (7種)
const SALARY_RANGES = [
  '300～400万円',
  '400～500万円',
  '500～600万円',
  '600～750万円',
  '750～1000万円',
  '1000～1250万円',
  '1250～1500万円'
];

// ナレッジ種別 (11種)
const KNOWLEDGE_TYPES = [
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
const RECOMMEND_KNOWLEDGE_TAGS = [
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
const ADMIN_PASSWORD = 'Thanks5877';
const RESET_CONFIRM_TEXT = '全データをリセット';
const RESTORE_CONFIRM_TEXT = 'バックアップから復元';
const ADMIN_SESSION_TIMEOUT_MINUTES = 30;

// 企業の注力ランクマスタ (5段階)
const PRIORITY_RANKS = {
  SS: { id: 'SS', label: '最重点', fullLabel: 'SS｜最重点', weight: 5, color: '#C5A059', textColor: '#FFFFFF' },
  S:  { id: 'S',  label: '重点',   fullLabel: 'S｜重点',   weight: 4, color: '#1B2A4A', textColor: '#FFFFFF' },
  A:  { id: 'A',  label: '標準',   fullLabel: 'A｜標準',   weight: 3, color: '#E6D5B8', textColor: '#1B2A4A' },
  B:  { id: 'B',  label: '低頻度運用', fullLabel: 'B｜低頻度運用', weight: 2, color: '#A0AEC0', textColor: '#FFFFFF' },
  UNSET: { id: 'UNSET', label: '未設定', fullLabel: '未設定', weight: 1, color: '#CBD5E0', textColor: '#4A5568' }
};

const PRIORITY_RANK_LIST = ['SS', 'S', 'A', 'B', 'UNSET'];

// インバウンド流入経路マスタ（経路ID, 表示名, 表示順, カラー）
const DEFAULT_INBOUND_ROUTES = [
  { id: 'indeed', name: 'Indeed', order: 1, color: '#003A9B' },
  { id: 'own', name: '自社', order: 2, color: '#1B2A4A' },
  { id: 'bizreach', name: 'ビズリーチ', order: 3, color: '#C5A059' },
  { id: 'middle', name: 'ミドル', order: 4, color: '#2B6CB0' },
  { id: 'ambi', name: 'AMBI', order: 5, color: '#805AD5' },
  { id: 'ix', name: 'IX', order: 6, color: '#DD6B20' },
  { id: 'other', name: 'その他', order: 7, color: '#718096' }
];

const KEYS = {
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



/**
 * サンクスパートナーズ スカウト実績・求人管理一元化ツール - ストレージ & データマネージャー
 * Version: 3.4.0 (Company Master, Priority Rank, Japanese Locale Sorting, Search & Filter Release)
 */



class StorageService {
  /**
   * システム初期設定 (クラウド優先読み込み後のローカル補完用)
   */
  static initStorageFallbackOnly() {
    if (!localStorage.getItem(KEYS.MEDIA)) {
      localStorage.setItem(KEYS.MEDIA, JSON.stringify(DEFAULT_MEDIA_LIST));
    }
    if (!localStorage.getItem(KEYS.USERS)) {
      const defaultUsers = [
        { staffId: 'STF-001', name: '尾﨑優理', status: 'active', adminRole: 'admin', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { staffId: 'STF-002', name: '山田太郎', status: 'active', adminRole: 'member', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { staffId: 'STF-003', name: '佐藤花子', status: 'active', adminRole: 'member', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
      ];
      localStorage.setItem(KEYS.USERS, JSON.stringify(defaultUsers));
    }
    if (!localStorage.getItem(KEYS.JOBS)) localStorage.setItem(KEYS.JOBS, JSON.stringify([]));
    if (!localStorage.getItem(KEYS.USER_JOBS)) localStorage.setItem(KEYS.USER_JOBS, JSON.stringify([]));
    if (!localStorage.getItem(KEYS.RESULTS)) localStorage.setItem(KEYS.RESULTS, JSON.stringify([]));
    if (!localStorage.getItem(KEYS.KNOWLEDGE)) localStorage.setItem(KEYS.KNOWLEDGE, JSON.stringify([]));
    if (!localStorage.getItem(KEYS.MESSAGES)) localStorage.setItem(KEYS.MESSAGES, JSON.stringify([]));
    if (!localStorage.getItem(KEYS.MESSAGE_VERSIONS)) localStorage.setItem(KEYS.MESSAGE_VERSIONS, JSON.stringify([]));
    if (!localStorage.getItem(KEYS.MESSAGE_ASSIGNMENTS)) localStorage.setItem(KEYS.MESSAGE_ASSIGNMENTS, JSON.stringify([]));
    if (!localStorage.getItem(KEYS.NOTIFICATIONS)) localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify([]));
    if (!localStorage.getItem(KEYS.CHANGE_LOGS)) localStorage.setItem(KEYS.CHANGE_LOGS, JSON.stringify([]));
    if (!localStorage.getItem(KEYS.SETTINGS)) {
      localStorage.setItem(KEYS.SETTINGS, JSON.stringify({ lastUpdated: new Date().toISOString() }));
    }

    this.migrateCompaniesFromJobs();
  }

  /**
   * 1. 起動時にCloud Firestoreから最新データを最優先読み込み (Single Source of Truth)
   */
  static async loadFromFirestoreFirst() {
    const projectId = (window.FIREBASE_CONFIG && window.FIREBASE_CONFIG.projectId) || 'project-5bedb';
    const collectionName = 'scout_app_store';

    if (!window.firestoreDb) {
      console.warn(`[Firestore Sync Warning] Project ID: ${projectId} | window.firestoreDb is not initialized. Using local storage fallback.`);
      this.initStorageFallbackOnly();
      return false;
    }

    try {
      console.log(`[Firestore Connection Check] Connecting to Project ID: ${projectId} | Collection: ${collectionName}...`);
      const snapshot = await window.firestoreDb.collection(collectionName).get();
      const docsCount = snapshot.docs.length;
      const nowTs = new Date().toLocaleTimeString('ja-JP');

      console.log(`[Firestore Sync Success] Connected Project ID: ${projectId}`);
      console.log(`[Firestore Sync Success] Monitored Collection: ${collectionName}`);
      console.log(`[Firestore Sync Success] Loaded Document Count: ${docsCount}`);
      console.log(`[Firestore Sync Success] Last Updated Timestamp: ${nowTs}`);

      if (docsCount > 0) {
        // クラウド(Firestore)の全データを優先的に localStorage に適用
        snapshot.docs.forEach(doc => {
          const key = doc.id;
          const docData = doc.data();
          if (docData && typeof docData.jsonStr === 'string') {
            localStorage.setItem(key, docData.jsonStr);
          }
        });
      } else {
        // クラウドが完全な0件の初期状態のみ、初期マスタを作成してFirestoreへ保存
        console.log(`[Firestore Init] Collection ${collectionName} is empty. Seeding initial default master into Firestore...`);
        this.initStorageFallbackOnly();
        this.syncAllLocalStorageToFirestore();
      }
      return true;
    } catch (err) {
      console.error(`[Firestore Sync ERROR] Project ID: ${projectId} | Collection: ${collectionName} | Error Code: ${err.code || 'UNKNOWN'} | Message: ${err.message}`, err);
      alert(`[Firestore通信エラー] クラウドデータの取得に失敗しました (${err.code || 'ERR'}): ${err.message}`);
      this.initStorageFallbackOnly();
      return false;
    }
  }

  static syncAllLocalStorageToFirestore() {
    if (!window.firestoreDb) return;
    const collectionName = 'scout_app_store';
    Object.values(KEYS).forEach(key => {
      const val = localStorage.getItem(key);
      if (val !== null) {
        window.firestoreDb.collection(collectionName).doc(key).set({
          jsonStr: val,
          updatedAt: new Date().toISOString(),
          updatedByStaffId: this.getCurrentStaffId() || 'SYSTEM_INIT'
        }).catch(err => {
          console.error(`[Firestore Sync Fail] Key: ${key} | Code: ${err.code} | Message: ${err.message}`, err);
        });
      }
    });
  }

  /**
   * 2. onSnapshotによるリアルタイム変更監視
   */
  static attachFirestoreRealtimeListener() {
    const projectId = (window.FIREBASE_CONFIG && window.FIREBASE_CONFIG.projectId) || 'project-5bedb';
    const collectionName = 'scout_app_store';

    if (!window.firestoreDb || this._firestoreListenerAttached) return;
    this._firestoreListenerAttached = true;

    try {
      window.firestoreDb.collection(collectionName).onSnapshot(
        snapshot => {
          const nowTs = new Date().toLocaleTimeString('ja-JP');
          let hasRemoteChanges = false;

          console.log(`[Firestore onSnapshot] Connected Project: ${projectId} | Collection: ${collectionName} | Docs Count: ${snapshot.docs.length} | Last Updated: ${nowTs}`);

          snapshot.docChanges().forEach(change => {
            if (change.type === 'added' || change.type === 'modified') {
              const key = change.doc.id;
              const docData = change.doc.data();
              if (docData && typeof docData.jsonStr === 'string') {
                const currentLocal = localStorage.getItem(key);
                if (currentLocal !== docData.jsonStr) {
                  localStorage.setItem(key, docData.jsonStr);
                  hasRemoteChanges = true;
                  console.log(`[Firestore Remote Update] Key: ${key} synced from Cloud Firestore.`);
                }
              }
            } else if (change.type === 'removed') {
              const key = change.doc.id;
              localStorage.removeItem(key);
              hasRemoteChanges = true;
              console.log(`[Firestore Remote Remove] Key: ${key} removed from Cloud Firestore.`);
            }
          });

          if (hasRemoteChanges && !snapshot.metadata.hasPendingWrites) {
            if (window.app && typeof window.app.renderCurrentView === 'function') {
              console.log('[Firestore UI Refresh] Re-rendering current view with updated cloud data...');
              window.app.renderCurrentView();
            }
          }
        },
        err => {
          console.error(`[Firestore onSnapshot Error] Project: ${projectId} | Collection: ${collectionName} | Error Code: ${err.code} | Message: ${err.message}`, err);
          alert(`[Firestoreリアルタイム監視エラー] (${err.code}): ${err.message}`);
        }
      );
    } catch (err) {
      console.error('[Firestore Listener Setup Error]', err);
    }
  }

  /**
   * 既存求人データから企業マスタを自動作成・一意ID (companyId) を紐づけ
   */
  static migrateCompaniesFromJobs() {
    let rawCompanies = [];
    try {
      rawCompanies = JSON.parse(localStorage.getItem(KEYS.COMPANIES) || '[]');
    } catch (e) {
      rawCompanies = [];
    }

    let rawJobs = [];
    try {
      rawJobs = JSON.parse(localStorage.getItem(KEYS.JOBS) || '[]');
    } catch (e) {
      rawJobs = [];
    }

    const companyMap = new Map();
    rawCompanies.forEach(c => {
      if (c && c.companyId) {
        companyMap.set(c.companyId, c);
      }
    });

    const nameToIdMap = new Map();
    rawCompanies.forEach(c => {
      if (c && c.companyName) {
        nameToIdMap.set(c.companyName.trim(), c.companyId);
      }
    });

    let companiesUpdated = false;
    let jobsUpdated = false;
    const now = new Date().toISOString();

    rawJobs.forEach((j, index) => {
      const cName = (j.companyName || '').trim();
      if (!cName) return;

      let cId = j.companyId;

      if (!cId || !companyMap.has(cId)) {
        if (nameToIdMap.has(cName)) {
          cId = nameToIdMap.get(cName);
          j.companyId = cId;
          jobsUpdated = true;
        } else {
          cId = `CMP-${Date.now()}-${Math.floor(Math.random() * 10000)}-${index}`;
          const newCompany = {
            companyId: cId,
            companyName: cName,
            companyNameKana: j.companyNameKana || '',
            priorityRank: 'UNSET',
            createdAt: j.createdAt || now,
            updatedAt: j.updatedAt || now,
            updatedBy: j.createdStaffId || ''
          };
          companyMap.set(cId, newCompany);
          nameToIdMap.set(cName, cId);
          rawCompanies.push(newCompany);
          companiesUpdated = true;

          j.companyId = cId;
          jobsUpdated = true;
        }
      }
    });

    if (companiesUpdated || !localStorage.getItem(KEYS.COMPANIES)) {
      localStorage.setItem(KEYS.COMPANIES, JSON.stringify(rawCompanies));
    }
    if (jobsUpdated) {
      localStorage.setItem(KEYS.JOBS, JSON.stringify(rawJobs));
    }
  }

  // --- 汎用ヘルパー ---
  static get(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || '[]');
    } catch (e) {
      console.error(`Failed to load ${key}`, e);
      return [];
    }
  }

  static set(key, data) {
    const projectId = (window.FIREBASE_CONFIG && window.FIREBASE_CONFIG.projectId) || 'project-5bedb';
    const collectionName = 'scout_app_store';
    const jsonStr = JSON.stringify(data);
    localStorage.setItem(key, jsonStr);

    if (window.firestoreDb) {
      window.firestoreDb.collection(collectionName).doc(key).set({
        jsonStr: jsonStr,
        updatedAt: new Date().toISOString(),
        updatedByStaffId: this.getCurrentStaffId() || 'SYSTEM'
      }).then(() => {
        console.log(`[Firestore Write Success] Key: ${key} | Collection: ${collectionName} | Project: ${projectId} | Last Updated: ${new Date().toLocaleTimeString('ja-JP')}`);
      }).catch(err => {
        console.error(`[Firestore Write ERROR] Key: ${key} | Collection: ${collectionName} | Project: ${projectId} | Error Code: ${err.code || 'UNKNOWN'} | Message: ${err.message}`, err);
        alert(`[Cloud Firestore保存エラー] ${key} のクラウド同期に失敗しました (${err.code || 'ERR'}): ${err.message}`);
      });
    }
  }

  // --- 現在選択中担当者 ---
  static getCurrentStaffId() {
    return localStorage.getItem(KEYS.CURRENT_STAFF_ID) || '';
  }

  static setCurrentStaffId(staffId) {
    localStorage.setItem(KEYS.CURRENT_STAFF_ID, staffId);
  }

  // --- 担当者 (Users) ---
  static getUsers() {
    let list = this.get(KEYS.USERS);
    if (!Array.isArray(list) || list.length === 0) {
      const defaultUsers = [
        { staffId: 'STF-001', name: '尾﨑優理', status: 'active', adminRole: 'admin', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { staffId: 'STF-002', name: '山田太郎', status: 'active', adminRole: 'member', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { staffId: 'STF-003', name: '佐藤花子', status: 'active', adminRole: 'member', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
      ];
      this.set(KEYS.USERS, defaultUsers);
      list = defaultUsers;
    }
    return list.map(u => ({
      staffId: u.staffId,
      name: u.name || '',
      status: u.status === '利用停止' || u.status === 'inactive' ? 'inactive' : 'active',
      adminRole: u.adminRole === '管理者' || u.adminRole === 'admin' ? 'admin' : 'member',
      createdAt: u.createdAt || new Date().toISOString(),
      updatedAt: u.updatedAt || new Date().toISOString()
    }));
  }

  static getActiveUsers() {
    return this.getUsers().filter(u => u.status === 'active');
  }

  static getUserById(staffId) {
    return this.getUsers().find(u => u.staffId === staffId) || null;
  }

  static saveUser(user, operatorStaffId = '') {
    const users = this.getUsers();
    const now = new Date().toISOString();
    let savedUser;
    let idx = user.staffId ? users.findIndex(u => u.staffId === user.staffId) : -1;
    let beforeData = idx >= 0 ? { ...users[idx] } : null;

    if (idx >= 0) {
      savedUser = {
        ...users[idx],
        name: user.name,
        status: user.status || users[idx].status,
        adminRole: user.adminRole || users[idx].adminRole,
        updatedAt: now
      };
      users[idx] = savedUser;
    } else {
      const newStaffId = `STF-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      savedUser = {
        staffId: newStaffId,
        name: user.name,
        status: user.status || 'active',
        adminRole: user.adminRole || 'member',
        createdAt: now,
        updatedAt: now
      };
      users.push(savedUser);
    }

    this.set(KEYS.USERS, users);

    this.addChangeLog({
      targetType: 'staff',
      targetId: savedUser.staffId,
      actionType: idx >= 0 ? 'update' : 'create',
      beforeData,
      afterData: savedUser,
      staffId: operatorStaffId,
      notes: `担当者「${savedUser.name}」の${idx >= 0 ? '情報編集' : '新規登録'}`
    });

    return savedUser;
  }

  static toggleUserStatus(staffId, newStatus, operatorStaffId = '') {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.staffId === staffId);
    if (idx >= 0) {
      const beforeData = { ...users[idx] };
      users[idx].status = newStatus;
      users[idx].updatedAt = new Date().toISOString();
      this.set(KEYS.USERS, users);

      this.addChangeLog({
        targetType: 'staff',
        targetId: staffId,
        actionType: 'update',
        beforeData,
        afterData: users[idx],
        staffId: operatorStaffId,
        notes: `担当者「${users[idx].name}」の利用状態を「${newStatus === 'active' ? '利用中' : '利用停止'}」に変更`
      });

      return users[idx];
    }
    return null;
  }

  // --- 企業マスタ (Companies) ---
  static getCompanies() {
    const list = this.get(KEYS.COMPANIES);
    return list.map(c => ({
      companyId: c.companyId,
      companyName: c.companyName || '',
      companyNameKana: c.companyNameKana || '',
      priorityRank: PRIORITY_RANKS[c.priorityRank] ? c.priorityRank : 'UNSET',
      createdAt: c.createdAt || new Date().toISOString(),
      updatedAt: c.updatedAt || new Date().toISOString(),
      updatedBy: c.updatedBy || ''
    }));
  }

  static getCompanyById(companyId) {
    return this.getCompanies().find(c => c.companyId === companyId) || null;
  }

  static getCompanyByName(companyName) {
    const trimmed = (companyName || '').trim();
    if (!trimmed) return null;
    return this.getCompanies().find(c => c.companyName.trim() === trimmed) || null;
  }

  static saveCompany(comp, operatorStaffId = '') {
    const companies = this.getCompanies();
    const now = new Date().toISOString();
    const isEdit = Boolean(comp.companyId) && companies.some(c => c.companyId === comp.companyId);

    let savedComp;
    let beforeData = null;

    if (isEdit) {
      const idx = companies.findIndex(c => c.companyId === comp.companyId);
      beforeData = { ...companies[idx] };
      savedComp = {
        ...companies[idx],
        companyName: comp.companyName,
        companyNameKana: comp.companyNameKana !== undefined ? comp.companyNameKana : companies[idx].companyNameKana,
        priorityRank: comp.priorityRank !== undefined ? comp.priorityRank : companies[idx].priorityRank,
        updatedAt: now,
        updatedBy: operatorStaffId
      };
      companies[idx] = savedComp;
    } else {
      const newCompanyId = `CMP-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      savedComp = {
        companyId: newCompanyId,
        companyName: comp.companyName,
        companyNameKana: comp.companyNameKana || '',
        priorityRank: comp.priorityRank || 'UNSET',
        createdAt: now,
        updatedAt: now,
        updatedBy: operatorStaffId
      };
      companies.push(savedComp);
    }

    this.set(KEYS.COMPANIES, companies);

    this.addChangeLog({
      targetType: 'companies',
      targetId: savedComp.companyId,
      actionType: isEdit ? 'update' : 'create',
      beforeData,
      afterData: savedComp,
      staffId: operatorStaffId,
      notes: `企業「${savedComp.companyName}」の${isEdit ? '情報編集' : '新規登録'}`
    });

    return savedComp;
  }

  /**
   * 企業注力ランクの変更 (管理者モード専用、同企業の全求人に共通反映)
   */
  static updateCompanyRank(companyId, newRank, operatorStaffId = '') {
    const companies = this.getCompanies();
    const idx = companies.findIndex(c => c.companyId === companyId);
    if (idx < 0) {
      throw new Error('対象の企業が存在しません。');
    }

    const beforeData = { ...companies[idx] };
    const validRank = PRIORITY_RANKS[newRank] ? newRank : 'UNSET';
    const now = new Date().toISOString();

    companies[idx].priorityRank = validRank;
    companies[idx].updatedAt = now;
    companies[idx].updatedBy = operatorStaffId;

    this.set(KEYS.COMPANIES, companies);

    const beforeRankLabel = PRIORITY_RANKS[beforeData.priorityRank]?.fullLabel || beforeData.priorityRank;
    const afterRankLabel = PRIORITY_RANKS[validRank]?.fullLabel || validRank;

    this.addChangeLog({
      targetType: 'company_rank',
      targetId: companyId,
      actionType: 'update_rank',
      beforeData,
      afterData: companies[idx],
      staffId: operatorStaffId,
      notes: `企業「${companies[idx].companyName}」の注力ランクを「${beforeRankLabel}」から「${afterRankLabel}」へ変更`
    });

    return companies[idx];
  }

  // --- 求人 (Jobs) ---
  /**
   * 求人一覧の取得 (企業マスタと結合して companyNameKana や priorityRank を付与)
   */
  static getJobs() {
    const list = this.get(KEYS.JOBS);
    const companiesMap = new Map(this.getCompanies().map(c => [c.companyId, c]));
    let updated = false;

    const normalized = list.map((j, index) => {
      let jobId = j.jobId;
      if (!jobId) {
        jobId = `JOB-${Date.now()}-${index}`;
        updated = true;
      }

      let company = j.companyId ? companiesMap.get(j.companyId) : null;
      if (!company && j.companyName) {
        company = this.getCompanyByName(j.companyName);
      }

      const companyId = company ? company.companyId : (j.companyId || '');
      const companyName = company ? company.companyName : (j.companyName || '');
      const companyNameKana = company ? company.companyNameKana : (j.companyNameKana || '');
      const priorityRank = company ? company.priorityRank : 'UNSET';

      return {
        jobId,
        companyId,
        companyName,
        companyNameKana,
        priorityRank,
        priorityRankObj: PRIORITY_RANKS[priorityRank] || PRIORITY_RANKS.UNSET,
        jobTitle: j.jobTitle || '',
        industry: j.industry || '',
        position: j.position || '',
        status: j.status || '準備中',
        targetAge: Array.isArray(j.targetAge) ? j.targetAge : [],
        role: j.role || '',
        salaryRange: Array.isArray(j.salaryRange) ? j.salaryRange : [],
        archived: Boolean(j.archived),
        createdStaffId: j.createdStaffId || '',
        updatedStaffId: j.updatedStaffId || '',
        createdAt: j.createdAt || new Date().toISOString(),
        updatedAt: j.updatedAt || new Date().toISOString()
      };
    });

    if (updated) {
      this.set(KEYS.JOBS, normalized);
    }
    return normalized;
  }

  static getActiveJobs() {
    return this.getJobs().filter(j => !j.archived);
  }

  static getJobById(jobId) {
    return this.getJobs().find(j => j.jobId === jobId) || null;
  }

  /**
   * 求人の新規登録および編集 (企業マスタへの自動紐づけ & インプレース更新)
   */
  static saveJob(job, operatorStaffId = '') {
    const jobs = this.getJobs();
    const now = new Date().toISOString();

    const companyNameTrimmed = (job.companyName || '').trim();
    let company = this.getCompanyByName(companyNameTrimmed);
    if (!company) {
      company = this.saveCompany({
        companyName: companyNameTrimmed,
        companyNameKana: job.companyNameKana || '',
        priorityRank: 'UNSET'
      }, operatorStaffId);
    } else if (job.companyNameKana && job.companyNameKana !== company.companyNameKana) {
      company = this.saveCompany({
        ...company,
        companyNameKana: job.companyNameKana
      }, operatorStaffId);
    }

    const isEdit = Boolean(job.jobId) && jobs.some(j => j.jobId === job.jobId);
    let savedJob;
    let beforeData = null;

    if (isEdit) {
      const idx = jobs.findIndex(j => j.jobId === job.jobId);
      beforeData = { ...jobs[idx] };
      savedJob = {
        ...jobs[idx],
        companyId: company.companyId,
        companyName: company.companyName,
        companyNameKana: company.companyNameKana,
        jobTitle: job.jobTitle,
        industry: job.industry || '',
        position: job.position || '',
        status: job.status || jobs[idx].status,
        targetAge: Array.isArray(job.targetAge) ? job.targetAge : [],
        role: job.role || '',
        salaryRange: Array.isArray(job.salaryRange) ? job.salaryRange : [],
        updatedStaffId: operatorStaffId,
        updatedAt: now
      };
      jobs[idx] = savedJob;
    } else {
      const newJobId = `JOB-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      savedJob = {
        jobId: newJobId,
        companyId: company.companyId,
        companyName: company.companyName,
        companyNameKana: company.companyNameKana,
        jobTitle: job.jobTitle,
        industry: job.industry || '',
        position: job.position || '',
        status: job.status || '準備中',
        targetAge: Array.isArray(job.targetAge) ? job.targetAge : [],
        role: job.role || '',
        salaryRange: Array.isArray(job.salaryRange) ? job.salaryRange : [],
        archived: false,
        createdStaffId: operatorStaffId,
        updatedStaffId: operatorStaffId,
        createdAt: now,
        updatedAt: now
      };
      jobs.push(savedJob);
    }

    this.set(KEYS.JOBS, jobs);

    this.addChangeLog({
      targetType: 'jobs',
      targetId: savedJob.jobId,
      actionType: isEdit ? 'update' : 'create',
      beforeData,
      afterData: savedJob,
      staffId: operatorStaffId,
      notes: `求人「${savedJob.companyName} / ${savedJob.jobTitle}」の${isEdit ? '情報編集' : '新規登録'}`
    });

    return savedJob;
  }

  /**
   * 週の開始日（月曜日JST）と終了日（日曜日JST）の算出ユーティリティ
   */
  static getWeekRange(dateInput = new Date()) {
    const d = typeof dateInput === 'string' ? new Date(dateInput + (dateInput.length === 10 ? 'T00:00:00+09:00' : '')) : new Date(dateInput);
    const jst = new Date(d.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
    const day = jst.getDay();
    const diffToMon = day === 0 ? -6 : 1 - day;

    const monday = new Date(jst);
    monday.setDate(jst.getDate() + diffToMon);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    const formatDate = (dateObj) => {
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const dayStr = String(dateObj.getDate()).padStart(2, '0');
      return `${year}-${month}-${dayStr}`;
    };

    const startStr = formatDate(monday);
    const endStr = formatDate(sunday);

    const mMonth = monday.getMonth() + 1;
    const mDay = monday.getDate();
    const sMonth = sunday.getMonth() + 1;
    const sDay = sunday.getDate();

    return {
      weekStartDate: startStr,
      weekEndDate: endStr,
      displayLabel: `${monday.getFullYear()}年${mMonth}月${mDay}日（月）～${sMonth}月${sDay}日（日）`
    };
  }

  // --- 自動スカウト週次実績 (Auto Scout Weekly Results) ---
  static getAutoScoutWeeklyResults() {
    return this.get(KEYS.AUTO_RESULTS);
  }

  static getValidAutoScoutWeeklyResults() {
    return this.getAutoScoutWeeklyResults().filter(r => r.status !== 'cancelled' && r.status !== '取消済み');
  }

  static saveAutoScoutWeeklyResult(record, operatorStaffId = '', isConfirmedOverride = false) {
    const { jobId, weekStartDate, weekEndDate, mediaId, sentCount, totalReplyCount, effectiveReplyCount, notes, status, confirmationStatus } = record;

    if (Number(effectiveReplyCount) > Number(totalReplyCount)) {
      throw new Error('有効返信数は総返信数以下である必要があります。');
    }
    if (Number(sentCount) < 0 || Number(totalReplyCount) < 0 || Number(effectiveReplyCount) < 0) {
      throw new Error('負の数値は保存できません。');
    }

    const key = `${jobId}_${weekStartDate}_${mediaId}`;
    const list = this.getAutoScoutWeeklyResults();
    const idx = list.findIndex(r => r.autoResultId === key);
    const now = new Date().toISOString();

    let beforeData = idx >= 0 ? { ...list[idx] } : null;

    if (beforeData && beforeData.confirmationStatus === 'confirmed' && !isConfirmedOverride) {
      throw new Error('確定済みの週次実績を修正する場合は確認が必要です。');
    }

    let savedRecord;
    if (idx >= 0) {
      savedRecord = {
        ...list[idx],
        sentCount: Number(sentCount),
        totalReplyCount: Number(totalReplyCount),
        effectiveReplyCount: Number(effectiveReplyCount),
        status: status || list[idx].status || 'valid',
        confirmationStatus: confirmationStatus || list[idx].confirmationStatus || 'draft',
        notes: notes !== undefined ? notes : (list[idx].notes || ''),
        updatedAt: now,
        updatedBy: operatorStaffId
      };
      list[idx] = savedRecord;
    } else {
      savedRecord = {
        autoResultId: key,
        jobId,
        weekStartDate,
        weekEndDate: weekEndDate || this.getWeekRange(weekStartDate).weekEndDate,
        mediaId,
        sentCount: Number(sentCount),
        totalReplyCount: Number(totalReplyCount),
        effectiveReplyCount: Number(effectiveReplyCount),
        status: status || 'valid',
        confirmationStatus: confirmationStatus || 'draft',
        notes: notes || '',
        createdBy: operatorStaffId,
        updatedBy: operatorStaffId,
        createdAt: now,
        updatedAt: now
      };
      list.push(savedRecord);
    }

    this.set(KEYS.AUTO_RESULTS, list);

    if (beforeData && beforeData.confirmationStatus === 'confirmed') {
      this.addChangeLog({
        targetType: 'auto_scout_confirmed_edit',
        targetId: key,
        actionType: 'update_confirmed',
        beforeData,
        afterData: savedRecord,
        staffId: operatorStaffId,
        notes: `確定済み自動スカウト実績の修正 (${weekStartDate} / ${jobId} / ${mediaId})`
      });
    }

    return savedRecord;
  }

  static toggleAutoScoutWeekConfirmation(weekStartDate, newConfirmationStatus, operatorStaffId = '') {
    const list = this.getAutoScoutWeeklyResults();
    let count = 0;
    const now = new Date().toISOString();

    list.forEach(r => {
      if (r.weekStartDate === weekStartDate) {
        r.confirmationStatus = newConfirmationStatus;
        r.updatedAt = now;
        r.updatedBy = operatorStaffId;
        count++;
      }
    });

    this.set(KEYS.AUTO_RESULTS, list);

    this.addChangeLog({
      targetType: 'auto_scout_confirmation',
      targetId: weekStartDate,
      actionType: 'toggle_confirmation',
      staffId: operatorStaffId,
      notes: `自動スカウト実績 (${weekStartDate}週) のステータスを「${newConfirmationStatus === 'confirmed' ? '確定済み' : '入力中'}」へ変更 (対象: ${count}件)`
    });

    return count;
  }

  // --- 自動スカウト対象求人 & 入力権限管理 ---
  static getAutoScoutTargetJobIds() {
    return this.get(KEYS.AUTO_TARGET_JOBS) || [];
  }

  static saveAutoScoutTargetJobIds(jobIdList, operatorStaffId = '') {
    const uniqueIds = Array.from(new Set((jobIdList || []).filter(Boolean)));
    this.set(KEYS.AUTO_TARGET_JOBS, uniqueIds);
    this.addChangeLog({
      targetType: 'auto_scout_target_jobs',
      targetId: 'auto_targets',
      actionType: 'update',
      staffId: operatorStaffId,
      notes: `自動スカウト対象求人を更新 (${uniqueIds.length}件)`
    });
    return uniqueIds;
  }

  static isAutoScoutTargetJob(jobId) {
    const list = this.getAutoScoutTargetJobIds();
    return list.includes(jobId);
  }

  static toggleAutoScoutTargetJob(jobId, operatorStaffId = '') {
    const list = this.getAutoScoutTargetJobIds();
    const idx = list.indexOf(jobId);
    if (idx >= 0) {
      list.splice(idx, 1);
    } else {
      list.push(jobId);
    }
    this.saveAutoScoutTargetJobIds(list, operatorStaffId);
    return list.includes(jobId);
  }

  static getAutoScoutAllowedStaffIds() {
    return this.get(KEYS.AUTO_SCOUT_PERMISSIONS) || [];
  }

  static saveAutoScoutAllowedStaffIds(staffIdList, operatorStaffId = '') {
    const uniqueIds = Array.from(new Set((staffIdList || []).filter(Boolean)));
    this.set(KEYS.AUTO_SCOUT_PERMISSIONS, uniqueIds);
    this.addChangeLog({
      targetType: 'auto_scout_permissions',
      targetId: 'permissions',
      actionType: 'update',
      staffId: operatorStaffId,
      notes: `自動スカウト入力権限のある担当者リストを更新 (${uniqueIds.length}名)`
    });
    return uniqueIds;
  }

  static canEditAutoScout(staffId, isAdminMode) {
    if (isAdminMode) return true;
    if (!staffId) return false;
    const allowedList = this.getAutoScoutAllowedStaffIds();
    return allowedList.includes(staffId);
  }

  // --- 直接エントリー（インバウンド）実績 (Inbound Entry Results) ---
  static getInboundResults() {
    return this.get(KEYS.INBOUND_RESULTS) || [];
  }

  static getValidInboundResults() {
    return this.getInboundResults().filter(r => r.status !== 'cancelled' && r.status !== '取消済み');
  }

  static saveInboundResult(record, operatorStaffId = '') {
    const { jobId, date, routeId, entryCount, effectiveCount, notes, status } = record;

    if (Number(effectiveCount) > Number(entryCount)) {
      throw new Error('有効エントリー数はエントリー数以下である必要があります。');
    }
    if (Number(entryCount) < 0 || Number(effectiveCount) < 0) {
      throw new Error('負の数値は保存できません。');
    }

    const key = `${jobId}_${date}_${routeId}`;
    const list = this.getInboundResults();
    const idx = list.findIndex(r => r.inboundResultId === key);
    const now = new Date().toISOString();

    let savedRecord;
    if (idx >= 0) {
      savedRecord = {
        ...list[idx],
        entryCount: Number(entryCount),
        effectiveCount: Number(effectiveCount),
        status: status || list[idx].status || 'valid',
        notes: notes !== undefined ? notes : (list[idx].notes || ''),
        updatedAt: now,
        updatedBy: operatorStaffId
      };
      list[idx] = savedRecord;
    } else {
      savedRecord = {
        inboundResultId: key,
        jobId,
        date,
        routeId,
        entryCount: Number(entryCount),
        effectiveCount: Number(effectiveCount),
        status: status || 'valid',
        notes: notes || '',
        createdBy: operatorStaffId,
        updatedBy: operatorStaffId,
        createdAt: now,
        updatedAt: now
      };
      list.push(savedRecord);
    }

    this.set(KEYS.INBOUND_RESULTS, list);
    return savedRecord;
  }

  static deleteInboundResult(inboundResultId, operatorStaffId = '') {
    const list = this.getInboundResults();
    const idx = list.findIndex(r => r.inboundResultId === inboundResultId);
    if (idx >= 0) {
      list[idx].status = 'cancelled';
      list[idx].updatedAt = new Date().toISOString();
      list[idx].updatedBy = operatorStaffId;
      this.set(KEYS.INBOUND_RESULTS, list);
    }
  }

  /**
   * 求人の削除可否チェック (手動実績、自動スカウト実績、インバウンド応募実績の全方を確認)
   */
  static checkJobDeletionSafety(jobId) {
    const allManualResults = this.getScoutResults();
    const hasManualResults = allManualResults.some(r => r.jobId === jobId);

    const allAutoResults = this.getAutoScoutWeeklyResults();
    const hasAutoResults = allAutoResults.some(r => r.jobId === jobId);

    const allInboundResults = this.getInboundResults();
    const hasInboundResults = allInboundResults.some(r => r.jobId === jobId);

    if (hasManualResults || hasAutoResults || hasInboundResults) {
      return {
        canDelete: false,
        reason: 'has_results',
        message: 'この求人にはスカウト実績または直接エントリー実績が登録されているため削除できません。募集終了またはアーカイブをご利用ください。'
      };
    }

    const knowledgeList = this.getKnowledgeList().filter(k => k.jobId === jobId);
    const messageList = this.getMessages().filter(m => m.jobId === jobId);

    if (knowledgeList.length > 0 || messageList.length > 0) {
      return {
        canDelete: false,
        reason: 'has_related_data',
        message: 'この求人には関連するナレッジまたはスカウト文面があるため削除できません。アーカイブをご利用ください。',
        details: {
          knowledgeCount: knowledgeList.length,
          messageCount: messageList.length
        }
      };
    }

    const userJobs = this.get(KEYS.USER_JOBS).filter(uj => uj.jobId === jobId);

    return {
      canDelete: true,
      userJobsCount: userJobs.length
    };
  }

  static deleteJob(jobId, operatorStaffId = '', deleteReason = '') {
    const safety = this.checkJobDeletionSafety(jobId);
    if (!safety.canDelete) {
      throw new Error(safety.message);
    }

    const jobs = this.getJobs();
    const idx = jobs.findIndex(j => j.jobId === jobId);
    if (idx < 0) {
      throw new Error('対象の求人が存在しません。');
    }

    const targetJob = { ...jobs[idx] };
    jobs.splice(idx, 1);
    this.set(KEYS.JOBS, jobs);

    const userJobs = this.get(KEYS.USER_JOBS).filter(uj => uj.jobId !== jobId);
    this.set(KEYS.USER_JOBS, userJobs);

    const messageAssignments = this.get(KEYS.MESSAGE_ASSIGNMENTS).filter(ma => ma.jobId !== jobId);
    this.set(KEYS.MESSAGE_ASSIGNMENTS, messageAssignments);

    this.addChangeLog({
      targetType: 'jobs',
      targetId: jobId,
      actionType: 'delete',
      beforeData: targetJob,
      afterData: null,
      staffId: operatorStaffId,
      notes: `求人「${targetJob.companyName} / ${targetJob.jobTitle}」の削除${deleteReason ? ` (理由: ${deleteReason})` : ''}`
    });

    return targetJob;
  }

  // --- 日本語ロケール比較・検索・フィルタソートユーティリティ ---
  static compareJapanese(a, b) {
    return (a || '').localeCompare(b || '', 'ja', { sensitivity: 'base' });
  }

  static getCompanySortKey(jobOrCompany) {
    return (jobOrCompany.companyNameKana || jobOrCompany.companyName || '').trim();
  }

  /**
   * 求人マスタの検索・絞り込み・並び替え処理
   */
  static filterAndSortJobs(jobsList, { searchKeyword = '', industries = [], positions = [], statuses = [], targetAges = [], roles = [], salaryRanges = [], priorityRanks = [], archived = false, sortBy = 'company_asc' } = {}) {
    let result = jobsList.filter(j => Boolean(j.archived) === Boolean(archived));

    // 1. 検索（企業名, 企業名よみ, 求人名, 業種, 職種 の部分一致）
    const keyword = (searchKeyword || '').trim().toLowerCase();
    if (keyword) {
      result = result.filter(j => {
        const cName = (j.companyName || '').toLowerCase();
        const cKana = (j.companyNameKana || '').toLowerCase();
        const jTitle = (j.jobTitle || '').toLowerCase();
        const ind = (j.industry || '').toLowerCase();
        const pos = (j.position || '').toLowerCase();
        return cName.includes(keyword) || cKana.includes(keyword) || jTitle.includes(keyword) || ind.includes(keyword) || pos.includes(keyword);
      });
    }

    // 2. 多重絞り込み (同一項目OR, 異項目AND)
    if (industries.length > 0) result = result.filter(j => j.industry && industries.includes(j.industry));
    if (positions.length > 0) result = result.filter(j => j.position && positions.includes(j.position));
    if (statuses.length > 0) result = result.filter(j => j.status && statuses.includes(j.status));
    if (roles.length > 0) result = result.filter(j => j.role && roles.includes(j.role));
    if (priorityRanks.length > 0) result = result.filter(j => priorityRanks.includes(j.priorityRank));
    if (targetAges.length > 0) {
      result = result.filter(j => Array.isArray(j.targetAge) && j.targetAge.some(a => targetAges.includes(a)));
    }
    if (salaryRanges.length > 0) {
      result = result.filter(j => Array.isArray(j.salaryRange) && j.salaryRange.some(s => salaryRanges.includes(s)));
    }

    // 3. 並び替え
    result.sort((a, b) => {
      const cKeyA = this.getCompanySortKey(a);
      const cKeyB = this.getCompanySortKey(b);

      switch (sortBy) {
        case 'company_asc': {
          const compDiff = this.compareJapanese(cKeyA, cKeyB);
          if (compDiff !== 0) return compDiff;
          return this.compareJapanese(a.jobTitle, b.jobTitle);
        }
        case 'company_desc': {
          const compDiff = this.compareJapanese(cKeyB, cKeyA);
          if (compDiff !== 0) return compDiff;
          return this.compareJapanese(a.jobTitle, b.jobTitle);
        }
        case 'job_title_asc':
          return this.compareJapanese(a.jobTitle, b.jobTitle);
        case 'job_title_desc':
          return this.compareJapanese(b.jobTitle, a.jobTitle);
        case 'rank_desc': {
          const wA = PRIORITY_RANKS[a.priorityRank]?.weight || 1;
          const wB = PRIORITY_RANKS[b.priorityRank]?.weight || 1;
          if (wB !== wA) return wB - wA;
          const compDiff = this.compareJapanese(cKeyA, cKeyB);
          if (compDiff !== 0) return compDiff;
          return this.compareJapanese(a.jobTitle, b.jobTitle);
        }
        case 'rank_asc': {
          const wA = PRIORITY_RANKS[a.priorityRank]?.weight || 1;
          const wB = PRIORITY_RANKS[b.priorityRank]?.weight || 1;
          if (wA !== wB) return wA - wB;
          const compDiff = this.compareJapanese(cKeyA, cKeyB);
          if (compDiff !== 0) return compDiff;
          return this.compareJapanese(a.jobTitle, b.jobTitle);
        }
        case 'status': {
          const orderA = JOB_STATUSES.indexOf(a.status);
          const orderB = JOB_STATUSES.indexOf(b.status);
          if (orderA !== orderB) return orderA - orderB;
          return this.compareJapanese(cKeyA, cKeyB);
        }
        case 'updated_desc':
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        case 'updated_asc':
          return new Date(a.updatedAt) - new Date(b.updatedAt);
        case 'created_desc':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'created_asc':
          return new Date(a.createdAt) - new Date(b.createdAt);
        default: {
          const compDiff = this.compareJapanese(cKeyA, cKeyB);
          if (compDiff !== 0) return compDiff;
          return this.compareJapanese(a.jobTitle, b.jobTitle);
        }
      }
    });

    return result;
  }

  // --- 担当求人 (User-Jobs) ---
  static getUserJobs(staffId = '') {
    const list = this.get(KEYS.USER_JOBS);
    return staffId ? list.filter(uj => uj.staffId === staffId) : list;
  }

  static addUserJob(staffId, jobId) {
    const list = this.getUserJobs();
    const existing = list.find(uj => uj.staffId === staffId && uj.jobId === jobId);
    if (existing) {
      if (existing.hidden) {
        existing.hidden = false;
        existing.updatedAt = new Date().toISOString();
        this.set(KEYS.USER_JOBS, list);
      }
      return existing;
    }

    const now = new Date().toISOString();
    const newStaffJob = {
      staffJobId: `${staffId}_${jobId}`,
      staffId,
      jobId,
      hidden: false,
      pinned: false,
      displayOrder: list.filter(uj => uj.staffId === staffId).length + 1,
      createdAt: now,
      updatedAt: now
    };
    list.push(newStaffJob);
    this.set(KEYS.USER_JOBS, list);
    return newStaffJob;
  }

  static updateUserJob(staffJobId, updates) {
    const list = this.getUserJobs();
    const idx = list.findIndex(uj => uj.staffJobId === staffJobId);
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...updates, updatedAt: new Date().toISOString() };
      this.set(KEYS.USER_JOBS, list);
      return list[idx];
    }
    return null;
  }

  /**
   * 個人実績入力画面の担当求人並び替え・検索・簡易絞り込み処理
   * （固定求人は常に最上部グループとして維持）
   */
  static sortUserJobsForEntry(userJobItems, { searchKeyword = '', filterType = 'all', sortBy = 'standard', todayResultsMap = new Map() } = {}) {
    let list = [...userJobItems];

    // 1. 検索（企業名, 企業名よみ, 求人名）
    const keyword = (searchKeyword || '').trim().toLowerCase();
    if (keyword) {
      list = list.filter(({ job }) => {
        const cName = (job.companyName || '').toLowerCase();
        const cKana = (job.companyNameKana || '').toLowerCase();
        const jTitle = (job.jobTitle || '').toLowerCase();
        return cName.includes(keyword) || cKana.includes(keyword) || jTitle.includes(keyword);
      });
    }

    // 2. 簡易絞り込み
    if (filterType !== 'all') {
      list = list.filter(({ uj, job }) => {
        if (filterType === 'pinned') return uj.pinned;
        if (filterType === 'active') return job.status === 'スカウト実施中';
        if (filterType === 'prep') return job.status === '準備中';
        if (filterType === 'stopped') return job.status === '一時停止' || job.status === '募集終了';
        if (filterType.startsWith('rank_')) {
          const targetRank = filterType.replace('rank_', '');
          return job.priorityRank === targetRank;
        }
        if (filterType === 'entered_media' || filterType === 'has_results') {
          const stats = todayResultsMap.get(job.jobId);
          return stats && (stats.sent > 0 || stats.totalReply > 0 || stats.effectiveReply > 0);
        }
        return true;
      });
    }

    // 3. ソート関数定義
    const compareItems = (itemA, itemB) => {
      const jobA = itemA.job;
      const jobB = itemB.job;
      const cKeyA = this.getCompanySortKey(jobA);
      const cKeyB = this.getCompanySortKey(jobB);
      const statA = todayResultsMap.get(jobA.jobId) || { sent: 0, totalReply: 0, effectiveReply: 0 };
      const statB = todayResultsMap.get(jobB.jobId) || { sent: 0, totalReply: 0, effectiveReply: 0 };

      switch (sortBy) {
        case 'company_asc':
        case 'standard': {
          const compDiff = this.compareJapanese(cKeyA, cKeyB);
          if (compDiff !== 0) return compDiff;
          return this.compareJapanese(jobA.jobTitle, jobB.jobTitle);
        }
        case 'company_desc': {
          const compDiff = this.compareJapanese(cKeyB, cKeyA);
          if (compDiff !== 0) return compDiff;
          return this.compareJapanese(jobA.jobTitle, jobB.jobTitle);
        }
        case 'job_title_asc':
          return this.compareJapanese(jobA.jobTitle, jobB.jobTitle);
        case 'job_title_desc':
          return this.compareJapanese(jobB.jobTitle, jobA.jobTitle);
        case 'rank_desc': {
          const wA = PRIORITY_RANKS[jobA.priorityRank]?.weight || 1;
          const wB = PRIORITY_RANKS[jobB.priorityRank]?.weight || 1;
          if (wB !== wA) return wB - wA;
          const compDiff = this.compareJapanese(cKeyA, cKeyB);
          if (compDiff !== 0) return compDiff;
          return this.compareJapanese(jobA.jobTitle, jobB.jobTitle);
        }
        case 'sent_desc':
          if (statB.sent !== statA.sent) return statB.sent - statA.sent;
          return this.compareJapanese(cKeyA, cKeyB);
        case 'total_reply_desc':
          if (statB.totalReply !== statA.totalReply) return statB.totalReply - statA.totalReply;
          return this.compareJapanese(cKeyA, cKeyB);
        case 'effective_reply_desc':
          if (statB.effectiveReply !== statA.effectiveReply) return statB.effectiveReply - statA.effectiveReply;
          return this.compareJapanese(cKeyA, cKeyB);
        default: {
          const compDiff = this.compareJapanese(cKeyA, cKeyB);
          if (compDiff !== 0) return compDiff;
          return this.compareJapanese(jobA.jobTitle, jobB.jobTitle);
        }
      }
    };

    // 4. グループ分離: 固定求人 (Pinned) は常に最上部
    const pinnedItems = list.filter(item => item.uj.pinned).sort(compareItems);
    const nonPinnedItems = list.filter(item => !item.uj.pinned).sort(compareItems);

    return [...pinnedItems, ...nonPinnedItems];
  }

  // --- 媒体 (Media) ---
  static getMediaList() {
    return this.get(KEYS.MEDIA).sort((a, b) => a.displayOrder - b.displayOrder);
  }
  static getActiveMediaList() {
    return this.getMediaList().filter(m => m.status === 'active');
  }

  // --- スカウト実績 (Results) ---
  static getScoutResults() { return this.get(KEYS.RESULTS); }
  static getValidScoutResults() { return this.getScoutResults().filter(r => r.status === 'valid'); }

  static saveScoutResult(result, operatorStaffId = '') {
    const { staffId, jobId, date, mediaId, sentCount, totalReplyCount, effectiveReplyCount } = result;

    if (Number(effectiveReplyCount) > Number(totalReplyCount)) {
      throw new Error('有効返信数は総返信数以下である必要があります。');
    }
    if (Number(sentCount) < 0 || Number(totalReplyCount) < 0 || Number(effectiveReplyCount) < 0) {
      throw new Error('負の数値は保存できません。');
    }

    const key = `${staffId}_${jobId}_${date}_${mediaId}`;
    const results = this.getScoutResults();
    const idx = results.findIndex(r => r.resultId === key);
    const now = new Date().toISOString();

    let savedResult;
    if (idx >= 0) {
      savedResult = {
        ...results[idx],
        sentCount: Number(sentCount),
        totalReplyCount: Number(totalReplyCount),
        effectiveReplyCount: Number(effectiveReplyCount),
        status: 'valid',
        updatedAt: now,
        lastUpdatedByStaffId: operatorStaffId || staffId
      };
      results[idx] = savedResult;
    } else {
      savedResult = {
        resultId: key,
        staffId,
        jobId,
        date,
        mediaId,
        sentCount: Number(sentCount),
        totalReplyCount: Number(totalReplyCount),
        effectiveReplyCount: Number(effectiveReplyCount),
        status: 'valid',
        createdAt: now,
        updatedAt: now,
        lastUpdatedByStaffId: operatorStaffId || staffId
      };
      results.push(savedResult);
    }

    this.set(KEYS.RESULTS, results);
    return savedResult;
  }

  // --- ナレッジ ---
  static getKnowledgeList() { return this.get(KEYS.KNOWLEDGE).filter(k => !k.isArchived); }
  static saveKnowledge(knw, operatorStaffId = '') {
    const list = this.get(KEYS.KNOWLEDGE);
    const now = new Date().toISOString();
    const targetId = knw.knowledgeId || knw.id;
    const idx = targetId ? list.findIndex(k => (k.knowledgeId && k.knowledgeId === targetId) || (k.id && k.id === targetId)) : -1;
    let saved;

    if (idx >= 0) {
      saved = { ...list[idx], ...knw, updatedAt: now };
      list[idx] = saved;
    } else {
      saved = {
        knowledgeId: targetId || `KNW-${Date.now()}`,
        staffId: operatorStaffId,
        isArchived: false,
        createdAt: now,
        updatedAt: now,
        ...knw
      };
      list.push(saved);
    }
    this.set(KEYS.KNOWLEDGE, list);
    return saved;
  }

  static deleteKnowledge(knowledgeId, operatorStaffId = '') {
    const list = this.get(KEYS.KNOWLEDGE);
    const idx = list.findIndex(k => (k.knowledgeId && String(k.knowledgeId) === String(knowledgeId)) || (k.id && String(k.id) === String(knowledgeId)));
    if (idx >= 0) {
      list[idx].isArchived = true;
      list[idx].updatedAt = new Date().toISOString();
      list[idx].updatedBy = operatorStaffId;
      this.set(KEYS.KNOWLEDGE, list);
    }
  }

  // --- 変更履歴 ---
  static getChangeLogs() { return this.get(KEYS.CHANGE_LOGS); }

  // --- スカウト文面 ---
  static getMessages() { return this.get(KEYS.MESSAGES).filter(m => !m.isArchived); }
  static getMessageVersions(messageId = '') {
    const list = this.get(KEYS.MESSAGE_VERSIONS);
    return messageId ? list.filter(v => v.messageId === messageId) : list;
  }

  static saveMessageWithVersion(msg, versionData, operatorStaffId = '') {
    const messages = this.get(KEYS.MESSAGES);
    const versions = this.get(KEYS.MESSAGE_VERSIONS);
    const now = new Date().toISOString();

    let messageId = msg.messageId;
    let msgIdx = messages.findIndex(m => m.messageId === messageId);
    let currentMsg;

    if (msgIdx >= 0) {
      currentMsg = { ...messages[msgIdx], ...msg, updatedStaffId: operatorStaffId, updatedAt: now };
      messages[msgIdx] = currentMsg;
    } else {
      messageId = `MSG-${Date.now()}`;
      currentMsg = {
        messageId,
        title: msg.title,
        jobId: msg.jobId || '',
        targetMedia: msg.targetMedia || [],
        targetPosition: msg.targetPosition || '',
        targetAge: msg.targetAge || [],
        status: msg.status || '利用中',
        currentVersionId: '',
        createdStaffId: operatorStaffId,
        updatedStaffId: operatorStaffId,
        createdAt: now,
        updatedAt: now,
        isArchived: false
      };
      messages.push(currentMsg);
    }

    const existingVersions = versions.filter(v => v.messageId === messageId);
    const versionNumber = existingVersions.length + 1;
    const versionId = `VER-${messageId}-${versionNumber}`;

    const newVersion = {
      versionId,
      messageId,
      versionNumber,
      subject: versionData.subject || '',
      body: versionData.body || '',
      changeReason: versionData.changeReason || (versionNumber === 1 ? '新規作成' : '文面更新'),
      changedByStaffId: operatorStaffId,
      createdAt: now
    };
    versions.push(newVersion);
    currentMsg.currentVersionId = versionId;
    this.set(KEYS.MESSAGES, messages);
    this.set(KEYS.MESSAGE_VERSIONS, versions);
    return { message: currentMsg, version: newVersion };
  }

  static exportCSV(type, currentStaffId = '') {
    const nowJST = new Date().toLocaleDateString('ja-JP', { timeZone: 'Asia/Tokyo' }).replace(/\//g, '-');
    const jobs = new Map(this.getJobs().map(j => [j.jobId, j]));
    const media = new Map(this.getMediaList().map(m => [m.id, m.name]));
    const users = new Map(this.getUsers().map(u => [u.staffId, u.name]));

    const formatTime = (ts) => ts ? new Date(ts).toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' }) : '';
    const sanitize = (val) => {
      if (val === null || val === undefined) return '""';
      return `"${String(val).replace(/"/g, '""').replace(/\n/g, ' ')}"`;
    };

    let filename = `${type}_${nowJST}.csv`;
    let headers = [];
    let rows = [];

    switch (type) {
      case 'auto_scout_weekly_detail': {
        filename = `auto_scout_weekly_results_${nowJST}.csv`;
        headers = ['週開始日', '週終了日', '求人ID', '企業名', '求人名', '媒体名', '自動送信数', '自動総返信数', '自動有効返信数', '実績ステータス', '確定状態', '備考', '更新日時'];
        const results = this.getAutoScoutWeeklyResults();
        rows = results.map(r => {
          const j = jobs.get(r.jobId) || {};
          return [
            r.weekStartDate,
            r.weekEndDate,
            r.jobId,
            sanitize(j.companyName),
            sanitize(j.jobTitle),
            sanitize(media.get(r.mediaId)),
            r.sentCount,
            r.totalReplyCount,
            r.effectiveReplyCount,
            sanitize(r.status === 'valid' ? '有効' : '取消済み'),
            sanitize(r.confirmationStatus === 'confirmed' ? '確定済み' : '入力中'),
            sanitize(r.notes || ''),
            formatTime(r.updatedAt)
          ];
        });
        break;
      }
      case 'all_scout_detail': {
        filename = `all_scout_detail_${nowJST}.csv`;
        headers = ['区分', '日付/期間', '担当者名', '企業名', '注力ランク', '求人名', '媒体名/経路', '送信/エントリー数', '総返信数', '有効返信/有効エントリー', '実績ステータス', '更新日時'];
        
        // 手動スカウト
        this.getScoutResults().forEach(r => {
          const j = jobs.get(r.jobId) || {};
          const rankObj = PRIORITY_RANKS[j.priorityRank] || PRIORITY_RANKS.UNSET;
          rows.push([
            '手動スカウト',
            r.date,
            sanitize(users.get(r.staffId) || r.staffId),
            sanitize(j.companyName),
            sanitize(rankObj.fullLabel),
            sanitize(j.jobTitle),
            sanitize(media.get(r.mediaId)),
            r.sentCount,
            r.totalReplyCount,
            r.effectiveReplyCount,
            sanitize(r.status),
            formatTime(r.updatedAt)
          ]);
        });

        // 自動スカウト
        this.getAutoScoutWeeklyResults().forEach(r => {
          const j = jobs.get(r.jobId) || {};
          const rankObj = PRIORITY_RANKS[j.priorityRank] || PRIORITY_RANKS.UNSET;
          rows.push([
            '自動スカウト',
            `${r.weekStartDate}〜${r.weekEndDate}`,
            'システム自動',
            sanitize(j.companyName),
            sanitize(rankObj.fullLabel),
            sanitize(j.jobTitle),
            sanitize(media.get(r.mediaId)),
            r.sentCount,
            r.totalReplyCount,
            r.effectiveReplyCount,
            sanitize(r.status === 'valid' ? '有効' : '取消済み'),
            formatTime(r.updatedAt)
          ]);
        });

        // インバウンド
        const routesMap = new Map((DEFAULT_INBOUND_ROUTES || []).map(r => [r.id, r.name]));
        this.getInboundResults().forEach(r => {
          const j = jobs.get(r.jobId) || {};
          const rankObj = PRIORITY_RANKS[j.priorityRank] || PRIORITY_RANKS.UNSET;
          rows.push([
            'インバウンド',
            r.date,
            '直接エントリー',
            sanitize(j.companyName),
            sanitize(rankObj.fullLabel),
            sanitize(j.jobTitle),
            sanitize(routesMap.get(r.routeId) || r.routeId),
            r.entryCount,
            r.effectiveCount,
            r.effectiveCount,
            sanitize(r.status || 'valid'),
            formatTime(r.updatedAt)
          ]);
        });
        break;
      }
      case 'staff_scout_summary': {
        filename = `staff_scout_summary_${nowJST}.csv`;
        headers = ['担当者ID', '担当者名', '手動送信数', '総返信数', '有効返信数', '参考総返信率(%)', '参考有効返信率(%)'];
        const results = this.getValidScoutResults();
        const map = new Map();
        results.forEach(r => {
          if (!map.has(r.staffId)) map.set(r.staffId, { sent: 0, total: 0, effective: 0 });
          const stat = map.get(r.staffId);
          stat.sent += r.sentCount; stat.total += r.totalReplyCount; stat.effective += r.effectiveReplyCount;
        });
        this.getUsers().forEach(u => {
          const stat = map.get(u.staffId) || { sent: 0, total: 0, effective: 0 };
          const tRate = stat.sent > 0 ? ((stat.total / stat.sent) * 100).toFixed(1) : '-';
          const eRate = stat.sent > 0 ? ((stat.effective / stat.sent) * 100).toFixed(1) : '-';
          rows.push([u.staffId, sanitize(u.name), stat.sent, stat.total, stat.effective, tRate, eRate]);
        });
        break;
      }
      case 'all_job_summary':
      case 'total_job_summary': {
        filename = `job_total_scout_summary_${nowJST}.csv`;
        headers = ['企業名', '求人名', '手動送信数', '自動送信数', '総送信数', '手動総返信数', '自動総返信数', '総返信数', '手動有効返信数', '自動有効返信数', '総有効返信数', '参考総返信率(%)', '参考総有効返信率(%)'];
        const manualResults = this.getValidScoutResults();
        const autoResults = this.getValidAutoScoutWeeklyResults();
        const map = new Map();

        manualResults.forEach(r => {
          if (!map.has(r.jobId)) map.set(r.jobId, { manualSent: 0, autoSent: 0, manualTotal: 0, autoTotal: 0, manualEff: 0, autoEff: 0 });
          const stat = map.get(r.jobId);
          stat.manualSent += r.sentCount; stat.manualTotal += r.totalReplyCount; stat.manualEff += r.effectiveReplyCount;
        });

        autoResults.forEach(r => {
          if (!map.has(r.jobId)) map.set(r.jobId, { manualSent: 0, autoSent: 0, manualTotal: 0, autoTotal: 0, manualEff: 0, autoEff: 0 });
          const stat = map.get(r.jobId);
          stat.autoSent += r.sentCount; stat.autoTotal += r.totalReplyCount; stat.autoEff += r.effectiveReplyCount;
        });

        map.forEach((stat, jobId) => {
          const j = jobs.get(jobId) || {};
          const totalSent = stat.manualSent + stat.autoSent;
          const totalReply = stat.manualTotal + stat.autoTotal;
          const totalEff = stat.manualEff + stat.autoEff;
          const tRate = totalSent > 0 ? ((totalReply / totalSent) * 100).toFixed(1) : '-';
          const eRate = totalSent > 0 ? ((totalEff / totalSent) * 100).toFixed(1) : '-';
          rows.push([
            sanitize(j.companyName), sanitize(j.jobTitle),
            stat.manualSent, stat.autoSent, totalSent,
            stat.manualTotal, stat.autoTotal, totalReply,
            stat.manualEff, stat.autoEff, totalEff,
            tRate, eRate
          ]);
        });
        break;
      }
      case 'all_media_summary':
      case 'total_media_summary': {
        filename = `media_total_scout_summary_${nowJST}.csv`;
        headers = ['媒体名', '手動送信数', '自動送信数', '総送信数', '手動総返信数', '自動総返信数', '総返信数', '手動有効返信数', '自動有効返信数', '総有効返信数', '参考総返信率(%)', '参考総有効返信率(%)'];
        const manualResults = this.getValidScoutResults();
        const autoResults = this.getValidAutoScoutWeeklyResults();
        const map = new Map();

        manualResults.forEach(r => {
          if (!map.has(r.mediaId)) map.set(r.mediaId, { manualSent: 0, autoSent: 0, manualTotal: 0, autoTotal: 0, manualEff: 0, autoEff: 0 });
          const stat = map.get(r.mediaId);
          stat.manualSent += r.sentCount; stat.manualTotal += r.totalReplyCount; stat.manualEff += r.effectiveReplyCount;
        });

        autoResults.forEach(r => {
          if (!map.has(r.mediaId)) map.set(r.mediaId, { manualSent: 0, autoSent: 0, manualTotal: 0, autoTotal: 0, manualEff: 0, autoEff: 0 });
          const stat = map.get(r.mediaId);
          stat.autoSent += r.sentCount; stat.autoTotal += r.totalReplyCount; stat.autoEff += r.effectiveReplyCount;
        });

        this.getMediaList().forEach(m => {
          const stat = map.get(m.id) || { manualSent: 0, autoSent: 0, manualTotal: 0, autoTotal: 0, manualEff: 0, autoEff: 0 };
          const totalSent = stat.manualSent + stat.autoSent;
          const totalReply = stat.manualTotal + stat.autoTotal;
          const totalEff = stat.manualEff + stat.autoEff;
          const tRate = totalSent > 0 ? ((totalReply / totalSent) * 100).toFixed(1) : '-';
          const eRate = totalSent > 0 ? ((totalEff / totalSent) * 100).toFixed(1) : '-';
          rows.push([
            sanitize(m.name),
            stat.manualSent, stat.autoSent, totalSent,
            stat.manualTotal, stat.autoTotal, totalReply,
            stat.manualEff, stat.autoEff, totalEff,
            tRate, eRate
          ]);
        });
        break;
      }
      case 'company_job_master':
      case 'jobs_list': {
        filename = `jobs_master_${nowJST}.csv`;
        headers = ['求人ID', '企業ID', '企業名', '企業名よみ', '注力ランクID', '注力ランク名称', '求人名', '業種', '職種', 'ステータス', '対象年齢', '役職', '年収帯', 'アーカイブ状態', '作成日時', '更新日時'];
        rows = this.filterAndSortJobs(this.getJobs(), { sortBy: 'company_asc' }).map(j => {
          const rankObj = PRIORITY_RANKS[j.priorityRank] || PRIORITY_RANKS.UNSET;
          return [
            j.jobId,
            j.companyId || '',
            sanitize(j.companyName),
            sanitize(j.companyNameKana),
            j.priorityRank || 'UNSET',
            sanitize(rankObj.fullLabel),
            sanitize(j.jobTitle),
            sanitize(j.industry),
            sanitize(j.position),
            sanitize(j.status),
            sanitize((j.targetAge || []).join('、')),
            sanitize(j.role),
            sanitize((j.salaryRange || []).join('、')),
            j.archived ? 'はい' : 'いいえ',
            formatTime(j.createdAt),
            formatTime(j.updatedAt)
          ];
        });
        break;
      }
      case 'company_master': {
        filename = `company_master_${nowJST}.csv`;
        headers = ['企業ID', '企業名', '企業名よみ', '注力ランク', '注力ランク名称', '作成日時', '更新日時'];
        rows = this.getCompanies().sort((a, b) => this.compareJapanese(this.getCompanySortKey(a), this.getCompanySortKey(b))).map(c => {
          const rankObj = PRIORITY_RANKS[c.priorityRank] || PRIORITY_RANKS.UNSET;
          return [
            c.companyId,
            sanitize(c.companyName),
            sanitize(c.companyNameKana),
            c.priorityRank,
            sanitize(rankObj.fullLabel),
            formatTime(c.createdAt),
            formatTime(c.updatedAt)
          ];
        });
        break;
      }
      case 'user_master': {
        filename = `user_master_${nowJST}.csv`;
        headers = ['担当者ID', '担当者名', '利用状態', '管理者区分', '作成日時', '更新日時'];
        rows = this.getUsers().map(u => [
          u.staffId,
          sanitize(u.name),
          u.status === 'active' ? '利用中' : '利用停止',
          u.adminRole === 'admin' ? '管理者' : '一般メンバー',
          formatTime(u.createdAt),
          formatTime(u.updatedAt)
        ]);
        break;
      }
      case 'knowledge_all_admin':
      case 'knowledge_all': {
        filename = `knowledge_${nowJST}.csv`;
        headers = ['ナレッジID', '企業名', '求人名', '記録日', '記録者名', '種別', 'タイトル', '事実', '原因', '工夫', '結果', '次に試すこと', 'タグ', '作成日時'];
        rows = this.getKnowledgeList().map(k => [
          k.knowledgeId,
          sanitize(jobs.get(k.jobId)?.companyName),
          sanitize(jobs.get(k.jobId)?.jobTitle),
          k.createdAt.slice(0, 10),
          sanitize(users.get(k.staffId) || k.staffId),
          sanitize(k.type),
          sanitize(k.title),
          sanitize(k.facts),
          sanitize(k.causes),
          sanitize(k.efforts),
          sanitize(k.results),
          sanitize(k.nextActions),
          sanitize((k.tags || []).join('、')),
          formatTime(k.createdAt)
        ]);
        break;
      }
      case 'scout_messages_all': {
        filename = `scout_messages_${nowJST}.csv`;
        headers = ['文面ID', '文面タイトル', '対象求人名', 'ステータス', '作成者名', '更新日時'];
        rows = this.getMessages().map(m => [
          m.messageId,
          sanitize(m.title),
          sanitize(jobs.get(m.jobId) ? `${jobs.get(m.jobId).companyName} / ${jobs.get(m.jobId).jobTitle}` : '共通文面'),
          sanitize(m.status),
          sanitize(users.get(m.createdStaffId) || m.createdStaffId),
          formatTime(m.updatedAt)
        ]);
        break;
      }
      case 'change_logs_all': {
        filename = `change_logs_${nowJST}.csv`;
        headers = ['ログID', '日時', '対象区分', '対象ID', '操作区分', '操作者名', '詳細メモ'];
        rows = this.getChangeLogs().map(l => [
          l.logId,
          formatTime(l.createdAt),
          sanitize(l.targetType),
          sanitize(l.targetId),
          sanitize(l.actionType),
          sanitize(users.get(l.staffId) || l.staffId),
          sanitize(l.notes)
        ]);
        break;
      }
      default:
        filename = `data_${nowJST}.csv`;
        headers = ['項目'];
        break;
    }

    const content = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    this.downloadCSVFile(content, filename);
  }

  static downloadCSVFile(content, filename) {
    const csvContent = '\uFEFF' + content;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // =========================================================================
  // JSON バックアップ & 復元
  // =========================================================================
  static exportJSONBackup() {
    const nowJST = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
    const formatDateStr = (d) => {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const hh = String(d.getHours()).padStart(2, '0');
      const mm = String(d.getMinutes()).padStart(2, '0');
      const ss = String(d.getSeconds()).padStart(2, '0');
      return { iso: `${y}-${m}-${day}T${hh}:${mm}:${ss}+09:00`, fileStr: `${y}-${m}-${day}_${hh}${mm}${ss}` };
    };
    const t = formatDateStr(nowJST);

    const users = this.getUsers();
    const companies = this.getCompanies();
    const jobs = this.getJobs();
    const userJobs = this.get(KEYS.USER_JOBS);
    const media = this.getMediaList();
    const scoutResults = this.getScoutResults();
    const autoScoutWeeklyResults = this.getAutoScoutWeeklyResults();
    const inboundResults = this.getInboundResults();
    const knowledge = this.get(KEYS.KNOWLEDGE);
    const scoutMessages = this.get(KEYS.MESSAGES);
    const scoutMessageVersions = this.get(KEYS.MESSAGE_VERSIONS);
    const messageAssignments = this.get(KEYS.MESSAGE_ASSIGNMENTS);
    const notifications = this.get(KEYS.NOTIFICATIONS);
    const changeLogs = this.getChangeLogs();
    const systemSettings = this.get(KEYS.SETTINGS);

    const autoTargetJobIds = this.getAutoScoutTargetJobIds();
    const autoScoutAllowedStaffIds = this.getAutoScoutAllowedStaffIds();

    const backupData = {
      metadata: {
        backupCreatedAt: t.iso,
        appVersion: APP_VERSION,
        dataFormatVersion: DATA_FORMAT_VERSION,
        timezone: 'Asia/Tokyo',
        counts: {
          users: users.length,
          companies: companies.length,
          jobs: jobs.length,
          userJobs: userJobs.length,
          media: media.length,
          scoutResults: scoutResults.length,
          autoScoutWeeklyResults: autoScoutWeeklyResults.length,
          inboundResults: inboundResults.length,
          autoTargetJobs: autoTargetJobIds.length,
          autoScoutPermissions: autoScoutAllowedStaffIds.length,
          knowledge: knowledge.length,
          scoutMessages: scoutMessages.length,
          scoutMessageVersions: scoutMessageVersions.length,
          messageAssignments: messageAssignments.length,
          notifications: notifications.length,
          changeLogs: changeLogs.length,
          systemSettings: Array.isArray(systemSettings) ? systemSettings.length : 1
        }
      },
      users,
      companies,
      jobs,
      userJobs,
      media,
      scoutResults,
      autoScoutWeeklyResults,
      inboundResults,
      autoTargetJobIds,
      autoScoutAllowedStaffIds,
      knowledge,
      scoutMessages,
      scoutMessageVersions,
      messageAssignments,
      notifications,
      changeLogs,
      systemSettings
    };

    const jsonStr = JSON.stringify(backupData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `thanks-scout-backup_${t.fileStr}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return backupData;
  }

  static validateJSONBackup(jsonString) {
    try {
      const data = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString;
      if (!data || typeof data !== 'object') throw new Error('JSONオブジェクト構造が無効です。');
      if (!data.metadata) throw new Error('バックアップメタデータ (metadata) が存在しません。');
      if (data.metadata.dataFormatVersion !== DATA_FORMAT_VERSION) {
        throw new Error(`非対応のデータ形式バージョン (${data.metadata.dataFormatVersion || '不明'}) です。現在対応バージョン: ${DATA_FORMAT_VERSION}`);
      }
      if (!Array.isArray(data.users) || !Array.isArray(data.jobs) || !Array.isArray(data.scoutResults)) {
        throw new Error('必要なデータ配列 (users, jobs, scoutResults) が含まれていません。');
      }
      return { valid: true, data, metadata: data.metadata };
    } catch (err) {
      return { valid: false, error: err.message };
    }
  }

  static restoreFromJSONBackup(data, password, confirmText, operatorStaffId = '') {
    if (password !== ADMIN_PASSWORD) {
      throw new Error('管理者パスワードが一致しません。');
    }
    if (confirmText !== RESTORE_CONFIRM_TEXT) {
      throw new Error(`確認文字列「${RESTORE_CONFIRM_TEXT}」を正確に入力してください。`);
    }

    const validation = this.validateJSONBackup(data);
    if (!validation.valid) {
      throw new Error(`復元中止: ${validation.error}`);
    }

    const d = validation.data;
    if (d.users) this.set(KEYS.USERS, d.users);
    if (d.companies) this.set(KEYS.COMPANIES, d.companies);
    if (d.jobs) this.set(KEYS.JOBS, d.jobs);
    if (d.userJobs) this.set(KEYS.USER_JOBS, d.userJobs);
    if (d.media) this.set(KEYS.MEDIA, d.media);
    if (d.scoutResults) this.set(KEYS.RESULTS, d.scoutResults);
    if (d.autoScoutWeeklyResults) this.set(KEYS.AUTO_RESULTS, d.autoScoutWeeklyResults);
    if (d.inboundResults) this.set(KEYS.INBOUND_RESULTS, d.inboundResults);
    if (Array.isArray(d.autoTargetJobIds)) this.set(KEYS.AUTO_TARGET_JOBS, d.autoTargetJobIds);
    if (Array.isArray(d.autoScoutAllowedStaffIds)) this.set(KEYS.AUTO_SCOUT_PERMISSIONS, d.autoScoutAllowedStaffIds);
    if (d.knowledge) this.set(KEYS.KNOWLEDGE, d.knowledge);
    if (d.scoutMessages) this.set(KEYS.MESSAGES, d.scoutMessages);
    if (d.scoutMessageVersions) this.set(KEYS.MESSAGE_VERSIONS, d.scoutMessageVersions);
    if (d.messageAssignments) this.set(KEYS.MESSAGE_ASSIGNMENTS, d.messageAssignments);
    if (d.notifications) this.set(KEYS.NOTIFICATIONS, d.notifications);
    if (d.changeLogs) this.set(KEYS.CHANGE_LOGS, d.changeLogs);
    if (d.systemSettings) this.set(KEYS.SETTINGS, d.systemSettings);

    this.addChangeLog({
      targetType: 'system_restore',
      targetId: 'json_restore',
      actionType: 'restore',
      staffId: operatorStaffId || 'ADMIN',
      notes: `JSONバックアップからの復元完了 (${d.metadata.backupCreatedAt})`
    });

    return true;
  }

  // =========================================================================
  // 全データリセット
  // =========================================================================
  static resetAllData(password, confirmText, options = {}, operatorStaffId = '') {
    if (password !== ADMIN_PASSWORD) {
      throw new Error('管理者パスワードが一致しません。');
    }
    if (confirmText !== RESTORE_CONFIRM_TEXT && confirmText !== RESET_CONFIRM_TEXT) {
      throw new Error(`確認文字列「${RESET_CONFIRM_TEXT}」を正確に入力してください。`);
    }

    const defaultOptions = {
      keepUsers: true,
      keepMedia: true,
      deleteJobs: true,
      deleteResults: true,
      deleteAutoResults: true,
      deleteKnowledge: true,
      deleteMessages: true,
      deleteNotifications: true
    };
    const opts = { ...defaultOptions, ...options };

    if (!opts.keepUsers) {
      const defaultUsers = [
        { staffId: 'STF-001', name: '尾﨑優理', status: 'active', adminRole: 'admin', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { staffId: 'STF-002', name: '山田太郎', status: 'active', adminRole: 'member', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { staffId: 'STF-003', name: '佐藤花子', status: 'active', adminRole: 'member', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
      ];
      this.set(KEYS.USERS, defaultUsers);
      this.set(KEYS.AUTO_SCOUT_PERMISSIONS, []);
    }
    if (!opts.keepMedia) this.set(KEYS.MEDIA, DEFAULT_MEDIA_LIST);
    if (opts.deleteJobs) {
      this.set(KEYS.COMPANIES, []);
      this.set(KEYS.JOBS, []);
      this.set(KEYS.USER_JOBS, []);
      this.set(KEYS.AUTO_TARGET_JOBS, []);
    }
    if (opts.deleteResults) {
      this.set(KEYS.RESULTS, []);
      this.set(KEYS.INBOUND_RESULTS, []);
    }
    if (opts.deleteAutoResults) this.set(KEYS.AUTO_RESULTS, []);
    if (opts.deleteKnowledge) this.set(KEYS.KNOWLEDGE, []);
    if (opts.deleteMessages) {
      this.set(KEYS.MESSAGES, []);
      this.set(KEYS.MESSAGE_VERSIONS, []);
      this.set(KEYS.MESSAGE_ASSIGNMENTS, []);
    }
    if (opts.deleteNotifications) this.set(KEYS.NOTIFICATIONS, []);

    this.addChangeLog({
      targetType: 'all_reset',
      targetId: 'system_reset',
      actionType: 'reset',
      staffId: operatorStaffId || 'ADMIN',
      notes: `全データリセット実行 (担当者残す:${opts.keepUsers ? 'はい' : 'いいえ'}, 媒体残す:${opts.keepMedia ? 'はい' : 'いいえ'})`
    });
  }
}



/**
 * サンクスパートナーズ スカウト実績・求人管理一元化ツール - 集計・分析エンジン
 */



class AnalyticsService {
  /**
   * JST基準の期間日付範囲を算出
   */
  static getPeriodRange(periodKey, baseDateStr = '') {
    const now = baseDateStr ? new Date(baseDateStr) : new Date();
    const jstNow = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
    
    let startDate = new Date(jstNow);
    let endDate = new Date(jstNow);

    if (periodKey === 'today') {
      // 当日のみ
    } else if (periodKey === 'week') {
      const day = jstNow.getDay();
      const diffToMon = day === 0 ? -6 : 1 - day;
      startDate.setDate(jstNow.getDate() + diffToMon);
      endDate.setDate(startDate.getDate() + 6);
    } else if (periodKey === 'month') {
      startDate = new Date(jstNow.getFullYear(), jstNow.getMonth(), 1);
      endDate = new Date(jstNow.getFullYear(), jstNow.getMonth() + 1, 0);
    } else if (periodKey === '3months') {
      startDate.setMonth(jstNow.getMonth() - 3);
    } else if (periodKey === 'halfYear') {
      startDate.setMonth(jstNow.getMonth() - 6);
    } else if (periodKey === 'year') {
      startDate.setFullYear(jstNow.getFullYear() - 1);
    }

    const formatDate = (d) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    return {
      startStr: formatDate(startDate),
      endStr: formatDate(endDate),
      label: `${startDate.getFullYear()}年${startDate.getMonth() + 1}月${startDate.getDate()}日～${endDate.getFullYear()}年${endDate.getMonth() + 1}月${endDate.getDate()}日`
    };
  }

  /**
   * 基本数値の集計
   */
  static calculateMetrics(resultsList) {
    let sentCount = 0;
    let totalReplyCount = 0;
    let effectiveReplyCount = 0;

    resultsList.forEach(r => {
      if (r.status === 'valid') {
        sentCount += Number(r.sentCount || 0);
        totalReplyCount += Number(r.totalReplyCount || 0);
        effectiveReplyCount += Number(r.effectiveReplyCount || 0);
      }
    });

    const totalReplyRate = sentCount > 0 ? (totalReplyCount / sentCount) * 100 : null;
    const effectiveReplyRate = sentCount > 0 ? (effectiveReplyCount / sentCount) * 100 : null;
    const sentPerEffective = effectiveReplyCount > 0 ? sentCount / effectiveReplyCount : null;

    return {
      sentCount,
      totalReplyCount,
      effectiveReplyCount,
      totalReplyRateFormatted: totalReplyRate !== null ? `${totalReplyRate.toFixed(1)}%` : '－',
      effectiveReplyRateFormatted: effectiveReplyRate !== null ? `${effectiveReplyRate.toFixed(1)}%` : '－',
      sentPerEffectiveFormatted: sentPerEffective !== null ? sentPerEffective.toFixed(1) : '－',
      totalReplyRateRaw: totalReplyRate,
      effectiveReplyRateRaw: effectiveReplyRate
    };
  }

  /**
   * 指定条件によるスカウト実績フィルタリング
   */
  static filterResults({ staffId = '', periodKey = 'week', customStart = '', customEnd = '', jobIds = [], mediaIds = [] } = {}) {
    const allResults = StorageService.getValidScoutResults();
    let range;

    if (customStart && customEnd) {
      range = { startStr: customStart, endStr: customEnd };
    } else {
      range = this.getPeriodRange(periodKey);
    }

    return allResults.filter(r => {
      if (staffId && r.staffId !== staffId) return false;
      if (r.date < range.startStr || r.date > range.endStr) return false;
      if (jobIds.length > 0 && !jobIds.includes(r.jobId)) return false;
      if (mediaIds.length > 0 && !mediaIds.includes(r.mediaId)) return false;
      return true;
    });
  }

  /**
   * 指定条件による自動スカウト実績フィルタリング
   * (日付判定ルール: 今日は空配列、週単位記録のため週開始日基準)
   */
  static filterAutoScoutResults({ periodKey = 'week', customStart = '', customEnd = '', jobIds = [], mediaIds = [] } = {}) {
    if (periodKey === 'today') {
      return [];
    }

    const allAutoResults = StorageService.getValidAutoScoutWeeklyResults();
    let range;

    if (customStart && customEnd) {
      range = { startStr: customStart, endStr: customEnd };
    } else {
      range = this.getPeriodRange(periodKey);
    }

    return allAutoResults.filter(r => {
      if (r.weekStartDate < range.startStr || r.weekStartDate > range.endStr) {
        if (periodKey === 'week' || periodKey === 'month') {
          if (r.weekStartDate < range.startStr || r.weekStartDate > range.endStr) return false;
        } else {
          if (r.weekStartDate < range.startStr || r.weekStartDate > range.endStr) return false;
        }
      }
      if (jobIds.length > 0 && !jobIds.includes(r.jobId)) return false;
      if (mediaIds.length > 0 && !mediaIds.includes(r.mediaId)) return false;
      return true;
    });
  }

  /**
   * 指定条件によるインバウンド（直接エントリー）実績フィルタリング
   */
  static filterInboundResults({ periodKey = 'week', customStart = '', customEnd = '', jobIds = [], routeIds = [] } = {}) {
    const allInboundResults = StorageService.getValidInboundResults();
    let range;

    if (customStart && customEnd) {
      range = { startStr: customStart, endStr: customEnd };
    } else {
      range = this.getPeriodRange(periodKey);
    }

    return allInboundResults.filter(r => {
      if (r.date < range.startStr || r.date > range.endStr) return false;
      if (jobIds.length > 0 && !jobIds.includes(r.jobId)) return false;
      if (routeIds.length > 0 && !routeIds.includes(r.routeId)) return false;
      return true;
    });
  }

  /**
   * インバウンド基本指標計算
   */
  static calculateInboundMetrics(inboundResultsList) {
    let entryCount = 0;
    let effectiveCount = 0;

    inboundResultsList.forEach(r => {
      if (r.status !== 'cancelled') {
        entryCount += Number(r.entryCount || 0);
        effectiveCount += Number(r.effectiveCount || 0);
      }
    });

    const effectiveRate = entryCount > 0 ? (effectiveCount / entryCount) * 100 : null;

    return {
      entryCount,
      effectiveCount,
      effectiveRateFormatted: effectiveRate !== null ? `${effectiveRate.toFixed(1)}%` : '－',
      effectiveRateRaw: effectiveRate
    };
  }

  /**
   * 求人別インバウンド応募集計
   */
  static aggregateInboundByJob(filteredInboundResults) {
    const jobsMap = new Map(StorageService.getJobs().map(j => [j.jobId, j]));
    const map = new Map();

    filteredInboundResults.forEach(r => {
      if (!map.has(r.jobId)) {
        const j = jobsMap.get(r.jobId) || { companyName: '不明企業', jobTitle: '不明求人', priorityRank: 'UNSET' };
        map.set(r.jobId, {
          jobId: r.jobId,
          companyName: j.companyName,
          companyNameKana: j.companyNameKana || '',
          jobTitle: j.jobTitle,
          priorityRank: j.priorityRank,
          status: j.status,
          entryCount: 0,
          effectiveCount: 0,
          routeBreakdown: {}
        });
      }
      const stat = map.get(r.jobId);
      stat.entryCount += Number(r.entryCount || 0);
      stat.effectiveCount += Number(r.effectiveCount || 0);
      if (!stat.routeBreakdown[r.routeId]) {
        stat.routeBreakdown[r.routeId] = { entry: 0, effective: 0 };
      }
      stat.routeBreakdown[r.routeId].entry += Number(r.entryCount || 0);
      stat.routeBreakdown[r.routeId].effective += Number(r.effectiveCount || 0);
    });

    return Array.from(map.values()).map(s => {
      const rate = s.entryCount > 0 ? ((s.effectiveCount / s.entryCount) * 100).toFixed(1) + '%' : '－';
      return { ...s, effectiveRateFormatted: rate };
    }).sort((a, b) => b.entryCount - a.entryCount);
  }

  /**
   * 経路別インバウンド応募集計
   */
  static aggregateInboundByRoute(filteredInboundResults) {
    const routes = [
      { id: 'indeed', name: 'Indeed', order: 1, color: '#003A9B' },
      { id: 'own', name: '自社', order: 2, color: '#1B2A4A' },
      { id: 'bizreach', name: 'ビズリーチ', order: 3, color: '#C5A059' },
      { id: 'middle', name: 'ミドル', order: 4, color: '#2B6CB0' },
      { id: 'ambi', name: 'AMBI', order: 5, color: '#805AD5' },
      { id: 'ix', name: 'IX', order: 6, color: '#DD6B20' },
      { id: 'other', name: 'その他', order: 7, color: '#718096' }
    ];

    const map = new Map(routes.map(r => [r.id, {
      routeId: r.id,
      name: r.name,
      order: r.order,
      color: r.color,
      entryCount: 0,
      effectiveCount: 0
    }]));

    filteredInboundResults.forEach(r => {
      let stat = map.get(r.routeId);
      if (!stat) {
        stat = { routeId: r.routeId, name: r.routeId, order: 99, color: '#666', entryCount: 0, effectiveCount: 0 };
        map.set(r.routeId, stat);
      }
      stat.entryCount += Number(r.entryCount || 0);
      stat.effectiveCount += Number(r.effectiveCount || 0);
    });

    const totalEntryAll = Array.from(map.values()).reduce((acc, r) => acc + r.entryCount, 0);

    return Array.from(map.values())
      .sort((a, b) => a.order - b.order)
      .map(stat => {
        const rate = stat.entryCount > 0 ? ((stat.effectiveCount / stat.entryCount) * 100).toFixed(1) + '%' : '－';
        const share = totalEntryAll > 0 ? ((stat.entryCount / totalEntryAll) * 100).toFixed(1) + '%' : '0%';
        return { ...stat, effectiveRateFormatted: rate, share };
      });
  }

  /**
   * 独立集計ルーチン: チーム手動実績・自動スカウト実績・総スカウト実績
   */
  static calculateTotalScoutMetrics(filteredManualResults, filteredAutoResults) {
    const manualMetrics = this.calculateMetrics(filteredManualResults);
    const autoMetrics = this.calculateMetrics(filteredAutoResults);

    const sentCount = manualMetrics.sentCount + autoMetrics.sentCount;
    const totalReplyCount = manualMetrics.totalReplyCount + autoMetrics.totalReplyCount;
    const effectiveReplyCount = manualMetrics.effectiveReplyCount + autoMetrics.effectiveReplyCount;

    const totalReplyRate = sentCount > 0 ? (totalReplyCount / sentCount) * 100 : null;
    const effectiveReplyRate = sentCount > 0 ? (effectiveReplyCount / sentCount) * 100 : null;
    const sentPerEffective = effectiveReplyCount > 0 ? sentCount / effectiveReplyCount : null;

    const manualSentShare = sentCount > 0 ? ((manualMetrics.sentCount / sentCount) * 100).toFixed(1) : '0.0';
    const autoSentShare = sentCount > 0 ? ((autoMetrics.sentCount / sentCount) * 100).toFixed(1) : '0.0';

    return {
      manual: manualMetrics,
      auto: autoMetrics,
      total: {
        sentCount,
        totalReplyCount,
        effectiveReplyCount,
        totalReplyRateFormatted: totalReplyRate !== null ? `${totalReplyRate.toFixed(1)}%` : '－',
        effectiveReplyRateFormatted: effectiveReplyRate !== null ? `${effectiveReplyRate.toFixed(1)}%` : '－',
        sentPerEffectiveFormatted: sentPerEffective !== null ? sentPerEffective.toFixed(1) : '－',
        manualSentShare: `${manualSentShare}%`,
        autoSentShare: `${autoSentShare}%`
      }
    };
  }

  /**
   * 求人別の統合実績（手動・自動・合算）マトリクス集計
   */
  static aggregateTotalByJob(filteredManualResults, filteredAutoResults) {
    const jobsMap = new Map(StorageService.getJobs().map(j => [j.jobId, j]));
    const map = new Map();

    const getStat = (jobId) => {
      if (!map.has(jobId)) {
        const job = jobsMap.get(jobId) || { companyName: '不明企業', jobTitle: '不明求人', status: '不明', priorityRank: 'UNSET' };
        map.set(jobId, {
          jobId,
          companyName: job.companyName,
          companyNameKana: job.companyNameKana || '',
          jobTitle: job.jobTitle,
          status: job.status,
          priorityRank: job.priorityRank,
          manualSent: 0, autoSent: 0,
          manualTotalReply: 0, autoTotalReply: 0,
          manualEffReply: 0, autoEffReply: 0
        });
      }
      return map.get(jobId);
    };

    filteredManualResults.forEach(r => {
      const s = getStat(r.jobId);
      s.manualSent += Number(r.sentCount || 0);
      s.manualTotalReply += Number(r.totalReplyCount || 0);
      s.manualEffReply += Number(r.effectiveReplyCount || 0);
    });

    filteredAutoResults.forEach(r => {
      const s = getStat(r.jobId);
      s.autoSent += Number(r.sentCount || 0);
      s.autoTotalReply += Number(r.totalReplyCount || 0);
      s.autoEffReply += Number(r.effectiveReplyCount || 0);
    });

    return Array.from(map.values()).map(s => {
      const totalSent = s.manualSent + s.autoSent;
      const totalReply = s.manualTotalReply + s.autoTotalReply;
      const totalEff = s.manualEffReply + s.autoEffReply;
      const tRate = totalSent > 0 ? ((totalReply / totalSent) * 100).toFixed(1) + '%' : '－';
      const eRate = totalSent > 0 ? ((totalEff / totalSent) * 100).toFixed(1) + '%' : '－';
      return {
        ...s,
        totalSent,
        totalReply,
        totalEff,
        totalReplyRateFormatted: tRate,
        effectiveReplyRateFormatted: eRate
      };
    }).sort((a, b) => b.totalSent - a.totalSent);
  }

  /**
   * 媒体別の統合実績（手動・自動・合算）マトリクス集計
   */
  static aggregateTotalByMedia(filteredManualResults, filteredAutoResults) {
    const mediaList = StorageService.getMediaList();
    const map = new Map(mediaList.map(m => [m.id, {
      mediaId: m.id,
      name: m.name,
      color: m.color || '#1A365D',
      displayOrder: m.displayOrder,
      manualSent: 0, autoSent: 0,
      manualTotalReply: 0, autoTotalReply: 0,
      manualEffReply: 0, autoEffReply: 0
    }]));

    filteredManualResults.forEach(r => {
      let s = map.get(r.mediaId);
      if (!s) {
        s = { mediaId: r.mediaId, name: r.mediaId, color: '#666', displayOrder: 99, manualSent: 0, autoSent: 0, manualTotalReply: 0, autoTotalReply: 0, manualEffReply: 0, autoEffReply: 0 };
        map.set(r.mediaId, s);
      }
      s.manualSent += Number(r.sentCount || 0);
      s.manualTotalReply += Number(r.totalReplyCount || 0);
      s.manualEffReply += Number(r.effectiveReplyCount || 0);
    });

    filteredAutoResults.forEach(r => {
      let s = map.get(r.mediaId);
      if (!s) {
        s = { mediaId: r.mediaId, name: r.mediaId, color: '#666', displayOrder: 99, manualSent: 0, autoSent: 0, manualTotalReply: 0, autoTotalReply: 0, manualEffReply: 0, autoEffReply: 0 };
        map.set(r.mediaId, s);
      }
      s.autoSent += Number(r.sentCount || 0);
      s.autoTotalReply += Number(r.totalReplyCount || 0);
      s.autoEffReply += Number(r.effectiveReplyCount || 0);
    });

    return Array.from(map.values())
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map(s => {
        const totalSent = s.manualSent + s.autoSent;
        const totalReply = s.manualTotalReply + s.autoTotalReply;
        const totalEff = s.manualEffReply + s.autoEffReply;
        const tRate = totalSent > 0 ? ((totalReply / totalSent) * 100).toFixed(1) + '%' : '－';
        const eRate = totalSent > 0 ? ((totalEff / totalSent) * 100).toFixed(1) + '%' : '－';
        return {
          ...s,
          totalSent,
          totalReply,
          totalEff,
          totalReplyRateFormatted: tRate,
          effectiveReplyRateFormatted: eRate
        };
      });
  }

  /**
   * 前期間の算出
   */
  static getPreviousPeriodResults(staffId = '', periodKey = 'week') {
    const currentRange = this.getPeriodRange(periodKey);
    const start = new Date(currentRange.startStr);
    const end = new Date(currentRange.endStr);
    const diffDays = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;

    const prevEnd = new Date(start);
    prevEnd.setDate(prevEnd.getDate() - 1);
    const prevStart = new Date(prevEnd);
    prevStart.setDate(prevStart.getDate() - diffDays + 1);

    const formatDate = (d) => d.toISOString().slice(0, 10);

    return this.filterResults({
      staffId,
      customStart: formatDate(prevStart),
      customEnd: formatDate(prevEnd)
    });
  }

  /**
   * 求人別集計
   */
  static aggregateByJob(filteredResults) {
    const jobsMap = new Map(StorageService.getJobs().map(j => [j.jobId, j]));
    const jobStats = new Map();

    filteredResults.forEach(r => {
      if (!jobStats.has(r.jobId)) {
        const job = jobsMap.get(r.jobId) || { companyName: '不明企業', jobTitle: '不明求人' };
        jobStats.set(r.jobId, {
          jobId: r.jobId,
          companyName: job.companyName,
          jobTitle: job.jobTitle,
          status: job.status || '不明',
          sentCount: 0,
          totalReplyCount: 0,
          effectiveReplyCount: 0,
          mediaBreakdown: {}
        });
      }

      const stat = jobStats.get(r.jobId);
      stat.sentCount += Number(r.sentCount || 0);
      stat.totalReplyCount += Number(r.totalReplyCount || 0);
      stat.effectiveReplyCount += Number(r.effectiveReplyCount || 0);

      if (!stat.mediaBreakdown[r.mediaId]) {
        stat.mediaBreakdown[r.mediaId] = { sent: 0, totalReply: 0, effectiveReply: 0 };
      }
      stat.mediaBreakdown[r.mediaId].sent += Number(r.sentCount || 0);
      stat.mediaBreakdown[r.mediaId].totalReply += Number(r.totalReplyCount || 0);
      stat.mediaBreakdown[r.mediaId].effectiveReply += Number(r.effectiveReplyCount || 0);
    });

    return Array.from(jobStats.values()).map(stat => {
      const metrics = this.calculateMetrics(
        Object.entries(stat.mediaBreakdown).map(([mediaId, val]) => ({
          status: 'valid',
          sentCount: val.sent,
          totalReplyCount: val.totalReply,
          effectiveReplyCount: val.effectiveReply
        }))
      );
      return { ...stat, ...metrics };
    }).sort((a, b) => b.sentCount - a.sentCount);
  }

  /**
   * 媒体別集計
   */
  static aggregateByMedia(filteredResults) {
    const mediaList = StorageService.getMediaList();
    const mediaStats = new Map(mediaList.map(m => [m.id, {
      mediaId: m.id,
      name: m.name,
      color: m.color || '#1A365D',
      displayOrder: m.displayOrder,
      sentCount: 0,
      totalReplyCount: 0,
      effectiveReplyCount: 0
    }]));

    filteredResults.forEach(r => {
      let stat = mediaStats.get(r.mediaId);
      if (!stat) {
        stat = { mediaId: r.mediaId, name: r.mediaId, color: '#666', displayOrder: 99, sentCount: 0, totalReplyCount: 0, effectiveReplyCount: 0 };
        mediaStats.set(r.mediaId, stat);
      }
      stat.sentCount += Number(r.sentCount || 0);
      stat.totalReplyCount += Number(r.totalReplyCount || 0);
      stat.effectiveReplyCount += Number(r.effectiveReplyCount || 0);
    });

    const totalSentAllMedia = Array.from(mediaStats.values()).reduce((acc, m) => acc + m.sentCount, 0);

    return Array.from(mediaStats.values())
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map(stat => {
        const metrics = this.calculateMetrics([{
          status: 'valid',
          sentCount: stat.sentCount,
          totalReplyCount: stat.totalReplyCount,
          effectiveReplyCount: stat.effectiveReplyCount
        }]);
        const share = totalSentAllMedia > 0 ? ((stat.sentCount / totalSentAllMedia) * 100).toFixed(1) + '%' : '0%';
        return { ...stat, ...metrics, share };
      });
  }

  /**
   * 曜日別集計 (JST基準)
   */
  static aggregateByDayOfWeek(filteredResults) {
    const dayNames = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];
    const daysStats = dayNames.map((name, index) => ({
      dayIndex: index,
      dayName: name,
      sentCount: 0,
      totalReplyCount: 0,
      effectiveReplyCount: 0
    }));

    filteredResults.forEach(r => {
      const d = new Date(r.date + 'T00:00:00+09:00');
      const dayIdx = d.getDay();
      daysStats[dayIdx].sentCount += Number(r.sentCount || 0);
      daysStats[dayIdx].totalReplyCount += Number(r.totalReplyCount || 0);
      daysStats[dayIdx].effectiveReplyCount += Number(r.effectiveReplyCount || 0);
    });

    const reordered = [...daysStats.slice(1), daysStats[0]];
    const totalSent = reordered.reduce((acc, d) => acc + d.sentCount, 0);

    return reordered.map(d => {
      const share = totalSent > 0 ? ((d.sentCount / totalSent) * 100).toFixed(1) + '%' : '0%';
      const metrics = this.calculateMetrics([{ status: 'valid', ...d }]);
      return { ...d, ...metrics, share };
    });
  }

  /**
   * 属性検索・分析 (カテゴリ内OR / カテゴリ間AND)
   */
  static searchByAttributes(filters) {
    const jobs = StorageService.getJobs();
    const filteredJobs = jobs.filter(job => {
      // 業種 (OR)
      if (filters.industries && filters.industries.length > 0) {
        if (!job.industry || !filters.industries.includes(job.industry)) return false;
      }
      // 職種 (OR)
      if (filters.positions && filters.positions.length > 0) {
        if (!job.position || !filters.positions.includes(job.position)) return false;
      }
      // ステータス (OR)
      if (filters.statuses && filters.statuses.length > 0) {
        if (!job.status || !filters.statuses.includes(job.status)) return false;
      }
      // 対象年齢 (OR - 配列重なり)
      if (filters.targetAges && filters.targetAges.length > 0) {
        const jobAges = Array.isArray(job.targetAge) ? job.targetAge : [];
        if (!jobAges.some(a => filters.targetAges.includes(a))) return false;
      }
      // 役職 (OR)
      if (filters.roles && filters.roles.length > 0) {
        if (!job.role || !filters.roles.includes(job.role)) return false;
      }
      // 年収帯 (OR - 配列重なり)
      if (filters.salaryRanges && filters.salaryRanges.length > 0) {
        const jobSalaries = Array.isArray(job.salaryRange) ? job.salaryRange : [];
        if (!jobSalaries.some(s => filters.salaryRanges.includes(s))) return false;
      }
      return true;
    });

    const targetJobIds = filteredJobs.map(j => j.jobId);
    const results = this.filterResults({
      staffId: filters.staffId || '',
      periodKey: filters.periodKey || 'month',
      jobIds: targetJobIds,
      mediaIds: filters.mediaIds || []
    });

    const metrics = this.calculateMetrics(results);
    const mediaBreakdown = this.aggregateByMedia(results);
    const dayOfWeekBreakdown = this.aggregateByDayOfWeek(results);
    const jobBreakdown = this.aggregateByJob(results);

    return {
      targetJobCount: filteredJobs.length,
      matchedJobs: filteredJobs,
      metrics,
      mediaBreakdown,
      dayOfWeekBreakdown,
      jobBreakdown
    };
  }

  /**
   * 類似求人検索 (属性一致スコア判定)
   */
  static findSimilarJobs(targetJobId) {
    const targetJob = StorageService.getJobById(targetJobId);
    if (!targetJob) return [];

    const allJobs = StorageService.getJobs().filter(j => j.jobId !== targetJobId && !j.archived);

    const scoredJobs = allJobs.map(job => {
      let score = 0;
      const matchedAttrs = [];

      if (job.industry && job.industry === targetJob.industry) {
        score += 3;
        matchedAttrs.push(`業種: ${job.industry}`);
      }
      if (job.position && job.position === targetJob.position) {
        score += 4;
        matchedAttrs.push(`職種: ${job.position}`);
      }
      if (job.role && job.role === targetJob.role) {
        score += 2;
        matchedAttrs.push(`役職: ${job.role}`);
      }

      const targetAges = Array.isArray(targetJob.targetAge) ? targetJob.targetAge : [];
      const jobAges = Array.isArray(job.targetAge) ? job.targetAge : [];
      const commonAges = jobAges.filter(a => targetAges.includes(a));
      if (commonAges.length > 0) {
        score += 2 * commonAges.length;
        matchedAttrs.push(`年齢: ${commonAges.join(', ')}`);
      }

      const targetSalaries = Array.isArray(targetJob.salaryRange) ? targetJob.salaryRange : [];
      const jobSalaries = Array.isArray(job.salaryRange) ? job.salaryRange : [];
      const commonSalaries = jobSalaries.filter(s => targetSalaries.includes(s));
      if (commonSalaries.length > 0) {
        score += 2 * commonSalaries.length;
        matchedAttrs.push(`年収: ${commonSalaries.join(', ')}`);
      }

      const results = this.filterResults({ jobIds: [job.jobId], periodKey: 'year' });
      const metrics = this.calculateMetrics(results);
      const mainMedia = this.aggregateByMedia(results).filter(m => m.sentCount > 0)[0]?.name || '未使用';

      return { job, score, matchedAttrs, metrics, mainMedia };
    });

    return scoredJobs.filter(item => item.score > 0).sort((a, b) => b.score - a.score);
  }

  /**
   * 求人比較分析 (2〜5件)
   */
  static compareJobs(jobIds, periodKey = 'month') {
    return jobIds.map(jobId => {
      const job = StorageService.getJobById(jobId) || { companyName: '不明企業', jobTitle: '不明求人' };
      const results = this.filterResults({ jobIds: [jobId], periodKey });
      const metrics = this.calculateMetrics(results);
      const mediaList = this.aggregateByMedia(results);
      const mainMedia = mediaList.filter(m => m.sentCount > 0)[0]?.name || 'なし';
      const knowledgeCount = StorageService.getKnowledgeList().filter(k => k.jobId === jobId).length;

      return { job, metrics, mainMedia, knowledgeCount };
    });
  }
}


/**
 * サンクスパートナーズ スカウト実績・求人管理一元化ツール - メインコントローラー
 * Version: 3.4.0 (Company Master, Priority Rank, Japanese Locale Sorting, Search & Filter Release)
 */






class AppController {
  constructor() {
    this.currentView = 'daily-entry';
    this.currentStaff = null;
    this.isAdminMode = false;
    this.autoSaveTimer = null;
    this.pendingSaveResults = new Map();
    this.activeDashboardTab = 'overview';
    this.activeAnalysisTab = 'attribute';

    // 求人マスタ検索・絞り込み・ソート状態
    this.jobsMasterSearchKeyword = '';
    this.jobsMasterSortBy = 'company_asc';
    this.jobsMasterFilters = {
      industries: [],
      positions: [],
      statuses: [],
      targetAges: [],
      roles: [],
      salaryRanges: [],
      priorityRanks: []
    };
    this.jobsMasterFilterOpen = false;

    // 個人の実績入力画面 検索・簡易絞り込み・ソート状態
    this.dailyEntrySearchKeyword = '';
    this.dailyEntryFilterType = 'all';
    this.dailyEntrySortBy = 'standard';

    // 自動スカウト週次実績入力画面 状態
    this.autoScoutWeekDateStr = StorageService.getWeekRange(new Date()).weekStartDate;
    this.autoScoutSearchKeyword = '';
    this.autoScoutMediaFilter = '';
    this.autoScoutStatusFilter = '';
    this.autoScoutRankFilter = '';
    this.autoScoutScopeFilter = 'target_only'; // 'target_only' | 'all' | 'entered' | 'unentered'
    this.autoScoutGroupMode = 'company'; // 'company' | 'rank' | 'flat'
    this.autoScoutCollapsedGroups = new Set();

    // 直接エントリー（インバウンド）実績入力画面 状態
    this.inboundDateStr = new Date().toISOString().slice(0, 10);
    this.inboundSearchKeyword = '';
    this.inboundRankFilter = '';
    this.inboundStatusFilter = '';
    this.inboundGroupMode = 'company'; // 'company' | 'rank' | 'flat'
    this.inboundCollapsedGroups = new Set();

    // 実績入力日付 (デフォルト: 日本時間当日 YYYY-MM-DD)
    const jstNow = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
    this.entryDateStr = this.formatDate(jstNow);

    this.init();
  }

  formatDate(d) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  async init() {
    this.bindEvents();

    // 1. クラウド(Firestore)からの最新全データ最優先読み込み (Single Source of Truth)
    try {
      await StorageService.loadFromFirestoreFirst();
    } catch (err) {
      console.error('[Firestore Initial Load Error]', err);
    } finally {
      const loader = document.getElementById('app-loading-screen');
      if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
      }
    }

    // 2. スタッフ状態の確認と表示
    const staffId = StorageService.getCurrentStaffId();
    const user = StorageService.getUserById(staffId);

    if (!user || user.status === 'inactive') {
      this.openStaffSelectionModal(true);
    } else {
      this.currentStaff = user;
      this.updateHeaderStaffDisplay();
      this.renderCurrentView();
    }

    // 3. onSnapshotによるリアルタイム監視接続開始
    StorageService.attachFirestoreRealtimeListener();
  }

  bindEvents() {
    document.querySelectorAll('.nav-item').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const view = el.getAttribute('data-view');
        this.switchView(view);
      });
    });

    document.getElementById('current-staff-display')?.addEventListener('click', () => {
      this.confirmAndSwitchStaff();
    });

    document.getElementById('btn-admin-toggle')?.addEventListener('click', () => {
      if (this.isAdminMode) {
        this.exitAdminMode();
      } else {
        this.openAdminPasswordModal();
      }
    });

    document.getElementById('btn-guide')?.addEventListener('click', () => {
      this.openUsageGuideModal();
    });

    document.getElementById('btn-app-info')?.addEventListener('click', () => {
      this.openAppInfoModal();
    });

    document.getElementById('btn-notifications')?.addEventListener('click', () => {
      this.openNotificationsModal();
    });
  }

  switchView(viewName) {
    if (viewName === 'data-management' && !this.isAdminMode) {
      this.openAdminPasswordModal();
      return;
    }

    this.currentView = viewName;

    document.querySelectorAll('.nav-item').forEach(el => {
      if (el.getAttribute('data-view') === viewName) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    });

    const titleMap = {
      'daily-entry': '本日の実績入力',
      'dashboard': 'ダッシュボード',
      'jobs': '求人マスタ',
      'analysis': '分析',
      'knowledge': '求人振り返り・ナレッジ',
      'scout-messages': 'スカウト文面',
      'auto-scout': '自動スカウト実績',
      'inbound-entry': '直接エントリー実績 (インバウンド)',
      'data-management': 'データ管理 (管理者)'
    };
    const titleEl = document.getElementById('page-title');
    if (titleEl) titleEl.textContent = titleMap[viewName] || '実績入力';

    this.renderCurrentView();
  }

  renderCurrentView() {
    const container = document.getElementById('main-view-container');
    if (!container) return;

    if (this.currentView === 'daily-entry') {
      this.renderDailyEntryView(container);
    } else if (this.currentView === 'dashboard') {
      this.renderDashboardView(container);
    } else if (this.currentView === 'jobs') {
      this.renderJobsView(container);
    } else if (this.currentView === 'analysis') {
      this.renderAnalysisView(container);
    } else if (this.currentView === 'knowledge') {
      this.renderKnowledgeView(container);
    } else if (this.currentView === 'scout-messages') {
      this.renderScoutMessagesView(container);
    } else if (this.currentView === 'auto-scout') {
      this.renderAutoScoutView(container);
    } else if (this.currentView === 'inbound-entry') {
      this.renderInboundView(container);
    } else if (this.currentView === 'data-management') {
      this.renderDataManagementView(container);
    }

    if (window.lucide) window.lucide.createIcons();
  }

  updateHeaderStaffDisplay() {
    const el = document.getElementById('current-staff-name');
    if (el) el.textContent = this.currentStaff ? this.currentStaff.name : '未選択';
  }

  confirmAndSwitchStaff() {
    if (this.pendingSaveResults.size > 0) {
      const saved = this.flushPendingSaves();
      if (!saved) {
        alert('保存に失敗している入力項目があります。確認してから担当者を切り替えてください。');
        return;
      }
    }

    if (confirm('担当者を切り替えますか？')) {
      this.openStaffSelectionModal(false);
    }
  }

  showSaveStatus(type, msg = '') {
    const el = document.getElementById('save-status-container');
    if (!el) return;
    el.style.display = 'inline-flex';

    if (type === 'saving') {
      el.className = 'save-status-indicator save-status-saving';
      el.innerHTML = '<i data-lucide="loader" style="width:12px;height:12px;" class="spin"></i> 保存中…';
    } else if (type === 'saved') {
      el.className = 'save-status-indicator save-status-saved';
      const nowTime = new Date().toLocaleTimeString('ja-JP', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit' });
      el.innerHTML = `<i data-lucide="check" style="width:12px;height:12px;"></i> 保存済み ${nowTime}`;
    } else if (type === 'error') {
      el.className = 'save-status-indicator save-status-error';
      el.innerHTML = `<i data-lucide="alert-triangle" style="width:12px;height:12px;"></i> ${msg || '保存に失敗しました'} <button id="btn-retry-save" class="btn-mini">再試行</button>`;
      document.getElementById('btn-retry-save')?.addEventListener('click', () => this.flushPendingSaves());
    }
    if (window.lucide) window.lucide.createIcons();
  }

  scheduleAutoSave(record) {
    this.pendingSaveResults.set(record.resultId, record);
    this.showSaveStatus('saving');

    if (this.autoSaveTimer) clearTimeout(this.autoSaveTimer);
    this.autoSaveTimer = setTimeout(() => {
      this.flushPendingSaves();
    }, 800);
  }

  flushPendingSaves() {
    if (this.pendingSaveResults.size === 0) return true;
    try {
      this.pendingSaveResults.forEach(record => {
        StorageService.saveScoutResult(record, this.currentStaff ? this.currentStaff.staffId : '');
      });
      this.pendingSaveResults.clear();
      this.showSaveStatus('saved');
      return true;
    } catch (err) {
      console.error('Auto save error:', err);
      this.showSaveStatus('error', err.message);
      return false;
    }
  }

  /**
   * 注力ランクバッジのレンダリング（通常表示 / 管理者編集可）
   */
  renderPriorityRankBadge(priorityRank, isEditable = false, companyId = '') {
    const rankObj = PRIORITY_RANKS[priorityRank] || PRIORITY_RANKS.UNSET;
    const bg = rankObj.color;
    const textClr = rankObj.textColor || '#FFFFFF';

    if (!isEditable) {
      return `<span class="badge" style="background-color:${bg}; color:${textClr}; font-size:11px; font-weight:700; border:1px solid rgba(0,0,0,0.08); display:inline-flex; align-items:center; gap:4px; padding:3px 8px;">
        ${this.escapeHtml(rankObj.fullLabel)}
      </span>`;
    }

    return `
      <div class="company-rank-editor" style="display:inline-flex; align-items:center; gap:6px;">
        <select class="form-select select-company-rank" data-company-id="${companyId}" style="font-size:12px; padding:2px 6px; height:28px; width:130px; background-color:${bg}; color:${textClr}; font-weight:700; border-radius:4px; cursor:pointer;">
          ${PRIORITY_RANK_LIST.map(r => {
            const item = PRIORITY_RANKS[r];
            return `<option value="${r}" ${r === priorityRank ? 'selected' : ''} style="background-color:#FFF; color:#333;">${item.fullLabel}</option>`;
          }).join('')}
        </select>
        <span class="rank-save-status" data-company-id="${companyId}" style="font-size:11px; color:var(--text-secondary);"></span>
      </div>
    `;
  }

  // =========================================================================
  // 1. 本日の実績入力画面
  // =========================================================================
  renderDailyEntryView(container) {
    if (!this.currentStaff) return;

    const userJobs = StorageService.getUserJobs(this.currentStaff.staffId).filter(uj => !uj.hidden);
    const allJobsMap = new Map(StorageService.getJobs().map(j => [j.jobId, j]));
    const mediaList = StorageService.getActiveMediaList();
    const existingResultsMap = new Map(StorageService.getValidScoutResults()
      .filter(r => r.staffId === this.currentStaff.staffId && r.date === this.entryDateStr)
      .map(r => [`${r.jobId}_${r.mediaId}`, r]));

    const userJobItems = [];
    const todayResultsMap = new Map();

    userJobs.forEach(uj => {
      const job = allJobsMap.get(uj.jobId);
      if (job && !job.archived) {
        userJobItems.push({ uj, job });

        // 当日送信・返信数の計算
        let sent = 0, totalReply = 0, effectiveReply = 0;
        mediaList.forEach(m => {
          const rec = existingResultsMap.get(`${job.jobId}_${m.id}`);
          if (rec) {
            sent += Number(rec.sentCount || 0);
            totalReply += Number(rec.totalReplyCount || 0);
            effectiveReply += Number(rec.effectiveReplyCount || 0);
          }
        });
        todayResultsMap.set(job.jobId, { sent, totalReply, effectiveReply });
      }
    });

    // 検索・簡易絞り込み・ソートの適用
    const filteredSortedItems = StorageService.sortUserJobsForEntry(userJobItems, {
      searchKeyword: this.dailyEntrySearchKeyword,
      filterType: this.dailyEntryFilterType,
      sortBy: this.dailyEntrySortBy,
      todayResultsMap
    });

    const activeUserJobs = filteredSortedItems.filter(({ job }) => job.status !== '一時停止' && job.status !== '募集終了');
    const stoppedUserJobs = filteredSortedItems.filter(({ job }) => job.status === '一時停止' || job.status === '募集終了');

    const jstToday = this.formatDate(new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo' })));

    container.innerHTML = `
      <div class="card" style="margin-bottom: 16px; padding: 16px 24px;">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <button id="btn-prev-day" class="btn btn-secondary btn-sm"><i data-lucide="chevron-left"></i> 前日</button>
            <input type="date" id="entry-date-picker" class="form-control" style="width: 150px; font-weight: 600;" value="${this.entryDateStr}" max="${jstToday}">
            <button id="btn-next-day" class="btn btn-secondary btn-sm" ${this.entryDateStr >= jstToday ? 'disabled' : ''}>翌日 <i data-lucide="chevron-right"></i></button>
            <button id="btn-today" class="btn btn-gold btn-sm">今日へ戻る</button>
          </div>

          <div style="display: flex; align-items: center; gap: 10px;">
            <button id="btn-manage-myjobs" class="btn btn-secondary btn-sm"><i data-lucide="plus-circle"></i> 担当求人を追加・整理</button>
          </div>
        </div>
      </div>

      <div class="card" style="margin-bottom: 16px; padding: 14px 20px;">
        <div style="display:flex; flex-direction:column; gap:12px;">
          <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px;">
            <div style="display:flex; align-items:center; gap:10px; flex:1; min-width:240px;">
              <div style="position:relative; width:100%; max-width:320px;">
                <input type="text" id="daily-entry-search-input" class="form-control" placeholder="担当求人を検索 (企業名・求人名)" value="${this.escapeHtml(this.dailyEntrySearchKeyword)}" style="padding-left:32px;">
                <i data-lucide="search" style="position:absolute; left:10px; top:50%; transform:translateY(-50%); width:14px; height:14px; color:var(--text-muted);"></i>
              </div>
              ${this.dailyEntrySearchKeyword ? `
                <button id="btn-clear-entry-search" class="btn btn-secondary btn-sm">検索解除</button>
              ` : ''}
            </div>

            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:12px; font-weight:700; color:var(--text-secondary);">並び替え:</span>
              <select id="daily-entry-sort-select" class="form-select" style="width:210px; font-size:12px;">
                <option value="standard" ${this.dailyEntrySortBy === 'standard' ? 'selected' : ''}>標準 (固定優先 企業名順)</option>
                <option value="company_asc" ${this.dailyEntrySortBy === 'company_asc' ? 'selected' : ''}>企業名順：昇順</option>
                <option value="company_desc" ${this.dailyEntrySortBy === 'company_desc' ? 'selected' : ''}>企業名順：降順</option>
                <option value="job_title_asc" ${this.dailyEntrySortBy === 'job_title_asc' ? 'selected' : ''}>求人名順：昇順</option>
                <option value="job_title_desc" ${this.dailyEntrySortBy === 'job_title_desc' ? 'selected' : ''}>求人名順：降順</option>
                <option value="rank_desc" ${this.dailyEntrySortBy === 'rank_desc' ? 'selected' : ''}>注力ランク順：高い順</option>
                <option value="sent_desc" ${this.dailyEntrySortBy === 'sent_desc' ? 'selected' : ''}>本日の送信数が多い順</option>
                <option value="total_reply_desc" ${this.dailyEntrySortBy === 'total_reply_desc' ? 'selected' : ''}>本日の総返信数が多い順</option>
                <option value="effective_reply_desc" ${this.dailyEntrySortBy === 'effective_reply_desc' ? 'selected' : ''}>本日の有効返信数が多い順</option>
              </select>
            </div>
          </div>

          <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap; font-size:12px;">
            <span style="font-weight:700; color:var(--text-secondary); margin-right:4px;">絞り込み:</span>
            <button class="btn btn-sm btn-filter-tab ${this.dailyEntryFilterType === 'all' ? 'btn-gold' : 'btn-secondary'}" data-filter-type="all">すべて</button>
            <button class="btn btn-sm btn-filter-tab ${this.dailyEntryFilterType === 'pinned' ? 'btn-gold' : 'btn-secondary'}" data-filter-type="pinned"><i data-lucide="pin" style="width:12px;height:12px;"></i> 固定求人のみ</button>
            <button class="btn btn-sm btn-filter-tab ${this.dailyEntryFilterType === 'active' ? 'btn-gold' : 'btn-secondary'}" data-filter-type="active">スカウト実施中</button>
            <button class="btn btn-sm btn-filter-tab ${this.dailyEntryFilterType === 'prep' ? 'btn-gold' : 'btn-secondary'}" data-filter-type="prep">準備中</button>
            <button class="btn btn-sm btn-filter-tab ${this.dailyEntryFilterType === 'stopped' ? 'btn-gold' : 'btn-secondary'}" data-filter-type="stopped">返信のみ入力可能</button>
            <button class="btn btn-sm btn-filter-tab ${this.dailyEntryFilterType === 'rank_SS' ? 'btn-gold' : 'btn-secondary'}" data-filter-type="rank_SS">SS最重点</button>
            <button class="btn btn-sm btn-filter-tab ${this.dailyEntryFilterType === 'rank_S' ? 'btn-gold' : 'btn-secondary'}" data-filter-type="rank_S">S重点</button>
            <button class="btn btn-sm btn-filter-tab ${this.dailyEntryFilterType === 'entered_media' ? 'btn-gold' : 'btn-secondary'}" data-filter-type="entered_media">本日の実績あり</button>
          </div>
        </div>
      </div>

      <div id="matrix-error-alert" style="display: none; margin-bottom: 16px;" class="notice-box" style="background-color:#FFF5F5; border-color:#FEB2B2; color:#C53030;"></div>

      <div class="card">
        <div class="card-header-flex">
          <h3 class="card-title"><i data-lucide="table" style="color:var(--color-gold-accent);"></i> スカウト実績入力マトリクス (${this.entryDateStr})</h3>
          <span style="font-size:12px; color:var(--text-secondary);">※セル内で送信・総返信・有効返信を直接入力または＋/－ボタン操作</span>
        </div>

        <div class="matrix-table-container">
          <table class="matrix-table">
            <thead>
              <tr>
                <th style="min-width: 260px; text-align: left; position: sticky; left: 0; z-index: 5;">企業名 / 求人名</th>
                <th style="width: 80px;">ステータス</th>
                ${mediaList.map(m => `<th style="min-width: 140px; border-top: 3px solid ${m.color || '#1A365D'};">${m.name}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${activeUserJobs.length === 0 ? `
                <tr>
                  <td colspan="${mediaList.length + 2}" style="padding: 32px; text-align: center; color: var(--text-muted); font-weight: 600;">
                    ${this.dailyEntrySearchKeyword || this.dailyEntryFilterType !== 'all' ? '条件に一致する担当求人がありません' : '担当求人が登録されていません。「担当求人を追加・整理」ボタンから追加してください。'}
                  </td>
                </tr>
              ` : activeUserJobs.map(({ uj, job }) => this.renderMatrixRow(uj, job, mediaList, existingResultsMap, false)).join('')}
            </tbody>
          </table>
        </div>

        ${stoppedUserJobs.length > 0 ? `
          <div class="stopped-jobs-section">
            <div class="stopped-jobs-header" id="toggle-stopped-jobs">
              <i data-lucide="chevron-down"></i> 返信のみ入力可能な求人 (一時停止・募集終了: ${stoppedUserJobs.length}件)
            </div>
            <div id="stopped-jobs-container" class="matrix-table-container">
              <table class="matrix-table">
                <thead>
                  <tr>
                    <th style="min-width: 260px; text-align: left;">企業名 / 求人名</th>
                    <th style="width: 80px;">ステータス</th>
                    ${mediaList.map(m => `<th>${m.name}</th>`).join('')}
                  </tr>
                </thead>
                <tbody>
                  ${stoppedUserJobs.map(({ uj, job }) => this.renderMatrixRow(uj, job, mediaList, existingResultsMap, true)).join('')}
                </tbody>
              </table>
            </div>
          </div>
        ` : ''}
      </div>
    `;

    this.bindMatrixEvents(container, mediaList);
  }

  renderMatrixRow(uj, job, mediaList, existingResultsMap, isStopped) {
    const isPinned = uj.pinned;
    const rankBadgeHtml = this.renderPriorityRankBadge(job.priorityRank, false);

    return `
      <tr data-job-id="${job.jobId}">
        <td style="text-align: left; position: sticky; left: 0; background-color: #FFFFFF; z-index: 4;">
          <div style="display: flex; align-items: center; justify-content: space-between; gap: 6px;">
            <div>
              <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                <span style="font-weight: 700; color: var(--color-navy-main); font-size: 13px;">${this.escapeHtml(job.companyName)}</span>
                ${rankBadgeHtml}
              </div>
              <div style="font-size: 11.5px; color: var(--text-secondary); margin-top:2px;">${this.escapeHtml(job.jobTitle)}</div>
            </div>
            <div style="display: flex; gap: 2px;">
              <button class="btn-mini btn-pin-job" data-staff-job-id="${uj.staffJobId}" title="${isPinned ? '固定解除' : '上部へ固定'}">
                <i data-lucide="pin" style="width:12px;height:12px; ${isPinned ? 'color:var(--color-gold-accent);fill:var(--color-gold-accent);' : 'color:#CBD5E0;'}"></i>
              </button>
              <button class="btn-mini btn-hide-job" data-staff-job-id="${uj.staffJobId}" title="非表示にする">
                <i data-lucide="eye-off" style="width:12px;height:12px; color:#A0AEC0;"></i>
              </button>
            </div>
          </div>
        </td>
        <td>
          <span class="badge ${job.status === 'スカウト実施中' ? 'badge-success' : job.status === '準備中' ? 'badge-gold' : 'badge-gray'}">${job.status}</span>
        </td>
        ${mediaList.map(m => {
          const recKey = `${job.jobId}_${m.id}`;
          const rec = existingResultsMap.get(recKey) || { sentCount: 0, totalReplyCount: 0, effectiveReplyCount: 0 };
          return `
            <td>
              <div class="media-subcell-container" data-job-id="${job.jobId}" data-media-id="${m.id}">
                <div class="subcell-row">
                  <span class="subcell-label">送信</span>
                  <input type="number" min="0" class="subcell-input input-sent" value="${rec.sentCount}" ${isStopped ? 'disabled title="一時停止・募集終了のため送信入力不可"' : ''}>
                  ${!isStopped ? `
                    <div class="subcell-btns">
                      <button class="btn-mini btn-step-sent" data-step="1">+1</button>
                      <button class="btn-mini btn-step-sent" data-step="5">+5</button>
                      <button class="btn-mini btn-step-sent" data-step="10">+10</button>
                      <button class="btn-mini btn-step-sent" data-step="-1">-1</button>
                    </div>
                  ` : ''}
                </div>
                <div class="subcell-row">
                  <span class="subcell-label">総返信</span>
                  <input type="number" min="0" class="subcell-input input-total-reply" value="${rec.totalReplyCount}">
                  <div class="subcell-btns">
                    <button class="btn-mini btn-add-total-reply">+1</button>
                  </div>
                </div>
                <div class="subcell-row">
                  <span class="subcell-label" style="color:var(--color-navy-main); font-weight:700;">有効返信</span>
                  <input type="number" min="0" class="subcell-input input-effective-reply" value="${rec.effectiveReplyCount}">
                  <div class="subcell-btns">
                    <button class="btn-mini btn-add-effective-reply" style="background:var(--color-gold-light); border-color:var(--color-gold-accent);">+1</button>
                  </div>
                </div>
              </div>
            </td>
          `;
        }).join('')}
      </tr>
    `;
  }

  bindMatrixEvents(container, mediaList) {
    const picker = container.querySelector('#entry-date-picker');
    picker?.addEventListener('change', (e) => {
      this.entryDateStr = e.target.value;
      this.renderCurrentView();
    });

    container.querySelector('#btn-prev-day')?.addEventListener('click', () => {
      const d = new Date(this.entryDateStr);
      d.setDate(d.getDate() - 1);
      this.entryDateStr = this.formatDate(d);
      this.renderCurrentView();
    });

    container.querySelector('#btn-next-day')?.addEventListener('click', () => {
      const d = new Date(this.entryDateStr);
      d.setDate(d.getDate() + 1);
      this.entryDateStr = this.formatDate(d);
      this.renderCurrentView();
    });

    container.querySelector('#btn-today')?.addEventListener('click', () => {
      this.entryDateStr = this.formatDate(new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Tokyo' })));
      this.renderCurrentView();
    });

    container.querySelector('#btn-manage-myjobs')?.addEventListener('click', () => {
      this.openManageMyJobsModal();
    });

    // 検索・絞り込み・ソートイベント
    const searchInp = container.querySelector('#daily-entry-search-input');
    searchInp?.addEventListener('input', (e) => {
      this.dailyEntrySearchKeyword = e.target.value;
      this.renderCurrentView();
    });

    container.querySelector('#btn-clear-entry-search')?.addEventListener('click', () => {
      this.dailyEntrySearchKeyword = '';
      this.renderCurrentView();
    });

    container.querySelector('#daily-entry-sort-select')?.addEventListener('change', (e) => {
      this.dailyEntrySortBy = e.target.value;
      this.renderCurrentView();
    });

    container.querySelectorAll('.btn-filter-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        this.dailyEntryFilterType = btn.getAttribute('data-filter-type');
        this.renderCurrentView();
      });
    });

    container.querySelectorAll('.btn-pin-job').forEach(btn => {
      btn.addEventListener('click', () => {
        const staffJobId = btn.getAttribute('data-staff-job-id');
        const list = StorageService.getUserJobs(this.currentStaff.staffId);
        const uj = list.find(item => item.staffJobId === staffJobId);
        if (uj) {
          StorageService.updateUserJob(staffJobId, { pinned: !uj.pinned });
          this.renderCurrentView();
        }
      });
    });

    container.querySelectorAll('.btn-hide-job').forEach(btn => {
      btn.addEventListener('click', () => {
        const staffJobId = btn.getAttribute('data-staff-job-id');
        if (confirm('この求人を実績入力画面で非表示にしますか？')) {
          StorageService.updateUserJob(staffJobId, { hidden: true });
          this.renderCurrentView();
        }
      });
    });

    container.querySelectorAll('.media-subcell-container').forEach(cell => {
      const jobId = cell.getAttribute('data-job-id');
      const mediaId = cell.getAttribute('data-media-id');

      const inputSent = cell.querySelector('.input-sent');
      const inputTotal = cell.querySelector('.input-total-reply');
      const inputEffective = cell.querySelector('.input-effective-reply');

      const handleUpdate = () => {
        const sent = Math.max(0, parseInt(inputSent ? inputSent.value : '0', 10) || 0);
        const total = Math.max(0, parseInt(inputTotal.value, 10) || 0);
        const effective = Math.max(0, parseInt(inputEffective.value, 10) || 0);

        const errorEl = container.querySelector('#matrix-error-alert');

        if (effective > total) {
          if (errorEl) {
            errorEl.style.display = 'flex';
            errorEl.innerHTML = `<i data-lucide="alert-circle"></i> 有効返信数(${effective})は総返信数(${total})以下である必要があります。`;
            if (window.lucide) window.lucide.createIcons();
          }
          return;
        } else {
          if (errorEl) errorEl.style.display = 'none';
        }

        const resultRecord = {
          resultId: `${this.currentStaff.staffId}_${jobId}_${this.entryDateStr}_${mediaId}`,
          staffId: this.currentStaff.staffId,
          jobId,
          date: this.entryDateStr,
          mediaId,
          sentCount: sent,
          totalReplyCount: total,
          effectiveReplyCount: effective
        };

        this.scheduleAutoSave(resultRecord);
      };

      [inputSent, inputTotal, inputEffective].forEach(inp => {
        inp?.addEventListener('input', handleUpdate);
        inp?.addEventListener('blur', handleUpdate);
      });

      cell.querySelectorAll('.btn-step-sent').forEach(btn => {
        btn.addEventListener('click', () => {
          const step = parseInt(btn.getAttribute('data-step'), 10);
          const curr = Math.max(0, parseInt(inputSent.value, 10) || 0);
          inputSent.value = Math.max(0, curr + step);
          handleUpdate();
        });
      });

      cell.querySelector('.btn-add-total-reply')?.addEventListener('click', () => {
        const curr = Math.max(0, parseInt(inputTotal.value, 10) || 0);
        inputTotal.value = curr + 1;
        handleUpdate();
      });

      cell.querySelector('.btn-add-effective-reply')?.addEventListener('click', () => {
        const currTotal = Math.max(0, parseInt(inputTotal.value, 10) || 0);
        const currEff = Math.max(0, parseInt(inputEffective.value, 10) || 0);
        inputTotal.value = currTotal + 1;
        inputEffective.value = currEff + 1;
        handleUpdate();
      });
    });
  }

  // =========================================================================
  // 2. ダッシュボード画面 (手動・自動・総スカウトの明確区別 & 積み上げグラフ)
  // =========================================================================
  renderDashboardView(container) {
    const scopeStaffId = this.dashboardScopeStaffId || this.currentStaff.staffId;
    const periodKey = this.dashboardPeriodKey || 'week';

    const range = AnalyticsService.getPeriodRange(periodKey);

    // フィルタリング
    let manualResults = [];
    if (scopeStaffId !== 'AUTO_SCOUT' && scopeStaffId !== 'INBOUND' && scopeStaffId !== 'AUTO_PLUS_INBOUND') {
      const isTeam = scopeStaffId === 'TEAM_MANUAL' || scopeStaffId === 'TEAM_PLUS_AUTO' || scopeStaffId === 'TOTAL_ALL';
      manualResults = AnalyticsService.filterResults({
        staffId: isTeam ? '' : scopeStaffId,
        periodKey
      });
    }

    let autoResults = [];
    if (scopeStaffId === 'AUTO_SCOUT' || scopeStaffId === 'TEAM_PLUS_AUTO' || scopeStaffId === 'TOTAL_ALL' || scopeStaffId === 'AUTO_PLUS_INBOUND') {
      autoResults = AnalyticsService.filterAutoScoutResults({ periodKey });
    }

    let inboundResults = [];
    if (scopeStaffId === 'INBOUND' || scopeStaffId === 'TOTAL_ALL' || scopeStaffId === 'AUTO_PLUS_INBOUND') {
      inboundResults = AnalyticsService.filterInboundResults({ periodKey });
    }

    const manualMetrics = AnalyticsService.calculateMetrics(manualResults);
    const autoMetrics = AnalyticsService.calculateMetrics(autoResults);
    const inboundMetrics = AnalyticsService.calculateInboundMetrics(inboundResults);

    let displaySent = 0;
    let displayTotalReply = 0;
    let displayEffectiveReply = 0;
    let displayTRate = '－';
    let displayERate = '－';

    let labelSent = '送信数';

    if (scopeStaffId === 'INBOUND') {
      labelSent = 'エントリー数';
      displaySent = inboundMetrics.entryCount;
      displayTotalReply = inboundMetrics.effectiveCount;
      displayEffectiveReply = inboundMetrics.effectiveCount;
      displayTRate = inboundMetrics.effectiveRateFormatted;
      displayERate = inboundMetrics.effectiveRateFormatted;
    } else if (scopeStaffId === 'AUTO_SCOUT') {
      labelSent = '自動スカウト送信数';
      displaySent = autoMetrics.sentCount;
      displayTotalReply = autoMetrics.totalReplyCount;
      displayEffectiveReply = autoMetrics.effectiveReplyCount;
      displayTRate = autoMetrics.totalReplyRateFormatted;
      displayERate = autoMetrics.effectiveReplyRateFormatted;
    } else if (scopeStaffId === 'TEAM_PLUS_AUTO') {
      labelSent = 'チーム+自動スカウト送信';
      displaySent = manualMetrics.sentCount + autoMetrics.sentCount;
      displayTotalReply = manualMetrics.totalReplyCount + autoMetrics.totalReplyCount;
      displayEffectiveReply = manualMetrics.effectiveReplyCount + autoMetrics.effectiveReplyCount;
      displayTRate = displaySent > 0 ? `${((displayTotalReply / displaySent) * 100).toFixed(1)}%` : '－';
      displayERate = displaySent > 0 ? `${((displayEffectiveReply / displaySent) * 100).toFixed(1)}%` : '－';
    } else if (scopeStaffId === 'AUTO_PLUS_INBOUND') {
      labelSent = '自動+インバウンド合計';
      displaySent = autoMetrics.sentCount + inboundMetrics.entryCount;
      displayTotalReply = autoMetrics.totalReplyCount + inboundMetrics.effectiveCount;
      displayEffectiveReply = autoMetrics.effectiveReplyCount + inboundMetrics.effectiveCount;
      displayTRate = displaySent > 0 ? `${((displayTotalReply / displaySent) * 100).toFixed(1)}%` : '－';
      displayERate = displaySent > 0 ? `${((displayEffectiveReply / displaySent) * 100).toFixed(1)}%` : '－';
    } else if (scopeStaffId === 'TOTAL_ALL') {
      labelSent = '全体総アプローチ数';
      displaySent = manualMetrics.sentCount + autoMetrics.sentCount + inboundMetrics.entryCount;
      displayTotalReply = manualMetrics.totalReplyCount + autoMetrics.totalReplyCount + inboundMetrics.effectiveCount;
      displayEffectiveReply = manualMetrics.effectiveReplyCount + autoMetrics.effectiveReplyCount + inboundMetrics.effectiveCount;
      displayTRate = displaySent > 0 ? `${((displayTotalReply / displaySent) * 100).toFixed(1)}%` : '－';
      displayERate = displaySent > 0 ? `${((displayEffectiveReply / displaySent) * 100).toFixed(1)}%` : '－';
    } else {
      labelSent = '手動スカウト送信数';
      displaySent = manualMetrics.sentCount;
      displayTotalReply = manualMetrics.totalReplyCount;
      displayEffectiveReply = manualMetrics.effectiveReplyCount;
      displayTRate = manualMetrics.totalReplyRateFormatted;
      displayERate = manualMetrics.effectiveReplyRateFormatted;
    }

    container.innerHTML = `
      <div class="card" style="margin-bottom: 16px; padding: 16px 24px;">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size:12px; font-weight:700; color:var(--text-secondary);">表示対象:</span>
            <select id="dash-scope-select" class="form-select" style="width: 270px; font-weight: 600;">
              <option value="${this.currentStaff.staffId}" ${scopeStaffId === this.currentStaff.staffId ? 'selected' : ''}>自分の実績 (${this.currentStaff.name})</option>
              <option value="TEAM_MANUAL" ${scopeStaffId === 'TEAM_MANUAL' ? 'selected' : ''}>チームの実績</option>
              <option value="TEAM_PLUS_AUTO" ${scopeStaffId === 'TEAM_PLUS_AUTO' ? 'selected' : ''}>チーム+自動スカウト</option>
              <option value="AUTO_SCOUT" ${scopeStaffId === 'AUTO_SCOUT' ? 'selected' : ''}>自動スカウト</option>
              <option value="INBOUND" ${scopeStaffId === 'INBOUND' ? 'selected' : ''}>インバン</option>
              <option value="TOTAL_ALL" ${scopeStaffId === 'TOTAL_ALL' ? 'selected' : ''}>チーム+自動スカウト+インバン</option>
              <option value="AUTO_PLUS_INBOUND" ${scopeStaffId === 'AUTO_PLUS_INBOUND' ? 'selected' : ''}>自動スカウト+インバン</option>
              ${this.isAdminMode ? StorageService.getActiveUsers().map(u => `
                <option value="${u.staffId}" ${scopeStaffId === u.staffId ? 'selected' : ''}>【個別】${u.name}</option>
              `).join('') : ''}
            </select>
          </div>

          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size:12px; font-weight:700; color:var(--text-secondary);">期間:</span>
            <select id="dash-period-select" class="form-select" style="width: 140px;">
              <option value="today" ${periodKey === 'today' ? 'selected' : ''}>今日</option>
              <option value="week" ${periodKey === 'week' ? 'selected' : ''}>今週</option>
              <option value="month" ${periodKey === 'month' ? 'selected' : ''}>今月</option>
              <option value="3months" ${periodKey === '3months' ? 'selected' : ''}>3か月</option>
              <option value="halfYear" ${periodKey === 'halfYear' ? 'selected' : ''}>半年</option>
              <option value="year" ${periodKey === 'year' ? 'selected' : ''}>1年</option>
            </select>
          </div>
        </div>
        
        <div style="display:flex; align-items:center; justify-content:space-between; margin-top: 10px; flex-wrap:wrap; gap:8px;">
          <div style="font-size: 12px; color: var(--color-gold-hover); font-weight: 600;">
            集計対象期間: ${range.label}
          </div>
          ${(periodKey === 'today' && (scopeStaffId === 'AUTO_SCOUT' || scopeStaffId === 'TEAM_PLUS_AUTO' || scopeStaffId === 'TOTAL_ALL' || scopeStaffId === 'AUTO_PLUS_INBOUND')) ? `
            <div style="font-size:11.5px; color:#C53030; background:#FFF5F5; border:1px solid #FEB2B2; padding:3px 8px; border-radius:4px;">
              <i data-lucide="info" style="width:12px;height:12px;"></i> 自動スカウトは週次記録のため、今日の集計には含まれません。
            </div>
          ` : ''}
        </div>
      </div>

      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-label">${labelSent}</div>
          <div class="kpi-value">${displaySent.toLocaleString()}<span style="font-size:12px; font-weight:normal;"> 件</span></div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">総返信数</div>
          <div class="kpi-value">${displayTotalReply.toLocaleString()}<span style="font-size:12px; font-weight:normal;"> 件</span></div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">有効返信数</div>
          <div class="kpi-value" style="color:var(--color-gold-accent);">${displayEffectiveReply.toLocaleString()}<span style="font-size:12px; font-weight:normal;"> 件</span></div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">参考総返信率</div>
          <div class="kpi-value">${displayTRate}</div>
          <div class="kpi-sub">※返信日基準のため参考値</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">参考有効返信率</div>
          <div class="kpi-value" style="color:var(--color-gold-accent);">${displayERate}</div>
          <div class="kpi-sub">※返信日基準のため参考値</div>
        </div>
      </div>

      <div class="tab-bar">
        <div class="tab-item ${this.activeDashboardTab === 'overview' ? 'active' : ''}" data-dash-tab="overview">概要・比較</div>
        <div class="tab-item ${this.activeDashboardTab === 'by-job' ? 'active' : ''}" data-dash-tab="by-job">求人別詳細</div>
        <div class="tab-item ${this.activeDashboardTab === 'by-media' ? 'active' : ''}" data-dash-tab="by-media">媒体別詳細</div>
        <div class="tab-item ${this.activeDashboardTab === 'trends' ? 'active' : ''}" data-dash-tab="trends">曜日・推移</div>
      </div>

      <div id="dash-tab-content"></div>
    `;

    container.querySelector('#dash-scope-select')?.addEventListener('change', (e) => {
      this.dashboardScopeStaffId = e.target.value;
      this.renderCurrentView();
    });

    container.querySelector('#dash-period-select')?.addEventListener('change', (e) => {
      this.dashboardPeriodKey = e.target.value;
      this.renderCurrentView();
    });

    container.querySelectorAll('[data-dash-tab]').forEach(tab => {
      tab.addEventListener('click', () => {
        this.activeDashboardTab = tab.getAttribute('data-dash-tab');
        this.renderCurrentView();
      });
    });

    const tabContainer = container.querySelector('#dash-tab-content');
    if (tabContainer) {
      if (this.activeDashboardTab === 'overview') {
        this.renderDashOverview(tabContainer, manualResults, autoResults, scopeStaffId, periodKey);
      } else if (this.activeDashboardTab === 'by-job') {
        this.renderDashByJob(tabContainer, manualResults, autoResults, scopeStaffId);
      } else if (this.activeDashboardTab === 'by-media') {
        this.renderDashByMedia(tabContainer, manualResults, autoResults, scopeStaffId);
      } else if (this.activeDashboardTab === 'trends') {
        this.renderDashTrends(tabContainer, manualResults);
      }
    }
  }

  renderDashOverview(container, manualResults, autoResults, scopeStaffId, periodKey) {
    const isTotalOrTeam = scopeStaffId === 'TOTAL_SCOUT' || scopeStaffId === 'TEAM_MANUAL' || scopeStaffId === 'TEAM';
    const totalJobStats = AnalyticsService.aggregateTotalByJob(manualResults, autoResults);
    const mediaStats = AnalyticsService.aggregateTotalByMedia(manualResults, autoResults);

    container.innerHTML = `
      <div class="grid-2">
        <div class="card">
          <h4 class="card-title"><i data-lucide="layers"></i> チーム手動 vs 自動スカウト 送信実績比較</h4>
          <div class="chart-container" style="margin-top: 12px;"><canvas id="stackedScoutChart"></canvas></div>
        </div>

        <div class="card">
          <h4 class="card-title"><i data-lucide="pie-chart"></i> 媒体別総送信構成比</h4>
          <div class="chart-container" style="margin-top: 12px;"><canvas id="mediaShareChart"></canvas></div>
        </div>
      </div>

      <div class="card">
        <h4 class="card-title"><i data-lucide="award"></i> 総送信数上位求人 (TOP 5)</h4>
        <div style="overflow-x:auto; margin-top:12px;">
          <table class="data-table">
            <thead>
              <tr>
                <th>企業名 / 求人名</th>
                <th>手動送信</th>
                <th>自動送信</th>
                <th>総送信数</th>
                <th>手動有効返信</th>
                <th>自動有効返信</th>
                <th>総有効返信</th>
                <th>参考総有効返信率</th>
              </tr>
            </thead>
            <tbody>
              ${totalJobStats.slice(0, 5).map(j => `
                <tr>
                  <td><strong>${this.escapeHtml(j.companyName)}</strong><br><span style="font-size:11px;color:var(--text-secondary);">${this.escapeHtml(j.jobTitle)}</span></td>
                  <td>${j.manualSent}件</td>
                  <td>${j.autoSent}件</td>
                  <td><strong>${j.totalSent}件</strong></td>
                  <td>${j.manualEffReply}件</td>
                  <td>${j.autoEffReply}件</td>
                  <td><strong style="color:var(--color-gold-accent);">${j.totalEff}件</strong></td>
                  <td>${j.effectiveReplyRateFormatted}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    setTimeout(() => {
      const stackedCtx = document.getElementById('stackedScoutChart')?.getContext('2d');
      if (stackedCtx && window.Chart) {
        new Chart(stackedCtx, {
          type: 'bar',
          data: {
            labels: mediaStats.map(m => m.name),
            datasets: [
              { label: 'チーム手動送信', data: mediaStats.map(m => m.manualSent), backgroundColor: '#1B2A4A' },
              { label: '自動スカウト送信', data: mediaStats.map(m => m.autoSent), backgroundColor: '#C5A059' }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { x: { stacked: true }, y: { stacked: true } }
          }
        });
      }

      const ctx = document.getElementById('mediaShareChart')?.getContext('2d');
      if (ctx && window.Chart) {
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: mediaStats.map(m => m.name),
            datasets: [{ data: mediaStats.map(m => m.totalSent), backgroundColor: mediaStats.map(m => m.color) }]
          },
          options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right' } } }
        });
      }
    }, 50);
  }

  renderDashByJob(container, manualResults, autoResults, scopeStaffId) {
    const totalJobStats = AnalyticsService.aggregateTotalByJob(manualResults, autoResults);
    const top10Jobs = totalJobStats.slice(0, 10);

    container.innerHTML = `
      <div class="grid-2" style="margin-bottom: 16px;">
        <div class="card">
          <h4 class="card-title"><i data-lucide="bar-chart-2"></i> TOP10 求人別 送信数内訳 (手動 vs 自動)</h4>
          <div class="chart-container" style="margin-top: 12px; height: 260px;"><canvas id="jobSentChart"></canvas></div>
        </div>
        <div class="card">
          <h4 class="card-title"><i data-lucide="trending-up"></i> TOP10 求人別 有効返信数比較 (手動 vs 自動)</h4>
          <div class="chart-container" style="margin-top: 12px; height: 260px;"><canvas id="jobEffChart"></canvas></div>
        </div>
      </div>

      <div class="card">
        <div class="card-header-flex">
          <h4 class="card-title"><i data-lucide="briefcase"></i> 求人別詳細実績マトリクス (手動・自動・合算)</h4>
          <button id="btn-export-dash-job-csv" class="btn btn-secondary btn-sm"><i data-lucide="download"></i> この求人別集計をCSV出力</button>
        </div>
        <div style="overflow-x: auto; margin-top: 16px;">
          <table class="data-table" style="border-collapse: collapse;">
            <thead>
              <tr>
                <th rowspan="2" style="min-width: 220px; vertical-align: middle; text-align: left;">企業名 / 求人名</th>
                <th rowspan="2" style="min-width: 95px; vertical-align: middle; text-align: center;">注力ランク</th>
                <th colspan="3" style="text-align: center; background-color: #F0F4F8; color: #1B2A4A; border-bottom: 2px solid #1B2A4A; font-weight: 700;">スカウト送信数</th>
                <th colspan="3" style="text-align: center; background-color: #FAF6ED; color: #9B6D16; border-bottom: 2px solid #C5A059; font-weight: 700;">総返信数</th>
                <th colspan="3" style="text-align: center; background-color: #EDF2F7; color: #2B6CB0; border-bottom: 2px solid #2B6CB0; font-weight: 700;">有効返信数</th>
                <th colspan="2" style="text-align: center; background-color: #F7FAFC; color: #4A5568; border-bottom: 2px solid #A0AEC0; font-weight: 700;">返信率（参考）</th>
              </tr>
              <tr>
                <th style="text-align: center; background-color: #F8FAFC; min-width: 55px; font-size: 11.5px;">手動</th>
                <th style="text-align: center; background-color: #F8FAFC; min-width: 55px; font-size: 11.5px;">自動</th>
                <th style="text-align: center; background-color: #E2E8F0; min-width: 60px; font-weight: 700; font-size: 12px; color: #1A202C;">合計</th>

                <th style="text-align: center; background-color: #FFFDF9; min-width: 55px; font-size: 11.5px;">手動</th>
                <th style="text-align: center; background-color: #FFFDF9; min-width: 55px; font-size: 11.5px;">自動</th>
                <th style="text-align: center; background-color: #FFEAE5; min-width: 60px; font-weight: 700; font-size: 12px; color: #9B6D16;">合計</th>

                <th style="text-align: center; background-color: #F7FAFC; min-width: 55px; font-size: 11.5px;">手動</th>
                <th style="text-align: center; background-color: #F7FAFC; min-width: 55px; font-size: 11.5px;">自動</th>
                <th style="text-align: center; background-color: #FEFCBF; min-width: 60px; font-weight: 700; font-size: 12px; color: #B7791F;">合計</th>

                <th style="text-align: center; background-color: #FAFAFA; min-width: 75px; font-size: 11.5px;">総返信率</th>
                <th style="text-align: center; background-color: #FAFAFA; min-width: 75px; font-size: 11.5px;">有効返信率</th>
              </tr>
            </thead>
            <tbody>
              ${totalJobStats.length === 0 ? `
                <tr><td colspan="13" style="text-align:center; padding:24px; color:var(--text-muted);">対象期間の実績がありません</td></tr>
              ` : totalJobStats.map(j => {
                const rankBadgeHtml = this.renderPriorityRankBadge(j.priorityRank, false);
                return `
                  <tr>
                    <td style="text-align:left;"><strong>${this.escapeHtml(j.companyName)}</strong><br><span style="font-size:11px;color:var(--text-secondary);">${this.escapeHtml(j.jobTitle)}</span></td>
                    <td style="text-align:center;">${rankBadgeHtml}</td>
                    <td style="text-align:right;">${j.manualSent}件</td>
                    <td style="text-align:right;">${j.autoSent}件</td>
                    <td style="text-align:right; font-weight:700; background-color:#F7FAFC;">${j.totalSent}件</td>
                    <td style="text-align:right;">${j.manualTotalReply}件</td>
                    <td style="text-align:right;">${j.autoTotalReply}件</td>
                    <td style="text-align:right; font-weight:700; background-color:#FFFDF9;">${j.totalReply}件</td>
                    <td style="text-align:right;">${j.manualEffReply}件</td>
                    <td style="text-align:right;">${j.autoEffReply}件</td>
                    <td style="text-align:right; font-weight:700; background-color:#FEFCBF; color:#B7791F;">${j.totalEff}件</td>
                    <td style="text-align:right;">${j.totalReplyRateFormatted}</td>
                    <td style="text-align:right; font-weight:600;">${j.effectiveReplyRateFormatted}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    container.querySelector('#btn-export-dash-job-csv')?.addEventListener('click', () => {
      StorageService.exportCSV('total_job_summary');
    });

    setTimeout(() => {
      if (top10Jobs.length > 0 && window.Chart) {
        const labels = top10Jobs.map(j => j.companyName.length > 8 ? j.companyName.slice(0, 8) + '…' : j.companyName);

        const ctxSent = document.getElementById('jobSentChart')?.getContext('2d');
        if (ctxSent) {
          new Chart(ctxSent, {
            type: 'bar',
            data: {
              labels,
              datasets: [
                { label: '手動送信', data: top10Jobs.map(j => j.manualSent), backgroundColor: '#1B2A4A' },
                { label: '自動スカウト', data: top10Jobs.map(j => j.autoSent), backgroundColor: '#C5A059' }
              ]
            },
            options: {
              indexAxis: 'y',
              responsive: true,
              maintainAspectRatio: false,
              scales: { x: { stacked: true }, y: { stacked: true } }
            }
          });
        }

        const ctxEff = document.getElementById('jobEffChart')?.getContext('2d');
        if (ctxEff) {
          new Chart(ctxEff, {
            type: 'bar',
            data: {
              labels,
              datasets: [
                { label: '手動有効返信', data: top10Jobs.map(j => j.manualEffReply), backgroundColor: '#2B6CB0' },
                { label: '自動有効返信', data: top10Jobs.map(j => j.autoEffReply), backgroundColor: '#D69E2E' }
              ]
            },
            options: {
              indexAxis: 'y',
              responsive: true,
              maintainAspectRatio: false,
              scales: { x: { stacked: true }, y: { stacked: true } }
            }
          });
        }
      }
    }, 50);
  }

  renderDashByMedia(container, manualResults, autoResults, scopeStaffId) {
    const mediaStats = AnalyticsService.aggregateTotalByMedia(manualResults, autoResults);

    container.innerHTML = `
      <div class="grid-2" style="margin-bottom: 16px;">
        <div class="card">
          <h4 class="card-title"><i data-lucide="bar-chart-2"></i> 媒体別 送信数内訳 (手動 vs 自動)</h4>
          <div class="chart-container" style="margin-top: 12px; height: 260px;"><canvas id="mediaSentChart"></canvas></div>
        </div>
        <div class="card">
          <h4 class="card-title"><i data-lucide="pie-chart"></i> 媒体別 有効返信数比較 (手動 vs 自動)</h4>
          <div class="chart-container" style="margin-top: 12px; height: 260px;"><canvas id="mediaEffChart"></canvas></div>
        </div>
      </div>

      <div class="card">
        <div class="card-header-flex">
          <h4 class="card-title"><i data-lucide="layers"></i> 媒体別詳細成果比較 (手動・自動・合算)</h4>
          <button id="btn-export-dash-media-csv" class="btn btn-secondary btn-sm"><i data-lucide="download"></i> この媒体別集計をCSV出力</button>
        </div>
        <div style="overflow-x: auto; margin-top: 16px;">
          <table class="data-table" style="border-collapse: collapse;">
            <thead>
              <tr>
                <th rowspan="2" style="min-width: 140px; vertical-align: middle; text-align: left;">媒体名</th>
                <th colspan="3" style="text-align: center; background-color: #F0F4F8; color: #1B2A4A; border-bottom: 2px solid #1B2A4A; font-weight: 700;">スカウト送信数</th>
                <th colspan="3" style="text-align: center; background-color: #FAF6ED; color: #9B6D16; border-bottom: 2px solid #C5A059; font-weight: 700;">総返信数</th>
                <th colspan="3" style="text-align: center; background-color: #EDF2F7; color: #2B6CB0; border-bottom: 2px solid #2B6CB0; font-weight: 700;">有効返信数</th>
                <th colspan="2" style="text-align: center; background-color: #F7FAFC; color: #4A5568; border-bottom: 2px solid #A0AEC0; font-weight: 700;">返信率（参考）</th>
              </tr>
              <tr>
                <th style="text-align: center; background-color: #F8FAFC; min-width: 60px; font-size: 11.5px;">手動</th>
                <th style="text-align: center; background-color: #F8FAFC; min-width: 60px; font-size: 11.5px;">自動</th>
                <th style="text-align: center; background-color: #E2E8F0; min-width: 65px; font-weight: 700; font-size: 12px; color: #1A202C;">合計</th>

                <th style="text-align: center; background-color: #FFFDF9; min-width: 60px; font-size: 11.5px;">手動</th>
                <th style="text-align: center; background-color: #FFFDF9; min-width: 60px; font-size: 11.5px;">自動</th>
                <th style="text-align: center; background-color: #FFEAE5; min-width: 65px; font-weight: 700; font-size: 12px; color: #9B6D16;">合計</th>

                <th style="text-align: center; background-color: #F7FAFC; min-width: 60px; font-size: 11.5px;">手動</th>
                <th style="text-align: center; background-color: #F7FAFC; min-width: 60px; font-size: 11.5px;">自動</th>
                <th style="text-align: center; background-color: #FEFCBF; min-width: 65px; font-weight: 700; font-size: 12px; color: #B7791F;">合計</th>

                <th style="text-align: center; background-color: #FAFAFA; min-width: 80px; font-size: 11.5px;">総返信率</th>
                <th style="text-align: center; background-color: #FAFAFA; min-width: 80px; font-size: 11.5px;">有効返信率</th>
              </tr>
            </thead>
            <tbody>
              ${mediaStats.map(m => `
                <tr>
                  <td style="text-align:left;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${m.color};margin-right:6px;"></span><strong>${m.name}</strong></td>
                  <td style="text-align:right;">${m.manualSent}件</td>
                  <td style="text-align:right;">${m.autoSent}件</td>
                  <td style="text-align:right; font-weight:700; background-color:#F7FAFC;">${m.totalSent}件</td>
                  <td style="text-align:right;">${m.manualTotalReply}件</td>
                  <td style="text-align:right;">${m.autoTotalReply}件</td>
                  <td style="text-align:right; font-weight:700; background-color:#FFFDF9;">${m.totalReply}件</td>
                  <td style="text-align:right;">${m.manualEffReply}件</td>
                  <td style="text-align:right;">${m.autoEffReply}件</td>
                  <td style="text-align:right; font-weight:700; background-color:#FEFCBF; color:#B7791F;">${m.totalEff}件</td>
                  <td style="text-align:right;">${m.totalReplyRateFormatted}</td>
                  <td style="text-align:right; font-weight:600;">${m.effectiveReplyRateFormatted}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    container.querySelector('#btn-export-dash-media-csv')?.addEventListener('click', () => {
      StorageService.exportCSV('media_summary');
    });

    setTimeout(() => {
      if (window.Chart) {
        const labels = mediaStats.map(m => m.name);
        const ctxSent = document.getElementById('mediaSentChart')?.getContext('2d');
        if (ctxSent) {
          new Chart(ctxSent, {
            type: 'bar',
            data: {
              labels,
              datasets: [
                { label: '手動送信', data: mediaStats.map(m => m.manualSent), backgroundColor: '#1B2A4A' },
                { label: '自動送信', data: mediaStats.map(m => m.autoSent), backgroundColor: '#C5A059' }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: { x: { stacked: true }, y: { stacked: true } }
            }
          });
        }

        const ctxEff = document.getElementById('mediaEffChart')?.getContext('2d');
        if (ctxEff) {
          new Chart(ctxEff, {
            type: 'bar',
            data: {
              labels,
              datasets: [
                { label: '手動有効返信', data: mediaStats.map(m => m.manualEffReply), backgroundColor: '#2B6CB0' },
                { label: '自動有効返信', data: mediaStats.map(m => m.autoEffReply), backgroundColor: '#D69E2E' }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              scales: { x: { stacked: true }, y: { stacked: true } }
            }
          });
        }
      }
    }, 50);
  }

  // =========================================================================
  // 自動スカウト週次実績入力画面 (対象求人選択・権限制御・大量案件対応UI)
  // =========================================================================
  renderAutoScoutView(container) {
    const weekRange = StorageService.getWeekRange(this.autoScoutWeekDateStr);
    const mediaList = StorageService.getActiveMediaList();
    const allJobs = StorageService.getJobs().filter(j => !j.archived);
    const targetJobIds = new Set(StorageService.getAutoScoutTargetJobIds());

    const canEdit = StorageService.canEditAutoScout(this.currentStaff ? this.currentStaff.staffId : '', this.isAdminMode);

    const allAutoWeekly = StorageService.getAutoScoutWeeklyResults();
    const weekAutoMap = new Map();
    let isWeekConfirmed = false;

    allAutoWeekly.filter(r => r.weekStartDate === weekRange.weekStartDate).forEach(r => {
      weekAutoMap.set(`${r.jobId}_${r.mediaId}`, r);
      if (r.confirmationStatus === 'confirmed') isWeekConfirmed = true;
    });

    let scopeFilteredJobs = [];
    if (this.autoScoutScopeFilter === 'target_only') {
      scopeFilteredJobs = allJobs.filter(j => targetJobIds.has(j.jobId));
    } else if (this.autoScoutScopeFilter === 'all') {
      scopeFilteredJobs = allJobs;
    } else if (this.autoScoutScopeFilter === 'entered') {
      scopeFilteredJobs = allJobs.filter(j => mediaList.some(m => weekAutoMap.has(`${j.jobId}_${m.id}`)));
    } else if (this.autoScoutScopeFilter === 'unentered') {
      const targetJobs = allJobs.filter(j => targetJobIds.has(j.jobId));
      scopeFilteredJobs = targetJobs.filter(j => !mediaList.some(m => weekAutoMap.has(`${j.jobId}_${m.id}`)));
    }

    let displayJobs = StorageService.filterAndSortJobs(scopeFilteredJobs, {
      searchKeyword: this.autoScoutSearchKeyword,
      priorityRanks: this.autoScoutRankFilter ? [this.autoScoutRankFilter] : [],
      statuses: this.autoScoutStatusFilter ? [this.autoScoutStatusFilter] : [],
      sortBy: 'company_asc'
    });

    const enteredJobCount = allJobs.filter(j => mediaList.some(m => weekAutoMap.has(`${j.jobId}_${m.id}`))).length;
    const targetCount = targetJobIds.size;
    const unenteredCount = Math.max(0, targetCount - enteredJobCount);

    container.innerHTML = `
      <div class="card" style="margin-bottom: 16px; padding: 16px 24px;">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <button id="btn-auto-prev-week" class="btn btn-secondary btn-sm"><i data-lucide="chevron-left"></i> 前週</button>
            <span style="font-weight: 700; font-size: 15px; color: var(--color-navy-main); background: #F8F6F2; padding: 6px 14px; border-radius: 6px; border: 1px solid #E6D5B8;">
              <i data-lucide="calendar" style="width:14px;height:14px;vertical-align:middle;margin-right:4px;"></i> ${weekRange.displayLabel}
            </span>
            <button id="btn-auto-next-week" class="btn btn-secondary btn-sm">次週 <i data-lucide="chevron-right"></i></button>
            <button id="btn-auto-this-week" class="btn btn-gold btn-sm">今週へ戻る</button>
          </div>
          <div style="display: flex; align-items: center; gap: 10px; flex-wrap:wrap;">
            <span class="badge ${canEdit ? 'badge-success' : 'badge-gray'}" style="font-size:12px; padding:6px 10px;">
              ${canEdit ? '<i data-lucide="unlock" style="width:12px;height:12px;"></i> 自動スカウト入力権限：あり' : '<i data-lucide="lock" style="width:12px;height:12px;"></i> 自動スカウト入力権限：なし (閲覧専用)'}
            </span>
            <span class="badge ${isWeekConfirmed ? 'badge-success' : 'badge-gold'}" style="font-size:12px; padding:6px 10px;">
              ${isWeekConfirmed ? '<i data-lucide="check-circle" style="width:12px;height:12px;"></i> 週実績：確定済み' : '<i data-lucide="edit-3" style="width:12px;height:12px;"></i> 週実績：入力中'}
            </span>
            ${(canEdit || this.isAdminMode) ? `
              <button id="btn-toggle-auto-week-confirm" class="btn ${isWeekConfirmed ? 'btn-secondary' : 'btn-navy'} btn-sm">
                ${isWeekConfirmed ? '確定を解除して修正' : 'この週の実績を確定する'}
              </button>
              <button id="btn-open-auto-targets-modal" class="btn btn-gold btn-sm">
                <i data-lucide="plus-circle"></i> 自動スカウト対象求人を追加・管理 (${targetCount}件)
              </button>
            ` : ''}
          </div>
        </div>
        ${!canEdit ? `
          <div class="notice-box" style="margin-top:12px; background-color:#F7FAFC; border-color:#CBD5E0; color:#4A5568; font-size:12px;">
            <i data-lucide="lock"></i> 自動スカウト実績の入力・編集は、権限を持つ担当者または管理者モードでのみ可能です。
          </div>
        ` : ''}
      </div>

      <div class="card" style="margin-bottom: 16px; padding: 14px 20px;">
        <div style="display:flex; flex-direction:column; gap:12px;">
          <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px;">
            <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
              <span style="font-size:12px; font-weight:700; color:var(--text-secondary);">表示求人:</span>
              <button class="btn btn-sm btn-auto-scope-tab ${this.autoScoutScopeFilter === 'target_only' ? 'btn-gold' : 'btn-secondary'}" data-scope="target_only">
                対象求人のみ (${targetCount}件)
              </button>
              <button class="btn btn-sm btn-auto-scope-tab ${this.autoScoutScopeFilter === 'all' ? 'btn-gold' : 'btn-secondary'}" data-scope="all">
                全求人を表示 (${allJobs.length}件)
              </button>
              <button class="btn btn-sm btn-auto-scope-tab ${this.autoScoutScopeFilter === 'entered' ? 'btn-gold' : 'btn-secondary'}" data-scope="entered">
                今週入力済み (${enteredJobCount}件)
              </button>
              <button class="btn btn-sm btn-auto-scope-tab ${this.autoScoutScopeFilter === 'unentered' ? 'btn-gold' : 'btn-secondary'}" data-scope="unentered">
                未入力求人 (${unenteredCount}件)
              </button>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <div style="position:relative; width:220px;">
                <input type="text" id="auto-scout-search-input" class="form-control" placeholder="求人を検索" value="${this.escapeHtml(this.autoScoutSearchKeyword)}" style="padding-left:30px; font-size:12px;">
                <i data-lucide="search" style="position:absolute; left:9px; top:50%; transform:translateY(-50%); width:13px; height:13px; color:var(--text-muted);"></i>
              </div>
              ${this.autoScoutSearchKeyword ? `<button id="btn-clear-auto-search" class="btn btn-secondary btn-sm">解除</button>` : ''}
            </div>
          </div>
          <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; border-top:1px solid #EDF2F7; padding-top:10px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:12px; font-weight:700; color:var(--text-secondary);">グループ表示:</span>
              <button class="btn btn-sm btn-auto-group-mode ${this.autoScoutGroupMode === 'company' ? 'btn-navy' : 'btn-secondary'}" data-group-mode="company">
                企業別
              </button>
              <button class="btn btn-sm btn-auto-group-mode ${this.autoScoutGroupMode === 'rank' ? 'btn-navy' : 'btn-secondary'}" data-group-mode="rank">
                注力ランク別
              </button>
              <button class="btn btn-sm btn-auto-group-mode ${this.autoScoutGroupMode === 'flat' ? 'btn-navy' : 'btn-secondary'}" data-group-mode="flat">
                リスト表示 (フラット)
              </button>
              <button id="btn-toggle-all-auto-groups" class="btn btn-secondary btn-sm" style="margin-left:8px;">
                全グループ折りたたみ / 展開
              </button>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:12px; font-weight:700; color:var(--text-secondary);">注力ランク:</span>
              <select id="auto-scout-rank-select" class="form-select" style="width:130px; font-size:12px;">
                <option value="">すべて</option>
                ${PRIORITY_RANK_LIST.map(r => `<option value="${r}" ${this.autoScoutRankFilter === r ? 'selected' : ''}>${PRIORITY_RANKS[r].fullLabel}</option>`).join('')}
              </select>
              <span style="font-size:12px; font-weight:700; color:var(--text-secondary); margin-left:6px;">ステータス:</span>
              <select id="auto-scout-status-select" class="form-select" style="width:130px; font-size:12px;">
                <option value="">すべて</option>
                ${JOB_STATUSES.map(st => `<option value="${st}" ${this.autoScoutStatusFilter === st ? 'selected' : ''}>${st}</option>`).join('')}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header-flex">
          <h3 class="card-title"><i data-lucide="cpu" style="color:var(--color-gold-accent);"></i> 自動スカウト週次実績マトリクス (${displayJobs.length}件表示 / 週: ${weekRange.weekStartDate}～)</h3>
          <span style="font-size:12px; color:var(--text-secondary);">※対象求人の実績はチーム手動実績と分離保存され、総スカウト実績へ自動統合されます。</span>
        </div>
        <div class="matrix-table-container">
          <table class="matrix-table" style="border-collapse: collapse;">
            <thead>
              <tr>
                <th style="min-width: 260px; text-align: left; position: sticky; left: 0; z-index: 5;">企業名 / 求人名</th>
                <th style="width: 85px;">対象設定</th>
                <th style="width: 80px;">ステータス</th>
                ${mediaList.map(m => `<th style="min-width: 140px; border-top: 3px solid ${m.color || '#1A365D'};">${m.name}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${displayJobs.length === 0 ? `
                <tr>
                  <td colspan="${mediaList.length + 3}" style="padding: 32px; text-align: center; color: var(--text-muted); font-weight: 600;">
                    条件に一致する自動スカウト求人がありません
                  </td>
                </tr>
              ` : this.renderAutoScoutGroupedRows(displayJobs, mediaList, weekAutoMap, weekRange, canEdit, isWeekConfirmed, targetJobIds)}
            </tbody>
          </table>
        </div>
      </div>
    `;

    this.bindAutoScoutEvents(container, weekRange, isWeekConfirmed);
  }

  renderAutoScoutGroupedRows(jobs, mediaList, weekAutoMap, weekRange, canEdit, isWeekConfirmed, targetJobIds) {
    if (this.autoScoutGroupMode === 'flat') {
      return jobs.map(job => this.renderAutoScoutMatrixRow(job, mediaList, weekAutoMap, weekRange, canEdit, isWeekConfirmed, targetJobIds)).join('');
    }

    const groups = new Map();
    if (this.autoScoutGroupMode === 'company') {
      jobs.forEach(j => {
        const key = j.companyName || 'その他企業';
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(j);
      });
    } else if (this.autoScoutGroupMode === 'rank') {
      PRIORITY_RANK_LIST.forEach(r => groups.set(r, []));
      jobs.forEach(j => {
        const key = j.priorityRank || 'UNSET';
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(j);
      });
    }

    let rowsHtml = '';
    const colSpan = mediaList.length + 3;

    groups.forEach((groupJobs, groupKey) => {
      if (groupJobs.length === 0) return;
      const isCollapsed = this.autoScoutCollapsedGroups.has(groupKey);
      let groupTitle = groupKey;
      let groupBadge = '';

      if (this.autoScoutGroupMode === 'company') {
        groupTitle = `企業: ${groupKey}`;
      } else if (this.autoScoutGroupMode === 'rank') {
        const rankObj = PRIORITY_RANKS[groupKey] || PRIORITY_RANKS.UNSET;
        groupTitle = `注力ランク: ${rankObj.fullLabel}`;
        groupBadge = `<span class="badge" style="background:${rankObj.color}; color:${rankObj.textColor || '#FFF'}; font-size:11px; margin-left:8px;">${groupJobs.length}件</span>`;
      }

      rowsHtml += `
        <tr class="auto-group-header-row" data-group-key="${this.escapeHtml(groupKey)}" style="background-color: #F0F4F8; cursor: pointer; border-top: 2px solid #CBD5E0;">
          <td colspan="${colSpan}" style="padding: 10px 16px; font-weight: 700; color: #1B2A4A; text-align: left;">
            <div style="display:flex; align-items:center; justify-content:space-between;">
              <div style="display:flex; align-items:center; gap:8px;">
                <i data-lucide="${isCollapsed ? 'chevron-right' : 'chevron-down'}" style="width:16px;height:16px;"></i>
                <span>${this.escapeHtml(groupTitle)}</span>
                ${groupBadge || `<span class="badge badge-navy" style="font-size:11px;">${groupJobs.length}件</span>`}
              </div>
              <span style="font-size:11px; font-weight:normal; color:var(--text-secondary);">
                ${isCollapsed ? 'クリックして展開' : 'クリックして折りたたむ'}
              </span>
            </div>
          </td>
        </tr>
      `;

      if (!isCollapsed) {
        rowsHtml += groupJobs.map(job => this.renderAutoScoutMatrixRow(job, mediaList, weekAutoMap, weekRange, canEdit, isWeekConfirmed, targetJobIds)).join('');
      }
    });

    return rowsHtml;
  }

  renderAutoScoutMatrixRow(job, mediaList, weekAutoMap, weekRange, canEdit, isWeekConfirmed, targetJobIds) {
    const rankBadgeHtml = this.renderPriorityRankBadge(job.priorityRank, false);
    const isTarget = targetJobIds.has(job.jobId);

    return `
      <tr data-job-id="${job.jobId}">
        <td style="text-align: left; position: sticky; left: 0; background-color: #FFFFFF; z-index: 4;">
          <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
            <span style="font-weight: 700; color: var(--color-navy-main); font-size: 13px;">${this.escapeHtml(job.companyName)}</span>
            ${rankBadgeHtml}
          </div>
          <div style="font-size: 11.5px; color: var(--text-secondary); margin-top:2px;">${this.escapeHtml(job.jobTitle)}</div>
        </td>
        <td style="text-align:center;">
          <button class="btn-mini btn-toggle-auto-target-inline" data-job-id="${job.jobId}" title="${isTarget ? '自動スカウト対象から外す' : '自動スカウト対象に追加'}" style="font-size:10.5px; padding:2px 6px; border:1px solid ${isTarget ? '#BEE3F8' : '#E2E8F0'}; background:${isTarget ? '#EBF8FF' : '#F7FAFC'};">
            ${isTarget ? '<span style="color:#2B6CB0; font-weight:700;">★ 対象</span>' : '<span style="color:#A0AEC0;">☆ 対象外</span>'}
          </button>
        </td>
        <td>
          <span class="badge ${job.status === 'スカウト実施中' ? 'badge-success' : job.status === '準備中' ? 'badge-gold' : 'badge-gray'}">${job.status}</span>
        </td>
        ${mediaList.map(m => {
          const recKey = `${job.jobId}_${m.id}`;
          const rec = weekAutoMap.get(recKey) || { sentCount: 0, totalReplyCount: 0, effectiveReplyCount: 0 };
          return `
            <td>
              <div class="media-subcell-container" data-job-id="${job.jobId}" data-media-id="${m.id}">
                <div class="subcell-row">
                  <span class="subcell-label" style="color:#2B6CB0; font-weight:700;">自動送信</span>
                  <input type="number" min="0" class="subcell-input input-auto-sent" value="${rec.sentCount}" ${!canEdit ? 'disabled' : ''}>
                  ${canEdit ? `
                    <div class="subcell-btns">
                      <button class="btn-mini btn-auto-step-sent" data-step="1">+1</button>
                      <button class="btn-mini btn-auto-step-sent" data-step="5">+5</button>
                      <button class="btn-mini btn-auto-step-sent" data-step="10">+10</button>
                      <button class="btn-mini btn-auto-step-sent" data-step="-1">-1</button>
                    </div>
                  ` : ''}
                </div>
                <div class="subcell-row">
                  <span class="subcell-label">自動総返信</span>
                  <input type="number" min="0" class="subcell-input input-auto-total-reply" value="${rec.totalReplyCount}" ${!canEdit ? 'disabled' : ''}>
                  ${canEdit ? `
                    <div class="subcell-btns">
                      <button class="btn-mini btn-auto-add-total-reply">+1</button>
                    </div>
                  ` : ''}
                </div>
                <div class="subcell-row">
                  <span class="subcell-label" style="color:var(--color-navy-main); font-weight:700;">自動有効返信</span>
                  <input type="number" min="0" class="subcell-input input-auto-effective-reply" value="${rec.effectiveReplyCount}" ${!canEdit ? 'disabled' : ''}>
                  ${canEdit ? `
                    <div class="subcell-btns">
                      <button class="btn-mini btn-auto-add-effective-reply" style="background:var(--color-gold-light); border-color:var(--color-gold-accent);">+1</button>
                    </div>
                  ` : ''}
                </div>
              </div>
            </td>
          `;
        }).join('')}
      </tr>
    `;
  }

  bindAutoScoutEvents(container, weekRange, isWeekConfirmed) {
    container.querySelector('#btn-auto-prev-week')?.addEventListener('click', () => {
      const d = new Date(weekRange.weekStartDate);
      d.setDate(d.getDate() - 7);
      this.autoScoutWeekDateStr = StorageService.getWeekRange(d).weekStartDate;
      this.renderCurrentView();
    });

    container.querySelector('#btn-auto-next-week')?.addEventListener('click', () => {
      const d = new Date(weekRange.weekStartDate);
      d.setDate(d.getDate() + 7);
      this.autoScoutWeekDateStr = StorageService.getWeekRange(d).weekStartDate;
      this.renderCurrentView();
    });

    container.querySelector('#btn-auto-this-week')?.addEventListener('click', () => {
      this.autoScoutWeekDateStr = StorageService.getWeekRange(new Date()).weekStartDate;
      this.renderCurrentView();
    });

    container.querySelector('#btn-toggle-auto-week-confirm')?.addEventListener('click', () => {
      const canEdit = StorageService.canEditAutoScout(this.currentStaff ? this.currentStaff.staffId : '', this.isAdminMode);
      if (!canEdit) return;
      try {
        const nextState = isWeekConfirmed ? 'draft' : 'confirmed';
        StorageService.toggleAutoScoutWeekConfirmation(weekRange.weekStartDate, nextState, this.currentStaff ? this.currentStaff.staffId : '');
        this.renderCurrentView();
      } catch (err) {
        alert(`確定状態変更エラー: ${err.message}`);
      }
    });

    container.querySelector('#btn-open-auto-targets-modal')?.addEventListener('click', () => {
      this.openAutoTargetJobsModal();
    });

    container.querySelectorAll('.btn-auto-scope-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        this.autoScoutScopeFilter = btn.getAttribute('data-scope');
        this.renderCurrentView();
      });
    });

    container.querySelectorAll('.btn-auto-group-mode').forEach(btn => {
      btn.addEventListener('click', () => {
        this.autoScoutGroupMode = btn.getAttribute('data-group-mode');
        this.renderCurrentView();
      });
    });

    container.querySelector('#btn-toggle-all-auto-groups')?.addEventListener('click', () => {
      if (this.autoScoutCollapsedGroups.size > 0) {
        this.autoScoutCollapsedGroups.clear();
      } else {
        container.querySelectorAll('.auto-group-header-row').forEach(row => {
          const key = row.getAttribute('data-group-key');
          if (key) this.autoScoutCollapsedGroups.add(key);
        });
      }
      this.renderCurrentView();
    });

    container.querySelectorAll('.auto-group-header-row').forEach(row => {
      row.addEventListener('click', () => {
        const key = row.getAttribute('data-group-key');
        if (key) {
          if (this.autoScoutCollapsedGroups.has(key)) {
            this.autoScoutCollapsedGroups.delete(key);
          } else {
            this.autoScoutCollapsedGroups.add(key);
          }
          this.renderCurrentView();
        }
      });
    });

    container.querySelectorAll('.btn-toggle-auto-target-inline').forEach(btn => {
      btn.addEventListener('click', () => {
        const jobId = btn.getAttribute('data-job-id');
        StorageService.toggleAutoScoutTargetJob(jobId, this.currentStaff ? this.currentStaff.staffId : '');
        this.renderCurrentView();
      });
    });

    const searchInp = container.querySelector('#auto-scout-search-input');
    searchInp?.addEventListener('input', (e) => {
      this.autoScoutSearchKeyword = e.target.value;
      this.renderCurrentView();
    });

    container.querySelector('#btn-clear-auto-search')?.addEventListener('click', () => {
      this.autoScoutSearchKeyword = '';
      this.renderCurrentView();
    });

    container.querySelector('#auto-scout-rank-select')?.addEventListener('change', (e) => {
      this.autoScoutRankFilter = e.target.value;
      this.renderCurrentView();
    });

    container.querySelector('#auto-scout-status-select')?.addEventListener('change', (e) => {
      this.autoScoutStatusFilter = e.target.value;
      this.renderCurrentView();
    });

    const canEdit = StorageService.canEditAutoScout(this.currentStaff ? this.currentStaff.staffId : '', this.isAdminMode);
    if (!canEdit) return;

    container.querySelectorAll('.media-subcell-container').forEach(cell => {
      const jobId = cell.getAttribute('data-job-id');
      const mediaId = cell.getAttribute('data-media-id');
      const inputSent = cell.querySelector('.input-auto-sent');
      const inputTotal = cell.querySelector('.input-auto-total-reply');
      const inputEffective = cell.querySelector('.input-auto-effective-reply');

      const handleUpdate = () => {
        if (isWeekConfirmed) {
          if (!confirm('この週は既に確定済みです。実績を修正しますか？')) {
            this.renderCurrentView();
            return;
          }
        }
        const sent = Math.max(0, parseInt(inputSent.value, 10) || 0);
        const total = Math.max(0, parseInt(inputTotal.value, 10) || 0);
        const effective = Math.max(0, parseInt(inputEffective.value, 10) || 0);
        if (effective > total) {
          alert(`有効返信数(${effective})は総返信数(${total})以下である必要があります。`);
          return;
        }
        const record = {
          autoResultId: `${jobId}_${weekRange.weekStartDate}_${mediaId}`,
          jobId,
          weekStartDate: weekRange.weekStartDate,
          weekEndDate: weekRange.weekEndDate,
          mediaId,
          sentCount: sent,
          totalReplyCount: total,
          effectiveReplyCount: effective,
          status: 'valid',
          confirmationStatus: 'draft'
        };
        this.scheduleAutoSaveAutoScout(record);
      };

      [inputSent, inputTotal, inputEffective].forEach(inp => {
        inp?.addEventListener('blur', handleUpdate);
      });

      cell.querySelectorAll('.btn-auto-step-sent').forEach(btn => {
        btn.addEventListener('click', () => {
          const step = parseInt(btn.getAttribute('data-step'), 10);
          const curr = Math.max(0, parseInt(inputSent.value, 10) || 0);
          inputSent.value = Math.max(0, curr + step);
          handleUpdate();
        });
      });

      cell.querySelector('.btn-auto-add-total-reply')?.addEventListener('click', () => {
        const curr = Math.max(0, parseInt(inputTotal.value, 10) || 0);
        inputTotal.value = curr + 1;
        handleUpdate();
      });

      cell.querySelector('.btn-auto-add-effective-reply')?.addEventListener('click', () => {
        const currTotal = Math.max(0, parseInt(inputTotal.value, 10) || 0);
        const currEff = Math.max(0, parseInt(inputEffective.value, 10) || 0);
        inputTotal.value = currTotal + 1;
        inputEffective.value = currEff + 1;
        handleUpdate();
      });
    });
  }

  scheduleAutoSaveAutoScout(record) {
    this.showSaveStatus('saving');
    try {
      StorageService.saveAutoScoutWeeklyResult(record, this.currentStaff ? this.currentStaff.staffId : '');
      this.showSaveStatus('saved');
    } catch (err) {
      console.error('Auto scout save error:', err);
      this.showSaveStatus('error', err.message);
    }
  }

  openAutoTargetJobsModal() {
    const allJobs = StorageService.getJobs().filter(j => !j.archived);
    let targetJobIds = new Set(StorageService.getAutoScoutTargetJobIds());
    let filterKeyword = '';
    let filterRank = '';

    const renderContent = () => {
      let filtered = StorageService.filterAndSortJobs(allJobs, {
        searchKeyword: filterKeyword,
        priorityRanks: filterRank ? [filterRank] : [],
        sortBy: 'company_asc'
      });

      const bodyHtml = `
        <div class="modal-overlay" style="z-index:2050;">
          <div class="modal-card" style="max-width: 760px;">
            <div class="modal-header">
              <h3 class="modal-title"><i data-lucide="plus-circle" style="color:var(--color-gold-accent);"></i> 自動スカウト対象求人の追加・管理</h3>
              <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
              <p style="font-size:12px; color:var(--text-secondary); margin-bottom:12px;">
                自動スカウトを実施している求人にチェックを入れて「設定を保存する」を押してください。<br>
                対象外の求人は自動スカウト一覧から除外され、大量案件でも管理しやすくなります。
              </p>
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:12px; background:#F8F6F2; padding:10px 14px; border-radius:6px; border:1px solid #E6D5B8;">
                <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
                  <div style="position:relative; width:220px;">
                    <input type="text" id="target-modal-search-inp" class="form-control" placeholder="企業名・求人名で検索" value="${this.escapeHtml(filterKeyword)}" style="padding-left:28px; font-size:12px;">
                    <i data-lucide="search" style="position:absolute; left:8px; top:50%; transform:translateY(-50%); width:13px; height:13px; color:var(--text-muted);"></i>
                  </div>
                  <select id="target-modal-rank-sel" class="form-select" style="width:140px; font-size:12px;">
                    <option value="">すべてのランク</option>
                    ${PRIORITY_RANK_LIST.map(r => `<option value="${r}" ${filterRank === r ? 'selected' : ''}>${PRIORITY_RANKS[r].fullLabel}</option>`).join('')}
                  </select>
                </div>
                <div style="display:flex; gap:6px;">
                  <button id="btn-target-select-all" class="btn btn-secondary btn-sm">表示中を全選択</button>
                  <button id="btn-target-deselect-all" class="btn btn-secondary btn-sm">全解除</button>
                </div>
              </div>
              <div style="max-height: 380px; overflow-y: auto; border:1px solid var(--border-light); border-radius:4px;">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th style="width:50px; text-align:center;">対象</th>
                      <th>企業名 / 求人名</th>
                      <th style="width:110px;">注力ランク</th>
                      <th style="width:100px;">ステータス</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${filtered.length === 0 ? `
                      <tr><td colspan="4" style="text-align:center; padding:32px; color:var(--text-muted);">条件に一致する求人がありません</td></tr>
                    ` : filtered.map(job => {
                      const isChecked = targetJobIds.has(job.jobId);
                      const rankHtml = this.renderPriorityRankBadge(job.priorityRank, false);
                      return `
                        <tr style="${isChecked ? 'background-color:#FFFDF9;' : ''}">
                          <td style="text-align:center;">
                            <input type="checkbox" class="chk-target-job" data-job-id="${job.jobId}" ${isChecked ? 'checked' : ''} style="width:16px; height:16px; cursor:pointer;">
                          </td>
                          <td>
                            <strong>${this.escapeHtml(job.companyName)}</strong><br>
                            <span style="font-size:11.5px; color:var(--text-secondary);">${this.escapeHtml(job.jobTitle)}</span>
                          </td>
                          <td>${rankHtml}</td>
                          <td><span class="badge ${job.status === 'スカウト実施中' ? 'badge-success' : 'badge-gray'}">${job.status}</span></td>
                        </tr>
                      `;
                    }).join('')}
                  </tbody>
                </table>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px; font-size:12.5px;">
                <span>現在選択中: <strong id="lbl-target-count" style="color:var(--color-gold-hover); font-size:14px;">${targetJobIds.size}</strong> 件 / 全${allJobs.length}件</span>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary modal-cancel">キャンセル</button>
              <button id="btn-save-target-jobs" class="btn btn-gold"><i data-lucide="check"></i> 対象求人設定を保存する</button>
            </div>
          </div>
        </div>
      `;

      const mContainer = document.getElementById('modal-container');
      mContainer.innerHTML = bodyHtml;
      if (window.lucide) window.lucide.createIcons();

      const closeModal = () => mContainer.innerHTML = '';
      mContainer.querySelector('.modal-close').onclick = closeModal;
      mContainer.querySelector('.modal-cancel').onclick = closeModal;

      mContainer.querySelector('#target-modal-search-inp')?.addEventListener('input', (e) => {
        filterKeyword = e.target.value;
        renderContent();
      });

      mContainer.querySelector('#target-modal-rank-sel')?.addEventListener('change', (e) => {
        filterRank = e.target.value;
        renderContent();
      });

      mContainer.querySelectorAll('.chk-target-job').forEach(chk => {
        chk.addEventListener('change', () => {
          const jobId = chk.getAttribute('data-job-id');
          if (chk.checked) targetJobIds.add(jobId);
          else targetJobIds.delete(jobId);
          const countEl = mContainer.querySelector('#lbl-target-count');
          if (countEl) countEl.textContent = targetJobIds.size;
        });
      });

      mContainer.querySelector('#btn-target-select-all')?.addEventListener('click', () => {
        filtered.forEach(j => targetJobIds.add(j.jobId));
        renderContent();
      });

      mContainer.querySelector('#btn-target-deselect-all')?.addEventListener('click', () => {
        targetJobIds.clear();
        renderContent();
      });

      mContainer.querySelector('#btn-save-target-jobs')?.addEventListener('click', () => {
        StorageService.saveAutoScoutTargetJobIds(Array.from(targetJobIds), this.currentStaff ? this.currentStaff.staffId : '');
        alert(`自動スカウト対象求人を ${targetJobIds.size}件 に保存しました。`);
        closeModal();
        this.renderCurrentView();
      });
    };

    renderContent();
  }

  // =========================================================================
  // 直接エントリー（インバウンド）実績入力・管理画面
  // =========================================================================
  renderInboundView(container) {
    const dateStr = this.inboundDateStr || new Date().toISOString().slice(0, 10);
    const routes = DEFAULT_INBOUND_ROUTES;
    const allJobs = StorageService.getJobs().filter(j => !j.archived);

    const allInboundResults = StorageService.getValidInboundResults();
    const dayInboundMap = new Map();
    allInboundResults.filter(r => r.date === dateStr).forEach(r => {
      dayInboundMap.set(`${r.jobId}_${r.routeId}`, r);
    });

    let displayJobs = StorageService.filterAndSortJobs(allJobs, {
      searchKeyword: this.inboundSearchKeyword,
      priorityRanks: this.inboundRankFilter ? [this.inboundRankFilter] : [],
      statuses: this.inboundStatusFilter ? [this.inboundStatusFilter] : [],
      sortBy: 'company_asc'
    });

    container.innerHTML = `
      <div class="card" style="margin-bottom: 16px; padding: 16px 24px;">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <button id="btn-inbound-prev-day" class="btn btn-secondary btn-sm"><i data-lucide="chevron-left"></i> 前日</button>
            <input type="date" id="inbound-date-picker" class="form-control" value="${dateStr}" style="width: 150px; font-weight: 700;">
            <button id="btn-inbound-next-day" class="btn btn-secondary btn-sm">翌日 <i data-lucide="chevron-right"></i></button>
            <button id="btn-inbound-today" class="btn btn-gold btn-sm">今日へ移動</button>
          </div>

          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 13px; font-weight: 700; color: var(--color-navy-main);">
              <i data-lucide="arrow-down-left" style="color:var(--color-gold-accent);"></i> 掲載求人への直接エントリー記録
            </span>
          </div>
        </div>
      </div>

      <div class="card" style="margin-bottom: 16px; padding: 14px 20px;">
        <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:12px; font-weight:700; color:var(--text-secondary);">グループ表示:</span>
            <button class="btn btn-sm btn-inbound-group-mode ${this.inboundGroupMode === 'company' ? 'btn-navy' : 'btn-secondary'}" data-group-mode="company">
              企業別
            </button>
            <button class="btn btn-sm btn-inbound-group-mode ${this.inboundGroupMode === 'rank' ? 'btn-navy' : 'btn-secondary'}" data-group-mode="rank">
              注力ランク別
            </button>
            <button class="btn btn-sm btn-inbound-group-mode ${this.inboundGroupMode === 'flat' ? 'btn-navy' : 'btn-secondary'}" data-group-mode="flat">
              リスト表示 (フラット)
            </button>
            <button id="btn-toggle-all-inbound-groups" class="btn btn-secondary btn-sm" style="margin-left:8px;">
              全グループ折りたたみ / 展開
            </button>
          </div>

          <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
            <div style="position:relative; width:200px;">
              <input type="text" id="inbound-search-input" class="form-control" placeholder="企業名・求人名で検索" value="${this.escapeHtml(this.inboundSearchKeyword)}" style="padding-left:28px; font-size:12px;">
              <i data-lucide="search" style="position:absolute; left:8px; top:50%; transform:translateY(-50%); width:13px; height:13px; color:var(--text-muted);"></i>
            </div>

            <select id="inbound-rank-select" class="form-select" style="width:130px; font-size:12px;">
              <option value="">すべてのランク</option>
              ${PRIORITY_RANK_LIST.map(r => `<option value="${r}" ${this.inboundRankFilter === r ? 'selected' : ''}>${PRIORITY_RANKS[r].fullLabel}</option>`).join('')}
            </select>

            <select id="inbound-status-select" class="form-select" style="width:130px; font-size:12px;">
              <option value="">すべてのステータス</option>
              ${JOB_STATUSES.map(st => `<option value="${st}" ${this.inboundStatusFilter === st ? 'selected' : ''}>${st}</option>`).join('')}
            </select>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header-flex">
          <h3 class="card-title"><i data-lucide="inbox"></i> 直接エントリー（インバウンド）入力マトリクス (${displayJobs.length}件表示 / 日付: ${dateStr})</h3>
          <button id="btn-export-inbound-csv" class="btn btn-secondary btn-sm"><i data-lucide="download"></i> インバウンド明細CSV出力</button>
        </div>

        <div class="matrix-table-container" style="overflow-x: auto;">
          <table class="matrix-table" style="border-collapse: collapse;">
            <thead>
              <tr>
                <th style="min-width: 240px; text-align: left; position: sticky; left: 0; z-index: 5;">企業名 / 求人名</th>
                <th style="width: 80px;">ステータス</th>
                ${routes.map(r => `<th style="min-width: 130px; border-top: 3px solid ${r.color};">${r.name}</th>`).join('')}
                <th style="min-width: 140px; background-color: #FAF6ED; color: #9B6D16; border-top: 3px solid #C5A059;">求人合計</th>
              </tr>
            </thead>
            <tbody>
              ${displayJobs.length === 0 ? `
                <tr>
                  <td colspan="${routes.length + 3}" style="padding: 32px; text-align: center; color: var(--text-muted); font-weight: 600;">
                    条件に一致する求人がありません
                  </td>
                </tr>
              ` : this.renderInboundGroupedRows(displayJobs, routes, dayInboundMap, dateStr)}
            </tbody>
          </table>
        </div>
      </div>
    `;

    this.bindInboundEvents(container, dateStr);
  }

  renderInboundGroupedRows(jobs, routes, dayInboundMap, dateStr) {
    if (this.inboundGroupMode === 'flat') {
      return jobs.map(job => this.renderInboundMatrixRow(job, routes, dayInboundMap, dateStr)).join('');
    }

    const groups = new Map();
    if (this.inboundGroupMode === 'company') {
      jobs.forEach(j => {
        const key = j.companyName || 'その他企業';
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(j);
      });
    } else if (this.inboundGroupMode === 'rank') {
      PRIORITY_RANK_LIST.forEach(r => groups.set(r, []));
      jobs.forEach(j => {
        const key = j.priorityRank || 'UNSET';
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(j);
      });
    }

    let rowsHtml = '';
    const colSpan = routes.length + 3;

    groups.forEach((groupJobs, groupKey) => {
      if (groupJobs.length === 0) return;

      const isCollapsed = this.inboundCollapsedGroups.has(groupKey);
      let groupTitle = groupKey;
      let groupBadge = '';

      if (this.inboundGroupMode === 'company') {
        groupTitle = `企業: ${groupKey}`;
      } else if (this.inboundGroupMode === 'rank') {
        const rankObj = PRIORITY_RANKS[groupKey] || PRIORITY_RANKS.UNSET;
        groupTitle = `注力ランク: ${rankObj.fullLabel}`;
        groupBadge = `<span class="badge" style="background:${rankObj.color}; color:${rankObj.textColor || '#FFF'}; font-size:11px; margin-left:8px;">${groupJobs.length}件</span>`;
      }

      rowsHtml += `
        <tr class="inbound-group-header-row" data-group-key="${this.escapeHtml(groupKey)}" style="background-color: #F0F4F8; cursor: pointer; border-top: 2px solid #CBD5E0;">
          <td colspan="${colSpan}" style="padding: 10px 16px; font-weight: 700; color: #1B2A4A; text-align: left;">
            <div style="display:flex; align-items:center; justify-content:space-between;">
              <div style="display:flex; align-items:center; gap:8px;">
                <i data-lucide="${isCollapsed ? 'chevron-right' : 'chevron-down'}" style="width:16px;height:16px;"></i>
                <span>${this.escapeHtml(groupTitle)}</span>
                ${groupBadge || `<span class="badge badge-navy" style="font-size:11px;">${groupJobs.length}件</span>`}
              </div>
              <span style="font-size:11px; font-weight:normal; color:var(--text-secondary);">
                ${isCollapsed ? 'クリックして展開' : 'クリックして折りたたむ'}
              </span>
            </div>
          </td>
        </tr>
      `;

      if (!isCollapsed) {
        rowsHtml += groupJobs.map(job => this.renderInboundMatrixRow(job, routes, dayInboundMap, dateStr)).join('');
      }
    });

    return rowsHtml;
  }

  renderInboundMatrixRow(job, routes, dayInboundMap, dateStr) {
    const rankBadgeHtml = this.renderPriorityRankBadge(job.priorityRank, false);
    let totalJobEntry = 0;
    let totalJobEffective = 0;

    const cellColumns = routes.map(r => {
      const recKey = `${job.jobId}_${r.id}`;
      const rec = dayInboundMap.get(recKey) || { entryCount: 0, effectiveCount: 0 };
      totalJobEntry += Number(rec.entryCount || 0);
      totalJobEffective += Number(rec.effectiveCount || 0);

      return `
        <td>
          <div class="inbound-subcell-container" data-job-id="${job.jobId}" data-route-id="${r.id}">
            <div class="subcell-row">
              <span class="subcell-label" style="color:#1B2A4A; font-weight:700;">エントリー</span>
              <input type="number" min="0" class="subcell-input input-inbound-entry" value="${rec.entryCount}">
              <div class="subcell-btns">
                <button class="btn-mini btn-inbound-step-entry" data-step="1">+1</button>
              </div>
            </div>
            <div class="subcell-row">
              <span class="subcell-label" style="color:var(--color-gold-hover); font-weight:700;">有効</span>
              <input type="number" min="0" class="subcell-input input-inbound-effective" value="${rec.effectiveCount}">
              <div class="subcell-btns">
                <button class="btn-mini btn-inbound-step-effective" style="background:var(--color-gold-light); border-color:var(--color-gold-accent);">+1</button>
              </div>
            </div>
          </div>
        </td>
      `;
    }).join('');

    const totalRate = totalJobEntry > 0 ? ((totalJobEffective / totalJobEntry) * 100).toFixed(1) + '%' : '－';

    return `
      <tr data-job-id="${job.jobId}">
        <td style="text-align: left; position: sticky; left: 0; background-color: #FFFFFF; z-index: 4;">
          <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
            <span style="font-weight: 700; color: var(--color-navy-main); font-size: 13px;">${this.escapeHtml(job.companyName)}</span>
            ${rankBadgeHtml}
          </div>
          <div style="font-size: 11.5px; color: var(--text-secondary); margin-top:2px;">${this.escapeHtml(job.jobTitle)}</div>
        </td>
        <td>
          <span class="badge ${job.status === 'スカウト実施中' ? 'badge-success' : job.status === '準備中' ? 'badge-gold' : 'badge-gray'}">${job.status}</span>
        </td>
        ${cellColumns}
        <td style="background-color:#FAF6ED; text-align:center;">
          <div style="font-size:12px; font-weight:700; color:#1B2A4A;">エントリー: ${totalJobEntry}件</div>
          <div style="font-size:12px; font-weight:700; color:#C5A059; margin-top:2px;">有効: ${totalJobEffective}件</div>
          <div style="font-size:11px; color:var(--text-secondary); margin-top:2px;">有効率: ${totalRate}</div>
        </td>
      </tr>
    `;
  }

  bindInboundEvents(container, dateStr) {
    container.querySelector('#btn-inbound-prev-day')?.addEventListener('click', () => {
      const d = new Date(dateStr + 'T00:00:00+09:00');
      d.setDate(d.getDate() - 1);
      this.inboundDateStr = d.toISOString().slice(0, 10);
      this.renderCurrentView();
    });

    container.querySelector('#btn-inbound-next-day')?.addEventListener('click', () => {
      const d = new Date(dateStr + 'T00:00:00+09:00');
      d.setDate(d.getDate() + 1);
      this.inboundDateStr = d.toISOString().slice(0, 10);
      this.renderCurrentView();
    });

    container.querySelector('#btn-inbound-today')?.addEventListener('click', () => {
      this.inboundDateStr = new Date().toISOString().slice(0, 10);
      this.renderCurrentView();
    });

    container.querySelector('#inbound-date-picker')?.addEventListener('change', (e) => {
      if (e.target.value) {
        this.inboundDateStr = e.target.value;
        this.renderCurrentView();
      }
    });

    container.querySelectorAll('.btn-inbound-group-mode').forEach(btn => {
      btn.addEventListener('click', () => {
        this.inboundGroupMode = btn.getAttribute('data-group-mode');
        this.renderCurrentView();
      });
    });

    container.querySelector('#btn-toggle-all-inbound-groups')?.addEventListener('click', () => {
      if (this.inboundCollapsedGroups.size > 0) {
        this.inboundCollapsedGroups.clear();
      } else {
        container.querySelectorAll('.inbound-group-header-row').forEach(row => {
          const key = row.getAttribute('data-group-key');
          if (key) this.inboundCollapsedGroups.add(key);
        });
      }
      this.renderCurrentView();
    });

    container.querySelectorAll('.inbound-group-header-row').forEach(row => {
      row.addEventListener('click', () => {
        const key = row.getAttribute('data-group-key');
        if (key) {
          if (this.inboundCollapsedGroups.has(key)) {
            this.inboundCollapsedGroups.delete(key);
          } else {
            this.inboundCollapsedGroups.add(key);
          }
          this.renderCurrentView();
        }
      });
    });

    const searchInp = container.querySelector('#inbound-search-input');
    searchInp?.addEventListener('input', (e) => {
      this.inboundSearchKeyword = e.target.value;
      this.renderCurrentView();
    });

    container.querySelector('#inbound-rank-select')?.addEventListener('change', (e) => {
      this.inboundRankFilter = e.target.value;
      this.renderCurrentView();
    });

    container.querySelector('#inbound-status-select')?.addEventListener('change', (e) => {
      this.inboundStatusFilter = e.target.value;
      this.renderCurrentView();
    });

    container.querySelector('#btn-export-inbound-csv')?.addEventListener('click', () => {
      StorageService.exportCSV('inbound_detail');
    });

    container.querySelectorAll('.inbound-subcell-container').forEach(cell => {
      const jobId = cell.getAttribute('data-job-id');
      const routeId = cell.getAttribute('data-route-id');

      const inputEntry = cell.querySelector('.input-inbound-entry');
      const inputEffective = cell.querySelector('.input-inbound-effective');

      const handleUpdate = () => {
        const entry = Math.max(0, parseInt(inputEntry.value, 10) || 0);
        const effective = Math.max(0, parseInt(inputEffective.value, 10) || 0);

        if (effective > entry) {
          alert(`有効エントリー数(${effective})はエントリー数(${entry})以下である必要があります。`);
          return;
        }

        const record = {
          jobId,
          date: dateStr,
          routeId,
          entryCount: entry,
          effectiveCount: effective,
          status: 'valid'
        };

        this.scheduleAutoSaveInbound(record);
      };

      [inputEntry, inputEffective].forEach(inp => {
        inp?.addEventListener('blur', handleUpdate);
      });

      cell.querySelector('.btn-inbound-step-entry')?.addEventListener('click', () => {
        const curr = Math.max(0, parseInt(inputEntry.value, 10) || 0);
        inputEntry.value = curr + 1;
        handleUpdate();
      });

      cell.querySelector('.btn-inbound-step-effective')?.addEventListener('click', () => {
        const currEntry = Math.max(0, parseInt(inputEntry.value, 10) || 0);
        const currEff = Math.max(0, parseInt(inputEffective.value, 10) || 0);
        inputEntry.value = Math.max(currEntry, currEff + 1);
        inputEffective.value = currEff + 1;
        handleUpdate();
      });
    });
  }

  scheduleAutoSaveInbound(record) {
    this.showSaveStatus('saving');
    try {
      StorageService.saveInboundResult(record, this.currentStaff ? this.currentStaff.staffId : '');
      this.showSaveStatus('saved');
    } catch (err) {
      console.error('Inbound save error:', err);
      this.showSaveStatus('error', err.message);
    }
  }

  scheduleAutoSaveAutoScout(record) {
    this.showSaveStatus('saving');
    try {
      StorageService.saveAutoScoutWeeklyResult(record, this.currentStaff ? this.currentStaff.staffId : '');
      this.showSaveStatus('saved');
    } catch (err) {
      console.error('Auto scout save error:', err);
      this.showSaveStatus('error', err.message);
    }
  }

  // =========================================================================
  // 3. 求人マスタ画面 (Jobs - 企業単位の注力ランク・並び替え・絞り込み・検索)
  // =========================================================================
  renderJobsView(container) {
    const allJobs = StorageService.getJobs();
    const filteredJobs = StorageService.filterAndSortJobs(allJobs, {
      searchKeyword: this.jobsMasterSearchKeyword,
      industries: this.jobsMasterFilters.industries,
      positions: this.jobsMasterFilters.positions,
      statuses: this.jobsMasterFilters.statuses,
      targetAges: this.jobsMasterFilters.targetAges,
      roles: this.jobsMasterFilters.roles,
      salaryRanges: this.jobsMasterFilters.salaryRanges,
      priorityRanks: this.jobsMasterFilters.priorityRanks,
      archived: false,
      sortBy: this.jobsMasterSortBy
    });

    const activeFilterCount =
      this.jobsMasterFilters.industries.length +
      this.jobsMasterFilters.positions.length +
      this.jobsMasterFilters.statuses.length +
      this.jobsMasterFilters.targetAges.length +
      this.jobsMasterFilters.roles.length +
      this.jobsMasterFilters.salaryRanges.length +
      this.jobsMasterFilters.priorityRanks.length;

    container.innerHTML = `
      ${this.isAdminMode ? `
        <div class="card" style="margin-bottom: 16px; background-color: var(--color-gold-light); border-color: var(--color-gold-border);">
          <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px;">
            <div>
              <strong style="color:var(--color-navy-main);"><i data-lucide="shield"></i> 管理者メニュー</strong>
              <p style="font-size:12px; color:var(--text-secondary); margin-top:2px;">担当者管理・注力ランクの変更・CSV出力・JSONバックアップ/復元・リセットが実行可能です。</p>
            </div>
            <div style="display:flex; gap:8px;">
              <button id="btn-admin-manage-staff" class="btn btn-gold btn-sm"><i data-lucide="users"></i> 担当者管理</button>
              <button id="btn-admin-data-manage" class="btn btn-navy btn-sm"><i data-lucide="database"></i> データ管理画面を開く</button>
            </div>
          </div>
        </div>
      ` : ''}

      <div class="notice-box" style="margin-bottom: 16px; background-color:#F8F6F2; border-color:#E6D5B8; color:#1B2A4A;">
        <i data-lucide="info"></i>
        <span>注力ランクは、企業の優劣ではなく、社内でのスカウト活動の優先度を表す項目です。</span>
      </div>

      <div class="card" style="margin-bottom: 16px; padding: 14px 20px;">
        <div style="display:flex; flex-direction:column; gap:12px;">
          <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px;">
            <div style="display:flex; align-items:center; gap:10px; flex:1; min-width:240px;">
              <div style="position:relative; width:100%; max-width:320px;">
                <input type="text" id="jobs-master-search-input" class="form-control" placeholder="企業名・求人名で検索" value="${this.escapeHtml(this.jobsMasterSearchKeyword)}" style="padding-left:32px;">
                <i data-lucide="search" style="position:absolute; left:10px; top:50%; transform:translateY(-50%); width:14px; height:14px; color:var(--text-muted);"></i>
              </div>
              <button id="btn-toggle-jobs-filter" class="btn btn-secondary btn-sm" style="display:inline-flex; align-items:center; gap:4px;">
                <i data-lucide="filter" style="width:14px;height:14px;"></i> 絞り込み
                ${activeFilterCount > 0 ? `<span class="badge badge-gold" style="padding:1px 5px;">${activeFilterCount}</span>` : ''}
              </button>
              ${this.jobsMasterSearchKeyword || activeFilterCount > 0 ? `
                <button id="btn-clear-jobs-search" class="btn btn-secondary btn-sm">クリア</button>
              ` : ''}
            </div>

            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:12px; font-weight:700; color:var(--text-secondary);">並び替え:</span>
              <select id="jobs-master-sort-select" class="form-select" style="width:190px; font-size:12px;">
                <option value="company_asc" ${this.jobsMasterSortBy === 'company_asc' ? 'selected' : ''}>企業名順：昇順</option>
                <option value="company_desc" ${this.jobsMasterSortBy === 'company_desc' ? 'selected' : ''}>企業名順：降順</option>
                <option value="job_title_asc" ${this.jobsMasterSortBy === 'job_title_asc' ? 'selected' : ''}>求人名順：昇順</option>
                <option value="job_title_desc" ${this.jobsMasterSortBy === 'job_title_desc' ? 'selected' : ''}>求人名順：降順</option>
                <option value="rank_desc" ${this.jobsMasterSortBy === 'rank_desc' ? 'selected' : ''}>注力ランク順：高い順</option>
                <option value="rank_asc" ${this.jobsMasterSortBy === 'rank_asc' ? 'selected' : ''}>注力ランク順：低い順</option>
                <option value="status" ${this.jobsMasterSortBy === 'status' ? 'selected' : ''}>ステータス順</option>
                <option value="updated_desc" ${this.jobsMasterSortBy === 'updated_desc' ? 'selected' : ''}>更新日が新しい順</option>
                <option value="updated_asc" ${this.jobsMasterSortBy === 'updated_asc' ? 'selected' : ''}>更新日が古い順</option>
                <option value="created_desc" ${this.jobsMasterSortBy === 'created_desc' ? 'selected' : ''}>登録日が新しい順</option>
                <option value="created_asc" ${this.jobsMasterSortBy === 'created_asc' ? 'selected' : ''}>登録日が古い順</option>
              </select>
            </div>
          </div>

          <!-- 絞り込みドロワー (アコーディオン) -->
          <div id="jobs-filter-drawer" style="display:${this.jobsMasterFilterOpen ? 'block' : 'none'}; background:#F8F6F2; border:1px solid #E6D5B8; padding:16px; border-radius:6px; margin-top:8px;">
            <div style="font-size:13px; font-weight:700; color:var(--color-navy-main); margin-bottom:12px; display:flex; justify-content:space-between; align-items:center;">
              <span>詳細絞り込み条件 (同項目内OR / 異項目間AND)</span>
              <span style="font-weight:normal; font-size:11.5px; color:var(--text-secondary);">選択中: ${activeFilterCount}件</span>
            </div>

            <div class="grid-3" style="gap:12px;">
              <div class="form-group" style="margin-bottom:8px;">
                <label class="form-label" style="font-size:11.5px;">業種</label>
                <div style="max-height:100px; overflow-y:auto; font-size:12px; background:#FFF; border:1px solid #CBD5E0; padding:6px; border-radius:4px;">
                  ${INDUSTRIES.map(ind => `
                    <label style="display:block; margin-bottom:2px;"><input type="checkbox" class="chk-filter-industry" value="${ind}" ${this.jobsMasterFilters.industries.includes(ind) ? 'checked' : ''}> ${ind}</label>
                  `).join('')}
                </div>
              </div>

              <div class="form-group" style="margin-bottom:8px;">
                <label class="form-label" style="font-size:11.5px;">職種</label>
                <div style="max-height:100px; overflow-y:auto; font-size:12px; background:#FFF; border:1px solid #CBD5E0; padding:6px; border-radius:4px;">
                  ${POSITIONS.map(pos => `
                    <label style="display:block; margin-bottom:2px;"><input type="checkbox" class="chk-filter-position" value="${pos}" ${this.jobsMasterFilters.positions.includes(pos) ? 'checked' : ''}> ${pos}</label>
                  `).join('')}
                </div>
              </div>

              <div class="form-group" style="margin-bottom:8px;">
                <label class="form-label" style="font-size:11.5px;">求人ステータス</label>
                <div style="font-size:12px; background:#FFF; border:1px solid #CBD5E0; padding:6px; border-radius:4px;">
                  ${JOB_STATUSES.map(st => `
                    <label style="display:block; margin-bottom:2px;"><input type="checkbox" class="chk-filter-status" value="${st}" ${this.jobsMasterFilters.statuses.includes(st) ? 'checked' : ''}> ${st}</label>
                  `).join('')}
                </div>
              </div>
            </div>

            <div class="grid-3" style="gap:12px; margin-top:8px;">
              <div class="form-group" style="margin-bottom:8px;">
                <label class="form-label" style="font-size:11.5px;">対象年齢</label>
                <div style="font-size:12px; background:#FFF; border:1px solid #CBD5E0; padding:6px; border-radius:4px;">
                  ${TARGET_AGES.map(age => `
                    <label style="display:block; margin-bottom:2px;"><input type="checkbox" class="chk-filter-target-age" value="${age}" ${this.jobsMasterFilters.targetAges.includes(age) ? 'checked' : ''}> ${age}</label>
                  `).join('')}
                </div>
              </div>

              <div class="form-group" style="margin-bottom:8px;">
                <label class="form-label" style="font-size:11.5px;">注力ランク</label>
                <div style="font-size:12px; background:#FFF; border:1px solid #CBD5E0; padding:6px; border-radius:4px;">
                  ${PRIORITY_RANK_LIST.map(r => {
                    const item = PRIORITY_RANKS[r];
                    return `<label style="display:block; margin-bottom:2px;"><input type="checkbox" class="chk-filter-priority-rank" value="${r}" ${this.jobsMasterFilters.priorityRanks.includes(r) ? 'checked' : ''}> ${item.fullLabel}</label>`;
                  }).join('')}
                </div>
              </div>

              <div class="form-group" style="margin-bottom:8px;">
                <label class="form-label" style="font-size:11.5px;">役職</label>
                <div style="max-height:100px; overflow-y:auto; font-size:12px; background:#FFF; border:1px solid #CBD5E0; padding:6px; border-radius:4px;">
                  ${EXECUTIVE_ROLES.map(role => `
                    <label style="display:block; margin-bottom:2px;"><input type="checkbox" class="chk-filter-role" value="${role}" ${this.jobsMasterFilters.roles.includes(role) ? 'checked' : ''}> ${role}</label>
                  `).join('')}
                </div>
              </div>
            </div>

            <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:12px;">
              <button id="btn-reset-filter-drawer" class="btn btn-secondary btn-sm">条件をクリア</button>
              <button id="btn-apply-filter-drawer" class="btn btn-gold btn-sm">条件を適用</button>
            </div>
          </div>
        </div>
      </div>

      <div class="card" style="padding: 0; overflow: hidden;">
        <div class="card-header-flex" style="padding: 20px 24px 16px 24px; margin-bottom: 0;">
          <h3 class="card-title"><i data-lucide="briefcase"></i> 求人マスタ一覧 (${filteredJobs.length}件 / 全${allJobs.filter(j=>!j.archived).length}件)</h3>
          ${this.isAdminMode ? `<button id="btn-create-job" class="btn btn-gold"><i data-lucide="plus"></i> 新規求人を登録</button>` : ''}
        </div>

        <div class="data-table-wrapper" style="overflow-x: auto;">
          <table class="data-table">
            <thead>
              <tr>
                <th style="min-width: 150px;">企業名</th>
                <th style="min-width: 135px; text-align: center;">注力ランク</th>
                <th style="min-width: 180px;">求人名</th>
                <th style="min-width: 95px;">業種</th>
                <th style="min-width: 105px;">職種</th>
                <th style="min-width: 125px; text-align: center;">ステータス</th>
                <th style="min-width: 140px;">対象年齢</th>
                <th style="min-width: 100px;">役職</th>
                <th style="min-width: 180px;">年収帯</th>
                <th style="min-width: 120px; text-align: center;">操作</th>
              </tr>
            </thead>
            <tbody>
              ${filteredJobs.length === 0 ? `
                <tr>
                  <td colspan="10" style="text-align:center; padding:36px; color:var(--text-muted); font-weight:600;">
                    <i data-lucide="search-x" style="vertical-align:middle; margin-right:4px;"></i> 条件に一致する求人がありません
                  </td>
                </tr>
              ` : filteredJobs.map(j => {
                const agesHtml = Array.isArray(j.targetAge) && j.targetAge.length > 0
                  ? j.targetAge.map(a => `<span class="table-pill-tag">${this.escapeHtml(a)}</span>`).join('')
                  : '<span style="color:var(--text-muted); font-size:11.5px;">未設定</span>';

                const roleHtml = j.role
                  ? `<span class="table-pill-tag table-pill-tag-gold">${this.escapeHtml(j.role)}</span>`
                  : '<span style="color:var(--text-muted); font-size:11.5px;">未設定</span>';

                const salariesHtml = Array.isArray(j.salaryRange) && j.salaryRange.length > 0
                  ? j.salaryRange.map(s => `<span class="table-pill-tag">${this.escapeHtml(s)}</span>`).join('')
                  : '<span style="color:var(--text-muted); font-size:11.5px;">未設定</span>';

                const rankHtml = this.renderPriorityRankBadge(j.priorityRank, this.isAdminMode, j.companyId);

                return `
                  <tr>
                    <td>
                      <strong style="color: var(--color-navy-main); font-size: 13.5px;">${this.escapeHtml(j.companyName)}</strong>
                      ${j.companyNameKana ? `<br><span style="font-size:10.5px; color:var(--text-muted);">${this.escapeHtml(j.companyNameKana)}</span>` : ''}
                    </td>
                    <td style="text-align: center;">${rankHtml}</td>
                    <td><strong style="font-size: 13px; color: var(--text-primary);">${this.escapeHtml(j.jobTitle)}</strong></td>
                    <td><span style="font-size:12px;">${j.industry ? this.escapeHtml(j.industry) : '<span style="color:var(--text-muted);">未設定</span>'}</span></td>
                    <td><span style="font-size:12px;">${j.position ? this.escapeHtml(j.position) : '<span style="color:var(--text-muted);">未設定</span>'}</span></td>
                    <td style="text-align: center;">
                      <span class="badge ${j.status === 'スカウト実施中' ? 'badge-success' : j.status === '準備中' ? 'badge-gold' : 'badge-gray'}" style="white-space: nowrap; font-size: 11.5px; padding: 4px 10px;">${j.status}</span>
                    </td>
                    <td><div>${agesHtml}</div></td>
                    <td><div>${roleHtml}</div></td>
                    <td><div>${salariesHtml}</div></td>
                    <td style="text-align: center;">
                      <div style="display:flex; gap:4px; justify-content: center; flex-wrap:wrap;">
                        <button class="btn btn-secondary btn-sm btn-add-to-myjob" data-job-id="${j.jobId}" style="white-space:nowrap;">担当追加</button>
                        ${this.isAdminMode ? `
                          <button class="btn btn-secondary btn-sm btn-edit-job" data-job-id="${j.jobId}">編集</button>
                          <button class="btn btn-danger btn-sm btn-delete-job" data-job-id="${j.jobId}">削除</button>
                        ` : ''}
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    // イベントバインド
    container.querySelector('#btn-admin-manage-staff')?.addEventListener('click', () => {
      this.openStaffManagerModal();
    });

    container.querySelector('#btn-admin-data-manage')?.addEventListener('click', () => {
      this.switchView('data-management');
    });

    container.querySelector('#btn-admin-data-manage')?.addEventListener('click', () => {
      this.switchView('data-management');
    });

    // 検索・並び替え・絞り込みイベント
    const searchInp = container.querySelector('#jobs-master-search-input');
    searchInp?.addEventListener('input', (e) => {
      this.jobsMasterSearchKeyword = e.target.value;
      this.renderCurrentView();
    });

    container.querySelector('#btn-clear-jobs-search')?.addEventListener('click', () => {
      this.jobsMasterSearchKeyword = '';
      this.jobsMasterFilters = { industries: [], positions: [], statuses: [], targetAges: [], roles: [], salaryRanges: [], priorityRanks: [] };
      this.renderCurrentView();
    });

    container.querySelector('#btn-toggle-jobs-filter')?.addEventListener('click', () => {
      this.jobsMasterFilterOpen = !this.jobsMasterFilterOpen;
      this.renderCurrentView();
    });

    container.querySelector('#jobs-master-sort-select')?.addEventListener('change', (e) => {
      this.jobsMasterSortBy = e.target.value;
      this.renderCurrentView();
    });

    container.querySelector('#btn-apply-filter-drawer')?.addEventListener('click', () => {
      this.jobsMasterFilters.industries = Array.from(container.querySelectorAll('.chk-filter-industry:checked')).map(el => el.value);
      this.jobsMasterFilters.positions = Array.from(container.querySelectorAll('.chk-filter-position:checked')).map(el => el.value);
      this.jobsMasterFilters.statuses = Array.from(container.querySelectorAll('.chk-filter-status:checked')).map(el => el.value);
      this.jobsMasterFilters.targetAges = Array.from(container.querySelectorAll('.chk-filter-target-age:checked')).map(el => el.value);
      this.jobsMasterFilters.priorityRanks = Array.from(container.querySelectorAll('.chk-filter-priority-rank:checked')).map(el => el.value);
      this.jobsMasterFilters.roles = Array.from(container.querySelectorAll('.chk-filter-role:checked')).map(el => el.value);
      this.renderCurrentView();
    });

    container.querySelector('#btn-reset-filter-drawer')?.addEventListener('click', () => {
      this.jobsMasterFilters = { industries: [], positions: [], statuses: [], targetAges: [], roles: [], salaryRanges: [], priorityRanks: [] };
      this.renderCurrentView();
    });

    // 管理者モード注力ランク即時変更イベント
    if (this.isAdminMode) {
      container.querySelectorAll('.select-company-rank').forEach(sel => {
        sel.addEventListener('change', (e) => {
          const companyId = sel.getAttribute('data-company-id');
          const newRank = e.target.value;
          const statusEl = container.querySelector(`.rank-save-status[data-company-id="${companyId}"]`);

          if (statusEl) statusEl.textContent = '保存中…';

          try {
            StorageService.updateCompanyRank(companyId, newRank, this.currentStaff ? this.currentStaff.staffId : '');
            const nowTime = new Date().toLocaleTimeString('ja-JP', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit' });
            if (statusEl) statusEl.textContent = `保存済み ${nowTime}`;
            setTimeout(() => {
              this.renderCurrentView();
            }, 400);
          } catch (err) {
            alert(`ランク変更エラー: ${err.message}`);
            if (statusEl) statusEl.textContent = '保存失敗';
          }
        });
      });
    }

    container.querySelectorAll('.btn-add-to-myjob').forEach(btn => {
      btn.addEventListener('click', () => {
        const jobId = btn.getAttribute('data-job-id');
        StorageService.addUserJob(this.currentStaff.staffId, jobId);
        alert('担当求人に追加しました。本日の実績入力画面に表示されます。');
      });
    });

    if (this.isAdminMode) {
      container.querySelector('#btn-create-job')?.addEventListener('click', () => {
        this.openJobEditModal(null);
      });

      container.querySelectorAll('.btn-edit-job').forEach(btn => {
        btn.addEventListener('click', () => {
          const jobId = btn.getAttribute('data-job-id');
          this.openJobEditModal(StorageService.getJobById(jobId));
        });
      });

      container.querySelectorAll('.btn-delete-job').forEach(btn => {
        btn.addEventListener('click', () => {
          const jobId = btn.getAttribute('data-job-id');
          this.openJobDeleteConfirmModal(jobId);
        });
      });
    }
  }

  // 求人削除の安全確認 & 削除モーダル
  openJobDeleteConfirmModal(jobId) {
    const job = StorageService.getJobById(jobId);
    if (!job) return;

    const safety = StorageService.checkJobDeletionSafety(jobId);

    if (!safety.canDelete) {
      alert(safety.message);
      return;
    }

    const html = `
      <div class="modal-overlay">
        <div class="modal-card" style="max-width: 480px;">
          <div class="modal-header">
            <h3 class="modal-title" style="color:var(--color-danger);"><i data-lucide="alert-triangle"></i> 求人を削除しますか？</h3>
            <button class="modal-close">&times;</button>
          </div>
          <div class="modal-body" style="font-size:13px; line-height:1.6;">
            <div style="background:#FFF5F5; border:1px solid #FEB2B2; padding:12px; border-radius:4px; margin-bottom:16px; color:#C53030;">
              <strong>注意：削除した求人は元に戻せません。</strong>
            </div>

            <div style="margin-bottom:12px;">
              <p><strong>企業名:</strong> ${this.escapeHtml(job.companyName)}</p>
              <p><strong>求人名:</strong> ${this.escapeHtml(job.jobTitle)}</p>
              <p><strong>求人ID:</strong> <code style="font-size:11px;">${job.jobId}</code></p>
            </div>

            ${safety.userJobsCount > 0 ? `
              <p style="font-size:12px; color:var(--text-secondary);">※この求人に紐づく担当設定 (${safety.userJobsCount}件) も同時に解除されます。</p>
            ` : ''}

            <div class="form-group" style="margin-top:16px;">
              <label class="form-label">削除理由 (任意)</label>
              <input type="text" id="job-delete-reason" class="form-control" placeholder="例: 誤登録のため">
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary modal-cancel">キャンセル</button>
            <button id="btn-confirm-delete-job" class="btn btn-danger">求人を削除する</button>
          </div>
        </div>
      </div>
    `;

    const mContainer = document.getElementById('modal-container');
    mContainer.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();

    const closeModal = () => mContainer.innerHTML = '';
    mContainer.querySelector('.modal-close').onclick = closeModal;
    mContainer.querySelector('.modal-cancel').onclick = closeModal;

    mContainer.querySelector('#btn-confirm-delete-job').onclick = () => {
      const reason = mContainer.querySelector('#job-delete-reason').value.trim();
      try {
        StorageService.deleteJob(jobId, this.currentStaff ? this.currentStaff.staffId : '', reason);
        alert('求人を削除しました');
        closeModal();
        this.renderCurrentView();
      } catch (err) {
        alert(`削除エラー: ${err.message}`);
      }
    };
  }

  // =========================================================================
  // 4. 分析画面
  // =========================================================================
  renderAnalysisView(container) {
    if (!this.activeAnalysisTab) this.activeAnalysisTab = 'dow-trend';

    container.innerHTML = `
      <div class="tab-bar">
        <div class="tab-item ${this.activeAnalysisTab === 'dow-trend' ? 'active' : ''}" data-analysis-tab="dow-trend">曜日別・推移</div>
        <div class="tab-item ${this.activeAnalysisTab === 'attribute' ? 'active' : ''}" data-analysis-tab="attribute">属性検索・分析</div>
        <div class="tab-item ${this.activeAnalysisTab === 'similar' ? 'active' : ''}" data-analysis-tab="similar">類似求人検索</div>
        <div class="tab-item ${this.activeAnalysisTab === 'compare' ? 'active' : ''}" data-analysis-tab="compare">求人比較 (2~5件)</div>
      </div>

      <div id="analysis-tab-content"></div>
    `;

    container.querySelectorAll('[data-analysis-tab]').forEach(tab => {
      tab.addEventListener('click', () => {
        this.activeAnalysisTab = tab.getAttribute('data-analysis-tab');
        this.renderCurrentView();
      });
    });

    const content = container.querySelector('#analysis-tab-content');
    if (content) {
      if (this.activeAnalysisTab === 'dow-trend') {
        this.renderDowTrendAnalysis(content);
      } else if (this.activeAnalysisTab === 'attribute') {
        this.renderAttributeAnalysis(content);
      } else if (this.activeAnalysisTab === 'similar') {
        this.renderSimilarJobs(content);
      } else if (this.activeAnalysisTab === 'compare') {
        this.renderJobComparison(content);
      }
    }
  }

  renderDowTrendAnalysis(container) {
    const periodKey = this.analysisDowPeriodKey || 'month';
    const staffId = this.analysisDowStaffId !== undefined ? this.analysisDowStaffId : (this.currentStaff ? this.currentStaff.staffId : '');

    const results = AnalyticsService.filterResults({ staffId, periodKey });
    const dowStats = AnalyticsService.aggregateByDayOfWeek(results);

    // 日次推移データの生成
    const range = AnalyticsService.getPeriodRange(periodKey);
    const dateMap = new Map();

    const curr = new Date(range.startStr + 'T00:00:00+09:00');
    const end = new Date(range.endStr + 'T00:00:00+09:00');
    while (curr <= end) {
      const dStr = curr.toISOString().slice(0, 10);
      dateMap.set(dStr, { sent: 0, totalReply: 0, effectiveReply: 0 });
      curr.setDate(curr.getDate() + 1);
    }

    results.forEach(r => {
      if (dateMap.has(r.date)) {
        const item = dateMap.get(r.date);
        item.sent += Number(r.sentCount || 0);
        item.totalReply += Number(r.totalReplyCount || 0);
        item.effectiveReply += Number(r.effectiveReplyCount || 0);
      }
    });

    const trendLabels = Array.from(dateMap.keys()).map(d => d.slice(5));
    const trendSent = Array.from(dateMap.values()).map(v => v.sent);
    const trendEff = Array.from(dateMap.values()).map(v => v.effectiveReply);

    const users = StorageService.getActiveUsers();

    container.innerHTML = `
      <div class="card" style="margin-bottom: 16px; padding: 16px 24px;">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size:12px; font-weight:700; color:var(--text-secondary);">対象者:</span>
            <select id="analysis-dow-staff-select" class="form-select" style="width: 200px;">
              <option value="" ${staffId === '' ? 'selected' : ''}>チーム全員 (全体)</option>
              ${users.map(u => `<option value="${u.staffId}" ${staffId === u.staffId ? 'selected' : ''}>${u.name}</option>`).join('')}
            </select>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size:12px; font-weight:700; color:var(--text-secondary);">集計期間:</span>
            <select id="analysis-dow-period-select" class="form-select" style="width: 140px;">
              <option value="week" ${periodKey === 'week' ? 'selected' : ''}>今週</option>
              <option value="month" ${periodKey === 'month' ? 'selected' : ''}>今月</option>
              <option value="3months" ${periodKey === '3months' ? 'selected' : ''}>3か月</option>
              <option value="halfYear" ${periodKey === 'halfYear' ? 'selected' : ''}>半年</option>
              <option value="year" ${periodKey === 'year' ? 'selected' : ''}>1年</option>
            </select>
          </div>
        </div>
      </div>

      <div class="grid-2">
        <div class="card">
          <h4 class="card-title"><i data-lucide="bar-chart-2"></i> 曜日別 送信・有効返信状況</h4>
          <div class="chart-container" style="margin-top: 12px; height: 260px;"><canvas id="dowAnalysisChart"></canvas></div>
        </div>
        <div class="card">
          <h4 class="card-title"><i data-lucide="trending-up"></i> 日次送信・有効返信推移</h4>
          <div class="chart-container" style="margin-top: 12px; height: 260px;"><canvas id="trendAnalysisChart"></canvas></div>
        </div>
      </div>

      <div class="card">
        <h4 class="card-title"><i data-lucide="calendar"></i> 曜日別実績詳細</h4>
        <div style="overflow-x:auto; margin-top:12px;">
          <table class="data-table">
            <thead>
              <tr>
                <th>曜日</th>
                <th style="text-align:right;">送信数</th>
                <th style="text-align:right;">総返信数</th>
                <th style="text-align:right;">有効返信数</th>
                <th style="text-align:right;">参考有効返信率</th>
                <th style="text-align:right;">送信構成比</th>
              </tr>
            </thead>
            <tbody>
              ${dowStats.map(d => `
                <tr>
                  <td><strong>${d.dayName}</strong></td>
                  <td style="text-align:right;">${d.sentCount}件</td>
                  <td style="text-align:right;">${d.totalReplyCount}件</td>
                  <td style="text-align:right; font-weight:700; color:var(--color-gold-accent);">${d.effectiveReplyCount}件</td>
                  <td style="text-align:right;">${d.effectiveReplyRateFormatted}</td>
                  <td style="text-align:right;">${d.share}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    container.querySelector('#analysis-dow-staff-select')?.addEventListener('change', (e) => {
      this.analysisDowStaffId = e.target.value;
      this.renderCurrentView();
    });

    container.querySelector('#analysis-dow-period-select')?.addEventListener('change', (e) => {
      this.analysisDowPeriodKey = e.target.value;
      this.renderCurrentView();
    });

    setTimeout(() => {
      const ctxDow = document.getElementById('dowAnalysisChart')?.getContext('2d');
      if (ctxDow && window.Chart) {
        new Chart(ctxDow, {
          type: 'bar',
          data: {
            labels: dowStats.map(d => d.dayName),
            datasets: [
              { label: '送信数', data: dowStats.map(d => d.sentCount), backgroundColor: '#1B2A4A' },
              { label: '有効返信', data: dowStats.map(d => d.effectiveReplyCount), backgroundColor: '#C5A059' }
            ]
          },
          options: { responsive: true, maintainAspectRatio: false }
        });
      }

      const ctxTrend = document.getElementById('trendAnalysisChart')?.getContext('2d');
      if (ctxTrend && window.Chart) {
        new Chart(ctxTrend, {
          type: 'line',
          data: {
            labels: trendLabels,
            datasets: [
              { label: '送信数', data: trendSent, borderColor: '#1B2A4A', backgroundColor: 'rgba(27,42,74,0.1)', fill: true, tension: 0.3 },
              { label: '有効返信数', data: trendEff, borderColor: '#C5A059', backgroundColor: 'rgba(197,160,89,0.1)', fill: true, tension: 0.3 }
            ]
          },
          options: { responsive: true, maintainAspectRatio: false }
        });
      }
    }, 50);
  }

  renderAttributeAnalysis(container) {
    container.innerHTML = `
      <div class="card">
        <h4 class="card-title"><i data-lucide="filter"></i> 求人属性による絞り込み分析 (同カテゴリ内OR / 異カテゴリ間AND)</h4>
        <div class="grid-3" style="margin-top: 16px;">
          <div class="form-group">
            <label class="form-label">業種</label>
            <select id="attr-industry" class="form-select">
              <option value="">すべて</option>
              ${INDUSTRIES.map(i => `<option value="${i}">${i}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">職種</label>
            <select id="attr-position" class="form-select">
              <option value="">すべて</option>
              ${POSITIONS.map(p => `<option value="${p}">${p}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">求人ステータス</label>
            <select id="attr-status" class="form-select">
              <option value="">すべて</option>
              ${JOB_STATUSES.map(s => `<option value="${s}">${s}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="grid-3">
          <div class="form-group">
            <label class="form-label">対象年齢 (複数選択可)</label>
            <div style="display:flex; flex-direction:column; gap:4px; font-size:12px;">
              ${TARGET_AGES.map(a => `<label><input type="checkbox" class="chk-attr-age" value="${a}"> ${a}</label>`).join('')}
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">役職</label>
            <select id="attr-role" class="form-select">
              <option value="">すべて</option>
              ${EXECUTIVE_ROLES.map(r => `<option value="${r}">${r}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">年収帯 (複数選択可)</label>
            <div style="display:flex; flex-direction:column; gap:4px; font-size:12px;">
              ${SALARY_RANGES.map(s => `<label><input type="checkbox" class="chk-attr-salary" value="${s}"> ${s}</label>`).join('')}
            </div>
          </div>
        </div>

        <button id="btn-run-attr-analysis" class="btn btn-gold" style="margin-top:12px;"><i data-lucide="search"></i> 分析実行</button>
      </div>

      <div id="attr-analysis-result"></div>
    `;

    container.querySelector('#btn-run-attr-analysis')?.addEventListener('click', () => {
      const ind = container.querySelector('#attr-industry').value;
      const pos = container.querySelector('#attr-position').value;
      const st = container.querySelector('#attr-status').value;
      const role = container.querySelector('#attr-role').value;
      const ages = Array.from(container.querySelectorAll('.chk-attr-age:checked')).map(el => el.value);
      const salaries = Array.from(container.querySelectorAll('.chk-attr-salary:checked')).map(el => el.value);

      const res = AnalyticsService.searchByAttributes({
        industries: ind ? [ind] : [],
        positions: pos ? [pos] : [],
        statuses: st ? [st] : [],
        roles: role ? [role] : [],
        targetAges: ages,
        salaryRanges: salaries
      });

      const resContainer = container.querySelector('#attr-analysis-result');
      resContainer.innerHTML = `
        <div class="card">
          <h4 class="card-title">分析結果 (対象求人: ${res.targetJobCount}件)</h4>
          <div class="kpi-grid" style="margin-top:16px;">
            <div class="kpi-card"><div class="kpi-label">送信数</div><div class="kpi-value">${res.metrics.sentCount}件</div></div>
            <div class="kpi-card"><div class="kpi-label">有効返信</div><div class="kpi-value">${res.metrics.effectiveReplyCount}件</div></div>
            <div class="kpi-card"><div class="kpi-label">参考有効返信率</div><div class="kpi-value">${res.metrics.effectiveReplyRateFormatted}</div></div>
          </div>
        </div>
      `;
    });
  }

  renderSimilarJobs(container) {
    const jobs = StorageService.getActiveJobs();

    container.innerHTML = `
      <div class="card">
        <h4 class="card-title"><i data-lucide="copy"></i> 類似求人判定</h4>
        <div class="form-group" style="max-width: 400px; margin-top:16px;">
          <label class="form-label">基準となる求人を選択</label>
          <select id="similar-base-job" class="form-select">
            <option value="">求人を選択してください</option>
            ${jobs.map(j => `<option value="${j.jobId}">${j.companyName} / ${j.jobTitle}</option>`).join('')}
          </select>
        </div>
      </div>
      <div id="similar-jobs-result"></div>
    `;

    container.querySelector('#similar-base-job')?.addEventListener('change', (e) => {
      const jobId = e.target.value;
      if (!jobId) return;

      const results = AnalyticsService.findSimilarJobs(jobId);
      const resContainer = container.querySelector('#similar-jobs-result');
      resContainer.innerHTML = `
        <div class="card">
          <h4 class="card-title">類似度の高い求人 (全${results.length}件)</h4>
          <table class="data-table" style="margin-top:16px;">
            <thead><tr><th>企業名 / 求人名</th><th>一致属性</th><th>送信数</th><th>有効返信</th><th>参考有効返信率</th><th>主な利用媒体</th></tr></thead>
            <tbody>
              ${results.map(r => `
                <tr>
                  <td><strong>${this.escapeHtml(r.job.companyName)}</strong><br><span style="font-size:11px;color:var(--text-secondary);">${this.escapeHtml(r.job.jobTitle)}</span></td>
                  <td>${r.matchedAttrs.map(a => `<span class="badge badge-gold" style="margin-right:2px;">${a}</span>`).join('')}</td>
                  <td>${r.metrics.sentCount}件</td>
                  <td>${r.metrics.effectiveReplyCount}件</td>
                  <td>${r.metrics.effectiveReplyRateFormatted}</td>
                  <td>${r.mainMedia}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    });
  }

  renderJobComparison(container) {
    const jobs = StorageService.getActiveJobs();

    container.innerHTML = `
      <div class="card">
        <h4 class="card-title"><i data-lucide="git-compare"></i> 求人比較 (2〜5件選択)</h4>
        <div style="display:flex; flex-wrap:wrap; gap:12px; margin-top:16px;">
          ${jobs.map(j => `
            <label style="font-size:13px; display:inline-flex; align-items:center; gap:6px; background:#F8F6F2; padding:6px 12px; border-radius:4px;">
              <input type="checkbox" class="chk-job-compare" value="${j.jobId}">
              ${this.escapeHtml(j.companyName)} / ${this.escapeHtml(j.jobTitle)}
            </label>
          `).join('')}
        </div>
        <button id="btn-run-compare" class="btn btn-gold" style="margin-top:16px;"><i data-lucide="bar-chart-2"></i> 比較を実行</button>
      </div>
      <div id="job-compare-result"></div>
    `;

    container.querySelector('#btn-run-compare')?.addEventListener('click', () => {
      const checkedVals = Array.from(container.querySelectorAll('.chk-job-compare:checked')).map(el => el.value);
      if (checkedVals.length < 2 || checkedVals.length > 5) {
        alert('比較する求人は2件から5件を選択してください。');
        return;
      }

      const compared = AnalyticsService.compareJobs(checkedVals);
      const resContainer = container.querySelector('#job-compare-result');
      resContainer.innerHTML = `
        <div class="card">
          <h4 class="card-title">求人比較結果</h4>
          <table class="data-table" style="margin-top:16px;">
            <thead>
              <tr>
                <th>項目</th>
                ${compared.map(c => `<th>${this.escapeHtml(c.job.companyName)}<br><span style="font-size:11px;font-weight:normal;">${this.escapeHtml(c.job.jobTitle)}</span></th>`).join('')}
              </tr>
            </thead>
            <tbody>
              <tr><td>注力ランク</td>${compared.map(c => `<td>${this.renderPriorityRankBadge(c.job.priorityRank, false)}</td>`).join('')}</tr>
              <tr><td>業種</td>${compared.map(c => `<td>${c.job.industry || '-'}</td>`).join('')}</tr>
              <tr><td>職種</td>${compared.map(c => `<td>${c.job.position || '-'}</td>`).join('')}</tr>
              <tr><td>ステータス</td>${compared.map(c => `<td><span class="badge badge-navy">${c.job.status}</span></td>`).join('')}</tr>
              <tr><td>対象年齢</td>${compared.map(c => `<td>${(c.job.targetAge || []).join('、') || '-'}</td>`).join('')}</tr>
              <tr><td>役職</td>${compared.map(c => `<td>${c.job.role || '-'}</td>`).join('')}</tr>
              <tr><td>年収帯</td>${compared.map(c => `<td>${(c.job.salaryRange || []).join('、') || '-'}</td>`).join('')}</tr>
              <tr><td>送信数</td>${compared.map(c => `<td>${c.metrics.sentCount}件</td>`).join('')}</tr>
              <tr><td>有効返信数</td>${compared.map(c => `<td><strong style="color:var(--color-gold-accent);">${c.metrics.effectiveReplyCount}件</strong></td>`).join('')}</tr>
              <tr><td>参考有効返信率</td>${compared.map(c => `<td>${c.metrics.effectiveReplyRateFormatted}</td>`).join('')}</tr>
              <tr><td>主な利用媒体</td>${compared.map(c => `<td>${c.mainMedia}</td>`).join('')}</tr>
              <tr><td>ナレッジ件数</td>${compared.map(c => `<td>${c.knowledgeCount}件</td>`).join('')}</tr>
            </tbody>
          </table>
        </div>
      `;
    });
  }

  // =========================================================================
  // 5. 求人振り返り・ナレッジ画面
  // =========================================================================
  renderKnowledgeView(container) {
    const list = StorageService.getKnowledgeList();
    const jobsMap = new Map(StorageService.getJobs().map(j => [j.jobId, j]));
    const usersMap = new Map(StorageService.getUsers().map(u => [u.staffId, u.name]));

    container.innerHTML = `
      <div class="card">
        <div class="card-header-flex">
          <h3 class="card-title"><i data-lucide="book-open"></i> 求人振り返り・ナレッジ一覧 (${list.length}件)</h3>
          <button id="btn-create-knowledge" class="btn btn-gold"><i data-lucide="plus"></i> 新規ナレッジ・振り返り登録</button>
        </div>

        <p style="font-size:12px; color:var(--text-secondary); margin-bottom:12px;">
          ※行または「詳細を表示」をクリックすると、振り返りの全項目参照・編集・削除が可能です。
        </p>

        <table class="data-table">
          <thead><tr><th>日時</th><th>求人名</th><th>種別</th><th>タイトル</th><th>記録者</th><th>タグ</th><th>操作</th></tr></thead>
          <tbody>
            ${list.length === 0 ? `
              <tr><td colspan="7" style="text-align:center; color:var(--text-muted); padding:24px;">登録されたナレッジ・振り返りはまだありません。</td></tr>
            ` : list.map((k, index) => {
              const job = jobsMap.get(k.jobId) || {};
              const itemId = k.knowledgeId || k.id || `KNW-${index}`;
              const itemType = k.type || 'その他';
              return `
                <tr class="clickable-knw-row" data-knw-id="${itemId}" data-knw-index="${index}" style="cursor:pointer;">
                  <td>${k.createdAt ? k.createdAt.slice(0,10) : '-'}</td>
                  <td><strong>${this.escapeHtml(job.companyName || '')}</strong><br><span style="font-size:11px;">${this.escapeHtml(job.jobTitle || '')}</span></td>
                  <td><span class="badge badge-gold">${this.escapeHtml(itemType)}</span></td>
                  <td><strong>${this.escapeHtml(k.title || '無題')}</strong></td>
                  <td>${usersMap.get(k.staffId) || k.staffId || '-'}</td>
                  <td>${(k.tags || []).map(t => `<span class="badge badge-navy">${t}</span>`).join(' ')}</td>
                  <td>
                    <button class="btn btn-secondary btn-sm btn-view-knw-detail" data-knw-id="${itemId}" data-knw-index="${index}">
                      <i data-lucide="eye"></i> 詳細を表示
                    </button>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    container.querySelector('#btn-create-knowledge')?.addEventListener('click', () => {
      this.openKnowledgeEditModal(null);
    });

    // 行および「詳細を表示」ボタンのクリックイベント (IDマッチング + インデックスフォールバック)
    container.querySelectorAll('.clickable-knw-row').forEach(row => {
      row.addEventListener('click', (e) => {
        const knwId = row.getAttribute('data-knw-id');
        const knwIdx = parseInt(row.getAttribute('data-knw-index'), 10);
        let knw = list.find(item => (item.knowledgeId && String(item.knowledgeId) === String(knwId)) || (item.id && String(item.id) === String(knwId)));
        if (!knw && !isNaN(knwIdx) && list[knwIdx]) {
          knw = list[knwIdx];
        }

        if (knw) {
          this.openKnowledgeDetailModal(knw);
        } else {
          console.warn('[Knowledge View Warning] Could not find item for ID:', knwId, 'index:', knwIdx);
        }
      });
    });
  }

  // ナレッジ・求人振り返り 詳細閲覧モーダル
  openKnowledgeDetailModal(k) {
    if (!k) return;
    const job = StorageService.getJobById(k.jobId) || {};
    const user = StorageService.getUserById(k.staffId);
    const staffName = user ? user.name : (k.staffId || '指定なし');
    const targetKnwId = k.knowledgeId || k.id;

    const html = `
      <div class="modal-overlay" style="position: fixed; inset: 0; z-index: 99999; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.6);">
        <div class="modal-card" style="max-width: 680px; max-height: 90vh; overflow-y: auto;">
          <div class="modal-header">
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="badge badge-gold" style="font-size:12px;">${k.type || 'ナレッジ'}</span>
              <h3 class="modal-title">${this.escapeHtml(k.title || '無題のナレッジ・振り返り')}</h3>
            </div>
            <button class="modal-close">&times;</button>
          </div>
          <div class="modal-body" style="font-size:13.5px; line-height:1.6;">
            <!-- 基本メタ情報 -->
            <div style="background:var(--color-gold-light); border:1px solid var(--color-gold-border); padding:12px 16px; border-radius:6px; margin-bottom:16px; display:grid; grid-template-columns: 1fr 1fr; gap:8px; font-size:12.5px;">
              <div><strong>対象求人:</strong> ${this.escapeHtml(job.companyName || '')} ${this.escapeHtml(job.jobTitle || '')}</div>
              <div><strong>記録者:</strong> ${this.escapeHtml(staffName)}</div>
              <div><strong>記録日時:</strong> ${k.createdAt ? k.createdAt.slice(0,10) : '-'}</div>
              <div><strong>タグ:</strong> ${(k.tags || []).map(t => `<span class="badge badge-navy">${t}</span>`).join(' ') || 'なし'}</div>
            </div>

            <!-- 詳細内容ブロック -->
            ${k.facts ? `<div style="margin-bottom:14px;"><h4 style="font-size:13px; font-weight:700; color:var(--color-navy-main); margin-bottom:4px;">■ 事実・起きたこと (良かった点 / 反応)</h4><div style="background:#F8F6F2; padding:10px 14px; border-radius:4px; white-space:pre-wrap;">${this.escapeHtml(k.facts)}</div></div>` : ''}

            ${k.causes ? `<div style="margin-bottom:14px;"><h4 style="font-size:13px; font-weight:700; color:var(--color-navy-main); margin-bottom:4px;">■ 考えられる原因 (反応が薄かった点)</h4><div style="background:#F8F6F2; padding:10px 14px; border-radius:4px; white-space:pre-wrap;">${this.escapeHtml(k.causes)}</div></div>` : ''}

            ${k.efforts ? `<div style="margin-bottom:14px;"><h4 style="font-size:13px; font-weight:700; color:var(--color-navy-main); margin-bottom:4px;">■ 実施した工夫 (訴求・候補者像)</h4><div style="background:#F8F6F2; padding:10px 14px; border-radius:4px; white-space:pre-wrap;">${this.escapeHtml(k.efforts)}</div></div>` : ''}

            ${k.results ? `<div style="margin-bottom:14px;"><h4 style="font-size:13px; font-weight:700; color:var(--color-navy-main); margin-bottom:4px;">■ 結果・数値変化</h4><div style="background:#F8F6F2; padding:10px 14px; border-radius:4px; white-space:pre-wrap;">${this.escapeHtml(k.results)}</div></div>` : ''}

            ${k.nextActions ? `<div style="margin-bottom:14px;"><h4 style="font-size:13px; font-weight:700; color:var(--color-navy-main); margin-bottom:4px;">■ 次に試す改善アクション・メモ</h4><div style="background:#F8F6F2; padding:10px 14px; border-radius:4px; white-space:pre-wrap;">${this.escapeHtml(k.nextActions)}</div></div>` : ''}
          </div>
          <div class="modal-footer" style="justify-content: space-between;">
            <button id="btn-delete-knw-detail" class="btn btn-danger btn-sm"><i data-lucide="trash-2"></i> このナレッジを削除</button>
            <div style="display:flex; gap:8px;">
              <button class="btn btn-secondary modal-cancel">閉じる</button>
              <button id="btn-edit-knw-detail" class="btn btn-gold"><i data-lucide="edit-3"></i> 編集する</button>
            </div>
          </div>
        </div>
      </div>
    `;

    const mContainer = document.getElementById('modal-container');
    mContainer.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();

    console.log('DETAIL_MODAL_RENDERED', {
      isOpen: true,
      selectedItem: k
    });

    const closeModal = () => mContainer.innerHTML = '';
    mContainer.querySelector('.modal-close').onclick = closeModal;
    mContainer.querySelector('.modal-cancel').onclick = closeModal;

    mContainer.querySelector('#btn-edit-knw-detail').onclick = () => {
      closeModal();
      this.openKnowledgeEditModal(k);
    };

    mContainer.querySelector('#btn-delete-knw-detail').onclick = () => {
      if (confirm('このナレッジ・振り返りを削除しますか？')) {
        try {
          StorageService.deleteKnowledge(targetKnwId, this.currentStaff ? this.currentStaff.staffId : '');
          alert('削除しました。');
          closeModal();
          this.renderCurrentView();
        } catch (err) {
          alert(`削除エラー: ${err.message}`);
        }
      }
    };
  }

  // ナレッジ・振り返り 新規登録 / 編集モーダル
  openKnowledgeEditModal(existingKnw = null) {
    const jobs = StorageService.getActiveJobs();
    const isEdit = Boolean(existingKnw && (existingKnw.knowledgeId || existingKnw.id));

    const html = `
      <div class="modal-overlay">
        <div class="modal-card">
          <div class="modal-header">
            <h3 class="modal-title">${isEdit ? 'ナレッジ・振り返りの編集' : '新規ナレッジ・振り返り登録'}</h3>
            <button class="modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">対象求人</label>
              <select id="knw-job-id" class="form-select">
                ${jobs.map(j => `<option value="${j.jobId}" ${isEdit && existingKnw.jobId === j.jobId ? 'selected' : ''}>${this.escapeHtml(j.companyName)} / ${this.escapeHtml(j.jobTitle)}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">ナレッジ種別</label>
              <select id="knw-type" class="form-select">
                ${KNOWLEDGE_TYPES.map(t => `<option value="${t}" ${isEdit && existingKnw.type === t ? 'selected' : ''}>${t}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">タイトル</label>
              <input type="text" id="knw-title" class="form-control" placeholder="件名・タイトル" value="${isEdit ? this.escapeHtml(existingKnw.title || '') : ''}">
            </div>

            <div class="form-group"><label class="form-label">事実・起きたこと (良かった点)</label><textarea id="knw-facts" class="form-control" rows="2">${isEdit ? this.escapeHtml(existingKnw.facts || '') : ''}</textarea></div>
            <div class="form-group"><label class="form-label">考えられる原因 (反応が悪かった点)</label><textarea id="knw-causes" class="form-control" rows="2">${isEdit ? this.escapeHtml(existingKnw.causes || '') : ''}</textarea></div>
            <div class="form-group"><label class="form-label">実施した工夫 (想定候補者像など)</label><textarea id="knw-efforts" class="form-control" rows="2">${isEdit ? this.escapeHtml(existingKnw.efforts || '') : ''}</textarea></div>
            <div class="form-group"><label class="form-label">結果</label><textarea id="knw-results" class="form-control" rows="2">${isEdit ? this.escapeHtml(existingKnw.results || '') : ''}</textarea></div>
            <div class="form-group"><label class="form-label">次に試す改善アクション</label><textarea id="knw-next" class="form-control" rows="2">${isEdit ? this.escapeHtml(existingKnw.nextActions || '') : ''}</textarea></div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary modal-cancel">キャンセル</button>
            <button id="btn-save-knw" class="btn btn-gold">${isEdit ? '更新を保存する' : '保存する'}</button>
          </div>
        </div>
      </div>
    `;

    const mContainer = document.getElementById('modal-container');
    mContainer.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();

    const closeModal = () => mContainer.innerHTML = '';
    mContainer.querySelector('.modal-close').onclick = closeModal;
    mContainer.querySelector('.modal-cancel').onclick = closeModal;

    mContainer.querySelector('#btn-save-knw').onclick = () => {
      const jobId = mContainer.querySelector('#knw-job-id').value;
      const type = mContainer.querySelector('#knw-type').value;
      const title = mContainer.querySelector('#knw-title').value;

      StorageService.saveKnowledge({
        knowledgeId: isEdit ? existingKnw.knowledgeId : undefined,
        jobId,
        type,
        title,
        facts: mContainer.querySelector('#knw-facts').value,
        causes: mContainer.querySelector('#knw-causes').value,
        efforts: mContainer.querySelector('#knw-efforts').value,
        results: mContainer.querySelector('#knw-results').value,
        nextActions: mContainer.querySelector('#knw-next').value
      }, this.currentStaff ? this.currentStaff.staffId : '');

      closeModal();
      this.renderCurrentView();
    };
  }

  // =========================================================================
  // 6. スカウト文面管理画面
  // =========================================================================
  renderScoutMessagesView(container) {
    const messages = StorageService.getMessages();
    const jobsMap = new Map(StorageService.getJobs().map(j => [j.jobId, j]));

    container.innerHTML = `
      <div class="notice-box">
        <i data-lucide="info"></i>
        <span>返信日基準で集計しているため、文面別の成果は参考値です。</span>
      </div>

      <div class="card">
        <div class="card-header-flex">
          <h3 class="card-title"><i data-lucide="file-text"></i> スカウト文面・バージョン管理 (${messages.length}件)</h3>
          <button id="btn-create-msg" class="btn btn-gold"><i data-lucide="plus"></i> 新規スカウト文面作成</button>
        </div>

        <table class="data-table">
          <thead><tr><th>文面名</th><th>対象求人</th><th>最新バージョン</th><th>ステータス</th><th>操作</th></tr></thead>
          <tbody>
            ${messages.map(m => {
              const job = jobsMap.get(m.jobId);
              const versions = StorageService.getMessageVersions(m.messageId);
              return `
                <tr>
                  <td><strong>${this.escapeHtml(m.title)}</strong></td>
                  <td>${job ? `${this.escapeHtml(job.companyName)} / ${this.escapeHtml(job.jobTitle)}` : '共通文面'}</td>
                  <td><span class="badge badge-gold">Ver.${versions.length}</span></td>
                  <td><span class="badge badge-navy">${m.status}</span></td>
                  <td>
                    <button class="btn btn-secondary btn-sm btn-view-msg-history" data-msg-id="${m.messageId}">バージョン履歴</button>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;

    container.querySelector('#btn-create-msg')?.addEventListener('click', () => {
      this.openMessageEditModal();
    });

    container.querySelectorAll('.btn-view-msg-history').forEach(btn => {
      btn.addEventListener('click', () => {
        const msgId = btn.getAttribute('data-msg-id');
        this.openVersionHistoryModal(msgId);
      });
    });
  }

  openMessageEditModal() {
    const jobs = StorageService.getActiveJobs();
    const html = `
      <div class="modal-overlay">
        <div class="modal-card">
          <div class="modal-header">
            <h3 class="modal-title">新規スカウト文面登録 (Ver.1)</h3>
            <button class="modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">文面名</label>
              <input type="text" id="msg-title" class="form-control" placeholder="例: 法人営業向け 件名訴求Ver">
            </div>
            <div class="form-group">
              <label class="form-label">対象求人 (任意)</label>
              <select id="msg-job-id" class="form-select">
                <option value="">共通文面 (指定なし)</option>
                ${jobs.map(j => `<option value="${j.jobId}">${j.companyName} / ${j.jobTitle}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">件名</label>
              <input type="text" id="msg-subject" class="form-control" placeholder="スカウト件名">
            </div>
            <div class="form-group">
              <label class="form-label">本文</label>
              <textarea id="msg-body" class="form-control" rows="6" placeholder="スカウト本文"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary modal-cancel">キャンセル</button>
            <button id="btn-save-msg" class="btn btn-gold">作成する (Ver.1)</button>
          </div>
        </div>
      </div>
    `;

    const mContainer = document.getElementById('modal-container');
    mContainer.innerHTML = html;

    const closeModal = () => mContainer.innerHTML = '';
    mContainer.querySelector('.modal-close').onclick = closeModal;
    mContainer.querySelector('.modal-cancel').onclick = closeModal;

    mContainer.querySelector('#btn-save-msg').onclick = () => {
      const title = mContainer.querySelector('#msg-title').value;
      const jobId = mContainer.querySelector('#msg-job-id').value;
      const subject = mContainer.querySelector('#msg-subject').value;
      const body = mContainer.querySelector('#msg-body').value;

      if (!title || !subject || !body) {
        alert('文面名、件名、本文は必須項目です。');
        return;
      }

      StorageService.saveMessageWithVersion({ title, jobId }, { subject, body, changeReason: '初回登録' }, this.currentStaff.staffId);
      closeModal();
      this.renderCurrentView();
    };
  }

  openVersionHistoryModal(messageId) {
    const versions = StorageService.getMessageVersions(messageId);

    const html = `
      <div class="modal-overlay">
        <div class="modal-card">
          <div class="modal-header">
            <h3 class="modal-title">文面バージョン履歴</h3>
            <button class="modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <table class="data-table">
              <thead><tr><th>バージョン</th><th>変更理由</th><th>件名</th><th>作成日時</th></tr></thead>
              <tbody>
                ${versions.map(v => `
                  <tr>
                    <td><span class="badge badge-gold">Ver.${v.versionNumber}</span></td>
                    <td>${this.escapeHtml(v.changeReason || '')}</td>
                    <td>${this.escapeHtml(v.subject)}</td>
                    <td>${v.createdAt.slice(0,16)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary modal-cancel">閉じる</button>
          </div>
        </div>
      </div>
    `;

    const mContainer = document.getElementById('modal-container');
    mContainer.innerHTML = html;
    const closeModal = () => mContainer.innerHTML = '';
    mContainer.querySelector('.modal-close').onclick = closeModal;
    mContainer.querySelector('.modal-cancel').onclick = closeModal;
  }

  // =========================================================================
  // 7. データ管理画面 (管理者モード)
  // =========================================================================
  renderDataManagementView(container) {
    if (!this.isAdminMode) {
      container.innerHTML = `
        <div class="card" style="padding: 32px; text-align: center;">
          <h3 style="color:var(--color-danger);">アクセス権限がありません</h3>
          <p style="color:var(--text-secondary); margin-top:8px;">データ管理機能は管理者モードでのみ利用可能です。ヘッダーの「管理者モード」ボタンから認証を行ってください。</p>
        </div>
      `;
      return;
    }

    const counts = {
      users: StorageService.getUsers().length,
      companies: StorageService.getCompanies().length,
      jobs: StorageService.getJobs().length,
      userJobs: StorageService.get(KEYS.USER_JOBS).length,
      results: StorageService.getScoutResults().length,
      knowledge: StorageService.getKnowledgeList().length,
      messages: StorageService.getMessages().length,
      logs: StorageService.getChangeLogs().length
    };

    container.innerHTML = `
      <!-- CSV出力 -->
      <div class="card" style="margin-bottom: 20px;">
        <h3 class="card-title"><i data-lucide="download"></i> 1. CSVエクスポート</h3>
        <p style="font-size:12px; color:var(--text-secondary); margin-top:4px;">すべてのCSVはUTF-8 BOM付きで出力され、日本語版Excelで文字化けせず閲覧できます。</p>

        <h4 style="font-size:13px; font-weight:700; margin-top:16px; color:var(--color-navy-main);">■ 通常利用者・担当者向けエクスポート</h4>
        <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap:10px; margin-top:8px;">
          <button class="btn btn-secondary btn-sm btn-export-csv" data-csv-type="user_scout_detail">選択担当者の実績明細 CSV</button>
          <button class="btn btn-secondary btn-sm btn-export-csv" data-csv-type="user_job_summary">選択担当者の求人別集計 CSV</button>
          <button class="btn btn-secondary btn-sm btn-export-csv" data-csv-type="user_media_summary">選択担当者の媒体別集計 CSV</button>
          <button class="btn btn-secondary btn-sm btn-export-csv" data-csv-type="team_summary">チーム全体集計 CSV</button>
          <button class="btn btn-secondary btn-sm btn-export-csv" data-csv-type="jobs_list">求人情報マスタ CSV</button>
          <button class="btn btn-secondary btn-sm btn-export-csv" data-csv-type="knowledge_all">共有ナレッジ CSV</button>
        </div>

        <h4 style="font-size:13px; font-weight:700; margin-top:20px; color:var(--color-gold-hover);">■ 管理者専用 全テーブルエクスポート</h4>
        <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap:10px; margin-top:8px;">
          <button class="btn btn-gold btn-sm btn-export-csv" data-csv-type="all_scout_detail">全実績 (手動・自動・インバウンド) CSV</button>
          <button class="btn btn-gold btn-sm btn-export-csv" data-csv-type="staff_scout_summary">担当者別実績 CSV</button>
          <button class="btn btn-gold btn-sm btn-export-csv" data-csv-type="all_job_summary">求人別集計 CSV</button>
          <button class="btn btn-gold btn-sm btn-export-csv" data-csv-type="all_media_summary">媒体別集計 CSV</button>
          <button class="btn btn-gold btn-sm btn-export-csv" data-csv-type="user_master">担当者マスタ CSV</button>
          <button class="btn btn-gold btn-sm btn-export-csv" data-csv-type="company_job_master">求人マスタ CSV</button>
          <button class="btn btn-gold btn-sm btn-export-csv" data-csv-type="knowledge_all_admin">ナレッジ CSV</button>
          <button class="btn btn-gold btn-sm btn-export-csv" data-csv-type="scout_messages_all">スカウト文面 CSV</button>
          <button class="btn btn-gold btn-sm btn-export-csv" data-csv-type="change_logs_all">変更履歴 CSV</button>
        </div>
      </div>

      <!-- JSONバックアップ -->
      <div class="card" style="margin-bottom: 20px;">
        <h3 class="card-title"><i data-lucide="archive"></i> 2. 全データ JSONバックアップ</h3>
        <p style="font-size:12px; color:var(--text-secondary); margin-top:4px;">全12コレクションのデータとメタデータ (作成日時・件数・バージョン 1.0) を含んだJSONファイルを生成します。</p>

        <div style="background:#F8F6F2; padding:12px 16px; border-radius:4px; margin:16px 0; font-size:12.5px; display:flex; flex-wrap:wrap; gap:16px;">
          <span>担当者: <strong>${counts.users}</strong> 件</span>
          <span>企業: <strong>${counts.companies}</strong> 件</span>
          <span>求人: <strong>${counts.jobs}</strong> 件</span>
          <span>担当設定: <strong>${counts.userJobs}</strong> 件</span>
          <span>スカウト実績: <strong>${counts.results}</strong> 件</span>
          <span>ナレッジ: <strong>${counts.knowledge}</strong> 件</span>
          <span>スカウト文面: <strong>${counts.messages}</strong> 件</span>
          <span>変更履歴: <strong>${counts.logs}</strong> 件</span>
        </div>

        <button id="btn-export-json" class="btn btn-gold"><i data-lucide="download-cloud"></i> 全データをJSONバックアップ</button>
      </div>

      <!-- JSON復元 -->
      <div class="card" style="margin-bottom: 20px;">
        <h3 class="card-title"><i data-lucide="upload-cloud"></i> 3. JSONバックアップからの復元</h3>
        <p style="font-size:12px; color:var(--text-secondary); margin-top:4px;">出力したJSONバックアップファイルからデータを上書き復元します。</p>

        <div class="form-group" style="margin-top:16px; max-width:500px;">
          <label class="form-label">バックアップJSONファイルを選択</label>
          <input type="file" id="json-restore-file" accept=".json" class="form-control">
        </div>

        <div id="json-restore-preview" style="display:none; background:#F7FAFC; border:1px solid #E2E8F0; padding:16px; border-radius:4px; margin-top:16px;"></div>
      </div>

      <!-- 全データリセット -->
      <div class="card" style="border: 2px solid var(--color-danger); background-color: #FFF5F5;">
        <h3 class="card-title" style="color:var(--color-danger);"><i data-lucide="alert-triangle"></i> 4. 全データリセット (危険な操作)</h3>
        <p style="font-size:12px; color:#C53030; margin-top:4px;">※注意：業務データが削除されます。リセット実行前に必ずJSONバックアップを取得してください。サンプルデータは自動生成されません。</p>

        <div style="margin-top:16px; background:#FFFFFF; padding:16px; border-radius:4px; border:1px solid #FEB2B2;">
          <h4 style="font-size:13px; font-weight:700; color:var(--color-navy-main); margin-bottom:10px;">削除・保持するデータの選択</h4>
          <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap:8px; font-size:13px;">
            <label><input type="checkbox" id="reset-keep-users" checked> 担当者マスタを残す</label>
            <label><input type="checkbox" id="reset-keep-media" checked> 媒体マスタを残す</label>
            <label style="color:#C53030;"><input type="checkbox" id="reset-del-jobs" checked disabled> 企業・求人マスタを削除</label>
            <label style="color:#C53030;"><input type="checkbox" id="reset-del-results" checked disabled> スカウト実績を削除</label>
            <label style="color:#C53030;"><input type="checkbox" id="reset-del-knowledge" checked disabled> ナレッジを削除</label>
            <label style="color:#C53030;"><input type="checkbox" id="reset-del-messages" checked disabled> スカウト文面を削除</label>
          </div>
        </div>

        <div style="display:flex; gap:12px; margin-top:16px; flex-wrap:wrap;">
          <button id="btn-pre-reset-backup" class="btn btn-secondary btn-sm"><i data-lucide="shield"></i> リセット前バックアップを取得</button>
          <button id="btn-open-reset-modal" class="btn btn-danger"><i data-lucide="trash-2"></i> 全データリセット画面を開く</button>
        </div>
      </div>
    `;

    container.querySelectorAll('.btn-export-csv').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.getAttribute('data-csv-type');
        StorageService.exportCSV(type, this.currentStaff ? this.currentStaff.staffId : '');
      });
    });

    container.querySelector('#btn-export-json')?.addEventListener('click', () => {
      StorageService.exportJSONBackup();
      alert('JSONバックアップを出力しました。');
    });

    const fileInput = container.querySelector('#json-restore-file');
    fileInput?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        const jsonStr = event.target.result;
        const validation = StorageService.validateJSONBackup(jsonStr);
        const previewEl = container.querySelector('#json-restore-preview');
        previewEl.style.display = 'block';

        if (!validation.valid) {
          previewEl.innerHTML = `
            <div style="color:var(--color-danger); font-weight:700;"><i data-lucide="x-circle"></i> このバックアップは現在のアプリでは復元できません。</div>
            <p style="font-size:12px; color:var(--text-secondary); margin-top:4px;">${validation.error}</p>
          `;
        } else {
          const meta = validation.metadata;
          previewEl.innerHTML = `
            <h4 style="font-weight:700; color:var(--color-navy-main);"><i data-lucide="check-circle" style="color:var(--color-success);"></i> 有効なバックアップファイルが確認されました</h4>
            <div style="font-size:12px; color:var(--text-secondary); margin-top:6px; line-height:1.6;">
              <p>作成日時: <strong>${meta.backupCreatedAt}</strong> (バージョン: ${meta.dataFormatVersion})</p>
              <p>復元予定件数: 担当者 ${meta.counts.users || 0}件, 企業 ${meta.counts.companies || 0}件, 求人 ${meta.counts.jobs || 0}件, 実績 ${meta.counts.scoutResults || 0}件, ナレッジ ${meta.counts.knowledge || 0}件</p>
            </div>
            <div style="margin-top:12px; display:flex; gap:10px;">
              <button id="btn-pre-restore-backup" class="btn btn-secondary btn-sm">復元前バックアップを取得</button>
              <button id="btn-execute-restore-modal" class="btn btn-gold btn-sm">復元手続きへ進む</button>
            </div>
          `;

          previewEl.querySelector('#btn-pre-restore-backup')?.addEventListener('click', () => {
            StorageService.exportJSONBackup();
            alert('復元前の安全バックアップを取得しました。');
          });

          previewEl.querySelector('#btn-execute-restore-modal')?.addEventListener('click', () => {
            this.openRestoreConfirmModal(jsonStr);
          });
        }
        if (window.lucide) window.lucide.createIcons();
      };
      reader.readAsText(file);
    });

    container.querySelector('#btn-open-staff-manager')?.addEventListener('click', () => {
      this.openStaffManagerModal();
    });

    container.querySelector('#btn-delete-demo-data')?.addEventListener('click', () => {
      if (confirm('デモ・サンプルデータを一括削除しますか？\n（本番の実績や登録データは保護されます）')) {
        try {
          StorageService.deleteDemoData(this.currentStaff ? this.currentStaff.staffId : '');
          alert('デモデータの削除が完了しました。');
          this.renderCurrentView();
        } catch (err) {
          alert(`削除エラー: ${err.message}`);
        }
      }
    });

    container.querySelector('#btn-pre-reset-backup')?.addEventListener('click', () => {
      StorageService.exportJSONBackup();
      alert('リセット前の安全バックアップを取得しました。');
    });

    container.querySelector('#btn-open-reset-modal')?.addEventListener('click', () => {
      const keepUsers = container.querySelector('#reset-keep-users').checked;
      const keepMedia = container.querySelector('#reset-keep-media').checked;
      this.openFullResetConfirmModal({ keepUsers, keepMedia });
    });
  }

  openRestoreConfirmModal(jsonStr) {
    const html = `
      <div class="modal-overlay">
        <div class="modal-card" style="max-width: 480px;">
          <div class="modal-header">
            <h3 class="modal-title">JSONバックアップからの復元認証</h3>
            <button class="modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">管理者パスワード (${ADMIN_PASSWORD})</label>
              <input type="password" id="restore-pass-input" class="form-control">
            </div>
            <div class="form-group">
              <label class="form-label">確認文字列「${RESTORE_CONFIRM_TEXT}」を正確に入力</label>
              <input type="text" id="restore-confirm-text-input" class="form-control" placeholder="${RESTORE_CONFIRM_TEXT}">
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary modal-cancel">キャンセル</button>
            <button id="btn-submit-json-restore" class="btn btn-gold">復元を実行する</button>
          </div>
        </div>
      </div>
    `;

    const mContainer = document.getElementById('modal-container');
    mContainer.innerHTML = html;

    const closeModal = () => mContainer.innerHTML = '';
    mContainer.querySelector('.modal-close').onclick = closeModal;
    mContainer.querySelector('.modal-cancel').onclick = closeModal;

    mContainer.querySelector('#btn-submit-json-restore').onclick = () => {
      const pass = mContainer.querySelector('#restore-pass-input').value;
      const confirmText = mContainer.querySelector('#restore-confirm-text-input').value;

      try {
        StorageService.restoreFromJSONBackup(jsonStr, pass, confirmText, this.currentStaff ? this.currentStaff.staffId : '');
        alert('JSONバックアップからの復元が完了しました。');
        closeModal();
        this.renderCurrentView();
      } catch (err) {
        alert(`復元エラー: ${err.message}`);
      }
    };
  }

  openFullResetConfirmModal(options) {
    const counts = {
      users: StorageService.getUsers().length,
      companies: StorageService.getCompanies().length,
      jobs: StorageService.getJobs().length,
      results: StorageService.getScoutResults().length,
      knowledge: StorageService.getKnowledgeList().length
    };

    const html = `
      <div class="modal-overlay">
        <div class="modal-card" style="max-width: 520px; border-top: 4px solid var(--color-danger);">
          <div class="modal-header">
            <h3 class="modal-title" style="color:var(--color-danger);"><i data-lucide="alert-triangle"></i> 全データリセットの最終確認</h3>
            <button class="modal-close">&times;</button>
          </div>
          <div class="modal-body" style="font-size:13px; line-height:1.6;">
            <div style="background:#FFF5F5; border:1px solid #FEB2B2; padding:12px; border-radius:4px; margin-bottom:16px; color:#C53030;">
              <strong>この操作は元に戻せません。選択した業務データが削除されます。</strong>
            </div>

            <p style="margin-bottom:8px;">削除予定件数:</p>
            <ul style="margin-bottom:16px; padding-left:20px; color:var(--text-secondary);">
              <li>企業・求人データ: 企業${counts.companies}件 / 求人${counts.jobs}件 ➔ 削除</li>
              <li>スカウト実績: ${counts.results}件 ➔ 削除</li>
              <li>ナレッジ・文面: ${counts.knowledge}件 ➔ 削除</li>
              <li>担当者マスタ: ${options.keepUsers ? '保持する (削除しません)' : `${counts.users}件 ➔ 削除`}</li>
              <li>媒体マスタ: ${options.keepMedia ? '保持する (削除しません)' : '初期値にリセット'}</li>
            </ul>

            <div class="form-group">
              <label class="form-label">管理者パスワードを入力 (${ADMIN_PASSWORD})</label>
              <input type="password" id="reset-pass-input" class="form-control">
            </div>

            <div class="form-group">
              <label class="form-label">確認文字列「${RESET_CONFIRM_TEXT}」を正確に入力</label>
              <input type="text" id="reset-confirm-text-input" class="form-control" placeholder="${RESET_CONFIRM_TEXT}">
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary modal-cancel">キャンセル</button>
            <button id="btn-submit-full-reset" class="btn btn-danger">全データリセットを実行する</button>
          </div>
        </div>
      </div>
    `;

    const mContainer = document.getElementById('modal-container');
    mContainer.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();

    const closeModal = () => mContainer.innerHTML = '';
    mContainer.querySelector('.modal-close').onclick = closeModal;
    mContainer.querySelector('.modal-cancel').onclick = closeModal;

    mContainer.querySelector('#btn-submit-full-reset').onclick = () => {
      const pass = mContainer.querySelector('#reset-pass-input').value;
      const confirmText = mContainer.querySelector('#reset-confirm-text-input').value;

      try {
        // 削除直前に自動でJSONバックアップを取得（ファイルダウンロード）
        try {
          StorageService.exportJSONBackup();
        } catch (bErr) {
          console.warn('リセット前自動バックアップ処理警告:', bErr);
        }

        StorageService.resetAllData(pass, confirmText, options, this.currentStaff ? this.currentStaff.staffId : '');
        alert('自動バックアップを出力し、データの選択リセットが完了しました。');
        closeModal();
        this.renderCurrentView();
      } catch (err) {
        alert(`リセットエラー: ${err.message}`);
      }
    };
  }

  openStaffSelectionModal(isForce = false) {
    const activeUsers = StorageService.getActiveUsers();
    const html = `
      <div class="modal-overlay" style="z-index: 2000;">
        <div class="modal-card" style="max-width: 480px;">
          <div class="modal-header">
            <h3 class="modal-title">利用する担当者を選択してください</h3>
            ${!isForce ? '<button class="modal-close">&times;</button>' : ''}
          </div>
          <div class="modal-body">
            <p style="font-size:13px; color:var(--text-secondary); margin-bottom:16px;">
              担当者名を選択して操作を開始します。
            </p>
            <div class="form-group">
              <label class="form-label">担当者一覧</label>
              <select id="modal-staff-select" class="form-select">
                ${activeUsers.map(u => `<option value="${u.staffId}">${u.name} (${u.adminRole === 'admin' ? '管理者' : '一般メンバー'})</option>`).join('')}
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button id="btn-select-staff-submit" class="btn btn-gold" style="width:100%;">選択して開始する</button>
          </div>
        </div>
      </div>
    `;

    const mContainer = document.getElementById('modal-container');
    mContainer.innerHTML = html;

    const btnSubmit = mContainer.querySelector('#btn-select-staff-submit');
    btnSubmit.onclick = () => {
      const selectedId = mContainer.querySelector('#modal-staff-select').value;
      const user = StorageService.getUserById(selectedId);
      if (user && user.status === 'active') {
        StorageService.setCurrentStaffId(selectedId);
        this.currentStaff = user;
        this.updateHeaderStaffDisplay();
        mContainer.innerHTML = '';
        this.dailyEntrySearchKeyword = '';
        this.dailyEntryFilterType = 'all';
        this.dailyEntrySortBy = 'standard';
        this.switchView('daily-entry');
      }
    };
  }

  openStaffManagerModal() {
    const users = StorageService.getUsers();

    const html = `
      <div class="modal-overlay">
        <div class="modal-card" style="max-width: 780px;">
          <div class="modal-header">
            <h3 class="modal-title"><i data-lucide="users"></i> 担当者マスタ管理</h3>
            <button class="modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
              <span style="font-size:13px; color:var(--text-secondary);">全担当者一覧 (${users.length}名)</span>
              <button id="btn-open-create-staff" class="btn btn-gold btn-sm"><i data-lucide="user-plus"></i> 新規担当者を登録</button>
            </div>

            <div style="max-height: 400px; overflow-y: auto; border:1px solid var(--border-light); border-radius:4px;">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>担当者名</th>
                    <th>利用状態</th>
                    <th>管理者区分</th>
                    <th>作成日時</th>
                    <th>更新日時</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  ${users.map(u => `
                    <tr>
                      <td><strong>${this.escapeHtml(u.name)}</strong></td>
                      <td>
                        <span class="badge ${u.status === 'active' ? 'badge-success' : 'badge-danger'}">
                          ${u.status === 'active' ? '利用中' : '利用停止'}
                        </span>
                      </td>
                      <td>
                        <span class="badge ${u.adminRole === 'admin' ? 'badge-gold' : 'badge-gray'}">
                          ${u.adminRole === 'admin' ? '管理者' : '一般メンバー'}
                        </span>
                      </td>
                      <td style="font-size:11px;">${u.createdAt.slice(0,16)}</td>
                      <td style="font-size:11px;">${u.updatedAt.slice(0,16)}</td>
                      <td>
                        <button class="btn btn-secondary btn-sm btn-edit-staff" data-staff-id="${u.staffId}">編集</button>
                        ${u.status === 'active' ? `
                          <button class="btn btn-danger btn-sm btn-toggle-staff-status" data-staff-id="${u.staffId}" data-target-status="inactive">利用停止</button>
                        ` : `
                          <button class="btn btn-gold btn-sm btn-toggle-staff-status" data-staff-id="${u.staffId}" data-target-status="active">利用再開</button>
                        `}
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary modal-cancel">閉じる</button>
          </div>
        </div>
      </div>
    `;

    const mContainer = document.getElementById('modal-container');
    mContainer.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();

    const closeModal = () => mContainer.innerHTML = '';
    mContainer.querySelector('.modal-close').onclick = closeModal;
    mContainer.querySelector('.modal-cancel').onclick = closeModal;

    mContainer.querySelector('#btn-open-create-staff')?.addEventListener('click', () => {
      this.openStaffEditModal(null);
    });

    mContainer.querySelectorAll('.btn-edit-staff').forEach(btn => {
      btn.addEventListener('click', () => {
        const staffId = btn.getAttribute('data-staff-id');
        this.openStaffEditModal(StorageService.getUserById(staffId));
      });
    });

    mContainer.querySelectorAll('.btn-toggle-staff-status').forEach(btn => {
      btn.addEventListener('click', () => {
        const staffId = btn.getAttribute('data-staff-id');
        const targetStatus = btn.getAttribute('data-target-status');
        const staff = StorageService.getUserById(staffId);

        if (!staff) return;

        if (targetStatus === 'inactive') {
          if (confirm('この担当者を利用停止にしますか？')) {
            StorageService.toggleUserStatus(staffId, 'inactive', this.currentStaff ? this.currentStaff.staffId : '');
            this.openStaffManagerModal();
          }
        } else {
          StorageService.toggleUserStatus(staffId, 'active', this.currentStaff ? this.currentStaff.staffId : '');
          alert(`担当者「${staff.name}」の利用を再開しました。`);
          this.openStaffManagerModal();
        }
      });
    });
  }

  openStaffEditModal(staff = null) {
    const isEdit = Boolean(staff);
    const html = `
      <div class="modal-overlay" style="z-index: 2100;">
        <div class="modal-card" style="max-width: 440px;">
          <div class="modal-header">
            <h3 class="modal-title">${isEdit ? '担当者情報の編集' : '新規担当者登録'}</h3>
            <button class="modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">担当者名 <span class="badge badge-danger">必須</span></label>
              <input type="text" id="staff-modal-name" class="form-control" value="${isEdit ? this.escapeHtml(staff.name) : ''}" placeholder="例: 尾﨑優理">
            </div>
            <div class="form-group">
              <label class="form-label">利用状態</label>
              <select id="staff-modal-status" class="form-select">
                <option value="active" ${!isEdit || staff.status === 'active' ? 'selected' : ''}>利用中</option>
                <option value="inactive" ${isEdit && staff.status === 'inactive' ? 'selected' : ''}>利用停止</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">管理者区分</label>
              <select id="staff-modal-role" class="form-select">
                <option value="member" ${!isEdit || staff.adminRole === 'member' ? 'selected' : ''}>一般メンバー</option>
                <option value="admin" ${isEdit && staff.adminRole === 'admin' ? 'selected' : ''}>管理者</option>
              </select>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary modal-cancel">キャンセル</button>
            <button id="btn-save-staff-submit" class="btn btn-gold">保存する</button>
          </div>
        </div>
      </div>
    `;

    const mContainer = document.getElementById('modal-container');
    mContainer.innerHTML = html;

    const restorePrevModal = () => {
      this.openStaffManagerModal();
    };

    mContainer.querySelector('.modal-close').onclick = restorePrevModal;
    mContainer.querySelector('.modal-cancel').onclick = restorePrevModal;

    mContainer.querySelector('#btn-save-staff-submit').onclick = () => {
      const name = mContainer.querySelector('#staff-modal-name').value.trim();
      const status = mContainer.querySelector('#staff-modal-status').value;
      const adminRole = mContainer.querySelector('#staff-modal-role').value;

      if (!name) {
        alert('担当者名を入力してください。');
        return;
      }

      const users = StorageService.getUsers();
      const duplicateExists = users.some(u => u.name === name && (!isEdit || u.staffId !== staff.staffId));
      if (duplicateExists) {
        if (!confirm('同じ名前の担当者が登録されています。登録を続けますか？')) {
          return;
        }
      }

      StorageService.saveUser({
        staffId: isEdit ? staff.staffId : '',
        name,
        status,
        adminRole
      }, this.currentStaff ? this.currentStaff.staffId : '');

      alert(isEdit ? '担当者情報を更新しました。' : '担当者を登録しました。');
      this.openStaffManagerModal();
    };
  }

  openJobEditModal(job = null) {
    const isEdit = Boolean(job);
    const targetAgesSelected = isEdit && Array.isArray(job.targetAge) ? job.targetAge : [];
    const salaryRangesSelected = isEdit && Array.isArray(job.salaryRange) ? job.salaryRange : [];
    const editingJobId = isEdit ? job.jobId : '';

    const html = `
      <div class="modal-overlay">
        <div class="modal-card" style="max-width: 680px;">
          <div class="modal-header">
            <h3 class="modal-title">${isEdit ? '求人情報の編集' : '新規求人登録'}</h3>
            <button class="modal-close">&times;</button>
          </div>
          <div class="modal-body" style="max-height: 75vh; overflow-y: auto;">
            ${isEdit ? `
              <div style="font-size:12px; color:var(--text-secondary); margin-bottom:12px; background:#EDF2F7; padding:6px 12px; border-radius:4px;">
                編集対象求人ID: <code>${editingJobId}</code>
              </div>
            ` : ''}

            <div class="form-group">
              <label class="form-label">1. 企業名 <span class="badge badge-danger">必須</span></label>
              <input type="text" id="job-company" class="form-control" value="${isEdit ? this.escapeHtml(job.companyName) : ''}" placeholder="例: 株式会社サンクスパートナーズ">
            </div>

            <div class="form-group">
              <label class="form-label">1-2. 企業名よみ (任意・ひらがな/カタカナ)</label>
              <input type="text" id="job-company-kana" class="form-control" value="${isEdit ? this.escapeHtml(job.companyNameKana || '') : ''}" placeholder="例: さんくすぱーとなーず">
            </div>

            <div class="form-group">
              <label class="form-label">2. 求人名 <span class="badge badge-danger">必須</span></label>
              <input type="text" id="job-title" class="form-control" value="${isEdit ? this.escapeHtml(job.jobTitle) : ''}" placeholder="例: 法人営業職（幹部候補）">
            </div>

            <div class="form-group">
              <label class="form-label">3. 業種</label>
              <select id="job-industry" class="form-select">
                <option value="">未選択</option>
                ${INDUSTRIES.map(i => `<option value="${i}" ${isEdit && job.industry === i ? 'selected' : ''}>${i}</option>`).join('')}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">4. 職種</label>
              <select id="job-position" class="form-select">
                <option value="">未選択</option>
                ${POSITIONS.map(p => `<option value="${p}" ${isEdit && job.position === p ? 'selected' : ''}>${p}</option>`).join('')}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">5. ステータス</label>
              <select id="job-status" class="form-select">
                ${JOB_STATUSES.map(s => `<option value="${s}" ${isEdit && job.status === s ? 'selected' : ''}>${s}</option>`).join('')}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">6. 対象年齢 (複数選択可)</label>
              <div style="display:flex; gap:16px; font-size:13px; margin-top:4px;">
                ${TARGET_AGES.map(a => `
                  <label style="cursor:pointer; display:inline-flex; align-items:center; gap:4px;">
                    <input type="checkbox" class="chk-job-age" value="${a}" ${targetAgesSelected.includes(a) ? 'checked' : ''}> ${a}
                  </label>
                `).join('')}
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">7. 役職</label>
              <select id="job-role" class="form-select">
                <option value="">未選択</option>
                ${EXECUTIVE_ROLES.map(r => `<option value="${r}" ${isEdit && job.role === r ? 'selected' : ''}>${r}</option>`).join('')}
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">8. 年収帯 (複数選択可)</label>
              <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:8px; font-size:13px; margin-top:4px;">
                ${SALARY_RANGES.map(s => `
                  <label style="cursor:pointer; display:inline-flex; align-items:center; gap:4px;">
                    <input type="checkbox" class="chk-job-salary" value="${s}" ${salaryRangesSelected.includes(s) ? 'checked' : ''}> ${s}
                  </label>
                `).join('')}
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary modal-cancel">キャンセル</button>
            <button id="btn-save-job-submit" class="btn btn-gold">${isEdit ? '変更内容を保存する' : '求人を登録する'}</button>
          </div>
        </div>
      </div>
    `;

    const mContainer = document.getElementById('modal-container');
    mContainer.innerHTML = html;
    const closeModal = () => mContainer.innerHTML = '';
    mContainer.querySelector('.modal-close').onclick = closeModal;
    mContainer.querySelector('.modal-cancel').onclick = closeModal;

    const submitBtn = mContainer.querySelector('#btn-save-job-submit');
    submitBtn.onclick = () => {
      if (submitBtn.disabled) return;

      const companyName = mContainer.querySelector('#job-company').value.trim();
      const companyNameKana = mContainer.querySelector('#job-company-kana').value.trim();
      const jobTitle = mContainer.querySelector('#job-title').value.trim();

      if (!companyName || !jobTitle) {
        alert('企業名と求人名は必須です。');
        return;
      }

      const allJobs = StorageService.getJobs();
      const duplicate = allJobs.some(j => j.companyName === companyName && j.jobTitle === jobTitle && (!isEdit || j.jobId !== editingJobId));

      if (duplicate && !isEdit) {
        if (!confirm('同じ企業名・求人名の求人が登録されています。別求人として登録しますか？')) {
          return;
        }
      }

      submitBtn.disabled = true;
      submitBtn.textContent = '登録中…';

      try {
        const targetAge = Array.from(mContainer.querySelectorAll('.chk-job-age:checked')).map(el => el.value);
        const salaryRange = Array.from(mContainer.querySelectorAll('.chk-job-salary:checked')).map(el => el.value);
        const role = mContainer.querySelector('#job-role').value;

        const savedJob = StorageService.saveJob({
          jobId: editingJobId,
          companyName,
          companyNameKana,
          jobTitle,
          industry: mContainer.querySelector('#job-industry').value,
          position: mContainer.querySelector('#job-position').value,
          status: mContainer.querySelector('#job-status').value,
          targetAge,
          role,
          salaryRange
        }, this.currentStaff ? this.currentStaff.staffId : '');

        alert(isEdit ? '求人情報を更新（保存）しました。' : '新しい求人を正常に登録（追加）しました。');
        closeModal();

        // 即時（リアルタイム）画面反映
        this.renderCurrentView();
      } catch (err) {
        alert(`登録エラー: ${err.message}`);
        submitBtn.disabled = false;
        submitBtn.textContent = isEdit ? '変更内容を保存する' : '求人を登録する';
      }
    };
  }

  openManageMyJobsModal() {
    const myJobs = StorageService.getUserJobs(this.currentStaff.staffId);
    const allJobs = StorageService.getActiveJobs();
    const myJobIds = new Set(myJobs.map(uj => uj.jobId));

    const html = `
      <div class="modal-overlay">
        <div class="modal-card" style="max-width: 700px;">
          <div class="modal-header">
            <h3 class="modal-title">自分の担当求人を追加・整理</h3>
            <button class="modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <h4 style="font-size:13px; font-weight:700; margin-bottom:8px;">未担当の求人を追加</h4>
            <div style="max-height: 200px; overflow-y: auto; border:1px solid var(--border-light); border-radius:4px; margin-bottom:20px;">
              <table class="data-table">
                <tbody>
                  ${allJobs.map(j => `
                    <tr>
                      <td><strong>${this.escapeHtml(j.companyName)}</strong> / ${this.escapeHtml(j.jobTitle)}</td>
                      <td style="text-align:right;">
                        ${myJobIds.has(j.jobId) ? '<span class="badge badge-gray">追加済み</span>' : `
                          <button class="btn btn-gold btn-sm btn-modal-add-job" data-job-id="${j.jobId}">追加</button>
                        `}
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <h4 style="font-size:13px; font-weight:700; margin-bottom:8px;">担当中の求人（非表示・再表示）</h4>
            <div style="max-height: 200px; overflow-y: auto; border:1px solid var(--border-light); border-radius:4px;">
              <table class="data-table">
                <tbody>
                  ${myJobs.map(uj => {
                    const job = StorageService.getJobById(uj.jobId);
                    if (!job) return '';
                    return `
                      <tr>
                        <td><strong>${this.escapeHtml(job.companyName)}</strong> / ${this.escapeHtml(job.jobTitle)}</td>
                        <td>${uj.hidden ? '<span class="badge badge-warning">非表示中</span>' : '<span class="badge badge-success">表示中</span>'}</td>
                        <td style="text-align:right;">
                          <button class="btn btn-secondary btn-sm btn-modal-toggle-hide" data-staff-job-id="${uj.staffJobId}" data-hidden="${uj.hidden}">
                            ${uj.hidden ? '再表示する' : '非表示にする'}
                          </button>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary modal-cancel">閉じる</button>
          </div>
        </div>
      </div>
    `;

    const mContainer = document.getElementById('modal-container');
    mContainer.innerHTML = html;

    const closeModal = () => mContainer.innerHTML = '';
    mContainer.querySelector('.modal-close').onclick = closeModal;
    mContainer.querySelector('.modal-cancel').onclick = closeModal;

    mContainer.querySelectorAll('.btn-modal-add-job').forEach(btn => {
      btn.onclick = () => {
        const jobId = btn.getAttribute('data-job-id');
        StorageService.addUserJob(this.currentStaff.staffId, jobId);
        this.openManageMyJobsModal();
      };
    });

    mContainer.querySelectorAll('.btn-modal-toggle-hide').forEach(btn => {
      btn.onclick = () => {
        const staffJobId = btn.getAttribute('data-staff-job-id');
        const hidden = btn.getAttribute('data-hidden') === 'true';
        StorageService.updateUserJob(staffJobId, { hidden: !hidden });
        this.openManageMyJobsModal();
      };
    });
  }

  openAdminPasswordModal() {
    const html = `
      <div class="modal-overlay">
        <div class="modal-card" style="max-width: 400px;">
          <div class="modal-header">
            <h3 class="modal-title">管理者パスワード認証</h3>
            <button class="modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">管理者パスワードを入力してください</label>
              <input type="password" id="admin-pass-input" class="form-control">
              <div id="admin-pass-error" style="color:var(--color-danger); font-size:12px; margin-top:4px; display:none;">パスワードが一致しません。</div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary modal-cancel">キャンセル</button>
            <button id="btn-admin-login-submit" class="btn btn-gold">認証する</button>
          </div>
        </div>
      </div>
    `;

    const mContainer = document.getElementById('modal-container');
    mContainer.innerHTML = html;
    const closeModal = () => mContainer.innerHTML = '';
    mContainer.querySelector('.modal-close').onclick = closeModal;
    mContainer.querySelector('.modal-cancel').onclick = closeModal;

    mContainer.querySelector('#btn-admin-login-submit').onclick = () => {
      const pass = mContainer.querySelector('#admin-pass-input').value;
      if (pass === ADMIN_PASSWORD) {
        this.isAdminMode = true;
        closeModal();
        document.getElementById('admin-banner-container').style.display = 'block';

        const navContainer = document.querySelector('.sidebar-nav');
        if (navContainer && !navContainer.querySelector('[data-view="data-management"]')) {
          const item = document.createElement('a');
          item.className = 'nav-item';
          item.setAttribute('data-view', 'data-management');
          item.href = '#data-management';
          item.innerHTML = '<i data-lucide="database"></i> <span>データ管理 (管理者)</span>';
          item.addEventListener('click', (e) => {
            e.preventDefault();
            this.switchView('data-management');
          });
          navContainer.appendChild(item);
          if (window.lucide) window.lucide.createIcons();
        }

        // 管理者画面へ即時コンポーネント切り替え
        this.switchView('data-management');
      } else {
        mContainer.querySelector('#admin-pass-error').style.display = 'block';
      }
    };
  }

  exitAdminMode() {
    this.isAdminMode = false;
    document.getElementById('admin-banner-container').style.display = 'none';

    const item = document.querySelector('.sidebar-nav [data-view="data-management"]');
    if (item) item.remove();

    if (this.currentView === 'data-management') {
      this.switchView('daily-entry');
    } else {
      this.renderCurrentView();
    }
    alert('管理者モードを終了しました。');
  }

  openUsageGuideModal() {
    const html = `
      <div class="modal-overlay">
        <div class="modal-card" style="max-width: 680px;">
          <div class="modal-header">
            <h3 class="modal-title">使い方ガイド</h3>
            <button class="modal-close">&times;</button>
          </div>
          <div class="modal-body" style="font-size:13px; line-height:1.7;">
            <h4>■ ツールの目的と運用原則</h4>
            <p>本ツールは候補者個人情報を保存せず、<strong>「担当者 × 求人 × 日付 × 媒体」</strong>単位でスカウト実績・返信数・ナレッジを一元管理します。</p>
            <h4 style="margin-top:12px;">■ 企業の注力ランク</h4>
            <p><strong>注力ランク（SS, S, A, B, 未設定）</strong>は社内でのスカウト活動の優先度を表す項目です。同じ企業の求人にはすべて同じランクが適用され、管理者モードから一括変更可能です。</p>
            <h4 style="margin-top:12px;">■ 並び順と検索</h4>
            <p>求人マスタおよび本日の実績入力画面は、デフォルトで<strong>「企業名よみ / 企業名（五十音順） → 求人名順」</strong>で表示されます。実績入力画面では固定求人が常に最上部に表示されます。</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary modal-cancel">閉じる</button>
          </div>
        </div>
      </div>
    `;

    const mContainer = document.getElementById('modal-container');
    mContainer.innerHTML = html;
    const closeModal = () => mContainer.innerHTML = '';
    mContainer.querySelector('.modal-close').onclick = closeModal;
    mContainer.querySelector('.modal-cancel').onclick = closeModal;
  }

  openAppInfoModal() {
    const html = `
      <div class="modal-overlay">
        <div class="modal-card" style="max-width: 480px;">
          <div class="modal-header">
            <h3 class="modal-title">アプリ情報</h3>
            <button class="modal-close">&times;</button>
          </div>
          <div class="modal-body" style="font-size:13px;">
            <p><strong>アプリ名:</strong> サンクスパートナーズ スカウト実績・求人管理一元化ツール</p>
            <p><strong>バージョン:</strong> ${APP_VERSION}</p>
            <p><strong>データ形式バージョン:</strong> ${DATA_FORMAT_VERSION}</p>
            <p><strong>開発元:</strong> 株式会社サンクスパートナーズ</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary modal-cancel">閉じる</button>
          </div>
        </div>
      </div>
    `;

    const mContainer = document.getElementById('modal-container');
    mContainer.innerHTML = html;
    const closeModal = () => mContainer.innerHTML = '';
    mContainer.querySelector('.modal-close').onclick = closeModal;
    mContainer.querySelector('.modal-cancel').onclick = closeModal;
  }

  openNotificationsModal() {
    const list = StorageService.getNotifications(this.currentStaff ? this.currentStaff.staffId : '');

    const html = `
      <div class="modal-overlay">
        <div class="modal-card" style="max-width: 520px;">
          <div class="modal-header">
            <h3 class="modal-title">通知一覧 (${list.length}件)</h3>
            <button class="modal-close">&times;</button>
          </div>
          <div class="modal-body">
            ${list.length === 0 ? '<p style="color:var(--text-muted); text-align:center;">通知はありません。</p>' : `
              <ul style="list-style:none; padding:0;">
                ${list.map(n => `
                  <li style="padding:10px 0; border-bottom:1px solid var(--border-light);">
                    <div style="font-weight:700; font-size:13px;">${this.escapeHtml(n.title)}</div>
                    <div style="font-size:12px; color:var(--text-secondary);">${this.escapeHtml(n.content)}</div>
                    <div style="font-size:10px; color:var(--text-muted); margin-top:2px;">${n.createdAt.slice(0,16)}</div>
                  </li>
                `).join('')}
              </ul>
            `}
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary modal-cancel">閉じる</button>
          </div>
        </div>
      </div>
    `;

    const mContainer = document.getElementById('modal-container');
    mContainer.innerHTML = html;
    const closeModal = () => mContainer.innerHTML = '';
    mContainer.querySelector('.modal-close').onclick = closeModal;
    mContainer.querySelector('.modal-cancel').onclick = closeModal;
  }

  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.appController = new AppController();
});



document.addEventListener('DOMContentLoaded', () => { window.app = new AppController(); });
