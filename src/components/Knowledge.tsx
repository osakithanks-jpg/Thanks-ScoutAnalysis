// 求人振り返り・ナレッジ画面
import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { fetchJobs, fetchKnowledgeList, fetchScoutResults, saveKnowledge } from '../services/storageService';
import { Knowledge, Job, KnowledgeType } from '../types';
import { formatDateTime } from '../utils/dateUtils';
import { calculateMetrics } from '../utils/calcUtils';
import { BookMarked, Plus, MessageSquare, Calendar, Pin, Archive, Edit3 } from 'lucide-react';

export const KnowledgeComponent: React.FC = () => {
  const { currentStaff, isAdminMode } = useApp();

  const [knowledgeList, setKnowledgeList] = useState<Knowledge[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string>('');

  const [isAddingReflection, setIsAddingReflection] = useState(false);
  const [targetJobId, setTargetJobId] = useState<string>('');
  const [reflectionType, setReflectionType] = useState<KnowledgeType>('periodic');

  const [goodPoints, setGoodPoints] = useState('');
  const [challenges, setChallenges] = useState('');
  const [nextActions, setNextActions] = useState('');
  const [targetCandidate, setTargetCandidate] = useState('');
  const [effectiveMedia, setEffectiveMedia] = useState('');

  const loadData = useCallback(async () => {
    const [allJobs, kList] = await Promise.all([
      fetchJobs(),
      fetchKnowledgeList(selectedJobId || undefined),
    ]);
    setJobs(allJobs);
    setKnowledgeList(kList);
  }, [selectedJobId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSaveReflection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetJobId || !goodPoints.trim() || !currentStaff) return;

    // 現在の送信・返信実績のスナップショット自動取得
    const jobResults = await fetchScoutResults({ jobId: targetJobId });
    const metrics = calculateMetrics(jobResults);

    const newKnowledge: Knowledge = {
      knowledgeId: 'kn_' + Date.now(),
      jobId: targetJobId,
      type: reflectionType,
      content: goodPoints.trim(),
      staffId: currentStaff.staffId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isArchived: false,
      isPinned: false,
      snapshotMetrics: {
        sentCount: metrics.sentCount,
        totalReplyCount: metrics.totalReplyCount,
        effectiveReplyCount: metrics.effectiveReplyCount,
      },
      details: {
        goodPoints: goodPoints.trim(),
        challenges: challenges.trim(),
        nextActions: nextActions.trim(),
        targetCandidate: targetCandidate.trim(),
        effectiveMedia: effectiveMedia.trim(),
      },
    };

    await saveKnowledge(newKnowledge);
    setIsAddingReflection(false);
    setGoodPoints('');
    setChallenges('');
    setNextActions('');
    await loadData();
  };

  return (
    <div className="knowledge-container">
      {/* 画面ヘッダー */}
      <div className="knowledge-header-bar">
        <div className="filter-job-box">
          <label>求人で絞り込み:</label>
          <select value={selectedJobId} onChange={(e) => setSelectedJobId(e.target.value)}>
            <option value="">-- 全求人のナレッジ --</option>
            {jobs.map((j) => (
              <option key={j.jobId} value={j.jobId}>
                {j.companyName} - {j.jobTitle}
              </option>
            ))}
          </select>
        </div>

        <button className="btn-primary" onClick={() => setIsAddingReflection(true)}>
          <Plus className="icon-sm" /> 詳細振り返りを登録する
        </button>
      </div>

      {/* 振り返り登録フォーム・モーダル */}
      {isAddingReflection && (
        <div className="modal-backdrop">
          <div className="modal-card modal-lg">
            <h3 className="modal-title">求人詳細振り返りの登録</h3>

            <form onSubmit={handleSaveReflection} className="reflection-form">
              <div className="form-grid-2">
                <div className="form-group">
                  <label>対象求人（必須）</label>
                  <select
                    required
                    value={targetJobId}
                    onChange={(e) => setTargetJobId(e.target.value)}
                  >
                    <option value="">-- 求人を選択してください --</option>
                    {jobs.map((j) => (
                      <option key={j.jobId} value={j.jobId}>
                        {j.companyName} - {j.jobTitle}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>振り返り種別</label>
                  <select
                    value={reflectionType}
                    onChange={(e) => setReflectionType(e.target.value as KnowledgeType)}
                  >
                    <option value="periodic">定期振り返り</option>
                    <option value="final">最終振り返り (募集終了時)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>うまくいったこと・成功要因（必須）</label>
                <textarea
                  rows={3}
                  required
                  placeholder="反響が良かった訴求軸、ターゲット適合度など"
                  value={goodPoints}
                  onChange={(e) => setGoodPoints(e.target.value)}
                  className="textarea-input"
                />
              </div>

              <div className="form-group">
                <label>苦戦したこと・課題点</label>
                <textarea
                  rows={2}
                  placeholder="返信率低下の原因、要件とのズレなど"
                  value={challenges}
                  onChange={(e) => setChallenges(e.target.value)}
                  className="textarea-input"
                />
              </div>

              <div className="form-group">
                <label>次に試したいこと・改善アクション</label>
                <textarea
                  rows={2}
                  placeholder="文面のアプローチ変更、媒体切り替えなど"
                  value={nextActions}
                  onChange={(e) => setNextActions(e.target.value)}
                  className="textarea-input"
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setIsAddingReflection(false)}
                >
                  キャンセル
                </button>
                <button type="submit" className="btn-primary">
                  振り返りを保存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ナレッジ一覧フィード */}
      <div className="knowledge-feed-grid mt-4">
        {knowledgeList.length === 0 ? (
          <div className="empty-card">登録されている振り返り・ナレッジがありません。</div>
        ) : (
          knowledgeList.map((k) => {
            const job = jobs.find((j) => j.jobId === k.jobId);
            return (
              <div key={k.knowledgeId} className="knowledge-item-card">
                <div className="k-card-header">
                  <span className={`k-badge type-${k.type}`}>
                    {k.type === 'quick_memo'
                      ? 'クイックメモ'
                      : k.type === 'periodic'
                      ? '定期振り返り'
                      : '最終振り返り'}
                  </span>
                  <div className="k-job-info font-bold">
                    {job ? `${job.companyName} / ${job.jobTitle}` : '未特定求人'}
                  </div>
                  <div className="k-date text-xs text-muted ml-auto">
                    {formatDateTime(k.createdAt)}
                  </div>
                </div>

                <div className="k-card-body mt-2">
                  <p className="k-content-text">{k.content}</p>

                  {k.details && (
                    <div className="k-details-box mt-3">
                      {k.details.goodPoints && (
                        <div className="detail-row">
                          <span className="lbl text-gold font-bold">成功要因:</span> {k.details.goodPoints}
                        </div>
                      )}
                      {k.details.challenges && (
                        <div className="detail-row">
                          <span className="lbl text-danger font-bold">苦戦要因:</span> {k.details.challenges}
                        </div>
                      )}
                      {k.details.nextActions && (
                        <div className="detail-row">
                          <span className="lbl text-primary font-bold">改善案:</span> {k.details.nextActions}
                        </div>
                      )}
                    </div>
                  )}

                  {k.snapshotMetrics && (
                    <div className="k-snapshot-banner mt-3">
                      <span className="lbl">登録時点実績:</span>
                      <span>送信 {k.snapshotMetrics.sentCount}件</span> |
                      <span>総返信 {k.snapshotMetrics.totalReplyCount}件</span> |
                      <span className="text-gold font-bold">
                        有効返信 {k.snapshotMetrics.effectiveReplyCount}件
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
