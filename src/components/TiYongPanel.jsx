import TrigramLines from "./TrigramLines.jsx";
import { trigName } from "../domain/trigrams.js";

function outcomeText(outcome, t) {
  if (outcome === "favorable")   return t.result.favorable;
  if (outcome === "unfavorable") return t.result.unfavorable;
  if (outcome === "less")        return t.result.less;
  return t.result.neutral;
}

function outcomeColor(outcome) {
  if (outcome === "favorable")   return "bg-emerald-50 border-emerald-700 text-emerald-900";
  if (outcome === "unfavorable") return "bg-rose-50 border-rose-700 text-rose-900";
  if (outcome === "less")        return "bg-amber-50 border-amber-700 text-amber-900";
  return "bg-stone-100 border-stone-500 text-stone-800";
}

function TiYongSection({ analysis, t, lang, label, labelZh }) {
  const color = outcomeColor(analysis.outcome);
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-2">
        {label} · <span className="font-serif" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{labelZh}</span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-3">
        <div className="bg-stone-50 border border-stone-300 rounded p-3">
          <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{t.result.ti} · 體 · {t.result.tiSub}</div>
          <div className="flex items-center gap-2 mb-2">
            <TrigramLines n={analysis.ti} size="sm" />
            <div>
              <div className="font-serif text-stone-900" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{analysis.tiT.zh} {analysis.tiT.sym}</div>
              <div className="text-xs text-stone-600">{trigName(analysis.tiT, lang)}</div>
            </div>
          </div>
          <div className="text-xs text-stone-600">
            <span className="text-rose-900">{t.elements[analysis.tiT.el]}</span>
          </div>
        </div>

        <div className="bg-stone-50 border border-stone-300 rounded p-3">
          <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{t.result.yong} · 用 · {t.result.yongSub}</div>
          <div className="flex items-center gap-2 mb-2">
            <TrigramLines n={analysis.yong} size="sm" />
            <div>
              <div className="font-serif text-stone-900" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{analysis.yongT.zh} {analysis.yongT.sym}</div>
              <div className="text-xs text-stone-600">{trigName(analysis.yongT, lang)}</div>
            </div>
          </div>
          <div className="text-xs text-stone-600">
            <span className="text-rose-900">{t.elements[analysis.yongT.el]}</span>
          </div>
        </div>
      </div>

      <div className={`p-3 border ${color} rounded`}>
        <div className="text-[10px] uppercase tracking-widest mb-1 opacity-70">{t.result.relation}</div>
        <div className="font-medium mb-1">{outcomeText(analysis.outcome, t)}</div>
        <div className="text-sm leading-relaxed">{t.rel[analysis.rel]}</div>
      </div>
    </div>
  );
}

// Single panel showing Ti-Yong analysis stacked for present (本卦) and
// future (變卦). Outer left-border color reflects the present outcome.
export default function TiYongPanel({ sections, yongIsLower, t, lang }) {
  const present = sections[0];
  const borderColor = outcomeColor(present.analysis.outcome)
    .split(" ")
    .filter(c => c.startsWith("border-"))
    .join(" ");

  return (
    <div className={`border-l-4 ${borderColor} bg-white border border-stone-300 rounded p-5`}>
      <h3 className="text-base font-serif text-stone-900 mb-1">{t.result.tiYong} · 體用論斷</h3>
      <div className="text-xs text-stone-600 mb-5 italic">
        {yongIsLower ? t.result.yongInLower : t.result.yongInUpper}
      </div>

      <div className="space-y-5">
        {sections.map((s, i) => (
          <div key={i} className={i > 0 ? "pt-5 border-t border-stone-200" : ""}>
            <TiYongSection analysis={s.analysis} t={t} lang={lang} label={s.label} labelZh={s.labelZh} />
          </div>
        ))}
      </div>
    </div>
  );
}
