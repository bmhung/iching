import { useState } from "react";
import HexLines from "../components/HexLines.jsx";
import HexCommentary from "../components/HexCommentary.jsx";
import { HEX, TRIGRAMS, getHex, hexName, hexJudg, hexImg, trigName } from "../domain/trigrams.js";
import { getOpposite, getInverse } from "../domain/analysis.js";

export default function RefView({ t, lang }) {
  const [selected, setSelected] = useState(null);
  const [filterU, setFilterU] = useState(0);
  const [filterL, setFilterL] = useState(0);

  if (selected) {
    const h = HEX[selected];
    const opp = getOpposite(h.u, h.l);
    const inv = getInverse(h.u, h.l);
    const oppHex = getHex(opp.u, opp.l);
    const invHex = getHex(inv.u, inv.l);
    return (
      <div className="max-w-2xl mx-auto px-6 py-8">
        <button onClick={() => setSelected(null)} className="text-sm text-stone-600 hover:text-rose-900 mb-5">{t.ref.back}</button>

        <div className="bg-white border border-stone-300 rounded p-6 mb-4">
          <div className="flex items-start gap-5 mb-4">
            <HexLines u={h.u} l={h.l} size="lg" />
            <div className="flex-1">
              <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">第 {h.n} 卦</div>
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-3xl font-serif text-stone-900" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{h.zh}</span>
                <span className="text-stone-600 italic">{h.py}</span>
              </div>
              <div className="text-stone-800 mb-2">{hexName(h, lang)}</div>
              <div className="text-xs text-stone-500">{TRIGRAMS[h.u].sym} {TRIGRAMS[h.u].zh} / {TRIGRAMS[h.l].sym} {TRIGRAMS[h.l].zh}</div>
            </div>
          </div>

          <div className="border-t border-stone-200 pt-4 space-y-3">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-0.5">{t.result.judgment} · 卦辭</div>
              <div className="text-rose-900 font-serif mb-1" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{h.jZh}</div>
              <div className="text-sm text-stone-800">{hexJudg(h, lang)}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-0.5">{t.result.image} · 象</div>
              <div className="text-sm text-stone-700 italic">{hexImg(h, lang)}</div>
            </div>
            {lang === "vi" && (
              <div className="pt-3 border-t border-stone-200">
                <HexCommentary hex={h} lang={lang} />
              </div>
            )}
          </div>
        </div>

        <h4 className="text-sm font-serif text-stone-700 mb-2">{t.ref.relatedT}</h4>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => setSelected(oppHex.n)} className="bg-white border border-stone-300 hover:border-rose-900 rounded p-3 text-left transition-colors">
            <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{t.ref.opposite} · 錯</div>
            <div className="flex items-center gap-3">
              <HexLines u={oppHex.u} l={oppHex.l} size="sm" />
              <div>
                <div className="font-serif text-stone-900" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{oppHex.zh}</div>
                <div className="text-xs text-stone-600">{hexName(oppHex, lang)}</div>
              </div>
            </div>
          </button>
          <button onClick={() => setSelected(invHex.n)} className="bg-white border border-stone-300 hover:border-rose-900 rounded p-3 text-left transition-colors">
            <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{t.ref.inverse} · 綜</div>
            <div className="flex items-center gap-3">
              <HexLines u={invHex.u} l={invHex.l} size="sm" />
              <div>
                <div className="font-serif text-stone-900" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{invHex.zh}</div>
                <div className="text-xs text-stone-600">{hexName(invHex, lang)}</div>
              </div>
            </div>
          </button>
        </div>
      </div>
    );
  }

  const filtered = [];
  for (let i = 1; i <= 64; i++) {
    const h = HEX[i];
    if (!h) continue;
    if (filterU && h.u !== filterU) continue;
    if (filterL && h.l !== filterL) continue;
    filtered.push(h);
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-serif text-stone-900 mb-6">{t.ref.title}</h2>

      <div className="flex flex-wrap gap-3 mb-5 items-center">
        <div>
          <label className="text-xs text-stone-500 mr-2">{t.ref.filterU}:</label>
          <select value={filterU} onChange={e => setFilterU(parseInt(e.target.value))}
            className="text-sm border border-stone-300 rounded px-2 py-1 bg-white">
            <option value={0}>{t.ref.all}</option>
            {[1,2,3,4,5,6,7,8].map(i => <option key={i} value={i}>{TRIGRAMS[i].sym} {TRIGRAMS[i].zh} {trigName(TRIGRAMS[i], lang)}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs text-stone-500 mr-2">{t.ref.filterL}:</label>
          <select value={filterL} onChange={e => setFilterL(parseInt(e.target.value))}
            className="text-sm border border-stone-300 rounded px-2 py-1 bg-white">
            <option value={0}>{t.ref.all}</option>
            {[1,2,3,4,5,6,7,8].map(i => <option key={i} value={i}>{TRIGRAMS[i].sym} {TRIGRAMS[i].zh} {trigName(TRIGRAMS[i], lang)}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {filtered.map(h => (
          <button key={h.n} onClick={() => setSelected(h.n)}
            className="bg-white border border-stone-300 hover:border-rose-900 hover:bg-rose-50/30 rounded p-3 text-left transition-colors">
            <div className="flex items-center gap-2 mb-1.5">
              <HexLines u={h.u} l={h.l} size="sm" />
              <div className="text-xs text-stone-500">#{h.n}</div>
            </div>
            <div className="font-serif text-base text-stone-900" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{h.zh}</div>
            <div className="text-xs text-stone-600 truncate">{hexName(h, lang)}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
