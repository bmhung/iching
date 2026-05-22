import { useState } from "react";
import { TRIGRAMS, getHex, hexName, hexJudg, hexImg, trigName } from "../domain/trigrams.js";
import { getNuclear, getTransformed, tiYongAnalysis } from "../domain/analysis.js";

// Build a compact, paste-friendly summary of the reading for an external LLM
// (Gemini, ChatGPT, etc.) to interpret.
function buildPrompt(reading, lang, t) {
  const { upper, lower, changingLine, method, inputs, question } = reading;

  const original = getHex(upper, lower);
  const nuclearCoords = getNuclear(upper, lower);
  const nuclear = getHex(nuclearCoords.upper, nuclearCoords.lower);
  const transformedCoords = getTransformed(upper, lower, changingLine);
  const transformed = getHex(transformedCoords.upper, transformedCoords.lower);
  const tyOriginal    = tiYongAnalysis(upper, lower, changingLine);
  const tyTransformed = tiYongAnalysis(transformedCoords.upper, transformedCoords.lower, changingLine);

  const RELATION_LABEL = {
    bihoa:        "比和 — same element",
    ti_sinh_yong: "體生用 — Ti generates Yong",
    yong_sinh_ti: "用生體 — Yong generates Ti",
    ti_khac_yong: "體剋用 — Ti overcomes Yong",
    yong_khac_ti: "用剋體 — Yong overcomes Ti",
  };

  const OUTCOME_LABEL = {
    favorable:   "favorable (吉)",
    unfavorable: "unfavorable (凶)",
    neutral:     "balanced (平)",
    less:        "draining (平偏凶)",
  };

  let inputsLine = "—";
  if (method === "time") {
    const lunar = inputs.lunar || { year: inputs.year, month: inputs.month, day: inputs.day, leap: 0 };
    const yearBranchName = t.branches[inputs.yearBranch - 1];
    const hourBranchName = t.branches[inputs.hourBranch - 1];
    const solarPart = inputs.solar
      ? `solar ${inputs.solar.year}-${String(inputs.solar.month).padStart(2,"0")}-${String(inputs.solar.day).padStart(2,"0")} ${String(inputs.hour).padStart(2,"0")}:00`
      : null;
    const lunarPart = `lunar ${lunar.year}/${lunar.month}${lunar.leap ? "(leap)" : ""}/${lunar.day} · year ${yearBranchName}(${inputs.yearBranch}) · hour ${hourBranchName}(${inputs.hourBranch})`;
    inputsLine = solarPart ? `${solarPart} → ${lunarPart}` : lunarPart;
  } else if (method === "number") {
    inputsLine = `${inputs.firstNumber}, ${inputs.secondNumber}`;
  } else if (method === "sound") {
    inputsLine = `"${inputs.text}" (${inputs.length} chars; halves ${inputs.firstHalf} + ${inputs.secondHalf})`;
  } else if (method === "numberTime") {
    inputsLine = `number ${inputs.number} + hour ${String(inputs.hour).padStart(2,"0")}:00 → ${t.branches[inputs.hourBranch - 1]}(${inputs.hourBranch})`;
  } else if (method === "spont") {
    inputsLine = "(spontaneous random cast)";
  }

  const fmtHex = (hex) =>
    `#${hex.n}  ${hex.zh} ${hex.py}  —  ${hexName(hex, lang)}\n` +
    `  Judgment (卦辭): ${hex.jZh}\n` +
    `                  ${hexJudg(hex, lang)}\n` +
    `  Image (象):     ${hexImg(hex, lang)}`;

  const fmtTiYong = (analysis) => {
    const ti = analysis.tiTrigram;
    const yong = analysis.yongTrigram;
    return (
      `  Ti  (體, host):  ${ti.zh} ${ti.sym}  ${trigName(ti, lang)}  · ${ti.el}\n` +
      `  Yong (用, guest): ${yong.zh} ${yong.sym}  ${trigName(yong, lang)}  · ${yong.el}\n` +
      `  Relation: ${RELATION_LABEL[analysis.rel]}  →  ${OUTCOME_LABEL[analysis.outcome]}`
    );
  };

  const trailingPrompt = ({
    vi: "Hãy đoán quẻ này theo phép Mai Hoa Dịch Số. Trả lời bằng tiếng Việt.",
    en: "Please interpret this reading following the Plum Blossom (Mai Hoa Dịch Số) tradition. Answer in English.",
    zh: "請依梅花易數之法解此卦,以中文作答。",
  })[lang];

  return [
    `═══ Mai Hoa Dịch Số · Plum Blossom Oracle ═══`,
    ``,
    `Question: ${question || "(none)"}`,
    `Method:   ${t.result.methodNames[method]}`,
    `Inputs:   ${inputsLine}`,
    ``,
    `── Original (本卦) ──`,
    fmtHex(original),
    ``,
    `── Nuclear (互卦) ──`,
    fmtHex(nuclear),
    ``,
    `── Transformed (變卦) ──`,
    fmtHex(transformed),
    ``,
    `── Changing line (動爻) ──`,
    `Line ${changingLine}: ${t.result.lineMeanings[changingLine - 1]}`,
    `(${tyOriginal.yongIsLower ? "in lower trigram → lower is Yong, upper is Ti" : "in upper trigram → upper is Yong, lower is Ti"})`,
    ``,
    `── Ti–Yong (體用) analysis ──`,
    `Original (本卦):`,
    fmtTiYong(tyOriginal),
    ``,
    `Transformed (變卦):`,
    fmtTiYong(tyTransformed),
    ``,
    `──`,
    ``,
    trailingPrompt,
  ].join("\n");
}

export default function CopyForAIButton({ reading, lang, t, className = "" }) {
  const [status, setStatus] = useState("idle"); // idle | copied | error

  async function copy() {
    const text = buildPrompt(reading, lang, t);
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback: textarea + execCommand for older browsers
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setStatus("copied");
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  }

  const label = status === "copied" ? t.result.copied
              : status === "error"  ? t.result.copyError
              : t.result.copyForAI;

  const stateClass = status === "copied" ? "border-emerald-700 text-emerald-800 bg-emerald-50"
                   : status === "error"  ? "border-rose-700 text-rose-800 bg-rose-50"
                   : "border-stone-400 hover:border-rose-900 hover:text-rose-900";

  return (
    <button onClick={copy}
      className={`text-xs px-3 py-1.5 border rounded transition-colors ${stateClass} ${className}`}>
      {label}
    </button>
  );
}
