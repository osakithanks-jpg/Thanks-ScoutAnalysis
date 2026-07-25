// サンクスパートナーズ Core DB & Storage Service
// Implements complete Firestore schema with robust client-side transactional fallback

import { getJSTToday } from '../utils/dateUtils.js';

const STORAGE_KEY_PREFIX = 'thanks_scout_';

// Initial 7 Media Masters
const DEFAULT_MEDIA = [
  { mediaId: 'media_bizreach', name: 'ビズリーチ', status: 'active', sortOrder: 1 },
  { mediaId: 'media_middle', name: 'ミドル', status: 'active', sortOrder: 2 },
  { mediaId: 'media_ambi', name: 'AMBI', status: 'active', sortOrder: 3 },
  { mediaId: 'media_rds', name: 'RDS', status: 'active', sortOrder: 4 },
  { mediaId: 'media_db', name: 'DB', status: 'active', sortOrder: 5 },
  { mediaId: 'media_ix', name: 'IX', status: 'active', sortOrder: 6 },
  { mediaId: 'media_maps', name: 'Maps', status: 'active', sortOrder: 7 }
];

// Initial Users (Admin & Member for ready local testing)
const DEFAULT_USERS = [
  {
    uid: 'user_admin_01',
    email: 'admin@thanks.co.jp',
    displayName: 'サンクス管理者',
    role: 'admin',
    status: 'active',
    createdAt: '2026-07-25T00:00:00Z',
    updatedAt: '2026-07-25T00:00:00Z'
  },
  {
    uid: 'user_member_01',
    email: 'member@thanks.co.jp',
    displayName: '山田 太郎 (一般)',
    role: 'member',
    status: 'active',
    createdAt: '2026-07-25T00:00:00Z',
    updatedAt: '2026-07-25T00:00:00Z'
  }
];

class DBService {
  constructor() {
    this._initLocalStorageStore();
  }

  _initLocalStorageStore() {
    if (!localStorage.getItem(STORAGE_KEY_PREFIX + 'media')) {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'media', JSON.stringify(DEFAULT_MEDIA));
    }
    if (!localStorage.getItem(STORAGE_KEY_PREFIX + 'users')) {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'users', JSON.stringify(DEFAULT_USERS));
    }
    if (!localStorage.getItem(STORAGE_KEY_PREFIX + 'jobs')) {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'jobs', JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEY_PREFIX + 'user_jobs')) {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'user_jobs', JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEY_PREFIX + 'scout_results')) {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'scout_results', JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEY_PREFIX + 'team_aggregates')) {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'team_aggregates', JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEY_PREFIX + 'knowledge')) {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'knowledge', JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEY_PREFIX + 'scout_templates')) {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'scout_templates', JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEY_PREFIX + 'template_versions')) {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'template_versions', JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEY_PREFIX + 'template_assignments')) {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'template_assignments', JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEY_PREFIX + 'audit_logs')) {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'audit_logs', JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEY_PREFIX + 'notifications')) {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'notifications', JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEY_PREFIX + 'notification_reads')) {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'notification_reads', JSON.stringify([]));
    }
  }

  _getCollection(name) {
    const raw = localStorage.getItem(STORAGE_KEY_PREFIX + name);
    return raw ? JSON.parse(raw) : [];
  }

  _setCollection(name, items) {
    localStorage.setItem(STORAGE_KEY_PREFIX + name, JSON.stringify(items));
  }

  // --- Users & Auth ---
  getUsers() {
    return this._getCollection('users');
  }

  getUserById(uid) {
    return this.getUsers().find(u => u.uid === uid) || null;
  }

  addUser({ email, displayName, role }) {
    const users = this.getUsers();
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      throw new Error('このメールアドレスは既に登録されています。');
    }
    const newUser = {
      uid: 'user_' + Date.now(),
      email,
      displayName,
      role: role || 'member',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    users.push(newUser);
    this._setCollection('users', users);
    this.addAuditLog({
      entityType: 'users',
      entityId: newUser.uid,
      actionType: 'CREATE',
      afterData: newUser,
      reason: '新規ユーザー追加'
    });
    return newUser;
  }

  updateUserStatus(uid, status) {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.uid === uid);
    if (idx !== -1) {
      const before = { ...users[idx] };
      users[idx].status = status;
      users[idx].updatedAt = new Date().toISOString();
      this._setCollection('users', users);
      this.addAuditLog({
        entityType: 'users',
        entityId: uid,
        actionType: 'UPDATE',
        beforeData: before,
        afterData: users[idx],
        reason: `ユーザー利用状態変更: ${status}`
      });
    }
  }

  updateUserRole(uid, role) {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.uid === uid);
    if (idx !== -1) {
      const before = { ...users[idx] };
      users[idx].role = role;
      users[idx].updatedAt = new Date().toISOString();
      this._setCollection('users', users);
      this.addAuditLog({
        entityType: 'users',
        entityId: uid,
        actionType: 'UPDATE',
        beforeData: before,
        afterData: users[idx],
        reason: `ユーザー権限変更: ${role}`
      });
    }
  }

  // --- Media ---
  getMediaList() {
    return this._getCollection('media').sort((a, b) => a.sortOrder - b.sortOrder);
  }

  // --- Jobs ---
  getJobs() {
    return this._getCollection('jobs');
  }

  getJobById(jobId) {
    return this.getJobs().find(j => j.jobId === jobId) || null;
  }

  saveJob(jobData, authorId) {
    const jobs = this.getJobs();
    const isEdit = !!jobData.jobId;
    let targetJob = null;

    if (isEdit) {
      const idx = jobs.findIndex(j => j.jobId === jobData.jobId);
      if (idx !== -1) {
        const before = { ...jobs[idx] };
        targetJob = {
          ...jobs[idx],
          ...jobData,
          updatedBy: authorId,
          updatedAt: new Date().toISOString()
        };
        jobs[idx] = targetJob;
        this.addAuditLog({
          entityType: 'jobs',
          entityId: targetJob.jobId,
          actionType: 'UPDATE',
          beforeData: before,
          afterData: targetJob,
          reason: '求人マスタ編集'
        });
      }
    } else {
      targetJob = {
        jobId: 'job_' + Date.now(),
        companyName: jobData.companyName,
        jobTitle: jobData.jobTitle,
        industry: jobData.industry || '',
        occupation: jobData.occupation || '',
        status: jobData.status || '準備中',
        targetAges: jobData.targetAges || [],
        position: jobData.position || '',
        salaryRanges: jobData.salaryRanges || [],
        isArchived: false,
        createdBy: authorId,
        updatedBy: authorId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      jobs.push(targetJob);
      this.addAuditLog({
        entityType: 'jobs',
        entityId: targetJob.jobId,
        actionType: 'CREATE',
        afterData: targetJob,
        reason: '求人マスタ新規作成'
      });
    }
    this._setCollection('jobs', jobs);
    return targetJob;
  }

  // --- User Jobs (担当求人) ---
  getUserJobs(userId) {
    const userJobs = this._getCollection('user_jobs');
    return userJobs.filter(uj => uj.userId === userId);
  }

  addUserJob(userId, jobId) {
    const userJobs = this._getCollection('user_jobs');
    const existing = userJobs.find(uj => uj.userId === userId && uj.jobId === jobId);
    if (existing) {
      if (existing.isHidden) {
        existing.isHidden = false;
        existing.updatedAt = new Date().toISOString();
        this._setCollection('user_jobs', userJobs);
      }
      return existing;
    }
    const newUJ = {
      userJobId: `${userId}_${jobId}`,
      userId,
      jobId,
      isHidden: false,
      isPinned: false,
      displayOrder: userJobs.length + 1,
      addedAt: new Date().toISOString(),
      hiddenAt: null,
      updatedAt: new Date().toISOString()
    };
    userJobs.push(newUJ);
    this._setCollection('user_jobs', userJobs);
    return newUJ;
  }

  toggleHideUserJob(userId, jobId, isHidden) {
    const userJobs = this._getCollection('user_jobs');
    const uj = userJobs.find(item => item.userId === userId && item.jobId === jobId);
    if (uj) {
      uj.isHidden = isHidden;
      uj.hiddenAt = isHidden ? new Date().toISOString() : null;
      uj.updatedAt = new Date().toISOString();
      this._setCollection('user_jobs', userJobs);
    }
  }

  // --- Scout Results (個人実績 & チーム集計) ---
  getScoutResults(userId = null, date = null) {
    let results = this._getCollection('scout_results');
    if (userId) results = results.filter(r => r.userId === userId);
    if (date) results = results.filter(r => r.date === date);
    return results;
  }

  saveScoutResult({ userId, jobId, date, mediaId, sentCount, totalReplyCount, effectiveReplyCount, updatedBy, reason }) {
    // Validate rules
    if (sentCount < 0 || totalReplyCount < 0 || effectiveReplyCount < 0) {
      throw new Error('送信数・返信数は0以上の整数を入力してください。');
    }
    if (effectiveReplyCount > totalReplyCount) {
      throw new Error('有効返信数は総返信数以下である必要があります。');
    }

    const results = this._getCollection('scout_results');
    const resultId = `${userId}_${jobId}_${date}_${mediaId}`;
    const idx = results.findIndex(r => r.resultId === resultId);

    let beforeData = null;
    let afterData = null;

    if (idx !== -1) {
      beforeData = { ...results[idx] };
      afterData = {
        ...results[idx],
        sentCount: Number(sentCount),
        totalReplyCount: Number(totalReplyCount),
        effectiveReplyCount: Number(effectiveReplyCount),
        status: 'active',
        updatedBy: updatedBy || userId,
        updatedAt: new Date().toISOString()
      };
      results[idx] = afterData;
    } else {
      afterData = {
        resultId,
        userId,
        jobId,
        date,
        mediaId,
        sentCount: Number(sentCount),
        totalReplyCount: Number(totalReplyCount),
        effectiveReplyCount: Number(effectiveReplyCount),
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        updatedBy: updatedBy || userId
      };
      results.push(afterData);
    }

    this._setCollection('scout_results', results);
    this._updateTeamAggregate(date, jobId, mediaId, beforeData, afterData);

    // Audit log
    this.addAuditLog({
      entityType: 'scout_results',
      entityId: resultId,
      actionType: beforeData ? 'UPDATE' : 'CREATE',
      beforeData,
      afterData,
      reason: reason || (beforeData ? '実績更新' : '実績新規登録')
    });

    return afterData;
  }

  cancelScoutResult(resultId, updatedBy, reason) {
    const results = this._getCollection('scout_results');
    const idx = results.findIndex(r => r.resultId === resultId);
    if (idx !== -1) {
      const before = { ...results[idx] };
      results[idx].status = 'cancelled';
      results[idx].updatedBy = updatedBy;
      results[idx].updatedAt = new Date().toISOString();
      this._setCollection('scout_results', results);
      this._updateTeamAggregate(before.date, before.jobId, before.mediaId, before, results[idx]);

      this.addAuditLog({
        entityType: 'scout_results',
        entityId: resultId,
        actionType: 'CANCEL',
        beforeData: before,
        afterData: results[idx],
        reason: reason || '実績取消'
      });
    }
  }

  _updateTeamAggregate(date, jobId, mediaId, before, after) {
    const aggregates = this._getCollection('team_aggregates');
    const aggregateId = `${date}_${jobId}_${mediaId}`;
    const idx = aggregates.findIndex(a => a.aggregateId === aggregateId);

    const bSent = (before && before.status === 'active') ? before.sentCount : 0;
    const bTotRep = (before && before.status === 'active') ? before.totalReplyCount : 0;
    const bEffRep = (before && before.status === 'active') ? before.effectiveReplyCount : 0;

    const aSent = (after && after.status === 'active') ? after.sentCount : 0;
    const aTotRep = (after && after.status === 'active') ? after.totalReplyCount : 0;
    const aEffRep = (after && after.status === 'active') ? after.effectiveReplyCount : 0;

    const dSent = aSent - bSent;
    const dTotRep = aTotRep - bTotRep;
    const dEffRep = aEffRep - bEffRep;

    if (idx !== -1) {
      aggregates[idx].teamSentCount = Math.max(0, aggregates[idx].teamSentCount + dSent);
      aggregates[idx].teamTotalReplyCount = Math.max(0, aggregates[idx].teamTotalReplyCount + dTotRep);
      aggregates[idx].teamEffectiveReplyCount = Math.max(0, aggregates[idx].teamEffectiveReplyCount + dEffRep);
      aggregates[idx].updatedAt = new Date().toISOString();
    } else {
      aggregates.push({
        aggregateId,
        date,
        jobId,
        mediaId,
        teamSentCount: Math.max(0, dSent),
        teamTotalReplyCount: Math.max(0, dTotRep),
        teamEffectiveReplyCount: Math.max(0, dEffRep),
        updatedAt: new Date().toISOString()
      });
    }
    this._setCollection('team_aggregates', aggregates);
  }

  getTeamAggregates() {
    return this._getCollection('team_aggregates');
  }

  // --- Knowledge ---
  getKnowledge() {
    return this._getCollection('knowledge');
  }

  addKnowledge(data, author) {
    const list = this.getKnowledge();
    // Create current metrics snapshot if detailed review
    let snapshot = null;
    if (data.jobId) {
      const allResults = this.getScoutResults().filter(r => r.jobId === data.jobId && r.status === 'active');
      const sentCount = allResults.reduce((acc, r) => acc + r.sentCount, 0);
      const totalReplyCount = allResults.reduce((acc, r) => acc + r.totalReplyCount, 0);
      const effectiveReplyCount = allResults.reduce((acc, r) => acc + r.effectiveReplyCount, 0);
      snapshot = { sentCount, totalReplyCount, effectiveReplyCount };
    }

    const item = {
      knowledgeId: 'kn_' + Date.now(),
      type: data.type || 'quick_memo',
      jobId: data.jobId || null,
      authorId: author.uid,
      authorName: author.displayName,
      title: data.title || (data.type === 'quick_memo' ? 'クイックメモ' : '詳細振り返り'),
      content: data.content || '',
      tags: data.tags || [],
      mediaId: data.mediaId || null,
      searchConditions: data.searchConditions || '',
      candidateProfile: data.candidateProfile || '',
      quickMemoSubject: data.quickMemoSubject || '',
      quickMemoBody: data.quickMemoBody || '',
      conditions: data.conditions || '',
      improvements: data.improvements || '',
      successCases: data.successCases || '',
      struggleFactors: data.struggleFactors || '',
      isImportant: false,
      isArchived: false,
      snapshot,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    list.push(item);
    this._setCollection('knowledge', list);
    this.addAuditLog({
      entityType: 'knowledge',
      entityId: item.knowledgeId,
      actionType: 'CREATE',
      afterData: item,
      reason: 'ナレッジ登録'
    });
    return item;
  }

  // --- Scout Templates & Versions ---
  getTemplates() {
    return this._getCollection('scout_templates');
  }

  getTemplateVersions(templateId) {
    return this._getCollection('template_versions').filter(v => v.templateId === templateId);
  }

  getTemplateAssignments() {
    return this._getCollection('template_assignments');
  }

  saveTemplate(data, author) {
    const templates = this.getTemplates();
    const versions = this._getCollection('template_versions');
    const isEdit = !!data.templateId;

    let tId = data.templateId;
    let versionNumber = 1;

    if (isEdit) {
      const idx = templates.findIndex(t => t.templateId === tId);
      if (idx !== -1) {
        versionNumber = templates[idx].currentVersionNumber + 1;
        templates[idx].currentVersionNumber = versionNumber;
        templates[idx].status = data.status || templates[idx].status;
        templates[idx].name = data.name || templates[idx].name;
        templates[idx].updatedAt = new Date().toISOString();
      }
    } else {
      tId = 'tmpl_' + Date.now();
      templates.push({
        templateId: tId,
        name: data.name,
        status: data.status || 'active',
        authorId: author.uid,
        currentVersionNumber: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }

    const newVersion = {
      versionId: 'ver_' + Date.now(),
      templateId: tId,
      versionNumber,
      subject: data.subject || '',
      body: data.body || '',
      targetProfile: data.targetProfile || '',
      sellingPoints: data.sellingPoints || '',
      tags: data.tags || [],
      changeNote: data.changeNote || (isEdit ? 'バージョン更新' : '新規作成'),
      createdBy: author.uid,
      createdAt: new Date().toISOString()
    };

    versions.push(newVersion);
    this._setCollection('scout_templates', templates);
    this._setCollection('template_versions', versions);

    // Assignments
    if (data.jobId && data.mediaId) {
      const assignments = this.getTemplateAssignments();
      assignments.push({
        assignmentId: 'asgn_' + Date.now(),
        jobId: data.jobId,
        mediaId: data.mediaId,
        templateId: tId,
        versionId: newVersion.versionId,
        startDate: data.startDate || getJSTToday(),
        endDate: data.endDate || '2099-12-31',
        setBy: author.uid,
        createdAt: new Date().toISOString()
      });
      this._setCollection('template_assignments', assignments);
    }

    return { templateId: tId, version: newVersion };
  }

  // --- Audit Logs ---
  getAuditLogs() {
    return this._getCollection('audit_logs').sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  addAuditLog({ entityType, entityId, actionType, beforeData, afterData, reason }) {
    const logs = this.getAuditLogs();
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    const logItem = {
      logId: 'log_' + Date.now() + '_' + Math.floor(Math.random()*1000),
      entityType,
      entityId,
      actionType,
      beforeData: beforeData ? JSON.parse(JSON.stringify(beforeData)) : null,
      afterData: afterData ? JSON.parse(JSON.stringify(afterData)) : null,
      userId: currentUser.uid || 'system',
      userName: currentUser.displayName || 'システム',
      userRole: currentUser.role || 'system',
      reason: reason || '',
      timestamp: new Date().toISOString()
    };
    logs.unshift(logItem);
    this._setCollection('audit_logs', logs);
  }

  // --- Master Data Reset (Thanks5877) ---
  resetAllData(passwordInput) {
    if (passwordInput !== 'Thanks5877') {
      throw new Error('パスワードが一致しません。リセットは中止されました。');
    }

    // 1. Generate full backup before wiping
    const backupObj = {
      timestamp: new Date().toISOString(),
      users: this.getUsers(),
      jobs: this.getJobs(),
      user_jobs: this._getCollection('user_jobs'),
      scout_results: this._getCollection('scout_results'),
      team_aggregates: this._getCollection('team_aggregates'),
      knowledge: this.getKnowledge(),
      scout_templates: this.getTemplates(),
      template_versions: this._getCollection('template_versions'),
      template_assignments: this.getTemplateAssignments(),
      audit_logs: this.getAuditLogs()
    };

    // 2. Wipe business data collections (0 items)
    this._setCollection('jobs', []);
    this._setCollection('user_jobs', []);
    this._setCollection('scout_results', []);
    this._setCollection('team_aggregates', []);
    this._setCollection('knowledge', []);
    this._setCollection('scout_templates', []);
    this._setCollection('template_versions', []);
    this._setCollection('template_assignments', []);
    this._setCollection('notifications', []);

    // 3. Log event
    this.addAuditLog({
      entityType: 'system',
      entityId: 'master_reset',
      actionType: 'RESET',
      reason: '管理者による全データリセット (Thanks5877 認証済)'
    });

    return backupObj;
  }
}

export const dbService = new DBService();
