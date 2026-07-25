// CSV and JSON Export Utility with UTF-8 BOM encoding for Excel compatibility

export function downloadCSV(filename, csvContent) {
  // UTF-8 BOM
  const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
  const blob = new Blob([bom, csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function downloadJSON(filename, dataObj) {
  const jsonStr = JSON.stringify(dataObj, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportPersonalResultsCSV(results, jobsMap, mediaMap) {
  const headers = ['日付', '企業名', '求人名', '媒体', '送信数', '総返信数', '有効返信数', '参考総返信率', '参考有効返信率', 'ステータス'];
  const rows = results.map(r => {
    const job = jobsMap[r.jobId] || {};
    const media = mediaMap[r.mediaId] || {};
    const totalRate = r.sentCount > 0 ? ((r.totalReplyCount / r.sentCount) * 100).toFixed(1) + '%' : '-';
    const effectiveRate = r.sentCount > 0 ? ((r.effectiveReplyCount / r.sentCount) * 100).toFixed(1) + '%' : '-';
    return [
      r.date,
      `"${(job.companyName || '').replace(/"/g, '""')}"`,
      `"${(job.jobTitle || '').replace(/"/g, '""')}"`,
      `"${(media.name || '').replace(/"/g, '""')}"`,
      r.sentCount,
      r.totalReplyCount,
      r.effectiveReplyCount,
      totalRate,
      effectiveRate,
      r.status === 'cancelled' ? '取消済み' : '有効'
    ].join(',');
  });

  const content = [headers.join(','), ...rows].join('\n');
  downloadCSV(`my_scout_results_${new Date().toISOString().slice(0, 10)}.csv`, content);
}

export function exportTeamAggregatesCSV(aggregates, jobsMap, mediaMap) {
  const headers = ['日付', '企業名', '求人名', '媒体', 'チーム合計送信数', 'チーム合計総返信数', 'チーム合計有効返信数', '参考総返信率', '参考有効返信率'];
  const rows = aggregates.map(a => {
    const job = jobsMap[a.jobId] || {};
    const media = mediaMap[a.mediaId] || {};
    const totalRate = a.teamSentCount > 0 ? ((a.teamTotalReplyCount / a.teamSentCount) * 100).toFixed(1) + '%' : '-';
    const effectiveRate = a.teamSentCount > 0 ? ((a.teamEffectiveReplyCount / a.teamSentCount) * 100).toFixed(1) + '%' : '-';
    return [
      a.date,
      `"${(job.companyName || '').replace(/"/g, '""')}"`,
      `"${(job.jobTitle || '').replace(/"/g, '""')}"`,
      `"${(media.name || '').replace(/"/g, '""')}"`,
      a.teamSentCount,
      a.teamTotalReplyCount,
      a.teamEffectiveReplyCount,
      totalRate,
      effectiveRate
    ].join(',');
  });

  const content = [headers.join(','), ...rows].join('\n');
  downloadCSV(`team_aggregates_${new Date().toISOString().slice(0, 10)}.csv`, content);
}

export function exportAdminAllResultsCSV(results, usersMap, jobsMap, mediaMap) {
  const headers = ['日付', '担当者名', '担当者メール', '企業名', '求人名', '媒体', '送信数', '総返信数', '有効返信数', 'ステータス', '最終更新日時'];
  const rows = results.map(r => {
    const user = usersMap[r.userId] || {};
    const job = jobsMap[r.jobId] || {};
    const media = mediaMap[r.mediaId] || {};
    return [
      r.date,
      `"${(user.displayName || '').replace(/"/g, '""')}"`,
      `"${(user.email || '').replace(/"/g, '""')}"`,
      `"${(job.companyName || '').replace(/"/g, '""')}"`,
      `"${(job.jobTitle || '').replace(/"/g, '""')}"`,
      `"${(media.name || '').replace(/"/g, '""')}"`,
      r.sentCount,
      r.totalReplyCount,
      r.effectiveReplyCount,
      r.status === 'cancelled' ? '取消済み' : '有効',
      r.updatedAt || ''
    ].join(',');
  });

  const content = [headers.join(','), ...rows].join('\n');
  downloadCSV(`admin_all_scout_results_${new Date().toISOString().slice(0, 10)}.csv`, content);
}

export function exportAuditLogsCSV(logs) {
  const headers = ['日時', '変更種別', 'データ種別', '対象ID', '変更者名', '権限', '修正理由'];
  const rows = logs.map(l => [
    l.timestamp || '',
    l.actionType,
    l.entityType,
    l.entityId,
    `"${(l.userName || '').replace(/"/g, '""')}"`,
    l.userRole,
    `"${(l.reason || '').replace(/"/g, '""')}"`
  ].join(','));

  const content = [headers.join(','), ...rows].join('\n');
  downloadCSV(`audit_logs_${new Date().toISOString().slice(0, 10)}.csv`, content);
}
