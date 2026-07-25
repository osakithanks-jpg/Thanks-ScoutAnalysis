// 集計および類似度計算ユーティリティ
import { Job, ScoutResult } from '../types';
import { SIMILARITY_WEIGHTS } from './constants';

export interface AggregateMetrics {
  sentCount: number;
  totalReplyCount: number;
  effectiveReplyCount: number;
  refTotalReplyRate: number; // 割合 (0〜1)
  refEffectiveReplyRate: number; // 割合 (0〜1)
  sentPerEffectiveReply: number; // 1件あたり送信数
  isLowData: boolean; // 30件未満フラグ
}

export function calculateMetrics(results: ScoutResult[]): AggregateMetrics {
  let sentCount = 0;
  let totalReplyCount = 0;
  let effectiveReplyCount = 0;

  results.forEach((r) => {
    if (r.status !== 'cancelled') {
      sentCount += r.sentCount || 0;
      totalReplyCount += r.totalReplyCount || 0;
      effectiveReplyCount += r.effectiveReplyCount || 0;
    }
  });

  const refTotalReplyRate = sentCount > 0 ? totalReplyCount / sentCount : 0;
  const refEffectiveReplyRate = sentCount > 0 ? effectiveReplyCount / sentCount : 0;
  const sentPerEffectiveReply = effectiveReplyCount > 0 ? sentCount / effectiveReplyCount : 0;

  return {
    sentCount,
    totalReplyCount,
    effectiveReplyCount,
    refTotalReplyRate,
    refEffectiveReplyRate,
    sentPerEffectiveReply,
    isLowData: sentCount < 30,
  };
}

export function formatPercent(rate: number): string {
  return `${(rate * 100).toFixed(1)}%`;
}

/**
 * 類似求人の適合スコアを計算 (0 〜 100 点)
 */
export interface SimilarityResult {
  targetJob: Job;
  matchedJob: Job;
  score: number;
  matchedAttributes: string[];
  differentAttributes: string[];
}

export function calculateJobSimilarity(baseJob: Job, targetJob: Job): SimilarityResult {
  let totalPossibleWeight = 0;
  let achievedWeight = 0;

  const matchedAttributes: string[] = [];
  const differentAttributes: string[] = [];

  // 1. 職種 (30点)
  if (baseJob.position) {
    totalPossibleWeight += SIMILARITY_WEIGHTS.position;
    if (baseJob.position === targetJob.position) {
      achievedWeight += SIMILARITY_WEIGHTS.position;
      matchedAttributes.push(`職種: ${baseJob.position}`);
    } else if (targetJob.position) {
      differentAttributes.push(`職種: ${baseJob.position} vs ${targetJob.position}`);
    }
  }

  // 2. 業種 (25点)
  if (baseJob.industry) {
    totalPossibleWeight += SIMILARITY_WEIGHTS.industry;
    if (baseJob.industry === targetJob.industry) {
      achievedWeight += SIMILARITY_WEIGHTS.industry;
      matchedAttributes.push(`業種: ${baseJob.industry}`);
    } else if (targetJob.industry) {
      differentAttributes.push(`業種: ${baseJob.industry} vs ${targetJob.industry}`);
    }
  }

  // 3. 対象年齢 (20点)
  if (baseJob.targetAge && baseJob.targetAge.length > 0) {
    totalPossibleWeight += SIMILARITY_WEIGHTS.targetAge;
    const hasOverlap = targetJob.targetAge?.some((age) => baseJob.targetAge?.includes(age));
    if (hasOverlap) {
      achievedWeight += SIMILARITY_WEIGHTS.targetAge;
      matchedAttributes.push(`年齢層: ${baseJob.targetAge.join(', ')}`);
    } else if (targetJob.targetAge?.length) {
      differentAttributes.push(`年齢層: ${baseJob.targetAge.join(', ')} vs ${targetJob.targetAge.join(', ')}`);
    }
  }

  // 4. 年収帯 (15点)
  if (baseJob.salaryRange && baseJob.salaryRange.length > 0) {
    totalPossibleWeight += SIMILARITY_WEIGHTS.salaryRange;
    const hasOverlap = targetJob.salaryRange?.some((sal) => baseJob.salaryRange?.includes(sal));
    if (hasOverlap) {
      achievedWeight += SIMILARITY_WEIGHTS.salaryRange;
      matchedAttributes.push(`年収帯: 一致`);
    } else if (targetJob.salaryRange?.length) {
      differentAttributes.push(`年収帯: 不一致`);
    }
  }

  // 5. 役職 (10点)
  if (baseJob.role) {
    totalPossibleWeight += SIMILARITY_WEIGHTS.role;
    if (baseJob.role === targetJob.role) {
      achievedWeight += SIMILARITY_WEIGHTS.role;
      matchedAttributes.push(`役職: ${baseJob.role}`);
    } else if (targetJob.role) {
      differentAttributes.push(`役職: ${baseJob.role} vs ${targetJob.role}`);
    }
  }

  const score = totalPossibleWeight > 0 ? Math.round((achievedWeight / totalPossibleWeight) * 100) : 0;

  return {
    targetJob: baseJob,
    matchedJob: targetJob,
    score,
    matchedAttributes,
    differentAttributes,
  };
}
