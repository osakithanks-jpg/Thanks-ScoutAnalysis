// 本日の実績入力画面
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import {
  fetchStaffJobs,
  fetchJobs,
  fetchMediaList,
  fetchScoutResults,
  saveScoutResult,
} from '../services/storageService';
import { Job, Media, ScoutResult } from '../types';
import { getTodayJST, getShiftedDate, getDayOfWeekJST } from '../utils/dateUtils';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Plus,
  Minus,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  MessageSquarePlus,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { QuickMemoModal } from './QuickMemoModal';

export const DailyInput: React.FC = () => {
  const { currentStaff, inputDate, setInputDate, setIsStaffModalOpen } = useApp();

  const [assignedJobs, setAssignedJobs] = useState<Job[]>([]);
  const [mediaList, setMediaList] = useState<Media[]>([]);
  const [resultsMap, setResultsMap] = useState<Record<string, ScoutResult>>({});

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [lastSavedTime, setLastSavedTime] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [pausedClosedJobs, setPausedClosedJobs] = useState<Job[]>([]);
  const [isPausedSectionOpen, setIsPausedSectionOpen] = useState<boolean>(true);

  // クイックメモモーダル管理
  const [memoJob, setMemoJob] = useState<Job | null>(null);

  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  const loadData = useCallback(async () => {
    if (!currentStaff) return;

    const [allJobs, staffJobs, media] = await Promise.all([
      fetchJobs(),
      fetchStaffJobs(currentStaff.staffId),
      fetchMediaList(),
    ]);

    setMediaList(media.filter((m) => m.status === 'active'));

    // 担当求人 (非表示でないもの)
    const activeStaffJobIds = staffJobs.filter((sj) => !sj.hidden).map((sj) => sj.jobId);

    const activeJobs = allJobs.filter(
      (j) =>
        activeStaffJobIds.includes(j.jobId) &&
        !j.archived &&
        (j.status === '準備中' || j.status === 'スカウト実施中')
    );

    const closedJobs = allJobs.filter(
      (j) =>
        activeStaffJobIds.includes(j.jobId) &&
        !j.archived &&
        (j.status === '一時停止' || j.status === '募集終了')
    );

    setAssignedJobs(activeJobs);
    setPausedClosedJobs(closedJobs);

    // 当日の保存済み実績取得
    const results = await fetchScoutResults({
      staffId: currentStaff.staffId,
      startDate: inputDate,
      endDate: inputDate,
    });

    const map: Record<string, ScoutResult> = {};
    results.forEach((r) => {
      if (r.status !== 'cancelled') {
        const key = `${r.jobId}_${r.mediaId}`;
        map[key] = r;
      }
    });
    setResultsMap(map);
  }, [currentStaff, inputDate]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // 実績値の自動保存処理
  const saveCellResult = async (
    jobId: string,
    mediaId: string,
    sentCount: number,
    totalReplyCount: number,
    effectiveReplyCount: number
  ) => {
    if (!currentStaff) return;

    // バリデーション: 有効返信数 <= 総返信数
    if (effectiveReplyCount > totalReplyCount) {
      setSaveStatus('error');
      setErrorMessage('有効返信数は総返信数以下にしてください。');
      return;
    }

    setSaveStatus('saving');
    setErrorMessage('');

    const resultId = `${currentStaff.staffId}_${jobId}_${inputDate}_${mediaId}`;
    const result: ScoutResult = {
      resultId,
      staffId: currentStaff.staffId,
      jobId,
      date: inputDate,
      mediaId,
      sentCount: Math.max(0, sentCount),
      totalReplyCount: Math.max(0, totalReplyCount),
      effectiveReplyCount: Math.max(0, effectiveReplyCount),
      status: 'valid',
      createdAt: resultsMap[`${jobId}_${mediaId}`]?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastUpdatedByStaffId: currentStaff.staffId,
    };

    try {
      await saveScoutResult(result);
      setResultsMap((prev) => ({
        ...prev,
        [`${jobId}_${mediaId}`]: result,
      }));

      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(
        2,
        '0'
      )}`;
      setLastSavedTime(timeStr);
      setSaveStatus('saved');
    } catch (err) {
      console.error('Failed to save scout result:', err);
      setSaveStatus('error');
      setErrorMessage('保存に失敗しました');
    }
  };

  // 送信数の変更 (+1, +5, +10, -1, 直入力)
  const handleSentChange = (jobId: string, mediaId: string, delta: number | null, directValue?: number) => {
    const current = resultsMap[`${jobId}_${mediaId}`] || {
      sentCount: 0,
      totalReplyCount: 0,
      effectiveReplyCount: 0,
    };

    let newSent = current.sentCount;
    if (directValue !== undefined) {
      newSent = directValue;
    } else if (delta !== null) {
      newSent = Math.max(0, current.sentCount + delta);
    }

    saveCellResult(jobId, mediaId, newSent, current.totalReplyCount, current.effectiveReplyCount);
  };

  // 返信数の変更 (総返信+1, 有効返信+1, 直入力)
  const handleReplyChange = (
    jobId: string,
    mediaId: string,
    type: 'total_plus1' | 'effective_plus1' | 'total_direct' | 'effective_direct',
    val?: number
  ) => {
    const current = resultsMap[`${jobId}_${mediaId}`] || {
      sentCount: 0,
      totalReplyCount: 0,
      effectiveReplyCount: 0,
    };

    let newTotal = current.totalReplyCount;
    let newEffective = current.effectiveReplyCount;

    if (type === 'total_plus1') {
      newTotal += 1;
    } else if (type === 'effective_plus1') {
      newTotal += 1;
      newEffective += 1;
    } else if (type === 'total_direct' && val !== undefined) {
      newTotal = Math.max(0, val);
    } else if (type === 'effective_direct' && val !== undefined) {
      newEffective = Math.max(0, val);
    }

    saveCellResult(jobId, mediaId, current.sentCount, newTotal, newEffective);
  };

  if (!currentStaff) {
    return (
      <div className="empty-view-card">
        <p>担当者が選択されていません。「担当者を選択する」ボタンから担当者を選択してください。</p>
        <button className="btn-primary mt-3" onClick={() => setIsStaffModalOpen(true)}>
          担当者を選択する
        </button>
      </div>
    );
  }

  const todayStr = getTodayJST();
  const dayOfWeek = getDayOfWeekJST(inputDate);

  return (
    <div className="daily-input-container">
      {/* 画面ヘッダーコントロール */}
      <div className="daily-header-card">
        <div className="date-control-group">
          <button className="btn-date-nav" onClick={() => setInputDate(getShiftedDate(inputDate, -1))}>
            <ChevronLeft className="icon-sm" /> 前日
          </button>

          <div className="date-picker-wrapper">
            <CalendarIcon className="icon-sm text-gold" />
            <input
              type="date"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
              className="date-input-field"
            />
            <span className="day-of-week-badge">({dayOfWeek})</span>
          </div>

          <button className="btn-date-nav" onClick={() => setInputDate(getShiftedDate(inputDate, 1))}>
            翌日 <ChevronRight className="icon-sm" />
          </button>

          {inputDate !== todayStr && (
            <button className="btn-today-return" onClick={() => setInputDate(todayStr)}>
              <RotateCcw className="icon-xs" /> 今日へ戻る
            </button>
          )}
        </div>

        {/* 自動保存ステータスインジケーター */}
        <div className="auto-save-indicator">
          {saveStatus === 'saving' && (
            <span className="save-status saving">
              <span className="spinner-dots"></span> 保存中...
            </span>
          )}
          {saveStatus === 'saved' && (
            <span className="save-status saved">
              <CheckCircle2 className="icon-xs text-success" /> 保存済み {lastSavedTime}
            </span>
          )}
          {saveStatus === 'error' && (
            <span className="save-status error">
              <AlertCircle className="icon-xs text-danger" /> {errorMessage || '保存に失敗しました'}
            </span>
          )}
        </div>
      </div>

      {/* 通常求人実績入力テーブル */}
      {assignedJobs.length === 0 ? (
        <div className="empty-jobs-card">
          <p className="empty-title">担当求人が登録されていません</p>
          <p className="empty-sub">「求人」メニューから自分が担当する求人を追加してください。</p>
        </div>
      ) : (
        <div className="grid-table-container">
          <table className="daily-grid-table">
            <thead>
              <tr>
                <th className="th-job-name">担当求人</th>
                {mediaList.map((m) => (
                  <th key={m.mediaId} className="th-media">
                    {m.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {assignedJobs.map((job) => (
                <tr key={job.jobId} className="tr-job-row">
                  <td className="td-job-info">
                    <div className="job-company">{job.companyName}</div>
                    <div className="job-title-row">
                      <span className="job-title">{job.jobTitle}</span>
                      <button
                        className="btn-quick-memo"
                        onClick={() => setMemoJob(job)}
                        title="クイックメモを登録"
                      >
                        <MessageSquarePlus className="icon-xs" />
                      </button>
                    </div>
                  </td>

                  {mediaList.map((m) => {
                    const res = resultsMap[`${job.jobId}_${m.mediaId}`] || {
                      sentCount: 0,
                      totalReplyCount: 0,
                      effectiveReplyCount: 0,
                    };

                    return (
                      <td key={m.mediaId} className="td-cell-input">
                        <div className="cell-box">
                          {/* 送信数入力 */}
                          <div className="input-group-row">
                            <span className="input-label">送信:</span>
                            <input
                              type="number"
                              min="0"
                              className="cell-num-input"
                              value={res.sentCount === 0 ? '' : res.sentCount}
                              placeholder="0"
                              onChange={(e) =>
                                handleSentChange(
                                  job.jobId,
                                  m.mediaId,
                                  null,
                                  e.target.value === '' ? 0 : Number(e.target.value)
                                )
                              }
                            />
                          </div>

                          {/* 送信数クイックボタン */}
                          <div className="quick-btn-row">
                            <button
                              className="btn-qc"
                              onClick={() => handleSentChange(job.jobId, m.mediaId, 1)}
                            >
                              +1
                            </button>
                            <button
                              className="btn-qc"
                              onClick={() => handleSentChange(job.jobId, m.mediaId, 5)}
                            >
                              +5
                            </button>
                            <button
                              className="btn-qc"
                              onClick={() => handleSentChange(job.jobId, m.mediaId, 10)}
                            >
                              +10
                            </button>
                            <button
                              className="btn-qc btn-minus"
                              onClick={() => handleSentChange(job.jobId, m.mediaId, -1)}
                            >
                              -1
                            </button>
                          </div>

                          {/* 返信数入力 */}
                          <div className="reply-control-box">
                            <div className="reply-inputs-row">
                              <div className="reply-field">
                                <span className="lbl">総返信</span>
                                <input
                                  type="number"
                                  min="0"
                                  className="reply-num-input"
                                  value={res.totalReplyCount === 0 ? '' : res.totalReplyCount}
                                  placeholder="0"
                                  onChange={(e) =>
                                    handleReplyChange(
                                      job.jobId,
                                      m.mediaId,
                                      'total_direct',
                                      e.target.value === '' ? 0 : Number(e.target.value)
                                    )
                                  }
                                />
                              </div>
                              <div className="reply-field">
                                <span className="lbl highlight">有効返信</span>
                                <input
                                  type="number"
                                  min="0"
                                  className="reply-num-input highlight"
                                  value={res.effectiveReplyCount === 0 ? '' : res.effectiveReplyCount}
                                  placeholder="0"
                                  onChange={(e) =>
                                    handleReplyChange(
                                      job.jobId,
                                      m.mediaId,
                                      'effective_direct',
                                      e.target.value === '' ? 0 : Number(e.target.value)
                                    )
                                  }
                                />
                              </div>
                            </div>

                            <div className="reply-btns-row">
                              <button
                                className="btn-reply-qc"
                                onClick={() => handleReplyChange(job.jobId, m.mediaId, 'total_plus1')}
                              >
                                総返信+1
                              </button>
                              <button
                                className="btn-reply-qc effective"
                                onClick={() =>
                                  handleReplyChange(job.jobId, m.mediaId, 'effective_plus1')
                                }
                              >
                                有効返信+1
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 返信のみ入力可能な求人 (一時停止・募集終了求人) */}
      {pausedClosedJobs.length > 0 && (
        <div className="paused-jobs-accordion">
          <div
            className="accordion-header"
            onClick={() => setIsPausedSectionOpen(!isPausedSectionOpen)}
          >
            <span className="accordion-title">返信のみ入力可能な求人 (一時停止・募集終了)</span>
            <span className="accordion-count">{pausedClosedJobs.length}件</span>
            {isPausedSectionOpen ? <ChevronUp className="icon-sm" /> : <ChevronDown className="icon-sm" />}
          </div>

          {isPausedSectionOpen && (
            <div className="accordion-content">
              <table className="daily-grid-table paused-table">
                <thead>
                  <tr>
                    <th className="th-job-name">対象求人</th>
                    {mediaList.map((m) => (
                      <th key={m.mediaId}>{m.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pausedClosedJobs.map((job) => (
                    <tr key={job.jobId}>
                      <td className="td-job-info">
                        <span className="badge-job-status">{job.status}</span>
                        <div className="job-company">{job.companyName}</div>
                        <div className="job-title">{job.jobTitle}</div>
                      </td>

                      {mediaList.map((m) => {
                        const res = resultsMap[`${job.jobId}_${m.mediaId}`] || {
                          sentCount: 0,
                          totalReplyCount: 0,
                          effectiveReplyCount: 0,
                        };

                        return (
                          <td key={m.mediaId} className="td-cell-input">
                            <div className="cell-box disabled-sent">
                              <div className="disabled-sent-label">送信入力不可</div>

                              {/* 返信入力のみ許可 */}
                              <div className="reply-control-box">
                                <div className="reply-inputs-row">
                                  <div className="reply-field">
                                    <span className="lbl">総返信</span>
                                    <input
                                      type="number"
                                      min="0"
                                      className="reply-num-input"
                                      value={res.totalReplyCount === 0 ? '' : res.totalReplyCount}
                                      placeholder="0"
                                      onChange={(e) =>
                                        handleReplyChange(
                                          job.jobId,
                                          m.mediaId,
                                          'total_direct',
                                          e.target.value === '' ? 0 : Number(e.target.value)
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="reply-field">
                                    <span className="lbl highlight">有効返信</span>
                                    <input
                                      type="number"
                                      min="0"
                                      className="reply-num-input highlight"
                                      value={res.effectiveReplyCount === 0 ? '' : res.effectiveReplyCount}
                                      placeholder="0"
                                      onChange={(e) =>
                                        handleReplyChange(
                                          job.jobId,
                                          m.mediaId,
                                          'effective_direct',
                                          e.target.value === '' ? 0 : Number(e.target.value)
                                        )
                                      }
                                    />
                                  </div>
                                </div>

                                <div className="reply-btns-row">
                                  <button
                                    className="btn-reply-qc"
                                    onClick={() => handleReplyChange(job.jobId, m.mediaId, 'total_plus1')}
                                  >
                                    総返信+1
                                  </button>
                                  <button
                                    className="btn-reply-qc effective"
                                    onClick={() =>
                                      handleReplyChange(job.jobId, m.mediaId, 'effective_plus1')
                                    }
                                  >
                                    有効返信+1
                                  </button>
                                </div>
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* クイックメモモーダル */}
      {memoJob && <QuickMemoModal job={memoJob} onClose={() => setMemoJob(null)} />}
    </div>
  );
};
