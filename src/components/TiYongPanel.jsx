import TrigramLines from "./TrigramLines.jsx";
import { trigName } from "../domain/trigrams.js";

export default function TiYongPanel({ analysis, t, lang, label, labelZh }) {
  const outcomeText = analysis.outcome === "favorable" ? t.result.favorable
                    : analysis.outcome === "unfavorable" ? t.result.unfavorable
                    : analysis.outcome === "less" ? t.result.less
                    : t.result.neutral;
  const outcomeColor = analysis.outcome === "favorable" ? "bg-emerald-50 border-emerald-700 text-emerald-900"
                     : analysis.outcome === "unfavorable" ? "bg-rose-50 border-rose-700 text-rose-900"
                     : analysis.outcome === "less" ? "bg-amber-50 border-amber-700 text-amber-900"
                     : "bg-stone-100 border-stone-500 text-stone-800";

  return (
    <div className={`border-l-4 ${outcomeColor.split(' ').filter(c => c.startsWith('border-')).join(' ')} bg-white border border-stone-300 rounded p-5`}>
      <h3 className="text-base font-serif text-stone-900 mb-1">{t.result.tiYong} · 體用論斷</h3>
      <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-4">
        {label} · <span className="font-serif" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{labelZh}</span>
      </div>

      <div className="text-xs text-stone-600 mb-4 italic">
        {analysis.yongIsLower ? t.result.yongInLower : t.result.yongInUpper}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
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

      <div className={`p-4 border ${outcomeColor} rounded`}>
        <div className="text-[10px] uppercase tracking-widest mb-1 opacity-70">{t.result.relation}</div>
        <div className="font-medium mb-2">{outcomeText}</div>
        <div className="text-sm leading-relaxed">{t.rel[analysis.rel]}</div>
      </div>
    </div>
  );
}
