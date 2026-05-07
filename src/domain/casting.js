import { solarToLunar, yearBranchOf } from "./lunar.js";

export function castNumber(n1, n2) {
  const u = (n1 % 8) === 0 ? 8 : n1 % 8;
  const l = (n2 % 8) === 0 ? 8 : n2 % 8;
  const sum = n1 + n2;
  const change = (sum % 6) === 0 ? 6 : sum % 6;
  return { u, l, change, method: "number", inputs: { n1, n2 } };
}

export function castTime(year, month, day, hour, isLunar) {
  if (year === undefined) {
    const now = new Date();
    year = now.getFullYear();
    month = now.getMonth() + 1;
    day = now.getDate();
    hour = now.getHours();
    isLunar = false;
  }
  let solar = null, lunar;
  if (isLunar) {
    lunar = { year, month, day, leap: 0 };
  } else {
    solar = { year, month, day };
    try { lunar = solarToLunar(day, month, year, 7); }
    catch (e) { lunar = { year, month, day, leap: 0 }; }
  }
  const yearBranch = yearBranchOf(lunar.year);
  const hourMap = [1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,1];
  const ch = hourMap[hour] ?? 1;
  const sum1 = yearBranch + lunar.month + lunar.day;
  const sum2 = sum1 + ch;
  const u = (sum1 % 8 === 0) ? 8 : sum1 % 8;
  const l = (sum2 % 8 === 0) ? 8 : sum2 % 8;
  const change = (sum2 % 6 === 0) ? 6 : sum2 % 6;
  return {
    u, l, change, method: "time",
    inputs: {
      isLunar: !!isLunar, solar, lunar,
      hour, chHour: ch, yearBranch,
      year: lunar.year, month: lunar.month, day: lunar.day,
    }
  };
}

export function castSound(text) {
  const cleaned = [...text.replace(/\s+/g, "")];
  const len = cleaned.length;
  if (len < 2) return null;
  const half1 = Math.ceil(len / 2);
  const half2 = len - half1;
  const u = (half1 % 8 === 0) ? 8 : half1 % 8;
  const l = (half2 % 8 === 0) ? 8 : half2 % 8;
  const sum = half1 + half2;
  const change = (sum % 6 === 0) ? 6 : sum % 6;
  return { u, l, change, method: "sound", inputs: { text, len, half1, half2 } };
}

export function castSpont() {
  return {
    u: Math.floor(Math.random() * 8) + 1,
    l: Math.floor(Math.random() * 8) + 1,
    change: Math.floor(Math.random() * 6) + 1,
    method: "spont", inputs: {},
  };
}
