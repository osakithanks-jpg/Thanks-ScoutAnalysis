// 求人一覧・求人マスタ・担当求人管理画面
import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import {
  fetchJobs,
  fetchStaffJobs,
  saveJob,
  saveStaffJob,
} from '../services/storageService';
import { Job, StaffJob, IndustryType, PositionType, JobStatus, ExecutiveRoleType } from '../types';
import { INDUSTRIES, POSITIONS, EXECUTIVE_ROLES, SALARY_RANGES, TARGET_AGES } from '../utils/constants';
import { Plus, Search, EyeOff, Eye, CheckCircle, ShieldAlert, Edit, Archive } from 'lucide-react';

export const Jobs: React.FC = () => {
  const { currentStaff, isAdminMode } = useApp();

  const [activeTab, setActiveTab] = useState<'assigned' | 'all'>('assigned');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [staffJobs, setStaffJobs] = useState<StaffJob[]>([]);

  // 検索・絞り込みフィルター
  const [searchQuery, setSearchQuery] = useState('');
  const [filterIndustry, setFilterIndustry] = useState<string>('');
  const [filterPosition, setFilterPosition] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');

  // 新規・編集モーダル管理
  const [editingJob, setEditingJob] = useState<Partial<Job> | null>(null);

  const loadData = useCallback(async () => {
    const [allJobs, sJobs] = await Promise.all([
      fetchJobs(),
      currentStaff ? fetchStaffJobs(currentStaff.staffId) : Promise.resolve([]),
    ]);

    setJobs(allJobs.filter((j) => !j.archived));
    setStaffJobs(sJobs);
  }, [currentStaff]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const assignedJobIds = staffJobs.filter((sj) => !sj.hidden).map((sj) => sj.jobId);
  const hiddenJobIds = staffJobs.filter((sj) => sj.hidden).map((sj) => sj.jobId);

  // 自分の担当求人に追加
  const handleAssignJob = async (jobId: string) => {
    if (!currentStaff) return;
    const existing = staffJobs.find((sj) => sj.jobId === jobId);

    if (existing) {
      if (existing.hidden) {
        // 再表示
        const updated: StaffJob = {
          ...existing,
          hidden: false,
          updatedAt: new Date().toISOString(),
        };
        await saveStaffJob(updated);
      }
    } else {
      const newStaffJob: StaffJob = {
        staffJobId: `${currentStaff.staffId}_${jobId}`,
        staffId: currentStaff.staffId,
        jobId,
        hidden: false,
        pinned: false,
        displayOrder: staffJobs.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await saveStaffJob(newStaffJob);
    }
    await loadData();
  };

  // 担当求人の非表示
  const handleHideJob = async (jobId: string) => {
    if (!currentStaff) return;
    const existing = staffJobs.find((sj) => sj.jobId === jobId);
    if (existing) {
      const updated: StaffJob = {
        ...existing,
        hidden: true,
        hiddenAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      await saveStaffJob(updated);
      await loadData();
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 求人モーダル保存 (管理者のみ)
  const handleSaveJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob?.companyName || !editingJob?.jobTitle || !currentStaff || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const isNew = !editingJob.jobId;
      const jobId = editingJob.jobId || 'job_' + Date.now();

      const jobToSave: Job = {
        jobId,
        companyName: editingJob.companyName.trim(),
        jobTitle: editingJob.jobTitle.trim(),
        industry: editingJob.industry || '',
        position: editingJob.position || '',
        status: (editingJob.status as JobStatus) || '準備中',
        targetAge: editingJob.targetAge || [],
        role: editingJob.role || '',
        salaryRange: editingJob.salaryRange || [],
        archived: false,
        createdStaffId: editingJob.createdStaffId || currentStaff.staffId,
        updatedStaffId: currentStaff.staffId,
        createdAt: editingJob.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await saveJob(jobToSave);

      // 新規登録時は自動的に担当求人に追加
      if (isNew) {
        await handleAssignJob(jobId);
      }

      alert(isNew ? '新しい求人を正常に登録しました。' : '求人情報を更新しました。');
      setEditingJob(null);
      await loadData();
    } catch (err: any) {
      alert(`登録エラー: ${err?.message || '保存に失敗しました'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // フィルタリング処理
  const filteredJobs = jobs.filter((j) => {
    if (activeTab === 'assigned' && !assignedJobIds.includes(j.jobId)) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchComp = j.companyName.toLowerCase().includes(q);
      const matchTitle = j.jobTitle.toLowerCase().includes(q);
      if (!matchComp && !matchTitle) return false;
    }

    if (filterIndustry && j.industry !== filterIndustry) return false;
    if (filterPosition && j.position !== filterPosition) return false;
    if (filterStatus && j.status !== filterStatus) return false;

    return true;
  });

  return (
    <div className="jobs-container">
      {/* 上部ヘッダー & タブ */}
      <div className="jobs-header-bar">
        <div className="tabs-row">
          <button
            className={`tab-btn ${activeTab === 'assigned' ? 'active' : ''}`}
            onClick={() => setActiveTab('assigned')}
          >
            自分の担当求人 ({assignedJobIds.length}件)
          </button>
          <button
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            全求人マスタ ({jobs.length}件)
          </button>
        </div>

        {isAdminMode && (
          <button
            className="btn-primary"
            onClick={() =>
              setEditingJob({
                companyName: '',
                jobTitle: '',
                status: '準備中',
                targetAge: [],
                salaryRange: [],
              })
            }
          >
            <Plus className="icon-sm" /> 新規求人登録 (管理者)
          </button>
        )}
      </div>

      {/* 検索・絞り込みフィルター */}
      <div className="filter-card">
        <div className="search-input-box">
          <Search className="icon-sm text-muted" />
          <input
            type="text"
            placeholder="企業名・求人名で検索..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-search"
          />
        </div>

        <div className="filter-selects-row">
          <select value={filterIndustry} onChange={(e) => setFilterIndustry(e.target.value)}>
            <option value="">-- 全業種 --</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>

          <select value={filterPosition} onChange={(e) => setFilterPosition(e.target.value)}>
            <option value="">-- 全職種 --</option>
            {POSITIONS.map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
          </select>

          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="">-- ステータス --</option>
            <option value="準備中">準備中</option>
            <option value="スカウト実施中">スカウト実施中</option>
            <option value="一時停止">一時停止</option>
            <option value="募集終了">募集終了</option>
          </select>
        </div>
      </div>

      {/* 求人リスト */}
      <div className="jobs-list-grid">
        {filteredJobs.length === 0 ? (
          <div className="empty-card">該当する求人が見つかりませんでした。</div>
        ) : (
          filteredJobs.map((job) => {
            const isAssigned = assignedJobIds.includes(job.jobId);
            return (
              <div key={job.jobId} className="job-card-item">
                <div className="job-card-header">
                  <span className={`badge-status status-${job.status}`}>{job.status}</span>
                  <div className="job-card-company">{job.companyName}</div>
                  <h3 className="job-card-title">{job.jobTitle}</h3>
                </div>

                <div className="job-card-body">
                  <div className="job-meta-row">
                    <span className="lbl">業種:</span> {job.industry || '未設定'}
                  </div>
                  <div className="job-meta-row">
                    <span className="lbl">職種:</span> {job.position || '未設定'}
                  </div>
                  {job.targetAge && job.targetAge.length > 0 && (
                    <div className="job-meta-row">
                      <span className="lbl">年齢:</span> {job.targetAge.join(', ')}
                    </div>
                  )}
                </div>

                <div className="job-card-footer">
                  {isAssigned ? (
                    <button
                      className="btn-secondary btn-sm"
                      onClick={() => handleHideJob(job.jobId)}
                      title="本日の実績入力から非表示にする（過去実績は保持されます）"
                    >
                      <EyeOff className="icon-xs" /> 非表示にする
                    </button>
                  ) : (
                    <button
                      className="btn-primary btn-sm"
                      onClick={() => handleAssignJob(job.jobId)}
                    >
                      <CheckCircle className="icon-xs" /> 担当求人に追加
                    </button>
                  )}

                  {isAdminMode && (
                    <button
                      className="btn-secondary btn-sm ml-auto"
                      onClick={() => setEditingJob(job)}
                      title="求人編集 (管理者)"
                    >
                      <Edit className="icon-xs" /> 編集
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 新規求人登録・編集モーダル (管理者用) */}
      {editingJob && (
        <div className="modal-backdrop">
          <div className="modal-card modal-lg">
            <h3 className="modal-title">{editingJob.jobId ? '求人情報の編集' : '新規求人登録'}</h3>

            <form onSubmit={handleSaveJobSubmit} className="job-edit-form">
              <div className="form-grid-2">
                <div className="form-group">
                  <label>企業名（必須）</label>
                  <input
                    type="text"
                    required
                    value={editingJob.companyName || ''}
                    onChange={(e) => setEditingJob({ ...editingJob, companyName: e.target.value })}
                    className="input-text"
                  />
                </div>

                <div className="form-group">
                  <label>求人名（必須）</label>
                  <input
                    type="text"
                    required
                    value={editingJob.jobTitle || ''}
                    onChange={(e) => setEditingJob({ ...editingJob, jobTitle: e.target.value })}
                    className="input-text"
                  />
                </div>

                <div className="form-group">
                  <label>業種</label>
                  <select
                    value={editingJob.industry || ''}
                    onChange={(e) =>
                      setEditingJob({ ...editingJob, industry: e.target.value as IndustryType })
                    }
                  >
                    <option value="">未選択</option>
                    {INDUSTRIES.map((ind) => (
                      <option key={ind} value={ind}>
                        {ind}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>職種</label>
                  <select
                    value={editingJob.position || ''}
                    onChange={(e) =>
                      setEditingJob({ ...editingJob, position: e.target.value as PositionType })
                    }
                  >
                    <option value="">未選択</option>
                    {POSITIONS.map((pos) => (
                      <option key={pos} value={pos}>
                        {pos}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>求人ステータス</label>
                  <select
                    value={editingJob.status || '準備中'}
                    onChange={(e) =>
                      setEditingJob({ ...editingJob, status: e.target.value as JobStatus })
                    }
                  >
                    <option value="準備中">準備中</option>
                    <option value="スカウト実施中">スカウト実施中</option>
                    <option value="一時停止">一時停止</option>
                    <option value="募集終了">募集終了</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>役職</label>
                  <select
                    value={editingJob.role || ''}
                    onChange={(e) =>
                      setEditingJob({ ...editingJob, role: e.target.value as ExecutiveRoleType })
                    }
                  >
                    <option value="">未選択</option>
                    {EXECUTIVE_ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setEditingJob(null)}>
                  キャンセル
                </button>
                <button type="submit" className="btn-primary">
                  保存する
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
