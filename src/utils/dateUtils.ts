// 日本時間 (JST) 日付計算ユーティリティ

/**
 * 日本時間 (JST) の現在日付文字列 (YYYY-MM-DD) を取得
 */
export function getTodayJST(): string {
  const d = new Date();
  // UTC+9 JST に調整
  const jstOffset = 9 * 60;
  const utc = d.getTime() + d.getTimezoneOffset() * 60000;
  const jstDate = new Date(utc + jstOffset * 60000);

  const year = jstDate.getFullYear();
  const month = String(jstDate.getMonth() + 1).padStart(2, '0');
  const day = String(jstDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * 指定日の前日・翌日を取得 (YYYY-MM-DD)
 */
export function getShiftedDate(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d + days));
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * 曜日を取得（月〜日）
 */
export const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'] as const;

export function getDayOfWeekJST(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return WEEKDAYS[date.getUTCDay()];
}

/**
 * 今週（月曜日〜日曜日）の日付範囲を取得
 */
export function getWeekRangeJST(targetDateStr?: string): { startDate: string; endDate: string } {
  const baseStr = targetDateStr || getTodayJST();
  const [y, m, d] = baseStr.split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));

  const dayOfWeek = date.getUTCDay(); // 0: Sun, 1: Mon, ...
  const distanceToMon = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  const mon = new Date(Date.UTC(y, m - 1, d + distanceToMon));
  const sun = new Date(Date.UTC(y, m - 1, d + distanceToMon + 6));

  return {
    startDate: formatDateUTC(mon),
    endDate: formatDateUTC(sun),
  };
}

/**
 * 期間範囲を取得（今日、今週、今月、3か月、半年、1年）
 */
export function getPeriodRange(
  period: 'today' | 'week' | 'month' | '3months' | 'halfYear' | 'year',
  baseDateStr?: string
): { startDate: string; endDate: string } {
  const today = baseDateStr || getTodayJST();
  const [y, m, d] = today.split('-').map(Number);

  if (period === 'today') {
    return { startDate: today, endDate: today };
  }
  if (period === 'week') {
    return getWeekRangeJST(today);
  }
  if (period === 'month') {
    const start = `${y}-${String(m).padStart(2, '0')}-01`;
    // 月末
    const lastDay = new Date(Date.UTC(y, m, 0)).getUTCDate();
    const end = `${y}-${String(m).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
    return { startDate: start, endDate: end };
  }

  let monthsBack = 3;
  if (period === 'halfYear') monthsBack = 6;
  if (period === 'year') monthsBack = 12;

  const startDateObj = new Date(Date.UTC(y, m - 1 - monthsBack, d));
  return {
    startDate: formatDateUTC(startDateObj),
    endDate: today,
  };
}

function formatDateUTC(d: Date): string {
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDateTime(isoString: string): string {
  if (!isoString) return '';
  const d = new Date(isoString);
  if (isNaN(d.getTime())) return isoString;

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${yyyy}/${mm}/${dd} ${hh}:${min}`;
}
