/**
 * サンクスパートナーズ スカウト実績・求人管理一元化ツール - 集計・分析エンジン
 */

import { StorageService } from './storage.js';

export class AnalyticsService {
  /**
   * JST基準の期間日付範囲を算出
   */
  static getPeriodRange(periodKey, baseDateStr = '') {
    const now = baseDateStr ? new Date(baseDateStr) : new Date();
    const jstNow = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
    
    let startDate = new Date(jstNow);
    let endDate = new Date(jstNow);

    if (periodKey === 'today') {
      // 当日のみ
    } else if (periodKey === 'week') {
      const day = jstNow.getDay();
      const diffToMon = day === 0 ? -6 : 1 - day;
      startDate.setDate(jstNow.getDate() + diffToMon);
      endDate.setDate(startDate.getDate() + 6);
    } else if (periodKey === 'month') {
      startDate = new Date(jstNow.getFullYear(), jstNow.getMonth(), 1);
      endDate = new Date(jstNow.getFullYear(), jstNow.getMonth() + 1, 0);
    } else if (periodKey === '3months') {
      startDate.setMonth(jstNow.getMonth() - 3);
    } else if (periodKey === 'halfYear') {
      startDate.setMonth(jstNow.getMonth() - 6);
    } else if (periodKey === 'year') {
      startDate.setFullYear(jstNow.getFullYear() - 1);
    }

    const formatDate = (d) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    return {
      startStr: formatDate(startDate),
      endStr: formatDate(endDate),
      label: `${startDate.getFullYear()}年${startDate.getMonth() + 1}月${startDate.getDate()}日～${endDate.getFullYear()}年${endDate.getMonth() + 1}月${endDate.getDate()}日`
    };
  }

  /**
   * 基本数値の集計
   */
  static calculateMetrics(resultsList) {
    let sentCount = 0;
    let totalReplyCount = 0;
    let effectiveReplyCount = 0;

    resultsList.forEach(r => {
      if (r.status === 'valid') {
        sentCount += Number(r.sentCount || 0);
        totalReplyCount += Number(r.totalReplyCount || 0);
        effectiveReplyCount += Number(r.effectiveReplyCount || 0);
      }
    });

    const totalReplyRate = sentCount > 0 ? (totalReplyCount / sentCount) * 100 : null;
    const effectiveReplyRate = sentCount > 0 ? (effectiveReplyCount / sentCount) * 100 : null;
    const sentPerEffective = effectiveReplyCount > 0 ? sentCount / effectiveReplyCount : null;

    return {
      sentCount,
      totalReplyCount,
      effectiveReplyCount,
      totalReplyRateFormatted: totalReplyRate !== null ? `${totalReplyRate.toFixed(1)}%` : '－',
      effectiveReplyRateFormatted: effectiveReplyRate !== null ? `${effectiveReplyRate.toFixed(1)}%` : '－',
      sentPerEffectiveFormatted: sentPerEffective !== null ? sentPerEffective.toFixed(1) : '－',
      totalReplyRateRaw: totalReplyRate,
      effectiveReplyRateRaw: effectiveReplyRate
    };
  }

  /**
   * 指定条件によるスカウト実績フィルタリング
   */
  static filterResults({ staffId = '', periodKey = 'week', customStart = '', customEnd = '', jobIds = [], mediaIds = [] } = {}) {
    const allResults = StorageService.getValidScoutResults();
    let range;

    if (customStart && customEnd) {
      range = { startStr: customStart, endStr: customEnd };
    } else {
      range = this.getPeriodRange(periodKey);
    }

    return allResults.filter(r => {
      if (staffId && r.staffId !== staffId) return false;
      if (r.date < range.startStr || r.date > range.endStr) return false;
      if (jobIds.length > 0 && !jobIds.includes(r.jobId)) return false;
      if (mediaIds.length > 0 && !mediaIds.includes(r.mediaId)) return false;
      return true;
    });
  }

  /**
   * 指定条件による自動スカウト実績フィルタリング
   * (日付判定ルール: 今日は空配列、週単位記録のため週開始日基準)
   */
  static filterAutoScoutResults({ periodKey = 'week', customStart = '', customEnd = '', jobIds = [], mediaIds = [] } = {}) {
    if (periodKey === 'today') {
      return [];
    }

    const allAutoResults = StorageService.getValidAutoScoutWeeklyResults();
    let range;

    if (customStart && customEnd) {
      range = { startStr: customStart, endStr: customEnd };
    } else {
      range = this.getPeriodRange(periodKey);
    }

    return allAutoResults.filter(r => {
      if (r.weekStartDate < range.startStr || r.weekStartDate > range.endStr) {
        if (periodKey === 'week' || periodKey === 'month') {
          if (r.weekStartDate < range.startStr || r.weekStartDate > range.endStr) return false;
        } else {
          if (r.weekStartDate < range.startStr || r.weekStartDate > range.endStr) return false;
        }
      }
      if (jobIds.length > 0 && !jobIds.includes(r.jobId)) return false;
      if (mediaIds.length > 0 && !mediaIds.includes(r.mediaId)) return false;
      return true;
    });
  }

  /**
   * 指定条件によるインバウンド（直接エントリー）実績フィルタリング
   */
  static filterInboundResults({ periodKey = 'week', customStart = '', customEnd = '', jobIds = [], routeIds = [] } = {}) {
    const allInboundResults = StorageService.getValidInboundResults();
    let range;

    if (customStart && customEnd) {
      range = { startStr: customStart, endStr: customEnd };
    } else {
      range = this.getPeriodRange(periodKey);
    }

    return allInboundResults.filter(r => {
      if (r.date < range.startStr || r.date > range.endStr) return false;
      if (jobIds.length > 0 && !jobIds.includes(r.jobId)) return false;
      if (routeIds.length > 0 && !routeIds.includes(r.routeId)) return false;
      return true;
    });
  }

  /**
   * インバウンド基本指標計算
   */
  static calculateInboundMetrics(inboundResultsList) {
    let entryCount = 0;
    let effectiveCount = 0;

    inboundResultsList.forEach(r => {
      if (r.status !== 'cancelled') {
        entryCount += Number(r.entryCount || 0);
        effectiveCount += Number(r.effectiveCount || 0);
      }
    });

    const effectiveRate = entryCount > 0 ? (effectiveCount / entryCount) * 100 : null;

    return {
      entryCount,
      effectiveCount,
      effectiveRateFormatted: effectiveRate !== null ? `${effectiveRate.toFixed(1)}%` : '－',
      effectiveRateRaw: effectiveRate
    };
  }

  /**
   * 求人別インバウンド応募集計
   */
  static aggregateInboundByJob(filteredInboundResults) {
    const jobsMap = new Map(StorageService.getJobs().map(j => [j.jobId, j]));
    const map = new Map();

    filteredInboundResults.forEach(r => {
      if (!map.has(r.jobId)) {
        const j = jobsMap.get(r.jobId) || { companyName: '不明企業', jobTitle: '不明求人', priorityRank: 'UNSET' };
        map.set(r.jobId, {
          jobId: r.jobId,
          companyName: j.companyName,
          companyNameKana: j.companyNameKana || '',
          jobTitle: j.jobTitle,
          priorityRank: j.priorityRank,
          status: j.status,
          entryCount: 0,
          effectiveCount: 0,
          routeBreakdown: {}
        });
      }
      const stat = map.get(r.jobId);
      stat.entryCount += Number(r.entryCount || 0);
      stat.effectiveCount += Number(r.effectiveCount || 0);
      if (!stat.routeBreakdown[r.routeId]) {
        stat.routeBreakdown[r.routeId] = { entry: 0, effective: 0 };
      }
      stat.routeBreakdown[r.routeId].entry += Number(r.entryCount || 0);
      stat.routeBreakdown[r.routeId].effective += Number(r.effectiveCount || 0);
    });

    return Array.from(map.values()).map(s => {
      const rate = s.entryCount > 0 ? ((s.effectiveCount / s.entryCount) * 100).toFixed(1) + '%' : '－';
      return { ...s, effectiveRateFormatted: rate };
    }).sort((a, b) => b.entryCount - a.entryCount);
  }

  /**
   * 経路別インバウンド応募集計
   */
  static aggregateInboundByRoute(filteredInboundResults) {
    const routes = [
      { id: 'indeed', name: 'Indeed', order: 1, color: '#003A9B' },
      { id: 'own', name: '自社', order: 2, color: '#1B2A4A' },
      { id: 'bizreach', name: 'ビズリーチ', order: 3, color: '#C5A059' },
      { id: 'middle', name: 'ミドル', order: 4, color: '#2B6CB0' },
      { id: 'ambi', name: 'AMBI', order: 5, color: '#805AD5' },
      { id: 'ix', name: 'IX', order: 6, color: '#DD6B20' },
      { id: 'other', name: 'その他', order: 7, color: '#718096' }
    ];

    const map = new Map(routes.map(r => [r.id, {
      routeId: r.id,
      name: r.name,
      order: r.order,
      color: r.color,
      entryCount: 0,
      effectiveCount: 0
    }]));

    filteredInboundResults.forEach(r => {
      let stat = map.get(r.routeId);
      if (!stat) {
        stat = { routeId: r.routeId, name: r.routeId, order: 99, color: '#666', entryCount: 0, effectiveCount: 0 };
        map.set(r.routeId, stat);
      }
      stat.entryCount += Number(r.entryCount || 0);
      stat.effectiveCount += Number(r.effectiveCount || 0);
    });

    const totalEntryAll = Array.from(map.values()).reduce((acc, r) => acc + r.entryCount, 0);

    return Array.from(map.values())
      .sort((a, b) => a.order - b.order)
      .map(stat => {
        const rate = stat.entryCount > 0 ? ((stat.effectiveCount / stat.entryCount) * 100).toFixed(1) + '%' : '－';
        const share = totalEntryAll > 0 ? ((stat.entryCount / totalEntryAll) * 100).toFixed(1) + '%' : '0%';
        return { ...stat, effectiveRateFormatted: rate, share };
      });
  }

  /**
   * 独立集計ルーチン: チーム手動実績・自動スカウト実績・総スカウト実績
   */
  static calculateTotalScoutMetrics(filteredManualResults, filteredAutoResults) {
    const manualMetrics = this.calculateMetrics(filteredManualResults);
    const autoMetrics = this.calculateMetrics(filteredAutoResults);

    const sentCount = manualMetrics.sentCount + autoMetrics.sentCount;
    const totalReplyCount = manualMetrics.totalReplyCount + autoMetrics.totalReplyCount;
    const effectiveReplyCount = manualMetrics.effectiveReplyCount + autoMetrics.effectiveReplyCount;

    const totalReplyRate = sentCount > 0 ? (totalReplyCount / sentCount) * 100 : null;
    const effectiveReplyRate = sentCount > 0 ? (effectiveReplyCount / sentCount) * 100 : null;
    const sentPerEffective = effectiveReplyCount > 0 ? sentCount / effectiveReplyCount : null;

    const manualSentShare = sentCount > 0 ? ((manualMetrics.sentCount / sentCount) * 100).toFixed(1) : '0.0';
    const autoSentShare = sentCount > 0 ? ((autoMetrics.sentCount / sentCount) * 100).toFixed(1) : '0.0';

    return {
      manual: manualMetrics,
      auto: autoMetrics,
      total: {
        sentCount,
        totalReplyCount,
        effectiveReplyCount,
        totalReplyRateFormatted: totalReplyRate !== null ? `${totalReplyRate.toFixed(1)}%` : '－',
        effectiveReplyRateFormatted: effectiveReplyRate !== null ? `${effectiveReplyRate.toFixed(1)}%` : '－',
        sentPerEffectiveFormatted: sentPerEffective !== null ? sentPerEffective.toFixed(1) : '－',
        manualSentShare: `${manualSentShare}%`,
        autoSentShare: `${autoSentShare}%`
      }
    };
  }

  /**
   * 求人別の統合実績（手動・自動・合算）マトリクス集計
   */
  static aggregateTotalByJob(filteredManualResults, filteredAutoResults) {
    const jobsMap = new Map(StorageService.getJobs().map(j => [j.jobId, j]));
    const map = new Map();

    const getStat = (jobId) => {
      if (!map.has(jobId)) {
        const job = jobsMap.get(jobId) || { companyName: '不明企業', jobTitle: '不明求人', status: '不明', priorityRank: 'UNSET' };
        map.set(jobId, {
          jobId,
          companyName: job.companyName,
          companyNameKana: job.companyNameKana || '',
          jobTitle: job.jobTitle,
          status: job.status,
          priorityRank: job.priorityRank,
          manualSent: 0, autoSent: 0,
          manualTotalReply: 0, autoTotalReply: 0,
          manualEffReply: 0, autoEffReply: 0
        });
      }
      return map.get(jobId);
    };

    filteredManualResults.forEach(r => {
      const s = getStat(r.jobId);
      s.manualSent += Number(r.sentCount || 0);
      s.manualTotalReply += Number(r.totalReplyCount || 0);
      s.manualEffReply += Number(r.effectiveReplyCount || 0);
    });

    filteredAutoResults.forEach(r => {
      const s = getStat(r.jobId);
      s.autoSent += Number(r.sentCount || 0);
      s.autoTotalReply += Number(r.totalReplyCount || 0);
      s.autoEffReply += Number(r.effectiveReplyCount || 0);
    });

    return Array.from(map.values()).map(s => {
      const totalSent = s.manualSent + s.autoSent;
      const totalReply = s.manualTotalReply + s.autoTotalReply;
      const totalEff = s.manualEffReply + s.autoEffReply;
      const tRate = totalSent > 0 ? ((totalReply / totalSent) * 100).toFixed(1) + '%' : '－';
      const eRate = totalSent > 0 ? ((totalEff / totalSent) * 100).toFixed(1) + '%' : '－';
      return {
        ...s,
        totalSent,
        totalReply,
        totalEff,
        totalReplyRateFormatted: tRate,
        effectiveReplyRateFormatted: eRate
      };
    }).sort((a, b) => b.totalSent - a.totalSent);
  }

  /**
   * 媒体別の統合実績（手動・自動・合算）マトリクス集計
   */
  static aggregateTotalByMedia(filteredManualResults, filteredAutoResults) {
    const mediaList = StorageService.getMediaList();
    const map = new Map(mediaList.map(m => [m.id, {
      mediaId: m.id,
      name: m.name,
      color: m.color || '#1A365D',
      displayOrder: m.displayOrder,
      manualSent: 0, autoSent: 0,
      manualTotalReply: 0, autoTotalReply: 0,
      manualEffReply: 0, autoEffReply: 0
    }]));

    filteredManualResults.forEach(r => {
      let s = map.get(r.mediaId);
      if (!s) {
        s = { mediaId: r.mediaId, name: r.mediaId, color: '#666', displayOrder: 99, manualSent: 0, autoSent: 0, manualTotalReply: 0, autoTotalReply: 0, manualEffReply: 0, autoEffReply: 0 };
        map.set(r.mediaId, s);
      }
      s.manualSent += Number(r.sentCount || 0);
      s.manualTotalReply += Number(r.totalReplyCount || 0);
      s.manualEffReply += Number(r.effectiveReplyCount || 0);
    });

    filteredAutoResults.forEach(r => {
      let s = map.get(r.mediaId);
      if (!s) {
        s = { mediaId: r.mediaId, name: r.mediaId, color: '#666', displayOrder: 99, manualSent: 0, autoSent: 0, manualTotalReply: 0, autoTotalReply: 0, manualEffReply: 0, autoEffReply: 0 };
        map.set(r.mediaId, s);
      }
      s.autoSent += Number(r.sentCount || 0);
      s.autoTotalReply += Number(r.totalReplyCount || 0);
      s.autoEffReply += Number(r.effectiveReplyCount || 0);
    });

    return Array.from(map.values())
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map(s => {
        const totalSent = s.manualSent + s.autoSent;
        const totalReply = s.manualTotalReply + s.autoTotalReply;
        const totalEff = s.manualEffReply + s.autoEffReply;
        const tRate = totalSent > 0 ? ((totalReply / totalSent) * 100).toFixed(1) + '%' : '－';
        const eRate = totalSent > 0 ? ((totalEff / totalSent) * 100).toFixed(1) + '%' : '－';
        return {
          ...s,
          totalSent,
          totalReply,
          totalEff,
          totalReplyRateFormatted: tRate,
          effectiveReplyRateFormatted: eRate
        };
      });
  }

  /**
   * 前期間の算出
   */
  static getPreviousPeriodResults(staffId = '', periodKey = 'week') {
    const currentRange = this.getPeriodRange(periodKey);
    const start = new Date(currentRange.startStr);
    const end = new Date(currentRange.endStr);
    const diffDays = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;

    const prevEnd = new Date(start);
    prevEnd.setDate(prevEnd.getDate() - 1);
    const prevStart = new Date(prevEnd);
    prevStart.setDate(prevStart.getDate() - diffDays + 1);

    const formatDate = (d) => d.toISOString().slice(0, 10);

    return this.filterResults({
      staffId,
      customStart: formatDate(prevStart),
      customEnd: formatDate(prevEnd)
    });
  }

  /**
   * 求人別集計
   */
  static aggregateByJob(filteredResults) {
    const jobsMap = new Map(StorageService.getJobs().map(j => [j.jobId, j]));
    const jobStats = new Map();

    filteredResults.forEach(r => {
      if (!jobStats.has(r.jobId)) {
        const job = jobsMap.get(r.jobId) || { companyName: '不明企業', jobTitle: '不明求人' };
        jobStats.set(r.jobId, {
          jobId: r.jobId,
          companyName: job.companyName,
          jobTitle: job.jobTitle,
          status: job.status || '不明',
          sentCount: 0,
          totalReplyCount: 0,
          effectiveReplyCount: 0,
          mediaBreakdown: {}
        });
      }

      const stat = jobStats.get(r.jobId);
      stat.sentCount += Number(r.sentCount || 0);
      stat.totalReplyCount += Number(r.totalReplyCount || 0);
      stat.effectiveReplyCount += Number(r.effectiveReplyCount || 0);

      if (!stat.mediaBreakdown[r.mediaId]) {
        stat.mediaBreakdown[r.mediaId] = { sent: 0, totalReply: 0, effectiveReply: 0 };
      }
      stat.mediaBreakdown[r.mediaId].sent += Number(r.sentCount || 0);
      stat.mediaBreakdown[r.mediaId].totalReply += Number(r.totalReplyCount || 0);
      stat.mediaBreakdown[r.mediaId].effectiveReply += Number(r.effectiveReplyCount || 0);
    });

    return Array.from(jobStats.values()).map(stat => {
      const metrics = this.calculateMetrics(
        Object.entries(stat.mediaBreakdown).map(([mediaId, val]) => ({
          status: 'valid',
          sentCount: val.sent,
          totalReplyCount: val.totalReply,
          effectiveReplyCount: val.effectiveReply
        }))
      );
      return { ...stat, ...metrics };
    }).sort((a, b) => b.sentCount - a.sentCount);
  }

  /**
   * 媒体別集計
   */
  static aggregateByMedia(filteredResults) {
    const mediaList = StorageService.getMediaList();
    const mediaStats = new Map(mediaList.map(m => [m.id, {
      mediaId: m.id,
      name: m.name,
      color: m.color || '#1A365D',
      displayOrder: m.displayOrder,
      sentCount: 0,
      totalReplyCount: 0,
      effectiveReplyCount: 0
    }]));

    filteredResults.forEach(r => {
      let stat = mediaStats.get(r.mediaId);
      if (!stat) {
        stat = { mediaId: r.mediaId, name: r.mediaId, color: '#666', displayOrder: 99, sentCount: 0, totalReplyCount: 0, effectiveReplyCount: 0 };
        mediaStats.set(r.mediaId, stat);
      }
      stat.sentCount += Number(r.sentCount || 0);
      stat.totalReplyCount += Number(r.totalReplyCount || 0);
      stat.effectiveReplyCount += Number(r.effectiveReplyCount || 0);
    });

    const totalSentAllMedia = Array.from(mediaStats.values()).reduce((acc, m) => acc + m.sentCount, 0);

    return Array.from(mediaStats.values())
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map(stat => {
        const metrics = this.calculateMetrics([{
          status: 'valid',
          sentCount: stat.sentCount,
          totalReplyCount: stat.totalReplyCount,
          effectiveReplyCount: stat.effectiveReplyCount
        }]);
        const share = totalSentAllMedia > 0 ? ((stat.sentCount / totalSentAllMedia) * 100).toFixed(1) + '%' : '0%';
        return { ...stat, ...metrics, share };
      });
  }

  /**
   * 曜日別集計 (JST基準)
   */
  static aggregateByDayOfWeek(filteredResults) {
    const dayNames = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];
    const daysStats = dayNames.map((name, index) => ({
      dayIndex: index,
      dayName: name,
      sentCount: 0,
      totalReplyCount: 0,
      effectiveReplyCount: 0
    }));

    filteredResults.forEach(r => {
      const d = new Date(r.date + 'T00:00:00+09:00');
      const dayIdx = d.getDay();
      daysStats[dayIdx].sentCount += Number(r.sentCount || 0);
      daysStats[dayIdx].totalReplyCount += Number(r.totalReplyCount || 0);
      daysStats[dayIdx].effectiveReplyCount += Number(r.effectiveReplyCount || 0);
    });

    const reordered = [...daysStats.slice(1), daysStats[0]];
    const totalSent = reordered.reduce((acc, d) => acc + d.sentCount, 0);

    return reordered.map(d => {
      const share = totalSent > 0 ? ((d.sentCount / totalSent) * 100).toFixed(1) + '%' : '0%';
      const metrics = this.calculateMetrics([{ status: 'valid', ...d }]);
      return { ...d, ...metrics, share };
    });
  }

  /**
   * 属性検索・分析 (カテゴリ内OR / カテゴリ間AND)
   */
  static searchByAttributes(filters) {
    const jobs = StorageService.getJobs();
    const filteredJobs = jobs.filter(job => {
      // 業種 (OR)
      if (filters.industries && filters.industries.length > 0) {
        if (!job.industry || !filters.industries.includes(job.industry)) return false;
      }
      // 職種 (OR)
      if (filters.positions && filters.positions.length > 0) {
        if (!job.position || !filters.positions.includes(job.position)) return false;
      }
      // ステータス (OR)
      if (filters.statuses && filters.statuses.length > 0) {
        if (!job.status || !filters.statuses.includes(job.status)) return false;
      }
      // 対象年齢 (OR - 配列重なり)
      if (filters.targetAges && filters.targetAges.length > 0) {
        const jobAges = Array.isArray(job.targetAge) ? job.targetAge : [];
        if (!jobAges.some(a => filters.targetAges.includes(a))) return false;
      }
      // 役職 (OR)
      if (filters.roles && filters.roles.length > 0) {
        if (!job.role || !filters.roles.includes(job.role)) return false;
      }
      // 年収帯 (OR - 配列重なり)
      if (filters.salaryRanges && filters.salaryRanges.length > 0) {
        const jobSalaries = Array.isArray(job.salaryRange) ? job.salaryRange : [];
        if (!jobSalaries.some(s => filters.salaryRanges.includes(s))) return false;
      }
      return true;
    });

    const targetJobIds = filteredJobs.map(j => j.jobId);
    const results = this.filterResults({
      staffId: filters.staffId || '',
      periodKey: filters.periodKey || 'month',
      jobIds: targetJobIds,
      mediaIds: filters.mediaIds || []
    });

    const metrics = this.calculateMetrics(results);
    const mediaBreakdown = this.aggregateByMedia(results);
    const dayOfWeekBreakdown = this.aggregateByDayOfWeek(results);
    const jobBreakdown = this.aggregateByJob(results);

    return {
      targetJobCount: filteredJobs.length,
      matchedJobs: filteredJobs,
      metrics,
      mediaBreakdown,
      dayOfWeekBreakdown,
      jobBreakdown
    };
  }

  /**
   * 類似求人検索 (属性一致スコア判定)
   */
  static findSimilarJobs(targetJobId) {
    const targetJob = StorageService.getJobById(targetJobId);
    if (!targetJob) return [];

    const allJobs = StorageService.getJobs().filter(j => j.jobId !== targetJobId && !j.archived);

    const scoredJobs = allJobs.map(job => {
      let score = 0;
      const matchedAttrs = [];

      if (job.industry && job.industry === targetJob.industry) {
        score += 3;
        matchedAttrs.push(`業種: ${job.industry}`);
      }
      if (job.position && job.position === targetJob.position) {
        score += 4;
        matchedAttrs.push(`職種: ${job.position}`);
      }
      if (job.role && job.role === targetJob.role) {
        score += 2;
        matchedAttrs.push(`役職: ${job.role}`);
      }

      const targetAges = Array.isArray(targetJob.targetAge) ? targetJob.targetAge : [];
      const jobAges = Array.isArray(job.targetAge) ? job.targetAge : [];
      const commonAges = jobAges.filter(a => targetAges.includes(a));
      if (commonAges.length > 0) {
        score += 2 * commonAges.length;
        matchedAttrs.push(`年齢: ${commonAges.join(', ')}`);
      }

      const targetSalaries = Array.isArray(targetJob.salaryRange) ? targetJob.salaryRange : [];
      const jobSalaries = Array.isArray(job.salaryRange) ? job.salaryRange : [];
      const commonSalaries = jobSalaries.filter(s => targetSalaries.includes(s));
      if (commonSalaries.length > 0) {
        score += 2 * commonSalaries.length;
        matchedAttrs.push(`年収: ${commonSalaries.join(', ')}`);
      }

      const results = this.filterResults({ jobIds: [job.jobId], periodKey: 'year' });
      const metrics = this.calculateMetrics(results);
      const mainMedia = this.aggregateByMedia(results).filter(m => m.sentCount > 0)[0]?.name || '未使用';

      return { job, score, matchedAttrs, metrics, mainMedia };
    });

    return scoredJobs.filter(item => item.score > 0).sort((a, b) => b.score - a.score);
  }

  /**
   * 求人比較分析 (2〜5件)
   */
  static compareJobs(jobIds, periodKey = 'month') {
    return jobIds.map(jobId => {
      const job = StorageService.getJobById(jobId) || { companyName: '不明企業', jobTitle: '不明求人' };
      const results = this.filterResults({ jobIds: [jobId], periodKey });
      const metrics = this.calculateMetrics(results);
      const mediaList = this.aggregateByMedia(results);
      const mainMedia = mediaList.filter(m => m.sentCount > 0)[0]?.name || 'なし';
      const knowledgeCount = StorageService.getKnowledgeList().filter(k => k.jobId === jobId).length;

      return { job, metrics, mainMedia, knowledgeCount };
    });
  }
}
