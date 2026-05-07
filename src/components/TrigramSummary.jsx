import TrigramLines from "./TrigramLines.jsx";
import { TRIGRAMS, trigName, trigAttr, trigFam } from "../domain/trigrams.js";

export default function TrigramSummary({ tn, label, t, lang }) {
  const tg = TRIGRAMS[tn];
  return (
    <div className="bg-stone-50 border border-stone-200 rounded p-3">
      <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{label}</div>
      <div className="flex items-center gap-2 mb-2">
        <TrigramLines n={tn} size="sm" />
        <div>
          <div className="font-serif text-stone-900" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{tg.zh} {tg.sym}</div>
          <div className="text-xs text-stone-600">{trigName(tg, lang)}</div>
        </div>
      </div>
      <div className="text-[11px] text-stone-600 space-y-0.5">
        <div>{t.result.element}: <span className="text-rose-900">{t.elements[tg.el]}</span></div>
        <div>{t.result.attribute}: {trigAttr(tg, lang)}</div>
        <div>{t.result.family}: {trigFam(tg, lang)}</div>
      </div>
    </div>
  );
}
