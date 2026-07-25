// 管理者パネル (担当者マスタ・実績修正・変更履歴・データ管理・全リセット)
import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import {
  fetchStaffList,
  saveStaff,
  fetchAuditLogs,
  saveAuditLog,
  fetchScoutResults,
  saveScoutResult,
  exportAllDataJSON,
  resetAllData,
  fetchJobs,
  fetchMediaList,
} from '../services/storageService';
import { Staff, AuditLog, ScoutResult, Job, Media } from '../types';
import { downloadCSV, downloadJSON } from '../utils/csvUtils';
import { formatDateTime } from '../utils/dateUtils';
import {
  ShieldAlert,
  UserCog,
  History,
  Database,
  Trash2,
  Download,
  CheckCircle,
  AlertTriangle,
  Edit,
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { currentStaff, setIsAdminMode, currentView, refreshData } = useApp();

  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [allResults, setAllResults] = useState<ScoutResult[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [mediaList, setMediaList] = useState<Media[]>([]);

  // 管理者実績修正モーダル
  const [editingResult, setEditingResult] = useState<ScoutResult | null>(null);
  const [correctionReason, setCorrectionReason] = useState<string>('');

  // 全データリセット確認モーダル
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const [resetPasswordInput, setResetPasswordInput] = useState<string>('');
  const [keepStaffMasterOption, setKeepStaffMasterOption] = useState<boolean>(true);

  const loadData = useCallback(async () => {
    const [sList, logs, resList, jList, mList] = await Promise.all([
      fetchStaffList(),
      fetchAuditLogs(),
      fetchScoutResults(),
      fetchJobs(),
      fetchMediaList(),
    ]);

    setStaffList(sList);
    setAuditLogs(logs);
    setAllResults(resList);
    setJobs(jList);
    setMediaList(mList);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // 担当者ステータス切り替え
  const handleToggleStaffStatus = async (staff: Staff) => {
    const newStatus = staff.status === 'active' ? 'inactive' : 'active';
    const updated: Staff = {
      ...staff,
      status: newStatus,
      updatedAt: new Date().toISOString(),
    };
    await saveStaff(updated);

    // ログ保存
    await saveAuditLog({
      logId: 'log_' + Date.now(),
      targetType: 'staff',
      targetId: staff.staffId,
      actionType: 'update',
      beforeData: { status: staff.status },
      afterData: { status: newStatus },
      staffId: currentStaff?.staffId || 'admin',
      staffName: currentStaff?.name || '管理者',
      reason: `担当者ステータス変更: ${staff.name} (${newStatus})`,
      createdAt: new Date().toISOString(),
    });

    await loadData();
    await refreshData();
  };

  // 管理者実績修正確定
  const handleConfirmResultCorrection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingResult || !correctionReason.trim() || !currentStaff) return;

    const original = allResults.find((r) => r.resultId === editingResult.resultId);

    await saveScoutResult({
      ...editingResult,
      updatedAt: new Date().toISOString(),
      lastUpdatedByStaffId: currentStaff.staffId,
    });

    // 修正理由付き監査ログ保存
    await saveAuditLog({
      logId: 'log_' + Date.now(),
      targetType: 'scout_results',
      targetId: editingResult.resultId,
      actionType: 'correct',
      beforeData: original,
      afterData: editingResult,
      staffId: currentStaff.staffId,
      staffName: currentStaff.name,
      reason: correctionReason.trim(),
      createdAt: new Date().toISOString(),
    });

    setEditingResult(null);
    setCorrectionReason('');
    await loadData();
  };

  // JSONバックアップダウンロード
  const handleDownloadJSONBackup = async () => {
    const data = await exportAllDataJSON();
    downloadJSON(`thanks_scout_backup_${new Date().toISOString().slice(0, 10)}`, data);
  };

  // CSVエクスポート
  const handleExportResultsCSV = () => {
    const headers = [
      '実績ID',
      '日付',
      '担当者ID',
      '求人ID',
      '媒体ID',
      '送信数',
      '総返信数',
      '有効返信数',
      'ステータス',
      '更新日時',
    ];
    const rows = allResults.map((r) => [
      r.resultId,
      r.date,
      r.staffId,
      r.jobId,
      r.mediaId,
      r.sentCount,
      r.totalReplyCount,
      r.effectiveReplyCount,
      r.status,
      r.updatedAt,
    ]);
    downloadCSV(`scout_results_full_${new Date().toISOString().slice(0, 10)}`, headers, rows);
  };

  // 全データリセット実行
  const handleExecuteDataReset = async () => {
    if (resetPasswordInput !== 'Thanks5877') {
      alert('管理者パスワードが正しくありません。');
      return;
    }

    // 自動バックアップダウンロード
    await handleDownloadJSONBackup();

    await resetAllData(keepStaffMasterOption);

    await saveAuditLog({
      logId: 'log_' + Date.now(),
      targetType: 'all_reset',
      targetId: 'system',
      actionType: 'reset',
      staffId: currentStaff?.staffId || 'admin',
      staffName: currentStaff?.name || '管理者',
      reason: `全データリセット実行 (担当者マスタ残す: ${keepStaffMasterOption})`,
      createdAt: new Date().toISOString(),
    });

    setShowResetConfirm(false);
    setResetPasswordInput('');
    await loadData();
    await refreshData();
    alert('全データのリセットが完了しました。バックアップファイルが保存されました。');
  };

  return (
    <div className="admin-panel-container">
      <div className="admin-banner">
        <ShieldAlert className="icon-sm text-gold" />
        <span>管理者モード実行中 (認証済みセッション)</span>
      </div>

      {/* サブメニュー1: 担当者マスタ管理 */}
      {currentView === 'admin_staff' && (
        <div className="admin-section">
          <h3 className="section-title">担当者マスタ管理</h3>
          <table className="report-table mt-3">
            <thead>
              <tr>
                <th>担当者ID</th>
                <th>氏名</th>
                <th>利用状態</th>
                <th>管理者区分</th>
                <th>作成日時</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((s) => (
                <tr key={s.staffId}>
                  <td className="font-mono">{s.staffId}</td>
                  <td className="fw-bold">{s.name}</td>
                  <td>
                    <span className={`badge-status status-${s.status}`}>
                      {s.status === 'active' ? '利用中' : '利用停止'}
                    </span>
                  </td>
                  <td>{s.adminRole === 'admin' ? '管理者' : '一般メンバー'}</td>
                  <td>{formatDateTime(s.createdAt)}</td>
                  <td>
                    <button
                      className="btn-secondary btn-xs"
                      onClick={() => handleToggleStaffStatus(s)}
                    >
                      {s.status === 'active' ? '利用停止にする' : '利用中にする'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* サブメニュー2: 実績管理・修正 */}
      {currentView === 'admin_results' && (
        <div className="admin-section">
          <h3 className="section-title">全担当者の実績データ修正 (管理者)</h3>
          <p className="text-sm text-muted">
            管理者は全実績データの修正が可能です。修正時には必須の修正理由を入力する必要があります。
          </p>

          <table className="report-table mt-3">
            <thead>
              <tr>
                <th>日付</th>
                <th>担当者</th>
                <th>求人</th>
                <th>媒体</th>
                <th>送信</th>
                <th>総返信</th>
                <th>有効返信</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {allResults.slice(0, 50).map((r) => {
                const staffName = staffList.find((s) => s.staffId === r.staffId)?.name || r.staffId;
                const jobTitle = jobs.find((j) => j.jobId === r.jobId)?.jobTitle || r.jobId;
                const mediaName = mediaList.find((m) => m.mediaId === r.mediaId)?.name || r.mediaId;
                return (
                  <tr key={r.resultId}>
                    <td>{r.date}</td>
                    <td>{staffName}</td>
                    <td>{jobTitle}</td>
                    <td>{mediaName}</td>
                    <td>{r.sentCount}</td>
                    <td>{r.totalReplyCount}</td>
                    <td className="text-gold font-bold">{r.effectiveReplyCount}</td>
                    <td>
                      <button className="btn-secondary btn-xs" onClick={() => setEditingResult(r)}>
                        <Edit className="icon-xs" /> 修正モーダル
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* サブメニュー3: 変更履歴 (Audit Logs) */}
      {currentView === 'admin_audit' && (
        <div className="admin-section">
          <h3 className="section-title">システム変更履歴 (監査ログ)</h3>
          <table className="report-table mt-3">
            <thead>
              <tr>
                <th>日時</th>
                <th>操作者</th>
                <th>対象データ</th>
                <th>操作種別</th>
                <th>修正理由 / 内容</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    変更履歴ログがまだありません
                  </td>
                </tr>
              ) : (
                auditLogs.map((log) => (
                  <tr key={log.logId}>
                    <td className="font-mono text-xs">{formatDateTime(log.createdAt)}</td>
                    <td className="fw-bold">{log.staffName}</td>
                    <td>{log.targetType}</td>
                    <td>
                      <span className="badge-action">{log.actionType}</span>
                    </td>
                    <td>{log.reason}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* サブメニュー4: データ管理・バックアップ・全リセット */}
      {(currentView === 'admin_data' || currentView === 'admin_settings') && (
        <div className="admin-section">
          <h3 className="section-title">データバックアップ & リセット</h3>
          <div className="admin-cards-grid mt-4">
            <div className="admin-action-card">
              <Database className="icon-md text-gold" />
              <h4>JSON 完全バックアップ</h4>
              <p>全テーブル・全実績データをJSON形式で即時ダウンロードします。</p>
              <button className="btn-primary btn-sm mt-3" onClick={handleDownloadJSONBackup}>
                <Download className="icon-xs" /> JSONをダウンロード
              </button>
            </div>

            <div className="admin-action-card">
              <Download className="icon-md text-primary" />
              <h4>全実績 CSV エクスポート</h4>
              <p>全担当者・全期間のスカウト実績を文字化けしないUTF-8 BOM付きCSVでエクスポート。</p>
              <button className="btn-secondary btn-sm mt-3" onClick={handleExportResultsCSV}>
                <Download className="icon-xs" /> 実績CSVを出力
              </button>
            </div>

            <div className="admin-action-card danger-card">
              <Trash2 className="icon-md text-danger" />
              <h4 className="text-danger">全データリセット</h4>
              <p>全実績・求人・ナレッジ・文面データを削除し初期化します。</p>
              <button
                className="btn-danger btn-sm mt-3"
                onClick={() => setShowResetConfirm(true)}
              >
                <AlertTriangle className="icon-xs" /> 全データリセット画面を開く
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 管理者実績修正モーダル */}
      {editingResult && (
        <div className="modal-backdrop">
          <div className="modal-card modal-md">
            <h3 className="modal-title">管理者による実績データの修正</h3>

            <form onSubmit={handleConfirmResultCorrection} className="correction-form">
              <div className="form-group">
                <label>スカウト送信数</label>
                <input
                  type="number"
                  min="0"
                  value={editingResult.sentCount}
                  onChange={(e) =>
                    setEditingResult({ ...editingResult, sentCount: Number(e.target.value) })
                  }
                  className="input-text"
                />
              </div>

              <div className="form-group">
                <label>総返信数</label>
                <input
                  type="number"
                  min="0"
                  value={editingResult.totalReplyCount}
                  onChange={(e) =>
                    setEditingResult({ ...editingResult, totalReplyCount: Number(e.target.value) })
                  }
                  className="input-text"
                />
              </div>

              <div className="form-group">
                <label>有効返信数</label>
                <input
                  type="number"
                  min="0"
                  value={editingResult.effectiveReplyCount}
                  onChange={(e) =>
                    setEditingResult({ ...editingResult, effectiveReplyCount: Number(e.target.value) })
                  }
                  className="input-text"
                />
              </div>

              <div className="form-group">
                <label className="text-danger font-bold">修正理由（必須入力）</label>
                <textarea
                  rows={3}
                  required
                  placeholder="例: 送信数の誤入力に関する手動修正（承認済み）"
                  value={correctionReason}
                  onChange={(e) => setCorrectionReason(e.target.value)}
                  className="textarea-input"
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setEditingResult(null)}
                >
                  キャンセル
                </button>
                <button type="submit" className="btn-primary">
                  修正を確定する
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 全データリセット確認モーダル */}
      {showResetConfirm && (
        <div className="modal-backdrop">
          <div className="modal-card modal-md border-danger">
            <h3 className="modal-title text-danger">⚠️ 全データリセットの最終確認</h3>
            <p className="modal-message">
              全求人・実績・ナレッジ・スカウト文面が削除されます。削除前にJSONバックアップが自動取得されます。
            </p>

            <div className="form-checkbox mt-3">
              <label>
                <input
                  type="checkbox"
                  checked={keepStaffMasterOption}
                  onChange={(e) => setKeepStaffMasterOption(e.target.checked)}
                />
                担当者マスタは残す（推奨）
              </label>
            </div>

            <div className="form-group mt-3">
              <label>確認のため管理者パスワードを入力してください (Thanks5877):</label>
              <input
                type="password"
                value={resetPasswordInput}
                onChange={(e) => setResetPasswordInput(e.target.value)}
                className="input-text"
              />
            </div>

            <div className="modal-actions mt-4">
              <button className="btn-secondary" onClick={() => setShowResetConfirm(false)}>
                キャンセル
              </button>
              <button
                className="btn-danger"
                onClick={handleExecuteDataReset}
                disabled={resetPasswordInput !== 'Thanks5877'}
              >
                全データ削除を実行
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
