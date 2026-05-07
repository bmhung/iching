import HexLines from "./HexLines.jsx";
import HexCommentary from "./HexCommentary.jsx";
import { hexName, hexJudg, hexImg } from "../domain/trigrams.js";

// Compact hex detail card — used for Hỗ quẻ and Biến quẻ in the reading
// view. The Bản quẻ has its own larger panel with trigram summaries.
export default function HexDetailCard({ hex, t, lang, label, labelZh }) {
  return (
    <div className="bg-white border border-stone-300 rounded p-5 mb-4">
      <div className="flex items-start gap-5">
        <div className="flex-shrink-0">
          <HexLines u={hex.u} l={hex.l} size="lg" />
        </div>
        <div className="flex-1">
          <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">
            {label} · <span className="font-serif" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{labelZh}</span> · 第 {hex.n} 卦
          </div>
          <div className="flex items-baseline gap-3 mb-1">
            <span className="text-3xl font-serif text-stone-900" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{hex.zh}</span>
            <span className="text-stone-600 italic">{hex.py}</span>
          </div>
          <div className="text-stone-800 mb-3">{hexName(hex, lang)}</div>

          <div className="border-t border-stone-200 pt-3 space-y-2">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-0.5">{t.result.judgment} · 卦辭</div>
              <div className="text-rose-900 font-serif mb-1" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{hex.jZh}</div>
              <div className="text-sm text-stone-800">{hexJudg(hex, lang)}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-0.5">{t.result.image} · 象</div>
              <div className="text-sm text-stone-700 italic">{hexImg(hex, lang)}</div>
            </div>
          </div>
        </div>
      </div>
      {lang === "vi" && (
        <div className="border-t border-stone-200 pt-4 mt-4">
          <HexCommentary hex={hex} lang={lang} />
        </div>
      )}
    </div>
  );
}
