import { solarToLunar, yearBranchOf } from "./lunar.js";

// Each cast returns: { upper, lower, changingLine, method, inputs }
//   upper, lower   = trigram numbers 1..8 (Pre-Heaven Xiantian)
//   changingLine   = 1..6, counted from the bottom
//   method         = "time" | "number" | "sound" | "spont"
//   inputs         = method-specific input record (kept for display + replay)

export function castNumber(firstNumber, secondNumber) {
  const upper = (firstNumber % 8) === 0 ? 8 : firstNumber % 8;
  const lower = (secondNumber % 8) === 0 ? 8 : secondNumber % 8;
  const sum = firstNumber + secondNumber;
  const changingLine = (sum % 6) === 0 ? 6 : sum % 6;
  return {
    upper, lower, changingLine,
    method: "number",
    inputs: { firstNumber, secondNumber },
  };
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
  // hour 0..23 → earthly branch index 1..12
  const hourToBranch = [1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,1];
  const hourBranch = hourToBranch[hour] ?? 1;
  const sum1 = yearBranch + lunar.month + lunar.day;
  const sum2 = sum1 + hourBranch;
  const upper = (sum1 % 8 === 0) ? 8 : sum1 % 8;
  const lower = (sum2 % 8 === 0) ? 8 : sum2 % 8;
  const changingLine = (sum2 % 6 === 0) ? 6 : sum2 % 6;
  return {
    upper, lower, changingLine,
    method: "time",
    inputs: {
      isLunar: !!isLunar, solar, lunar,
      hour, hourBranch, yearBranch,
      year: lunar.year, month: lunar.month, day: lunar.day,
    }
  };
}

export function castSound(text) {
  const cleaned = [...text.replace(/\s+/g, "")];
  const length = cleaned.length;
  if (length < 2) return null;
  const firstHalf = Math.ceil(length / 2);
  const secondHalf = length - firstHalf;
  const upper = (firstHalf % 8 === 0) ? 8 : firstHalf % 8;
  const lower = (secondHalf % 8 === 0) ? 8 : secondHalf % 8;
  const sum = firstHalf + secondHalf;
  const changingLine = (sum % 6 === 0) ? 6 : sum % 6;
  return {
    upper, lower, changingLine,
    method: "sound",
    inputs: { text, length, firstHalf, secondHalf },
  };
}

export function castSpont() {
  return {
    upper: Math.floor(Math.random() * 8) + 1,
    lower: Math.floor(Math.random() * 8) + 1,
    changingLine: Math.floor(Math.random() * 6) + 1,
    method: "spont",
    inputs: {},
  };
}

// Single-number + hour cast (external-response by number with time).
//   upper        = number % 8
//   lower        = (number + hourBranch) % 8
//   changingLine = (number + hourBranch) % 6
// where hourBranch is the earthly branch (1..12) for the given hour (0..23).
export function castNumberTime(number, hour) {
  if (hour === undefined || hour === null) hour = new Date().getHours();
  const hourToBranch = [1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,1];
  const hourBranch = hourToBranch[hour] ?? 1;
  const sum = number + hourBranch;
  const upper        = (number % 8 === 0) ? 8 : number % 8;
  const lower        = (sum % 8 === 0)    ? 8 : sum % 8;
  const changingLine = (sum % 6 === 0)    ? 6 : sum % 6;
  return {
    upper, lower, changingLine,
    method: "numberTime",
    inputs: { number, hour, hourBranch },
  };
}
