// ルールベース求人類似度計算エンジン
// 職種 30点, 業種 25点, 対象年齢 20点, 年収帯 15点, 役職 10点

export function calculateJobSimilarity(baseJob, targetJob) {
  if (!baseJob || !targetJob || baseJob.jobId === targetJob.jobId) {
    return { score: 0, matchedAttributes: [], differingAttributes: [] };
  }

  let totalPossibleScore = 0;
  let earnedScore = 0;
  const matchedAttributes = [];
  const differingAttributes = [];

  // 1. 職種 (30点)
  if (baseJob.occupation) {
    totalPossibleScore += 30;
    if (baseJob.occupation === targetJob.occupation) {
      earnedScore += 30;
      matchedAttributes.push(`職種: ${baseJob.occupation}`);
    } else {
      differingAttributes.push(`職種: ${baseJob.occupation} vs ${targetJob.occupation || '未設定'}`);
    }
  }

  // 2. 業種 (25点)
  if (baseJob.industry) {
    totalPossibleScore += 25;
    if (baseJob.industry === targetJob.industry) {
      earnedScore += 25;
      matchedAttributes.push(`業種: ${baseJob.industry}`);
    } else {
      differingAttributes.push(`業種: ${baseJob.industry} vs ${targetJob.industry || '未設定'}`);
    }
  }

  // 3. 対象年齢 (20点) - 配列形式の重複チェック
  if (baseJob.targetAges && baseJob.targetAges.length > 0) {
    totalPossibleScore += 20;
    const targetAges = targetJob.targetAges || [];
    const overlap = baseJob.targetAges.filter(age => targetAges.includes(age));
    if (overlap.length > 0) {
      const matchRatio = overlap.length / Math.max(baseJob.targetAges.length, targetAges.length);
      const points = Math.round(20 * matchRatio);
      earnedScore += points;
      matchedAttributes.push(`対象年齢: ${overlap.join(', ')} 一致`);
    } else {
      differingAttributes.push(`対象年齢: ${baseJob.targetAges.join(', ')} vs ${targetAges.join(', ') || '未設定'}`);
    }
  }

  // 4. 年収帯 (15点) - 配列形式の重複チェック
  if (baseJob.salaryRanges && baseJob.salaryRanges.length > 0) {
    totalPossibleScore += 15;
    const targetSalary = targetJob.salaryRanges || [];
    const overlap = baseJob.salaryRanges.filter(s => targetSalary.includes(s));
    if (overlap.length > 0) {
      const matchRatio = overlap.length / Math.max(baseJob.salaryRanges.length, targetSalary.length);
      const points = Math.round(15 * matchRatio);
      earnedScore += points;
      matchedAttributes.push(`年収帯: ${overlap.join(', ')} 一致`);
    } else {
      differingAttributes.push(`年収帯: ${baseJob.salaryRanges.join(', ')} vs ${targetSalary.join(', ') || '未設定'}`);
    }
  }

  // 5. 役職 (10点)
  if (baseJob.position) {
    totalPossibleScore += 10;
    if (baseJob.position === targetJob.position) {
      earnedScore += 10;
      matchedAttributes.push(`役職: ${baseJob.position}`);
    } else {
      differingAttributes.push(`役職: ${baseJob.position} vs ${targetJob.position || '未設定'}`);
    }
  }

  if (totalPossibleScore === 0) {
    return { score: 0, matchedAttributes: [], differingAttributes: [] };
  }

  const finalPercentage = Math.round((earnedScore / totalPossibleScore) * 100);

  return {
    score: finalPercentage,
    matchedAttributes,
    differingAttributes
  };
}

export function findSimilarJobs(baseJob, allJobs, limit = 5) {
  if (!baseJob || !allJobs) return [];
  
  return allJobs
    .filter(job => job.jobId !== baseJob.jobId && !job.isArchived)
    .map(targetJob => {
      const sim = calculateJobSimilarity(baseJob, targetJob);
      return {
        job: targetJob,
        ...sim
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
