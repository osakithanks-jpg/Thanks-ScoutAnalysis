// 日本時間 (JST) 基準の日付計算およびフォーマットユーティリティ

export function getJSTToday() {
  const now = new Date();
  // Adjust to JST (UTC+9)
  const jstOffset = 9 * 60;
  const localOffset = now.getTimezoneOffset();
  const jstTime = new Date(now.getTime() + (jstOffset + localOffset) * 60000);
  
  const year = jstTime.getFullYear();
  const month = String(jstTime.getMonth() + 1).padStart(2, '0');
  const day = String(jstTime.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDateJST(dateStr) {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${year}年${parseInt(month, 10)}月${parseInt(day, 10)}日`;
}

export function getDayOfWeekName(dateStr) {
  if (!dateStr) return '';
  const days = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return days[date.getDay()];
}

export function getDayOfWeekIndex(dateStr) {
  // Returns 0 for Monday, 1 for Tuesday, ..., 6 for Sunday
  if (!dateStr) return 0;
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const day = date.getDay(); // 0 is Sun, 1 is Mon...
  return day === 0 ? 6 : day - 1;
}

export function getWeekRange(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const day = date.getDay();
  const diffToMon = day === 0 ? -6 : 1 - day;
  
  const monday = new Date(date);
  monday.setDate(date.getDate() + diffToMon);
  
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  
  const format = (dObj) => {
    const yr = dObj.getFullYear();
    const mo = String(dObj.getMonth() + 1).padStart(2, '0');
    const dy = String(dObj.getDate()).padStart(2, '0');
    return `${yr}-${mo}-${dy}`;
  };
  
  return {
    start: format(monday),
    end: format(sunday)
  };
}

export function getMonthRange(dateStr) {
  const [y, m] = dateStr.split('-').map(Number);
  const firstDay = `${y}-${String(m).padStart(2, '0')}-01`;
  const lastDayObj = new Date(y, m, 0);
  const lastDay = `${y}-${String(m).padStart(2, '0')}-${String(lastDayObj.getDate()).padStart(2, '0')}`;
  return { start: firstDay, end: lastDay };
}

export function getPeriodDateRange(periodType, referenceDate = getJSTToday()) {
  const [y, m, d] = referenceDate.split('-').map(Number);
  const refDate = new Date(y, m - 1, d);
  
  const format = (dObj) => {
    const yr = dObj.getFullYear();
    const mo = String(dObj.getMonth() + 1).padStart(2, '0');
    const dy = String(dObj.getDate()).padStart(2, '0');
    return `${yr}-${mo}-${dy}`;
  };
  
  if (periodType === 'today') {
    return { start: referenceDate, end: referenceDate };
  } else if (periodType === 'week') {
    return getWeekRange(referenceDate);
  } else if (periodType === 'month') {
    return getMonthRange(referenceDate);
  } else if (periodType === '3months') {
    const start = new Date(refDate);
    start.setMonth(start.getMonth() - 3);
    return { start: format(start), end: referenceDate };
  } else if (periodType === '6months') {
    const start = new Date(refDate);
    start.setMonth(start.getMonth() - 6);
    return { start: format(start), end: referenceDate };
  } else if (periodType === '1year') {
    const start = new Date(refDate);
    start.setFullYear(start.getFullYear() - 1);
    return { start: format(start), end: referenceDate };
  }
  return { start: referenceDate, end: referenceDate };
}

export function addDays(dateStr, numDays) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + numDays);
  const yr = date.getFullYear();
  const mo = String(date.getMonth() + 1).padStart(2, '0');
  const dy = String(date.getDate()).padStart(2, '0');
  return `${yr}-${mo}-${dy}`;
}
