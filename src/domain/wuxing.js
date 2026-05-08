// Wǔ-Xíng (Ngũ hành / 五行) seasonal energy.
//
// Each of the 12 earthly branches has an associated element. The four "pillars"
// of a moment in time — year, month, day, hour — each have a branch and thus
// an element. The MONTH branch's element is the "ruling element" of the
// season; everything else is judged relative to it via the Wàng-Xiāng-Xiū-
// Qiú-Sǐ (旺相休囚死) cycle:
//
//   wang  旺 — target IS the season's element (peak, in its time)
//   xiang 相 — season GENERATES target (supported, ascending)
//   xiu   休 — target GENERATES season (its work is done, resting)
//   qiu   囚 — target OVERCOMES season (against the grain, weakened)
//   si    死 — season OVERCOMES target (depleted, dying)

import { jdFromDate } from "./lunar.js";

// Earthly branch index 1..12 → element. Branches in canonical order:
// 1 子 Tý/Zǐ · 2 丑 Sửu/Chǒu · 3 寅 Dần/Yín · 4 卯 Mão/Mǎo · 5 辰 Thìn/Chén
// 6 巳 Tỵ/Sì · 7 午 Ngọ/Wǔ · 8 未 Mùi/Wèi · 9 申 Thân/Shēn · 10 酉 Dậu/Yǒu
// 11 戌 Tuất/Xū · 12 亥 Hợi/Hài
export const BRANCH_ELEMENT = [null,
  "Water", "Earth", "Wood",  "Wood",  "Earth", "Fire",
  "Fire",  "Earth", "Metal", "Metal", "Earth", "Water",
];

// Lunar month 1 (early Spring) corresponds to month branch 寅 (Yín = 3).
// Subsequent months step the branch by 1 each.
export function monthBranchFromLunarMonth(lunarMonth) {
  return ((lunarMonth + 1) % 12) + 1;
}

// The season's ruling element is just the month branch's element.
export function seasonElement(lunarMonth) {
  return BRANCH_ELEMENT[monthBranchFromLunarMonth(lunarMonth)];
}

// Sexagenary day cycle anchor: 2000-01-01 (JD 2451545) was 戊午,
// i.e. day branch 7 (Wǔ 午).
const SEXAGENARY_REF_JD = 2451545;
const SEXAGENARY_REF_DAY_BRANCH = 7;

export function dayBranchFromSolar(dd, mm, yy) {
  const jd = jdFromDate(dd, mm, yy);
  const diff = jd - SEXAGENARY_REF_JD;
  return ((SEXAGENARY_REF_DAY_BRANCH - 1 + diff) % 12 + 12) % 12 + 1;
}

const GENERATION = { Wood: "Fire",  Fire: "Earth", Earth: "Metal", Metal: "Water", Water: "Wood"  };
const OVERCOMING = { Wood: "Earth", Earth: "Water",Water: "Fire",  Fire: "Metal",  Metal: "Wood"  };

// Returns the Wǔ-Xíng state of `target` element relative to the season's
// ruling `season` element.
export function seasonalEnergy(target, season) {
  if (target === season) return "wang";
  if (GENERATION[season] === target) return "xiang";
  if (GENERATION[target] === season) return "xiu";
  if (OVERCOMING[target] === season) return "qiu";
  if (OVERCOMING[season] === target) return "si";
  return null;
}
