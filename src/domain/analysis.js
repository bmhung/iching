import { TRIGRAMS, TBIN, hexBinary } from "./trigrams.js";

export function getNuclear(u, l) {
  const bin = hexBinary(u, l);
  return { u: TBIN[bin[2] + bin[3] + bin[4]], l: TBIN[bin[1] + bin[2] + bin[3]] };
}

export function getTransformed(u, l, change) {
  const bin = hexBinary(u, l).split("");
  bin[change - 1] = bin[change - 1] === "1" ? "0" : "1";
  const nb = bin.join("");
  return { u: TBIN[nb.slice(3, 6)], l: TBIN[nb.slice(0, 3)] };
}

export function getOpposite(u, l) {
  const bin = hexBinary(u, l).split("").map(b => b === "1" ? "0" : "1").join("");
  return { u: TBIN[bin.slice(3, 6)], l: TBIN[bin.slice(0, 3)] };
}

export function getInverse(u, l) {
  const bin = hexBinary(u, l).split("").reverse().join("");
  return { u: TBIN[bin.slice(3, 6)], l: TBIN[bin.slice(0, 3)] };
}

export function elementRelation(e1, e2) {
  if (e1 === e2) return "bihoa";
  const G = { Wood: "Fire", Fire: "Earth", Earth: "Metal", Metal: "Water", Water: "Wood" };
  const O = { Wood: "Earth", Earth: "Water", Water: "Fire", Fire: "Metal", Metal: "Wood" };
  if (G[e1] === e2) return "ti_sinh_yong";
  if (G[e2] === e1) return "yong_sinh_ti";
  if (O[e1] === e2) return "ti_khac_yong";
  if (O[e2] === e1) return "yong_khac_ti";
  return "bihoa";
}

export function tiYongAnalysis(u, l, change) {
  const yongIsLower = change <= 3;
  const ti = yongIsLower ? u : l;
  const yong = yongIsLower ? l : u;
  const tiT = TRIGRAMS[ti];
  const yongT = TRIGRAMS[yong];
  const rel = elementRelation(tiT.el, yongT.el);
  let outcome;
  if (rel === "bihoa") outcome = "neutral";
  else if (rel === "yong_sinh_ti" || rel === "ti_khac_yong") outcome = "favorable";
  else if (rel === "yong_khac_ti") outcome = "unfavorable";
  else outcome = "less";
  return { ti, yong, tiT, yongT, rel, outcome, yongIsLower };
}
