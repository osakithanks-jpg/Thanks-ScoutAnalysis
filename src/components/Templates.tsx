// スカウト文面管理・バージョン履歴・適用期間設定画面
import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import {
  fetchTemplates,
  fetchTemplateVersions,
  saveTemplate,
  fetchMediaList,
  fetchJobs,
} from '../services/storageService';
import { ScoutTemplate, TemplateVersion, Media, Job } from '../types';
import { formatDateTime } from '../utils/dateUtils';
import { FileText, Plus, History, Copy, Edit, Archive, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const Templates: React.FC = () => {
  const { currentStaff } = useApp();

  const [templates, setTemplates] = useState<ScoutTemplate[]>([]);
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);

  // 編集モーダル
  const [editingTemplate, setEditingTemplate] = useState<Partial<ScoutTemplate> | null>(null);
  const [changeNote, setChangeNote] = useState<string>('');

  // バージョン履歴表示モーダル
  const [historyTemplate, setHistoryTemplate] = useState<ScoutTemplate | null>(null);
  const [versions, setVersions] = useState<TemplateVersion[]>([]);

  const loadData = useCallback(async () => {
    const [tList, mList, jList] = await Promise.all([
      fetchTemplates(),
      fetchMediaList(),
      fetchJobs(),
    ]);
    setTemplates(tList.filter((t) => t.status !== 'archived'));
    setMediaList(mList);
    setJobs(jList);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // バージョン履歴取得
  const handleOpenHistory = async (template: ScoutTemplate) => {
    setHistoryTemplate(template);
    const vList = await fetchTemplateVersions(template.templateId);
    setVersions(vList);
  };

  // 保存処理 (編集時はバージョンインクリメント)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTemplate?.title || !editingTemplate?.subject || !editingTemplate?.body || !currentStaff)
      return;

    const isNew = !editingTemplate.templateId;
    const templateId = editingTemplate.templateId || 'tpl_' + Date.now();
    const nextVersion = isNew ? 1 : (editingTemplate.currentVersion || 1) + 1;

    const tplToSave: ScoutTemplate = {
      templateId,
      title: editingTemplate.title.trim(),
      subject: editingTemplate.subject.trim(),
      body: editingTemplate.body.trim(),
      mediaIds: editingTemplate.mediaIds || [],
      jobIds: editingTemplate.jobIds || [],
      targetCandidate: editingTemplate.targetCandidate || '',
      sellingPoints: editingTemplate.sellingPoints || '',
      tags: editingTemplate.tags || [],
      status: editingTemplate.status || 'active',
      currentVersion: nextVersion,
      createdStaffId: editingTemplate.createdStaffId || currentStaff.staffId,
      updatedStaffId: currentStaff.staffId,
      createdAt: editingTemplate.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await saveTemplate(tplToSave, changeNote || (isNew ? '新規作成' : '更新'), currentStaff.staffId);
    setEditingTemplate(null);
    setChangeNote('');
    await loadData();
  };

  // バージョンの復元 (過去バージョンを新規バージョンとして保存)
  const handleRestoreVersion = async (v: TemplateVersion) => {
    if (!historyTemplate || !currentStaff) return;

    const nextVersion = historyTemplate.currentVersion + 1;
    const restoredTpl: ScoutTemplate = {
      ...historyTemplate,
      subject: v.subject,
      body: v.body,
      targetCandidate: v.targetCandidate || '',
      sellingPoints: v.sellingPoints || '',
      currentVersion: nextVersion,
      updatedStaffId: currentStaff.staffId,
      updatedAt: new Date().toISOString(),
    };

    await saveTemplate(
      restoredTpl,
      `Ver.${v.versionNumber} から復元`,
      currentStaff.staffId
    );

    setHistoryTemplate(null);
    await loadData();
  };

  return (
    <div className="templates-container">
      {/* 画面ヘッダー */}
      <div className="templates-header-bar">
        <h3 className="section-title">スカウト文面一覧・バージョン管理</h3>
        <button
          className="btn-primary"
          onClick={() =>
            setEditingTemplate({
              title: '',
              subject: '',
              body: '',
              mediaIds: [],
              status: 'active',
              currentVersion: 1,
            })
          }
        >
          <Plus className="icon-sm" /> 新規スカウト文面を登録
        </button>
      </div>

      {/* 文面カード一覧 */}
      <div className="templates-cards-grid mt-4">
        {templates.length === 0 ? (
          <div className="empty-card">スカウト文面がまだ登録されていません。</div>
        ) : (
          templates.map((tpl) => (
            <div key={tpl.templateId} className="template-card-item">
              <div className="tpl-card-header">
                <span className="badge-version">Ver. {tpl.currentVersion}</span>
                <h4 className="tpl-title">{tpl.title}</h4>
              </div>

              <div className="tpl-card-body">
                <div className="tpl-subject-row">
                  <span className="lbl">件名:</span> {tpl.subject}
                </div>
                <div className="tpl-body-preview">{tpl.body}</div>

                {tpl.mediaIds && tpl.mediaIds.length > 0 && (
                  <div className="tpl-media-tags mt-2">
                    {tpl.mediaIds.map((mId) => {
                      const m = mediaList.find((item) => item.mediaId === mId);
                      return (
                        <span key={mId} className="media-tag-chip">
                          {m ? m.name : mId}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="tpl-card-footer">
                <button
                  className="btn-secondary btn-sm"
                  onClick={() => handleOpenHistory(tpl)}
                  title="過去のバージョン履歴を確認"
                >
                  <History className="icon-xs" /> 履歴 (Ver.{tpl.currentVersion})
                </button>
                <button
                  className="btn-primary btn-sm ml-auto"
                  onClick={() => setEditingTemplate(tpl)}
                >
                  <Edit className="icon-xs" /> 編集
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 新規・編集モーダル */}
      {editingTemplate && (
        <div className="modal-backdrop">
          <div className="modal-card modal-lg">
            <h3 className="modal-title">
              {editingTemplate.templateId
                ? `スカウト文面の編集 (Ver.${(editingTemplate.currentVersion || 1) + 1} として保存)`
                : '新規スカウト文面の登録'}
            </h3>

            <form onSubmit={handleSubmit} className="template-form">
              <div className="form-group">
                <label>文面管理名（必須）</label>
                <input
                  type="text"
                  required
                  placeholder="例: 【IT営業向け】年収700万保証プレミアムスカウト"
                  value={editingTemplate.title || ''}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, title: e.target.value })}
                  className="input-text"
                />
              </div>

              <div className="form-group">
                <label>スカウト件名（必須）</label>
                <input
                  type="text"
                  required
                  placeholder="例: 【面接確約】貴殿の法人営業実績を拝見しご連絡いたしました"
                  value={editingTemplate.subject || ''}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, subject: e.target.value })}
                  className="input-text"
                />
              </div>

              <div className="form-group">
                <label>スカウト本文（必須）</label>
                <textarea
                  rows={8}
                  required
                  placeholder="スカウト文面の本文を入力してください..."
                  value={editingTemplate.body || ''}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, body: e.target.value })}
                  className="textarea-input"
                />
              </div>

              {editingTemplate.templateId && (
                <div className="form-group">
                  <label>変更内容のメモ (バージョン履歴に記載されます)</label>
                  <input
                    type="text"
                    placeholder="例: ターゲット層に合わせて件名をより魅力的に修正"
                    value={changeNote}
                    onChange={(e) => setChangeNote(e.target.value)}
                    className="input-text"
                  />
                </div>
              )}

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setEditingTemplate(null)}>
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

      {/* バージョン履歴モーダル */}
      {historyTemplate && (
        <div className="modal-backdrop">
          <div className="modal-card modal-lg">
            <h3 className="modal-title">「{historyTemplate.title}」のバージョン履歴</h3>

            <div className="version-history-list mt-3">
              {versions.map((v) => (
                <div key={v.versionId} className="version-history-item">
                  <div className="v-header">
                    <span className="v-number font-bold">Ver. {v.versionNumber}</span>
                    <span className="v-date text-xs text-muted">{formatDateTime(v.createdAt)}</span>
                    <span className="v-note ml-2 text-gold">({v.changeNote})</span>

                    <button
                      className="btn-secondary btn-xs ml-auto"
                      onClick={() => handleRestoreVersion(v)}
                    >
                      <ArrowUpRight className="icon-xs" /> このバージョンに復元
                    </button>
                  </div>
                  <div className="v-subject text-sm font-bold mt-1">件名: {v.subject}</div>
                  <div className="v-body-preview text-xs text-muted mt-1">{v.body}</div>
                </div>
              ))}
            </div>

            <div className="modal-actions mt-4">
              <button className="btn-secondary" onClick={() => setHistoryTemplate(null)}>
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
