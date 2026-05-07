import { TRIGRAMS, TRIGRAM_BY_BINARY, hexBinary } from "./trigrams.js";

export function getNuclear(upper, lower) {
  const binary = hexBinary(upper, lower);
  return {
    upper: TRIGRAM_BY_BINARY[binary[2] + binary[3] + binary[4]],
    lower: TRIGRAM_BY_BINARY[binary[1] + binary[2] + binary[3]],
  };
}

export function getTransformed(upper, lower, changingLine) {
  const bits = hexBinary(upper, lower).split("");
  bits[changingLine - 1] = bits[changingLine - 1] === "1" ? "0" : "1";
  const flipped = bits.join("");
  return {
    upper: TRIGRAM_BY_BINARY[flipped.slice(3, 6)],
    lower: TRIGRAM_BY_BINARY[flipped.slice(0, 3)],
  };
}

export function getOpposite(upper, lower) {
  const inverted = hexBinary(upper, lower)
    .split("")
    .map(bit => bit === "1" ? "0" : "1")
    .join("");
  return {
    upper: TRIGRAM_BY_BINARY[inverted.slice(3, 6)],
    lower: TRIGRAM_BY_BINARY[inverted.slice(0, 3)],
  };
}

export function getInverse(upper, lower) {
  const reversed = hexBinary(upper, lower).split("").reverse().join("");
  return {
    upper: TRIGRAM_BY_BINARY[reversed.slice(3, 6)],
    lower: TRIGRAM_BY_BINARY[reversed.slice(0, 3)],
  };
}

// Returns one of:
//   "bihoa"        — same element
//   "ti_sinh_yong" — first generates second
//   "yong_sinh_ti" — second generates first
//   "ti_khac_yong" — first overcomes second
//   "yong_khac_ti" — second overcomes first
// The labels are oriented so the caller passes (Ti element, Yong element).
export function elementRelation(first, second) {
  if (first === second) return "bihoa";
  const generation = { Wood: "Fire", Fire: "Earth", Earth: "Metal", Metal: "Water", Water: "Wood" };
  const overcoming = { Wood: "Earth", Earth: "Water", Water: "Fire", Fire: "Metal", Metal: "Wood" };
  if (generation[first]  === second) return "ti_sinh_yong";
  if (generation[second] === first)  return "yong_sinh_ti";
  if (overcoming[first]  === second) return "ti_khac_yong";
  if (overcoming[second] === first)  return "yong_khac_ti";
  return "bihoa";
}

// Ti is the trigram NOT containing the changing line (the inquirer);
// Yong is the trigram containing it (the situation).
export function tiYongAnalysis(upper, lower, changingLine) {
  const yongIsLower = changingLine <= 3;
  const tiNumber   = yongIsLower ? upper : lower;
  const yongNumber = yongIsLower ? lower : upper;
  const tiTrigram   = TRIGRAMS[tiNumber];
  const yongTrigram = TRIGRAMS[yongNumber];
  const rel = elementRelation(tiTrigram.el, yongTrigram.el);
  let outcome;
  if (rel === "bihoa") outcome = "neutral";
  else if (rel === "yong_sinh_ti" || rel === "ti_khac_yong") outcome = "favorable";
  else if (rel === "yong_khac_ti") outcome = "unfavorable";
  else outcome = "less";
  return {
    ti: tiNumber, yong: yongNumber,
    tiTrigram, yongTrigram,
    rel, outcome, yongIsLower,
  };
}
