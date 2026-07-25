// ダッシュボード画面 (個人・チーム・各集計・推移)
import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import {
  fetchScoutResults,
  fetchJobs,
  fetchMediaList,
  fetchStaffList,
} from '../services/storageService';
import { ScoutResult, Job, Media, Staff, DashboardPeriod } from '../types';
import { getPeriodRange, getDayOfWeekJST, WEEKDAYS } from '../utils/dateUtils';
import { calculateMetrics, formatPercent } from '../utils/calcUtils';
import {
  BarChart3,
  Users,
  User,
  Calendar,
  Briefcase,
  PieChart,
  TrendingUp,
  Award,
  AlertTriangle,
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { currentStaff, isAdminMode, staffList } = useApp();

  const [targetScope, setTargetScope] = useState<'current' | 'team' | string>('current');
  const [period, setPeriod] = useState<DashboardPeriod>('week');
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'media' | 'trends'>('overview');

  const [results, setResults] = useState<ScoutResult[]>([]);
  const [jobsMap, setJobsMap] = useState<Record<string, Job>>({});
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadDashboardData = useCallback(async () => {
    setIsLoading(true);
    const { startDate, endDate } = getPeriodRange(period);

    let params: { startDate: string; endDate: string; staffId?: string } = {
      startDate,
      endDate,
    };

    if (targetScope === 'current' && currentStaff) {
      params.staffId = currentStaff.staffId;
    } else if (targetScope !== 'team' && targetScope !== 'current') {
      params.staffId = targetScope;
    }

    const [rawResults, jobs, media] = await Promise.all([
      fetchScoutResults(params),
      fetchJobs(),
      fetchMediaList(),
    ]);

    const jMap: Record<string, Job> = {};
    jobs.forEach((j) => (jMap[j.jobId] = j));

    setJobsMap(jMap);
    setMediaList(media);
    setResults(rawResults.filter((r) => r.status !== 'cancelled'));
    setIsLoading(false);
  }, [period, targetScope, currentStaff]);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const metrics = calculateMetrics(results);

  // 求人別集計
  const jobStats = React.useMemo(() => {
    const map: Record<string, { sent: number; totalReply: number; effectiveReply: number; mediaBreakdown: Record<string, number> }> = {};
    results.forEach((r) => {
      if (!map[r.jobId]) {
        map[r.jobId] = { sent: 0, totalReply: 0, effectiveReply: 0, mediaBreakdown: {} };
      }
      map[r.jobId].sent += r.sentCount || 0;
      map[r.jobId].totalReply += r.totalReplyCount || 0;
      map[r.jobId].effectiveReply += r.effectiveReplyCount || 0;
      map[r.jobId].mediaBreakdown[r.mediaId] = (map[r.jobId].mediaBreakdown[r.mediaId] || 0) + (r.sentCount || 0);
    });

    return Object.entries(map).map(([jobId, stat]) => ({
      job: jobsMap[jobId] || { companyName: '削除済み求人', jobTitle: jobId },
      ...stat,
      refTotalRate: stat.sent > 0 ? stat.totalReply / stat.sent : 0,
      refEffectiveRate: stat.sent > 0 ? stat.effectiveReply / stat.sent : 0,
      sentPerEffective: stat.effectiveReply > 0 ? stat.sent / stat.effectiveReply : 0,
      isLowData: stat.sent < 30,
    })).sort((a, b) => b.sent - a.sent);
  }, [results, jobsMap]);

  // 媒体別集計
  const mediaStats = React.useMemo(() => {
    const map: Record<string, { sent: number; totalReply: number; effectiveReply: number }> = {};
    results.forEach((r) => {
      if (!map[r.mediaId]) {
        map[r.mediaId] = { sent: 0, totalReply: 0, effectiveReply: 0 };
      }
      map[r.mediaId].sent += r.sentCount || 0;
      map[r.mediaId].totalReply += r.totalReplyCount || 0;
      map[r.mediaId].effectiveReply += r.effectiveReplyCount || 0;
    });

    const totalSent = metrics.sentCount || 1;

    return mediaList.map((m) => {
      const stat = map[m.mediaId] || { sent: 0, totalReply: 0, effectiveReply: 0 };
      return {
        media: m,
        ...stat,
        refTotalRate: stat.sent > 0 ? stat.totalReply / stat.sent : 0,
        refEffectiveRate: stat.sent > 0 ? stat.effectiveReply / stat.sent : 0,
        share: stat.sent / totalSent,
        isLowData: stat.sent < 30,
      };
    }).sort((a, b) => b.sent - a.sent);
  }, [results, mediaList, metrics.sentCount]);

  // 曜日別集計
  const dayOfWeekStats = React.useMemo(() => {
    const map: Record<string, { sent: number; totalReply: number; effectiveReply: number }> = {};
    WEEKDAYS.forEach((w) => (map[w] = { sent: 0, totalReply: 0, effectiveReply: 0 }));

    results.forEach((r) => {
      const dow = getDayOfWeekJST(r.date);
      if (map[dow]) {
        map[dow].sent += r.sentCount || 0;
        map[dow].totalReply += r.totalReplyCount || 0;
        map[dow].effectiveReply += r.effectiveReplyCount || 0;
      }
    });

    const totalSent = metrics.sentCount || 1;
    return WEEKDAYS.map((dow) => ({
      day: dow,
      ...map[dow],
      share: map[dow].sent / totalSent,
    }));
  }, [results, metrics.sentCount]);

  return (
    <div className="dashboard-container">
      {/* 上部フィルターコントロール */}
      <div className="dashboard-filter-bar">
        <div className="scope-selector">
          <button
            className={`btn-scope ${targetScope === 'current' ? 'active' : ''}`}
            onClick={() => setTargetScope('current')}
          >
            <User className="icon-xs" /> {currentStaff ? currentStaff.name : '自分'} の実績
          </button>
          <button
            className={`btn-scope ${targetScope === 'team' ? 'active' : ''}`}
            onClick={() => setTargetScope('team')}
          >
            <Users className="icon-xs" /> チーム全体
          </button>

          {/* 管理者モード時のみ他メンバー個別指定可能 */}
          {isAdminMode && (
            <select
              className="select-staff-filter"
              value={targetScope !== 'current' && targetScope !== 'team' ? targetScope : ''}
              onChange={(e) => e.target.value && setTargetScope(e.target.value)}
            >
              <option value="">-- 担当者別指定 (管理者) --</option>
              {staffList.map((s) => (
                <option key={s.staffId} value={s.staffId}>
                  {s.name} ({s.status})
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="period-selector">
          {(['today', 'week', 'month', '3months', 'halfYear', 'year'] as DashboardPeriod[]).map((p) => {
            const labels: Record<DashboardPeriod, string> = {
              today: '今日',
              week: '今週',
              month: '今月',
              '3months': '3か月',
              halfYear: '半年',
              year: '1年',
            };
            return (
              <button
                key={p}
                className={`btn-period ${period === p ? 'active' : ''}`}
                onClick={() => setPeriod(p)}
              >
                {labels[p]}
              </button>
            );
          })}
        </div>
      </div>

      {/* 主要数値 (KPIカード) */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-title">スカウト送信数</div>
          <div className="kpi-value-row">
            <span className="kpi-num">{metrics.sentCount.toLocaleString()}</span>
            <span className="kpi-unit">件</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-title">総返信数</div>
          <div className="kpi-value-row">
            <span className="kpi-num">{metrics.totalReplyCount.toLocaleString()}</span>
            <span className="kpi-unit">件</span>
          </div>
          <div className="kpi-sub font-mono">
            参考総返信率: <span className="text-gold font-bold">{formatPercent(metrics.refTotalReplyRate)}</span>
          </div>
        </div>

        <div className="kpi-card highlight-gold">
          <div className="kpi-title">有効返信数</div>
          <div className="kpi-value-row">
            <span className="kpi-num text-gold">{metrics.effectiveReplyCount.toLocaleString()}</span>
            <span className="kpi-unit">件</span>
          </div>
          <div className="kpi-sub font-mono">
            参考有効返信率: <span className="text-gold font-bold">{formatPercent(metrics.refEffectiveReplyRate)}</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-title">有効返信1件あたり送信数</div>
          <div className="kpi-value-row">
            <span className="kpi-num">
              {metrics.sentPerEffectiveReply > 0 ? metrics.sentPerEffectiveReply.toFixed(1) : '-'}
            </span>
            <span className="kpi-unit">通/件</span>
          </div>
          {metrics.isLowData && (
            <div className="low-data-badge-sub">
              <AlertTriangle className="icon-xs text-warning mr-1" /> 送信30件未満 (参考値)
            </div>
          )}
        </div>
      </div>

      {/* ダッシュボードタブナビゲーション */}
      <div className="dashboard-tabs">
        <button
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <BarChart3 className="icon-xs" /> 概要
        </button>
        <button
          className={`tab-btn ${activeTab === 'jobs' ? 'active' : ''}`}
          onClick={() => setActiveTab('jobs')}
        >
          <Briefcase className="icon-xs" /> 求人別
        </button>
        <button
          className={`tab-btn ${activeTab === 'media' ? 'active' : ''}`}
          onClick={() => setActiveTab('media')}
        >
          <PieChart className="icon-xs" /> 媒体別
        </button>
        <button
          className={`tab-btn ${activeTab === 'trends' ? 'active' : ''}`}
          onClick={() => setActiveTab('trends')}
        >
          <TrendingUp className="icon-xs" /> 曜日・推移
        </button>
      </div>

      {/* タブコンテンツ */}
      {isLoading ? (
        <div className="loading-card">データを集計中...</div>
      ) : (
        <div className="dashboard-content-body">
          {/* タブ 1: 概要 */}
          {activeTab === 'overview' && (
            <div className="tab-overview">
              <div className="overview-split-grid">
                {/* 媒体構成サマリー */}
                <div className="chart-panel-card">
                  <h4 className="panel-title">媒体別送信構成比</h4>
                  <div className="media-bar-stacked">
                    {mediaStats.map((ms) => {
                      if (ms.share <= 0) return null;
                      return (
                        <div
                          key={ms.media.mediaId}
                          className="stacked-segment"
                          style={{ width: `${(ms.share * 100).toFixed(1)}%` }}
                          title={`${ms.media.name}: ${ms.sent}件 (${(ms.share * 100).toFixed(1)}%)`}
                        >
                          {ms.media.name} {(ms.share * 100).toFixed(0)}%
                        </div>
                      );
                    })}
                  </div>

                  <div className="media-legend-list mt-3">
                    {mediaStats.map((ms) => (
                      <div key={ms.media.mediaId} className="legend-item">
                        <span className="media-name-dot">{ms.media.name}</span>
                        <span className="legend-val">
                          {ms.sent}件 ({formatPercent(ms.refEffectiveRate)} 有効率)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 曜日別サマリー */}
                <div className="chart-panel-card">
                  <h4 className="panel-title">曜日別送信割合</h4>
                  <div className="dow-horizontal-bars">
                    {dayOfWeekStats.map((ds) => (
                      <div key={ds.day} className="dow-bar-row">
                        <span className="dow-label">{ds.day}曜</span>
                        <div className="dow-bar-track">
                          <div
                            className="dow-bar-fill"
                            style={{ width: `${(ds.share * 100).toFixed(1)}%` }}
                          ></div>
                        </div>
                        <span className="dow-val-text">
                          {ds.sent}件 ({formatPercent(ds.share)})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* タブ 2: 求人別 */}
          {activeTab === 'jobs' && (
            <div className="tab-jobs-table-wrap">
              <table className="report-table">
                <thead>
                  <tr>
                    <th>企業名 / 求人名</th>
                    <th>送信数</th>
                    <th>総返信</th>
                    <th>有効返信</th>
                    <th>参考総返信率</th>
                    <th>参考有効返信率</th>
                    <th>有効1件あたり送信</th>
                    <th>送信媒体構成</th>
                  </tr>
                </thead>
                <tbody>
                  {jobStats.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-4">
                        該当期間の実績データがありません
                      </td>
                    </tr>
                  ) : (
                    jobStats.map((js, idx) => (
                      <tr key={(js.job as any).jobId || idx}>
                        <td>
                          <div className="fw-bold">{js.job.companyName}</div>
                          <div className="text-sm text-muted">{js.job.jobTitle}</div>
                          {js.isLowData && <span className="badge-low-data">データ少</span>}
                        </td>
                        <td className="font-mono">{js.sent.toLocaleString()}件</td>
                        <td className="font-mono">{js.totalReply.toLocaleString()}件</td>
                        <td className="font-mono text-gold font-bold">
                          {js.effectiveReply.toLocaleString()}件
                        </td>
                        <td className="font-mono">{formatPercent(js.refTotalRate)}</td>
                        <td className="font-mono text-gold font-bold">
                          {formatPercent(js.refEffectiveRate)}
                        </td>
                        <td className="font-mono">
                          {js.sentPerEffective > 0 ? js.sentPerEffective.toFixed(1) : '-'}通
                        </td>
                        <td>
                          <div className="mini-stacked-bar">
                            {Object.entries(js.mediaBreakdown).map(([mId, count]) => {
                              const pct = (count / (js.sent || 1)) * 100;
                              const mediaName = mediaList.find((m) => m.mediaId === mId)?.name || mId;
                              return (
                                <div
                                  key={mId}
                                  className="mini-bar-segment"
                                  style={{ width: `${pct}%` }}
                                  title={`${mediaName}: ${count}件`}
                                />
                              );
                            })}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* タブ 3: 媒体別 */}
          {activeTab === 'media' && (
            <div className="tab-media">
              <table className="report-table">
                <thead>
                  <tr>
                    <th>媒体名</th>
                    <th>送信数</th>
                    <th>総返信数</th>
                    <th>有効返信数</th>
                    <th>参考総返信率</th>
                    <th>参考有効返信率</th>
                    <th>送信構成比</th>
                  </tr>
                </thead>
                <tbody>
                  {mediaStats.map((ms) => (
                    <tr key={ms.media.mediaId}>
                      <td className="fw-bold">{ms.media.name}</td>
                      <td className="font-mono">{ms.sent.toLocaleString()}件</td>
                      <td className="font-mono">{ms.totalReply.toLocaleString()}件</td>
                      <td className="font-mono text-gold font-bold">
                        {ms.effectiveReply.toLocaleString()}件
                      </td>
                      <td className="font-mono">{formatPercent(ms.refTotalRate)}</td>
                      <td className="font-mono text-gold font-bold">
                        {formatPercent(ms.refEffectiveRate)}
                      </td>
                      <td>
                        <div className="share-bar-cell">
                          <div className="share-track">
                            <div
                              className="share-fill"
                              style={{ width: `${(ms.share * 100).toFixed(1)}%` }}
                            ></div>
                          </div>
                          <span className="share-pct">{formatPercent(ms.share)}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* タブ 4: 曜日・推移 */}
          {activeTab === 'trends' && (
            <div className="tab-trends">
              <div className="chart-panel-card">
                <h4 className="panel-title">曜日別実績集計</h4>
                <table className="report-table">
                  <thead>
                    <tr>
                      <th>曜日</th>
                      <th>送信数</th>
                      <th>総返信数</th>
                      <th>有効返信数</th>
                      <th>送信構成比</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dayOfWeekStats.map((ds) => (
                      <tr key={ds.day}>
                        <td className="fw-bold">{ds.day}曜日</td>
                        <td className="font-mono">{ds.sent.toLocaleString()}件</td>
                        <td className="font-mono">{ds.totalReply.toLocaleString()}件</td>
                        <td className="font-mono text-gold font-bold">
                          {ds.effectiveReply.toLocaleString()}件
                        </td>
                        <td className="font-mono">{formatPercent(ds.share)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
