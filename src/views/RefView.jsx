import { useState } from "react";
import HexLines from "../components/HexLines.jsx";
import HexCommentary from "../components/HexCommentary.jsx";
import { HEX, TRIGRAMS, getHex, hexName, hexJudg, hexImg, trigName } from "../domain/trigrams.js";
import { getOpposite, getInverse } from "../domain/analysis.js";

export default function RefView({ t, lang }) {
  const [selected, setSelected] = useState(null);
  const [filterUpper, setFilterUpper] = useState(0);
  const [filterLower, setFilterLower] = useState(0);

  if (selected) {
    const hex = HEX[selected];
    const oppositeCoords = getOpposite(hex.upper, hex.lower);
    const inverseCoords  = getInverse(hex.upper, hex.lower);
    const oppositeHex = getHex(oppositeCoords.upper, oppositeCoords.lower);
    const inverseHex  = getHex(inverseCoords.upper,  inverseCoords.lower);
    return (
      <div className="max-w-2xl mx-auto px-6 py-8">
        <button onClick={() => setSelected(null)} className="text-sm text-stone-600 hover:text-rose-900 mb-5">{t.ref.back}</button>

        <div className="bg-white border border-stone-300 rounded p-6 mb-4">
          <div className="flex items-start gap-5 mb-4">
            <HexLines upper={hex.upper} lower={hex.lower} size="lg" />
            <div className="flex-1">
              <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">第 {hex.n} 卦</div>
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-3xl font-serif text-stone-900" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{hex.zh}</span>
                <span className="text-stone-600 italic">{hex.py}</span>
              </div>
              <div className="text-stone-800 mb-2">{hexName(hex, lang)}</div>
              <div className="text-xs text-stone-500">{TRIGRAMS[hex.upper].sym} {TRIGRAMS[hex.upper].zh} / {TRIGRAMS[hex.lower].sym} {TRIGRAMS[hex.lower].zh}</div>
            </div>
          </div>

          <div className="border-t border-stone-200 pt-4 space-y-3">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-0.5">{t.result.judgment} · 卦辭</div>
              <div className="text-rose-900 font-serif mb-1" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{hex.jZh}</div>
              <div className="text-sm text-stone-800">{hexJudg(hex, lang)}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-0.5">{t.result.image} · 象</div>
              <div className="text-sm text-stone-700 italic">{hexImg(hex, lang)}</div>
            </div>
            {lang === "vi" && (
              <div className="pt-3 border-t border-stone-200">
                <HexCommentary hex={hex} lang={lang} />
              </div>
            )}
          </div>
        </div>

        <h4 className="text-sm font-serif text-stone-700 mb-2">{t.ref.relatedT}</h4>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => setSelected(oppositeHex.n)} className="bg-white border border-stone-300 hover:border-rose-900 rounded p-3 text-left transition-colors">
            <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{t.ref.opposite} · 錯</div>
            <div className="flex items-center gap-3">
              <HexLines upper={oppositeHex.upper} lower={oppositeHex.lower} size="sm" />
              <div>
                <div className="font-serif text-stone-900" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{oppositeHex.zh}</div>
                <div className="text-xs text-stone-600">{hexName(oppositeHex, lang)}</div>
              </div>
            </div>
          </button>
          <button onClick={() => setSelected(inverseHex.n)} className="bg-white border border-stone-300 hover:border-rose-900 rounded p-3 text-left transition-colors">
            <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{t.ref.inverse} · 綜</div>
            <div className="flex items-center gap-3">
              <HexLines upper={inverseHex.upper} lower={inverseHex.lower} size="sm" />
              <div>
                <div className="font-serif text-stone-900" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{inverseHex.zh}</div>
                <div className="text-xs text-stone-600">{hexName(inverseHex, lang)}</div>
              </div>
            </div>
          </button>
        </div>
      </div>
    );
  }

  const filtered = [];
  for (let i = 1; i <= 64; i++) {
    const hex = HEX[i];
    if (!hex) continue;
    if (filterUpper && hex.upper !== filterUpper) continue;
    if (filterLower && hex.lower !== filterLower) continue;
    filtered.push(hex);
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-serif text-stone-900 mb-6">{t.ref.title}</h2>

      <div className="flex flex-wrap gap-3 mb-5 items-center">
        <div>
          <label className="text-xs text-stone-500 mr-2">{t.ref.filterU}:</label>
          <select value={filterUpper} onChange={e => setFilterUpper(parseInt(e.target.value))}
            className="text-sm border border-stone-300 rounded px-2 py-1 bg-white">
            <option value={0}>{t.ref.all}</option>
            {[1,2,3,4,5,6,7,8].map(i => <option key={i} value={i}>{TRIGRAMS[i].sym} {TRIGRAMS[i].zh} {trigName(TRIGRAMS[i], lang)}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-stone-500 mr-2">{t.ref.filterL}:</label>
          <select value={filterLower} onChange={e => setFilterLower(parseInt(e.target.value))}
            className="text-sm border border-stone-300 rounded px-2 py-1 bg-white">
            <option value={0}>{t.ref.all}</option>
            {[1,2,3,4,5,6,7,8].map(i => <option key={i} value={i}>{TRIGRAMS[i].sym} {TRIGRAMS[i].zh} {trigName(TRIGRAMS[i], lang)}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {filtered.map(hex => (
          <button key={hex.n} onClick={() => setSelected(hex.n)}
            className="bg-white border border-stone-300 hover:border-rose-900 hover:bg-rose-50/30 rounded p-3 text-left transition-colors">
            <div className="flex items-center gap-2 mb-1.5">
              <HexLines upper={hex.upper} lower={hex.lower} size="sm" />
              <div className="text-xs text-stone-500">#{hex.n}</div>
            </div>
            <div className="font-serif text-base text-stone-900" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{hex.zh}</div>
            <div className="text-xs text-stone-600 truncate">{hexName(hex, lang)}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
