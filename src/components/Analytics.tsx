// 分析・類似求人・求人比較画面
import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { fetchJobs, fetchScoutResults, fetchMediaList } from '../services/storageService';
import { Job, ScoutResult, Media } from '../types';
import { INDUSTRIES, POSITIONS, EXECUTIVE_ROLES } from '../utils/constants';
import { calculateJobSimilarity, calculateMetrics, formatPercent, SimilarityResult } from '../utils/calcUtils';
import { Filter, Layers, GitCompare, AlertTriangle, Check, ArrowRight } from 'lucide-react';

export const Analytics: React.FC = () => {
  const [subView, setSubView] = useState<'attributes' | 'similar' | 'compare'>('attributes');

  const [jobs, setJobs] = useState<Job[]>([]);
  const [results, setResults] = useState<ScoutResult[]>([]);
  const [mediaList, setMediaList] = useState<Media[]>([]);

  // 1. 属性検索条件
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  // 2. 類似求人検索の基準求人
  const [selectedBaseJobId, setSelectedBaseJobId] = useState<string>('');

  // 3. 求人比較の選択求人 (2〜5件)
  const [compareJobIds, setCompareJobIds] = useState<string[]>([]);
  const [comparePeriodDays, setComparePeriodDays] = useState<'all' | '30' | '60' | '90'>('all');

  const loadData = useCallback(async () => {
    const [allJobs, allResults, media] = await Promise.all([
      fetchJobs(),
      fetchScoutResults(),
      fetchMediaList(),
    ]);

    setJobs(allJobs.filter((j) => !j.archived));
    setResults(allResults.filter((r) => r.status !== 'cancelled'));
    setMediaList(media);
    if (allJobs.length > 0 && !selectedBaseJobId) {
      setSelectedBaseJobId(allJobs[0].jobId);
    }
  }, [selectedBaseJobId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // 属性検索の該当求人
  const matchedAttributeJobs = jobs.filter((j) => {
    if (selectedIndustries.length > 0 && (!j.industry || !selectedIndustries.includes(j.industry))) {
      return false;
    }
    if (selectedPositions.length > 0 && (!j.position || !selectedPositions.includes(j.position))) {
      return false;
    }
    if (selectedRoles.length > 0 && (!j.role || !selectedRoles.includes(j.role))) {
      return false;
    }
    return true;
  });

  const matchedJobIds = matchedAttributeJobs.map((j) => j.jobId);
  const attributeResults = results.filter((r) => matchedJobIds.includes(r.jobId));
  const attrMetrics = calculateMetrics(attributeResults);

  // 類似求人の計算
  const baseJob = jobs.find((j) => j.jobId === selectedBaseJobId);
  const similarityResults: SimilarityResult[] = React.useMemo(() => {
    if (!baseJob) return [];
    return jobs
      .filter((j) => j.jobId !== baseJob.jobId)
      .map((j) => calculateJobSimilarity(baseJob, j))
      .sort((a, b) => b.score - a.score);
  }, [baseJob, jobs]);

  // 求人比較用のデータ計算
  const toggleCompareJob = (jobId: string) => {
    if (compareJobIds.includes(jobId)) {
      setCompareJobIds(compareJobIds.filter((id) => id !== jobId));
    } else {
      if (compareJobIds.length >= 5) {
        alert('求人比較は最大5件まで選択可能です。');
        return;
      }
      setCompareJobIds([...compareJobIds, jobId]);
    }
  };

  return (
    <div className="analytics-container">
      {/* 画面切替タブ */}
      <div className="analytics-sub-tabs">
        <button
          className={`sub-tab-btn ${subView === 'attributes' ? 'active' : ''}`}
          onClick={() => setSubView('attributes')}
        >
          <Filter className="icon-xs" /> 1. 属性・類似求人分析
        </button>
        <button
          className={`sub-tab-btn ${subView === 'similar' ? 'active' : ''}`}
          onClick={() => setSubView('similar')}
        >
          <Layers className="icon-xs" /> 2. 類似求人検索
        </button>
        <button
          className={`sub-tab-btn ${subView === 'compare' ? 'active' : ''}`}
          onClick={() => setSubView('compare')}
        >
          <GitCompare className="icon-xs" /> 3. 求人比較 (2〜5件)
        </button>
      </div>

      {/* サブビュー 1: 属性検索分析 */}
      {subView === 'attributes' && (
        <div className="analytics-section">
          <div className="filter-card">
            <h4 className="filter-title">求人属性フィルター条件 (項目内OR条件 / 項目間AND条件)</h4>

            <div className="filter-group-block">
              <label className="filter-label">業種 (複数選択可):</label>
              <div className="chip-cloud">
                {INDUSTRIES.map((ind) => {
                  const active = selectedIndustries.includes(ind);
                  return (
                    <button
                      key={ind}
                      className={`chip ${active ? 'active' : ''}`}
                      onClick={() =>
                        setSelectedIndustries(
                          active ? selectedIndustries.filter((i) => i !== ind) : [...selectedIndustries, ind]
                        )
                      }
                    >
                      {ind}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="filter-group-block mt-3">
              <label className="filter-label">職種 (複数選択可):</label>
              <div className="chip-cloud">
                {POSITIONS.slice(0, 15).map((pos) => {
                  const active = selectedPositions.includes(pos);
                  return (
                    <button
                      key={pos}
                      className={`chip ${active ? 'active' : ''}`}
                      onClick={() =>
                        setSelectedPositions(
                          active ? selectedPositions.filter((p) => p !== pos) : [...selectedPositions, pos]
                        )
                      }
                    >
                      {pos}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 集計結果サマリー */}
          <div className="kpi-grid mt-4">
            <div className="kpi-card">
              <div className="kpi-title">該当求人数</div>
              <div className="kpi-num">{matchedAttributeJobs.length}件</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-title">送信数合計</div>
              <div className="kpi-num">{attrMetrics.sentCount.toLocaleString()}件</div>
            </div>
            <div className="kpi-card">
              <div className="kpi-title">総返信数</div>
              <div className="kpi-num">{attrMetrics.totalReplyCount.toLocaleString()}件</div>
            </div>
            <div className="kpi-card highlight-gold">
              <div className="kpi-title">有効返信数</div>
              <div className="kpi-num text-gold">{attrMetrics.effectiveReplyCount.toLocaleString()}件</div>
              <div className="kpi-sub">参考有効返信率: {formatPercent(attrMetrics.refEffectiveReplyRate)}</div>
            </div>
          </div>
        </div>
      )}

      {/* サブビュー 2: 類似求人検索 */}
      {subView === 'similar' && (
        <div className="analytics-section">
          <div className="filter-card">
            <label className="filter-label">基準とする求人を選択:</label>
            <select
              className="select-job-picker"
              value={selectedBaseJobId}
              onChange={(e) => setSelectedBaseJobId(e.target.value)}
            >
              {jobs.map((j) => (
                <option key={j.jobId} value={j.jobId}>
                  {j.companyName} / {j.jobTitle} ({j.industry || '業種未設定'})
                </option>
              ))}
            </select>
          </div>

          {baseJob && (
            <div className="similar-jobs-list mt-4">
              <h4 className="section-subtitle">
                「{baseJob.companyName} - {baseJob.jobTitle}」に対する類似求人スコア
              </h4>
              <div className="similarity-cards-grid">
                {similarityResults.map((sr) => {
                  const jResults = results.filter((r) => r.jobId === sr.matchedJob.jobId);
                  const jMetrics = calculateMetrics(jResults);

                  return (
                    <div key={sr.matchedJob.jobId} className="similarity-card">
                      <div className="score-badge">
                        類似度 <span className="score-val">{sr.score}%</span>
                      </div>
                      <div className="sim-company">{sr.matchedJob.companyName}</div>
                      <div className="sim-title">{sr.matchedJob.jobTitle}</div>

                      <div className="sim-attributes-box">
                        <div className="match-attr">
                          <Check className="icon-xs text-success" /> 一致: {sr.matchedAttributes.join(', ') || 'なし'}
                        </div>
                        {sr.differentAttributes.length > 0 && (
                          <div className="diff-attr text-muted">
                            相違: {sr.differentAttributes.join(', ')}
                          </div>
                        )}
                      </div>

                      <div className="sim-metrics-row">
                        <span>送信: {jMetrics.sentCount}件</span>
                        <span>有効返信: {jMetrics.effectiveReplyCount}件</span>
                        <span className="text-gold">率: {formatPercent(jMetrics.refEffectiveReplyRate)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* サブビュー 3: 求人比較 (2〜5件) */}
      {subView === 'compare' && (
        <div className="analytics-section">
          <div className="filter-card">
            <h4 className="filter-title">比較する求人を2〜5件選択してください (現在 {compareJobIds.length}件選択中)</h4>
            <div className="job-selection-chips">
              {jobs.map((j) => {
                const selected = compareJobIds.includes(j.jobId);
                return (
                  <button
                    key={j.jobId}
                    className={`chip-job ${selected ? 'selected' : ''}`}
                    onClick={() => toggleCompareJob(j.jobId)}
                  >
                    {selected ? '✓ ' : '+ '}
                    {j.companyName} - {j.jobTitle}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 比較テーブル */}
          {compareJobIds.length >= 2 ? (
            <div className="comparison-table-wrap mt-4">
              <table className="report-table compare-table">
                <thead>
                  <tr>
                    <th>比較項目</th>
                    {compareJobIds.map((id) => {
                      const j = jobs.find((item) => item.jobId === id);
                      return (
                        <th key={id}>
                          {j?.companyName}
                          <br />
                          <span className="text-sm font-normal">{j?.jobTitle}</span>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="fw-bold">業種 / 職種</td>
                    {compareJobIds.map((id) => {
                      const j = jobs.find((item) => item.jobId === id);
                      return (
                        <td key={id}>
                          {j?.industry || '未指定'} / {j?.position || '未指定'}
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    <td className="fw-bold">送信数</td>
                    {compareJobIds.map((id) => {
                      const m = calculateMetrics(results.filter((r) => r.jobId === id));
                      return <td key={id} className="font-mono">{m.sentCount.toLocaleString()}件</td>;
                    })}
                  </tr>
                  <tr>
                    <td className="fw-bold">総返信数</td>
                    {compareJobIds.map((id) => {
                      const m = calculateMetrics(results.filter((r) => r.jobId === id));
                      return <td key={id} className="font-mono">{m.totalReplyCount.toLocaleString()}件</td>;
                    })}
                  </tr>
                  <tr>
                    <td className="fw-bold">有効返信数</td>
                    {compareJobIds.map((id) => {
                      const m = calculateMetrics(results.filter((r) => r.jobId === id));
                      return <td key={id} className="font-mono text-gold font-bold">{m.effectiveReplyCount.toLocaleString()}件</td>;
                    })}
                  </tr>
                  <tr>
                    <td className="fw-bold">参考有効返信率</td>
                    {compareJobIds.map((id) => {
                      const m = calculateMetrics(results.filter((r) => r.jobId === id));
                      return <td key={id} className="font-mono text-gold font-bold">{formatPercent(m.refEffectiveReplyRate)}</td>;
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-card mt-4">求人比較を行うには、上記の求人リストから2件以上を選択してください。</div>
          )}
        </div>
      )}
    </div>
  );
};
