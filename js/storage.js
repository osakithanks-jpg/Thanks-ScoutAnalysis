/**
 * サンクスパートナーズ スカウト実績・求人管理一元化ツール - ストレージ & データマネージャー
 * Version: 3.4.0 (Company Master, Priority Rank, Japanese Locale Sorting, Search & Filter Release)
 */

import {
  DEFAULT_MEDIA_LIST,
  ADMIN_PASSWORD,
  RESET_CONFIRM_TEXT,
  RESTORE_CONFIRM_TEXT,
  APP_VERSION,
  DATA_FORMAT_VERSION,
  PRIORITY_RANKS,
  PRIORITY_RANK_LIST,
  JOB_STATUSES,
  KEYS
} from './constants.js';

export class StorageService {
  /**
   * システム初期設定（空の場合は基本マスタ・企業マスタへの移行を初期化）
   */
  static initStorage() {
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

    // 企業マスタ (companies) の自動初期化 & 既存求人からの自動移行
    this.migrateCompaniesFromJobs();

    // Firebase Cloud Firestore リアルタイム全端末自動同期
    this.initFirestoreSync();
  }

  static initFirestoreSync() {
    if (window.firestoreDb && !this._firestoreListenerAttached) {
      this._firestoreListenerAttached = true;
      try {
        window.firestoreDb.collection('scout_app_store').onSnapshot(snapshot => {
          let hasChange = false;
          snapshot.docChanges().forEach(change => {
            if (change.type === 'added' || change.type === 'modified') {
              const key = change.doc.id;
              const docData = change.doc.data();
              if (docData && typeof docData.jsonStr === 'string') {
                const currentVal = localStorage.getItem(key);
                if (currentVal !== docData.jsonStr) {
                  localStorage.setItem(key, docData.jsonStr);
                  hasChange = true;
                }
              }
            }
          });
          if (hasChange && window.app && typeof window.app.renderCurrentView === 'function') {
            window.app.renderCurrentView();
          }
        }, err => {
          console.warn('Firestore realtime sync warning:', err);
        });
      } catch (err) {
        console.warn('Firestore snapshot setup warning:', err);
      }
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
    this.initStorage();
    try {
      return JSON.parse(localStorage.getItem(key) || '[]');
    } catch (e) {
      console.error(`Failed to load ${key}`, e);
      return [];
    }
  }

  static set(key, data) {
    const jsonStr = JSON.stringify(data);
    localStorage.setItem(key, jsonStr);
    if (window.firestoreDb) {
      try {
        window.firestoreDb.collection('scout_app_store').doc(key).set({
          jsonStr: jsonStr,
          updatedAt: new Date().toISOString()
        }).catch(err => {
          console.warn('Firestore sync write warning:', err);
        });
      } catch (err) {
        console.warn('Firestore sync write exception:', err);
      }
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
    const idx = list.findIndex(k => k.knowledgeId === knw.knowledgeId);
    let saved;

    if (idx >= 0) {
      saved = { ...list[idx], ...knw, updatedAt: now };
      list[idx] = saved;
    } else {
      saved = {
        knowledgeId: knw.knowledgeId || `KNW-${Date.now()}`,
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

