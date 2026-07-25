// サンクスパートナーズ データ操作サービス (Firestore & Memory Fallback)
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDoc,
  writeBatch,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import {
  Staff,
  Job,
  StaffJob,
  Media,
  ScoutResult,
  Knowledge,
  ScoutTemplate,
  TemplateVersion,
  TemplateAssignment,
  AuditLog,
} from '../types';
import { INITIAL_MEDIA_LIST } from '../utils/constants';

// --- LocalStorage 領域制御 (表示設定・セッションのみ) ---
const LOCAL_STORAGE_KEYS = {
  CURRENT_STAFF_ID: 'thanks_current_staff_id',
  ADMIN_SESSION: 'thanks_admin_session',
  LAST_VIEW: 'thanks_last_view',
  COLLAPSED_SECTIONS: 'thanks_collapsed_sections',
};

export function getStoredStaffId(): string | null {
  return localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_STAFF_ID);
}

export function setStoredStaffId(id: string): void {
  localStorage.setItem(LOCAL_STORAGE_KEYS.CURRENT_STAFF_ID, id);
}

export function removeStoredStaffId(): void {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.CURRENT_STAFF_ID);
}

export function getStoredAdminSession(): boolean {
  return localStorage.getItem(LOCAL_STORAGE_KEYS.ADMIN_SESSION) === 'true';
}

export function setStoredAdminSession(active: boolean): void {
  if (active) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ADMIN_SESSION, 'true');
  } else {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ADMIN_SESSION);
  }
}

// --- インメモリデータベース (Firebase未接続時のフォールバック用) ---
let inMemoryStore = {
  staff: [] as Staff[],
  jobs: [] as Job[],
  staff_jobs: [] as StaffJob[],
  media: [...INITIAL_MEDIA_LIST] as Media[],
  scout_results: [] as ScoutResult[],
  knowledge: [] as Knowledge[],
  scout_templates: [] as ScoutTemplate[],
  template_versions: [] as TemplateVersion[],
  template_assignments: [] as TemplateAssignment[],
  audit_logs: [] as AuditLog[],
};

// 変更通知リスナー
type Listener = () => void;
const listeners: Set<Listener> = new Set();

function notifyListeners() {
  listeners.forEach((l) => l());
}

export function subscribeDataChanges(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// --- マスタ Seed 処理 ---
export async function seedInitialMediaIfNeeded(): Promise<void> {
  if (isFirebaseConfigured && db) {
    const mediaCol = collection(db, 'media');
    const snapshot = await getDocs(mediaCol);
    if (snapshot.empty) {
      const batch = writeBatch(db);
      INITIAL_MEDIA_LIST.forEach((m) => {
        const ref = doc(db!, 'media', m.mediaId);
        batch.set(ref, m);
      });
      await batch.commit();
    }
  } else {
    if (inMemoryStore.media.length === 0) {
      inMemoryStore.media = [...INITIAL_MEDIA_LIST];
    }
  }
}

// --- 担当者マスタ (staff) ---
export async function fetchStaffList(): Promise<Staff[]> {
  if (isFirebaseConfigured && db) {
    const snap = await getDocs(collection(db, 'staff'));
    return snap.docs.map((d) => d.data() as Staff);
  }
  return [...inMemoryStore.staff];
}

export async function saveStaff(staff: Staff): Promise<void> {
  if (isFirebaseConfigured && db) {
    await setDoc(doc(db, 'staff', staff.staffId), staff);
  } else {
    const idx = inMemoryStore.staff.findIndex((s) => s.staffId === staff.staffId);
    if (idx >= 0) inMemoryStore.staff[idx] = staff;
    else inMemoryStore.staff.push(staff);
  }
  notifyListeners();
}

// --- 求人マスタ (jobs) ---
export async function fetchJobs(): Promise<Job[]> {
  if (isFirebaseConfigured && db) {
    const snap = await getDocs(collection(db, 'jobs'));
    return snap.docs.map((d) => d.data() as Job);
  }
  return [...inMemoryStore.jobs];
}

export async function saveJob(job: Job): Promise<void> {
  if (isFirebaseConfigured && db) {
    await setDoc(doc(db, 'jobs', job.jobId), job);
  } else {
    const idx = inMemoryStore.jobs.findIndex((j) => j.jobId === job.jobId);
    if (idx >= 0) inMemoryStore.jobs[idx] = job;
    else inMemoryStore.jobs.push(job);
  }
  notifyListeners();
}

// --- 担当求人 (staff_jobs) ---
export async function fetchStaffJobs(staffId?: string): Promise<StaffJob[]> {
  if (isFirebaseConfigured && db) {
    const snap = await getDocs(collection(db, 'staff_jobs'));
    let list = snap.docs.map((d) => d.data() as StaffJob);
    if (staffId) list = list.filter((sj) => sj.staffId === staffId);
    return list;
  }
  let list = [...inMemoryStore.staff_jobs];
  if (staffId) list = list.filter((sj) => sj.staffId === staffId);
  return list;
}

export async function saveStaffJob(staffJob: StaffJob): Promise<void> {
  if (isFirebaseConfigured && db) {
    await setDoc(doc(db, 'staff_jobs', staffJob.staffJobId), staffJob);
  } else {
    const idx = inMemoryStore.staff_jobs.findIndex((sj) => sj.staffJobId === staffJob.staffJobId);
    if (idx >= 0) inMemoryStore.staff_jobs[idx] = staffJob;
    else inMemoryStore.staff_jobs.push(staffJob);
  }
  notifyListeners();
}

// --- 媒体マスタ (media) ---
export async function fetchMediaList(): Promise<Media[]> {
  if (isFirebaseConfigured && db) {
    const snap = await getDocs(collection(db, 'media'));
    if (!snap.empty) {
      return snap.docs.map((d) => d.data() as Media).sort((a, b) => a.displayOrder - b.displayOrder);
    }
  }
  return [...inMemoryStore.media].sort((a, b) => a.displayOrder - b.displayOrder);
}

// --- スカウト実績 (scout_results) ---
export async function fetchScoutResults(params?: {
  staffId?: string;
  startDate?: string;
  endDate?: string;
  jobId?: string;
}): Promise<ScoutResult[]> {
  let list: ScoutResult[] = [];
  if (isFirebaseConfigured && db) {
    const snap = await getDocs(collection(db, 'scout_results'));
    list = snap.docs.map((d) => d.data() as ScoutResult);
  } else {
    list = [...inMemoryStore.scout_results];
  }

  // フィルタリング
  if (params?.staffId) {
    list = list.filter((r) => r.staffId === params.staffId);
  }
  if (params?.jobId) {
    list = list.filter((r) => r.jobId === params.jobId);
  }
  if (params?.startDate) {
    list = list.filter((r) => r.date >= params.startDate!);
  }
  if (params?.endDate) {
    list = list.filter((r) => r.date <= params.endDate!);
  }

  return list;
}

export async function saveScoutResult(result: ScoutResult): Promise<void> {
  if (isFirebaseConfigured && db) {
    await setDoc(doc(db, 'scout_results', result.resultId), result);
  } else {
    const idx = inMemoryStore.scout_results.findIndex((r) => r.resultId === result.resultId);
    if (idx >= 0) inMemoryStore.scout_results[idx] = result;
    else inMemoryStore.scout_results.push(result);
  }
  notifyListeners();
}

// --- 振り返り・ナレッジ (knowledge) ---
export async function fetchKnowledgeList(jobId?: string): Promise<Knowledge[]> {
  let list: Knowledge[] = [];
  if (isFirebaseConfigured && db) {
    const snap = await getDocs(collection(db, 'knowledge'));
    list = snap.docs.map((d) => d.data() as Knowledge);
  } else {
    list = [...inMemoryStore.knowledge];
  }
  if (jobId) {
    list = list.filter((k) => k.jobId === jobId);
  }
  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function saveKnowledge(item: Knowledge): Promise<void> {
  if (isFirebaseConfigured && db) {
    await setDoc(doc(db, 'knowledge', item.knowledgeId), item);
  } else {
    const idx = inMemoryStore.knowledge.findIndex((k) => k.knowledgeId === item.knowledgeId);
    if (idx >= 0) inMemoryStore.knowledge[idx] = item;
    else inMemoryStore.knowledge.push(item);
  }
  notifyListeners();
}

// --- スカウト文面 (scout_templates & template_versions & template_assignments) ---
export async function fetchTemplates(): Promise<ScoutTemplate[]> {
  if (isFirebaseConfigured && db) {
    const snap = await getDocs(collection(db, 'scout_templates'));
    return snap.docs.map((d) => d.data() as ScoutTemplate);
  }
  return [...inMemoryStore.scout_templates];
}

export async function saveTemplate(
  template: ScoutTemplate,
  versionNote?: string,
  staffId?: string
): Promise<void> {
  const version: TemplateVersion = {
    versionId: `${template.templateId}_v${template.currentVersion}`,
    templateId: template.templateId,
    versionNumber: template.currentVersion,
    subject: template.subject,
    body: template.body,
    targetCandidate: template.targetCandidate,
    sellingPoints: template.sellingPoints,
    tags: template.tags,
    changedByStaffId: staffId || template.updatedStaffId,
    changeNote: versionNote || '更新',
    createdAt: new Date().toISOString(),
  };

  if (isFirebaseConfigured && db) {
    await setDoc(doc(db, 'scout_templates', template.templateId), template);
    await setDoc(doc(db, 'template_versions', version.versionId), version);
  } else {
    const idx = inMemoryStore.scout_templates.findIndex((t) => t.templateId === template.templateId);
    if (idx >= 0) inMemoryStore.scout_templates[idx] = template;
    else inMemoryStore.scout_templates.push(template);
    inMemoryStore.template_versions.push(version);
  }
  notifyListeners();
}

export async function fetchTemplateVersions(templateId: string): Promise<TemplateVersion[]> {
  if (isFirebaseConfigured && db) {
    const snap = await getDocs(collection(db, 'template_versions'));
    const list = snap.docs.map((d) => d.data() as TemplateVersion);
    return list
      .filter((v) => v.templateId === templateId)
      .sort((a, b) => b.versionNumber - a.versionNumber);
  }
  return inMemoryStore.template_versions
    .filter((v) => v.templateId === templateId)
    .sort((a, b) => b.versionNumber - a.versionNumber);
}

// --- 変更履歴 (audit_logs) ---
export async function fetchAuditLogs(): Promise<AuditLog[]> {
  if (isFirebaseConfigured && db) {
    const snap = await getDocs(collection(db, 'audit_logs'));
    const list = snap.docs.map((d) => d.data() as AuditLog);
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  return [...inMemoryStore.audit_logs].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function saveAuditLog(log: AuditLog): Promise<void> {
  if (isFirebaseConfigured && db) {
    await setDoc(doc(db, 'audit_logs', log.logId), log);
  } else {
    inMemoryStore.audit_logs.push(log);
  }
  notifyListeners();
}

// --- 全データエクスポート & 全リセット (管理者機能) ---
export async function exportAllDataJSON(): Promise<Record<string, any>> {
  const staff = await fetchStaffList();
  const jobs = await fetchJobs();
  const staff_jobs = await fetchStaffJobs();
  const media = await fetchMediaList();
  const scout_results = await fetchScoutResults();
  const knowledge = await fetchKnowledgeList();
  const scout_templates = await fetchTemplates();
  const audit_logs = await fetchAuditLogs();

  return {
    exportedAt: new Date().toISOString(),
    staff,
    jobs,
    staff_jobs,
    media,
    scout_results,
    knowledge,
    scout_templates,
    template_versions: inMemoryStore.template_versions,
    audit_logs,
  };
}

export async function resetAllData(keepStaffMaster: boolean): Promise<void> {
  if (isFirebaseConfigured && db) {
    const collectionsToReset = [
      'jobs',
      'staff_jobs',
      'scout_results',
      'knowledge',
      'scout_templates',
      'template_versions',
      'template_assignments',
      'audit_logs',
    ];
    if (!keepStaffMaster) collectionsToReset.push('staff');

    for (const colName of collectionsToReset) {
      const snap = await getDocs(collection(db, colName));
      const batch = writeBatch(db);
      snap.docs.forEach((d) => batch.delete(d.ref));
      await batch.commit();
    }
  } else {
    inMemoryStore.jobs = [];
    inMemoryStore.staff_jobs = [];
    inMemoryStore.scout_results = [];
    inMemoryStore.knowledge = [];
    inMemoryStore.scout_templates = [];
    inMemoryStore.template_versions = [];
    inMemoryStore.template_assignments = [];
    inMemoryStore.audit_logs = [];
    if (!keepStaffMaster) {
      inMemoryStore.staff = [];
    }
  }
  notifyListeners();
}
