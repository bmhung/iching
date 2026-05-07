// Vietnamese Lunar Calendar (Hồ Ngọc Đức algorithm, TZ +7).
// Verbatim port from the original artifact — do not "improve" the math.

function _LINT(d) { return Math.floor(d); }

function _jdFromDate(dd, mm, yy) {
  const a = _LINT((14 - mm) / 12);
  const y = yy + 4800 - a;
  const m = mm + 12 * a - 3;
  let jd = dd + _LINT((153 * m + 2) / 5) + 365 * y + _LINT(y / 4) - _LINT(y / 100) + _LINT(y / 400) - 32045;
  if (jd < 2299161) jd = dd + _LINT((153 * m + 2) / 5) + 365 * y + _LINT(y / 4) - 32083;
  return jd;
}

function _getNewMoonDay(k, tz) {
  const T = k / 1236.85;
  const T2 = T * T, T3 = T2 * T;
  const dr = Math.PI / 180;
  let Jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * T2 - 0.000000155 * T3;
  Jd1 += 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);
  const M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
  const Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
  const F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;
  let C1 = (0.1734 - 0.000393 * T) * Math.sin(M * dr) + 0.0021 * Math.sin(2 * dr * M);
  C1 = C1 - 0.4068 * Math.sin(Mpr * dr) + 0.0161 * Math.sin(dr * 2 * Mpr);
  C1 = C1 - 0.0004 * Math.sin(dr * 3 * Mpr);
  C1 = C1 + 0.0104 * Math.sin(dr * 2 * F) - 0.0051 * Math.sin(dr * (M + Mpr));
  C1 = C1 - 0.0074 * Math.sin(dr * (M - Mpr)) + 0.0004 * Math.sin(dr * (2 * F + M));
  C1 = C1 - 0.0004 * Math.sin(dr * (2 * F - M)) - 0.0006 * Math.sin(dr * (2 * F + Mpr));
  C1 = C1 + 0.0010 * Math.sin(dr * (2 * F - Mpr)) + 0.0005 * Math.sin(dr * (2 * Mpr + M));
  const deltat = T < -11
    ? 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3
    : -0.000278 + 0.000265 * T + 0.000262 * T2;
  return _LINT(Jd1 + C1 - deltat + 0.5 + tz / 24);
}

function _getSunLongitude(jdn, tz) {
  const T = (jdn - 2451545.5 - tz / 24) / 36525;
  const T2 = T * T;
  const dr = Math.PI / 180;
  const M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
  const L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;
  let DL = (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M);
  DL += (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M) + 0.000290 * Math.sin(dr * 3 * M);
  let L = (L0 + DL) * dr;
  L = L - Math.PI * 2 * _LINT(L / (Math.PI * 2));
  return _LINT(L / Math.PI * 6);
}

function _getLunarMonth11(yy, tz) {
  const off = _jdFromDate(31, 12, yy) - 2415021;
  const k = _LINT(off / 29.530588853);
  let nm = _getNewMoonDay(k, tz);
  if (_getSunLongitude(nm, tz) >= 9) nm = _getNewMoonDay(k - 1, tz);
  return nm;
}

function _getLeapMonthOffset(a11, tz) {
  const k = _LINT((a11 - 2415021.076998695) / 29.530588853 + 0.5);
  let last = 0, i = 1;
  let arc = _getSunLongitude(_getNewMoonDay(k + i, tz), tz);
  do {
    last = arc; i++;
    arc = _getSunLongitude(_getNewMoonDay(k + i, tz), tz);
  } while (arc !== last && i < 14);
  return i - 1;
}

export function solarToLunar(dd, mm, yy, tz = 7) {
  const dayNumber = _jdFromDate(dd, mm, yy);
  const k = _LINT((dayNumber - 2415021.076998695) / 29.530588853);
  let monthStart = _getNewMoonDay(k + 1, tz);
  if (monthStart > dayNumber) monthStart = _getNewMoonDay(k, tz);
  let a11 = _getLunarMonth11(yy, tz);
  let b11 = a11;
  let lunarYear;
  if (a11 >= monthStart) {
    lunarYear = yy;
    a11 = _getLunarMonth11(yy - 1, tz);
  } else {
    lunarYear = yy + 1;
    b11 = _getLunarMonth11(yy + 1, tz);
  }
  const lunarDay = dayNumber - monthStart + 1;
  const diff = _LINT((monthStart - a11) / 29);
  let lunarLeap = 0;
  let lunarMonth = diff + 11;
  if (b11 - a11 > 365) {
    const leapMonthDiff = _getLeapMonthOffset(a11, tz);
    if (diff >= leapMonthDiff) {
      lunarMonth = diff + 10;
      if (diff === leapMonthDiff) lunarLeap = 1;
    }
  }
  if (lunarMonth > 12) lunarMonth -= 12;
  if (lunarMonth >= 11 && diff < 4) lunarYear -= 1;
  return { day: lunarDay, month: lunarMonth, year: lunarYear, leap: lunarLeap };
}

export function yearBranchOf(lunarYear) {
  return (((lunarYear - 4) % 12) + 12) % 12 + 1;
}
