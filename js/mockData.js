/**
 * スカウト実績・返信状況可視化ツール - サンプルデータ生成モジュール
 */

import { DEFAULT_MEDIA_LIST } from './constants.js';

export const INITIAL_JOBS = [
  {
    id: 'JOB-001',
    title: '【大阪】機械要素メーカーの法人営業（有形商材・若手歓迎）',
    companyName: '大和精密工業株式会社',
    occupation: '法人営業',
    location: '大阪府大阪市北区',
    prefecture: '大阪府',
    area: '関西',
    assignee: '山田太郎',
    status: 'スカウト実施中',
    createdAt: '2026-04-15',
    scoutStartDate: '2026-05-01',
    industry: 'メーカー',
    jobCategory: '営業職',
    productType: '有形商材',
    targetType: '法人',
    salesType: '新規営業',
    minAge: 23,
    maxAge: 32,
    minSalary: 420,
    maxSalary: 580,
    isExperienced: false,
    isManagement: false,
    hasRelocation: false,
    isRemote: false,
    tags: ['若手向け', '第二新卒', 'メーカー', '転勤なし', '業界未経験可'],
    notes: 'AMBIおよびビズリーチでの返信率が高い傾向。若手有形営業としてニーズ高。',
    goals: {
      dailyScoutGoal: 15,
      weeklyScoutGoal: 80,
      monthlyScoutGoal: 320,
      replyGoal: 15,
      interviewGoal: 8
    }
  },
  {
    id: 'JOB-002',
    title: '【東京】SaaS系自社プロダクトのフィールドセールス',
    companyName: '株式会社クラウドイノベーションズ',
    occupation: 'IT営業',
    location: '東京都港区六本木',
    prefecture: '東京都',
    area: '関東',
    assignee: '佐藤花子',
    status: 'スカウト実施中',
    createdAt: '2026-04-20',
    scoutStartDate: '2026-05-01',
    industry: 'IT・通信',
    jobCategory: '営業職',
    productType: '無形商材',
    targetType: '法人',
    salesType: '新規営業',
    minAge: 26,
    maxAge: 38,
    minSalary: 600,
    maxSalary: 900,
    isExperienced: true,
    isManagement: false,
    hasRelocation: false,
    isRemote: true,
    tags: ['営業経験者', '上場企業', '高年収', '転勤なし'],
    notes: 'ビズリーチとAMBIが中心。無形SaaSのため職務要件の絞り込みがキー。',
    goals: {
      dailyScoutGoal: 20,
      weeklyScoutGoal: 100,
      monthlyScoutGoal: 400,
      replyGoal: 20,
      interviewGoal: 10
    }
  },
  {
    id: 'JOB-003',
    title: '【福岡】老舗食品卸のルート営業（転勤なし）',
    companyName: '九州フーズトレーディング株式会社',
    occupation: 'ルート営業',
    location: '福岡県福岡市博多区',
    prefecture: '福岡県',
    area: '九州',
    assignee: '鈴木一郎',
    status: 'スカウト実施中',
    createdAt: '2026-05-01',
    scoutStartDate: '2026-05-10',
    industry: '商社',
    jobCategory: '営業職',
    productType: '有形商材',
    targetType: '法人',
    salesType: '既存営業',
    minAge: 22,
    maxAge: 35,
    minSalary: 350,
    maxSalary: 480,
    isExperienced: false,
    isManagement: false,
    hasRelocation: false,
    isRemote: false,
    tags: ['第二新卒', '業界未経験可', '転勤なし', '年間休日120日以上'],
    notes: 'ミドルとMapsを中心に使用。安定性志向の候補者に響いている。',
    goals: {
      dailyScoutGoal: 10,
      weeklyScoutGoal: 50,
      monthlyScoutGoal: 200,
      replyGoal: 10,
      interviewGoal: 5
    }
  },
  {
    id: 'JOB-004',
    title: '【大阪】総合化学メーカーの営業事務アシスタント',
    companyName: '浪速マテリアル株式会社',
    occupation: '営業事務',
    location: '大阪府大阪市中央区',
    prefecture: '大阪府',
    area: '関西',
    assignee: '高橋健太',
    status: 'スカウト実施中',
    createdAt: '2026-05-05',
    scoutStartDate: '2026-05-15',
    industry: 'メーカー',
    jobCategory: '事務・管理職',
    productType: '該当なし',
    targetType: '該当なし',
    salesType: '該当なし',
    minAge: 22,
    maxAge: 30,
    minSalary: 320,
    maxSalary: 420,
    isExperienced: false,
    isManagement: false,
    hasRelocation: false,
    isRemote: false,
    tags: ['業界未経験可', '年間休日120日以上', '転勤なし', '第二新卒'],
    notes: 'AMBIおよびDBでスカウト送信。応募意欲が高く面談率が良い。',
    goals: {
      dailyScoutGoal: 10,
      weeklyScoutGoal: 50,
      monthlyScoutGoal: 200,
      replyGoal: 12,
      interviewGoal: 7
    }
  },
  {
    id: 'JOB-005',
    title: '【東京】成長中テック企業の採用HRスペシャリスト',
    companyName: 'ネクストエッジテクノロジーズ株式会社',
    occupation: '人事',
    location: '東京都渋谷区',
    prefecture: '東京都',
    area: '関東',
    assignee: '田中美咲',
    status: 'スカウト実施中',
    createdAt: '2026-05-10',
    scoutStartDate: '2026-05-20',
    industry: 'IT・通信',
    jobCategory: '事務・管理職',
    productType: '無形商材',
    targetType: '法人',
    salesType: '該当なし',
    minAge: 27,
    maxAge: 40,
    minSalary: 550,
    maxSalary: 800,
    isExperienced: true,
    isManagement: false,
    hasRelocation: false,
    isRemote: true,
    tags: ['経験者限定', '高年収', '新規拠点'],
    notes: 'ビズリーチとIXがマッチ。手動でのパーソナライズ文面が極めて効果的。',
    goals: {
      dailyScoutGoal: 8,
      weeklyScoutGoal: 40,
      monthlyScoutGoal: 160,
      replyGoal: 8,
      interviewGoal: 4
    }
  },
  {
    id: 'JOB-006',
    title: '【大阪】電子部品工場の品質管理・品質保証マネージャー',
    companyName: '関西エレクトロニクス株式会社',
    occupation: '品質管理・品質保証',
    location: '大阪府堺市',
    prefecture: '大阪府',
    area: '関西',
    assignee: '山田太郎',
    status: 'スカウト実施中',
    createdAt: '2026-05-12',
    scoutStartDate: '2026-05-25',
    industry: 'メーカー',
    jobCategory: '技術職・エンジニア',
    productType: '有形商材',
    targetType: '法人',
    salesType: '該当なし',
    minAge: 32,
    maxAge: 48,
    minSalary: 650,
    maxSalary: 950,
    isExperienced: true,
    isManagement: true,
    hasRelocation: false,
    isRemote: false,
    tags: ['管理職候補', 'メーカー', 'ニッチ業界', '高年収'],
    notes: 'ミドルとRDS、ビズリーチが中心。母集団は狭いが経験者の食いつきが良い。',
    goals: {
      dailyScoutGoal: 5,
      weeklyScoutGoal: 25,
      monthlyScoutGoal: 100,
      replyGoal: 5,
      interviewGoal: 3
    }
  },
  {
    id: 'JOB-007',
    title: '【愛知・東京】グローバル商社の営業課長候補（管理職候補）',
    companyName: '豊和商事株式会社',
    occupation: '営業課長候補',
    location: '愛知県名古屋市中村区',
    prefecture: '愛知県',
    area: '東海',
    assignee: '佐藤花子',
    status: 'スカウト実施中',
    createdAt: '2026-05-15',
    scoutStartDate: '2026-06-01',
    industry: '商社',
    jobCategory: '営業職',
    productType: '有形商材',
    targetType: '法人',
    salesType: '両方',
    minAge: 35,
    maxAge: 49,
    minSalary: 800,
    maxSalary: 1200,
    isExperienced: true,
    isManagement: true,
    hasRelocation: true,
    isRemote: false,
    tags: ['管理職候補', '高年収', '商社', '上場企業'],
    notes: 'ビズリーチ一択に近いがミドルも併用。高年収層へのアプローチ。',
    goals: {
      dailyScoutGoal: 6,
      weeklyScoutGoal: 30,
      monthlyScoutGoal: 120,
      replyGoal: 6,
      interviewGoal: 3
    }
  },
  {
    id: 'JOB-008',
    title: '【全国・フルリモート】未経験歓迎IT総合相談窓口スタッフ',
    companyName: '株式会社デジタルアシスト',
    occupation: 'カスタマーサポート',
    location: '東京都千代田区',
    prefecture: '東京都',
    area: '関東',
    assignee: '鈴木一郎',
    status: 'スカウト実施中',
    createdAt: '2026-05-18',
    scoutStartDate: '2026-06-01',
    industry: 'IT・通信',
    jobCategory: 'サービス・サポート',
    productType: '無形商材',
    targetType: '個人',
    salesType: '既存営業',
    minAge: 20,
    maxAge: 29,
    minSalary: 300,
    maxSalary: 400,
    isExperienced: false,
    isManagement: false,
    hasRelocation: false,
    isRemote: true,
    tags: ['業界未経験可', '第二新卒', '若手向け', '転勤なし'],
    notes: '自動スカウト（AMBI, DB, Maps）を大量送信。返信数は多い。',
    goals: {
      dailyScoutGoal: 30,
      weeklyScoutGoal: 150,
      monthlyScoutGoal: 600,
      replyGoal: 25,
      interviewGoal: 12
    }
  },
  {
    id: 'JOB-009',
    title: '【東京】金融ファンドの投資アナリスト・M&Aアドバイザー',
    companyName: 'キャピタルパートナーズ投資顧問',
    occupation: 'コンサルタント・金融',
    location: '東京都港区丸の内',
    prefecture: '東京都',
    area: '関東',
    assignee: '高橋健太',
    status: 'スカウト実施中',
    createdAt: '2026-05-20',
    scoutStartDate: '2026-06-01',
    industry: '金融・コンサルティング',
    jobCategory: '専門職',
    productType: '無形商材',
    targetType: '法人',
    salesType: '新規営業',
    minAge: 28,
    maxAge: 42,
    minSalary: 1000,
    maxSalary: 1800,
    isExperienced: true,
    isManagement: false,
    hasRelocation: false,
    isRemote: false,
    tags: ['高年収', '上場企業', '営業経験者'],
    notes: 'ビズリーチおよびIX中心。スカウト件数は少ないが返信獲得時の質が高い。',
    goals: {
      dailyScoutGoal: 5,
      weeklyScoutGoal: 25,
      monthlyScoutGoal: 100,
      replyGoal: 4,
      interviewGoal: 2
    }
  },
  {
    id: 'JOB-010',
    title: '【大阪・兵庫】住宅設備建材の自動スカウト特化型大量募集営業',
    companyName: '関西ホーム建材サービス株式会社',
    occupation: '営業職',
    location: '兵庫県神戸市中央区',
    prefecture: '兵庫県',
    area: '関西',
    assignee: '田中美咲',
    status: 'スカウト実施中',
    createdAt: '2026-05-25',
    scoutStartDate: '2026-06-01',
    industry: '不動産・建設',
    jobCategory: '営業職',
    productType: '有形商材',
    targetType: '個人',
    salesType: '新規営業',
    minAge: 22,
    maxAge: 38,
    minSalary: 380,
    maxSalary: 600,
    isExperienced: false,
    isManagement: false,
    hasRelocation: false,
    isRemote: false,
    tags: ['業界未経験可', '若手向け', '第二新卒'],
    notes: '自動スカウトの運用比率80%以上の検証案件。AMBIとRDSで比較中。',
    goals: {
      dailyScoutGoal: 40,
      weeklyScoutGoal: 200,
      monthlyScoutGoal: 800,
      replyGoal: 20,
      interviewGoal: 10
    }
  }
];

/**
 * 過去3か月分（2026-05-01 〜 2026-07-22）のリアルなスカウト実績データを自動生成
 */
export function generateSampleScoutRecords() {
  const records = [];
  const mediaList = DEFAULT_MEDIA_LIST;
  const startDate = new Date('2026-05-01');
  const endDate = new Date('2026-07-22');

  let recordIdCount = 1000;

  // 各求人について日付ごとに実績を生成
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    // 土日は送信が少ない・休みというリアル感
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    const dateStr = d.toISOString().split('T')[0];

    INITIAL_JOBS.forEach((job) => {
      // 求人のスカウト開始日より前はスキップ
      if (dateStr < job.scoutStartDate) return;

      // 週末は30%の確率、平日は85%の確率でスカウト実施
      const shouldRun = isWeekend ? Math.random() < 0.3 : Math.random() < 0.85;
      if (!shouldRun) return;

      // 求人特性に応じた媒体ごとの送信傾向
      mediaList.forEach((media) => {
        // 求人と媒体の相性ロジック
        let isMainMedia = false;
        let baseSent = 0;

        if (job.id === 'JOB-001') { // 大阪 有形 若手
          if (['ambi', 'bizreach', 'middle'].includes(media.id)) { isMainMedia = true; baseSent = 15; }
          else if (media.id === 'db') { baseSent = 5; }
        } else if (job.id === 'JOB-002') { // 東京 無形 IT
          if (['bizreach', 'ambi', 'ix'].includes(media.id)) { isMainMedia = true; baseSent = 20; }
        } else if (job.id === 'JOB-003') { // 九州 ルート
          if (['middle', 'maps', 'rds'].includes(media.id)) { isMainMedia = true; baseSent = 12; }
        } else if (job.id === 'JOB-008' || job.id === 'JOB-010') { // 大量・自動スカウトメイン
          if (['ambi', 'db', 'rds', 'maps'].includes(media.id)) { isMainMedia = true; baseSent = 35; }
        } else if (job.id === 'JOB-009') { // 高年収
          if (['bizreach', 'ix'].includes(media.id)) { isMainMedia = true; baseSent = 8; }
        } else {
          if (Math.random() < 0.4) { baseSent = 10; }
        }

        if (baseSent === 0) return;

        // 手動スカウトの生成
        const manualSent = Math.floor(baseSent * (isWeekend ? 0.3 : 1) * (0.8 + Math.random() * 0.4));
        if (manualSent > 0) {
          // 返信率の設定（手動スカウトは平均3%〜8%）
          let replyRate = (job.id === 'JOB-001' && media.id === 'ambi') ? 0.09 : 0.045;
          if (job.id === 'JOB-009' && media.id === 'bizreach') replyRate = 0.08;

          const replyCount = Math.min(manualSent, Math.floor(manualSent * replyRate + (Math.random() < 0.35 ? 1 : 0)));
          const positiveReplyCount = Math.min(replyCount, Math.floor(replyCount * 0.7));
          const interviewCount = Math.min(positiveReplyCount, Math.floor(positiveReplyCount * 0.6));
          const declineCount = replyCount - positiveReplyCount;

          records.push({
            id: `REC-${recordIdCount++}`,
            date: dateStr,
            jobId: job.id,
            assignee: job.assignee,
            mediaId: media.id,
            method: '手動スカウト',
            sentCount: manualSent,
            replyCount: replyCount,
            positiveReplyCount: positiveReplyCount,
            interviewCount: interviewCount,
            declineCount: declineCount,
            notes: replyCount > 0 ? '手動スカウトでレスポンスあり' : ''
          });
        }

        // 自動スカウトの生成（一部の求人・媒体で追加）
        if (['JOB-008', 'JOB-010', 'JOB-001', 'JOB-004'].includes(job.id) && ['ambi', 'db', 'rds'].includes(media.id)) {
          const autoSent = Math.floor(baseSent * 1.5 * (0.7 + Math.random() * 0.6));
          if (autoSent > 0) {
            // 自動スカウトは返信率がやや低い（1.5%〜3%）
            const autoReplyRate = 0.022;
            const replyCount = Math.min(autoSent, Math.floor(autoSent * autoReplyRate + (Math.random() < 0.25 ? 1 : 0)));
            const positiveReplyCount = Math.min(replyCount, Math.floor(replyCount * 0.5));
            const interviewCount = Math.min(positiveReplyCount, Math.floor(positiveReplyCount * 0.5));
            const declineCount = replyCount - positiveReplyCount;

            records.push({
              id: `REC-${recordIdCount++}`,
              date: dateStr,
              jobId: job.id,
              assignee: job.assignee,
              mediaId: media.id,
              method: '自動スカウト',
              sentCount: autoSent,
              replyCount: replyCount,
              positiveReplyCount: positiveReplyCount,
              interviewCount: interviewCount,
              declineCount: declineCount,
              notes: '条件マッチング自動スカウト送信'
            });
          }
        }
      });
    });
  }

  return records;
}

export const INITIAL_KNOWLEDGE = [
  {
    id: 'KNW-001',
    jobId: 'JOB-001',
    createdAt: '2026-06-15',
    updatedAt: '2026-07-10',
    effectiveMedia: 'AMBI、ビズリーチ',
    ineffectiveMedia: 'ミドル（ターゲット層より若いため年齢ギャップあり）',
    candidateTendency: '20代後半、無形営業からのキャリアチェンジ志向または有形メーカーでワークライフバランス改善を求める求職者に好反応。',
    effectiveSearchCriteria: '年齢: 24〜30歳 / 経験職種: 有形営業・無形営業 / 勤務地: 関西在住者',
    effectiveMessageText: '「転勤なし・土日祝休み・関西に根を張って長く働ける機械メーカー営業」を前面に出した文面が響いた。',
    struggleReasons: '当初ミドル媒体で送信していたが30代後半の応募が多く、クライアントの若手希望要件とミスマッチが生じた。',
    improvementsMade: '送信媒体をAMBI中心にシフトし、スカウト文面のタイトルに「20代活躍中」「転勤なし」を強調した。',
    nextTimeAction: '関西×若手×メーカー営業求人はAMBIを最優先媒体として設定し、初週から自動＋手動のハイブリッド送信を行う。',
    memo: '担当: 山田太郎。面談設定率も60%以上と良好。'
  },
  {
    id: 'KNW-002',
    jobId: 'JOB-002',
    createdAt: '2026-06-20',
    updatedAt: '2026-07-05',
    effectiveMedia: 'ビズリーチ',
    ineffectiveMedia: 'Maps, DB',
    candidateTendency: '現職でSaaSまたは大手IT営業をやっており、年収アップ・フルリモート環境を求める30代前半層。',
    effectiveSearchCriteria: 'IT営業経験3年以上 / 英語不問 / 年収600万以上現職者',
    effectiveMessageText: '企業成長率150%やプロダクトの優位性、フルリモート勤務の柔軟性を記載。',
    struggleReasons: '競合案件が多いため、テンプレート文面では返信率が2%以下に落ち込んだ。',
    improvementsMade: '候補者の過去実績・プロジェクトをスカウト1通目の冒頭で具体的に褒めるカスタマイズを実施。返信率が7.5%に急上昇。',
    nextTimeAction: '高年収SaaS求人は手動スカウトでの1to1カスタマイズを必須ルールとする。',
    memo: '担当: 佐藤花子'
  }
];
