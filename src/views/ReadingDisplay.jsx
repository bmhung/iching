import HexLines from "../components/HexLines.jsx";
import HexCard from "../components/HexCard.jsx";
import TrigramLines from "../components/TrigramLines.jsx";
import TrigramSummary from "../components/TrigramSummary.jsx";
import CastCalculation from "../components/CastCalculation.jsx";
import { getHex, hexName, hexJudg, hexImg, trigName } from "../domain/trigrams.js";
import { getNuclear, getTransformed, tiYongAnalysis } from "../domain/analysis.js";

export default function ReadingDisplay({ t, lang, reading, onAgain, saveStatus }) {
  const { u, l, change } = reading;
  const ben = getHex(u, l);
  const nuc = getNuclear(u, l);
  const huHex = getHex(nuc.u, nuc.l);
  const trans = getTransformed(u, l, change);
  const bienHex = getHex(trans.u, trans.l);
  const ty = tiYongAnalysis(u, l, change);

  const outcomeText = ty.outcome === "favorable" ? t.result.favorable
                    : ty.outcome === "unfavorable" ? t.result.unfavorable
                    : ty.outcome === "less" ? t.result.less
                    : t.result.neutral;
  const outcomeColor = ty.outcome === "favorable" ? "bg-emerald-50 border-emerald-700 text-emerald-900"
                     : ty.outcome === "unfavorable" ? "bg-rose-50 border-rose-700 text-rose-900"
                     : ty.outcome === "less" ? "bg-amber-50 border-amber-700 text-amber-900"
                     : "bg-stone-100 border-stone-500 text-stone-800";

  const inputsLine = reading.method === "time"
    ? `${t.branches[reading.inputs.yearBranch - 1]}年 · ${reading.inputs.month}月 · ${reading.inputs.day}日 · ${t.branches[reading.inputs.chHour - 1]}時`
    : reading.method === "number"
    ? `${reading.inputs.n1} , ${reading.inputs.n2}`
    : reading.method === "sound"
    ? `"${reading.inputs.text}" (${reading.inputs.len})`
    : "—";

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-xs uppercase tracking-widest text-stone-500 mb-1">{t.result.yourReading}</div>
          <div className="flex items-center gap-2 text-sm text-stone-600">
            <span>{t.result.method}:</span>
            <span className="text-stone-900">{t.result.methodNames[reading.method]}</span>
            <span className="text-stone-300">·</span>
            <span className="text-stone-700">{inputsLine}</span>
          </div>
        </div>
        <button onClick={onAgain} className="text-xs px-3 py-1.5 border border-stone-400 hover:border-rose-900 hover:text-rose-900 rounded transition-colors">
          {t.cast.again}
        </button>
      </div>

      {saveStatus && (
        <div className={`mb-4 text-xs px-3 py-1.5 rounded inline-block ${
          saveStatus === 'saved'      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
          : saveStatus === 'saving'   ? 'bg-stone-50 text-stone-600 border border-stone-200'
          : saveStatus === 'error'    ? 'bg-rose-50 text-rose-800 border border-rose-200'
          : saveStatus === 'no-storage' ? 'bg-amber-50 text-amber-800 border border-amber-200'
          : ''
        }`}>
          {saveStatus === 'saved'      ? t.result.saved
          : saveStatus === 'saving'    ? t.result.saving
          : saveStatus === 'error'     ? t.result.saveError
          : saveStatus === 'no-storage'? t.result.noStorage
          : ''}
        </div>
      )}

      {reading.question && (
        <div className="mb-6 p-3 bg-amber-50 border-l-2 border-amber-600 rounded-r">
          <div className="text-[10px] uppercase tracking-widest text-amber-700 mb-1">{t.result.yourQ}</div>
          <div className="text-stone-800 italic">"{reading.question}"</div>
        </div>
      )}

      <CastCalculation reading={reading} lang={lang} t={t} />

      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
        <HexCard hex={ben} lang={lang} label={t.result.ben} labelZh={t.result.benZh} desc={t.result.benDesc} change={change} />
        <HexCard hex={huHex} lang={lang} label={t.result.hu} labelZh={t.result.huZh} desc={t.result.huDesc} />
        <HexCard hex={bienHex} lang={lang} label={t.result.bien} labelZh={t.result.bienZh} desc={t.result.bienDesc} />
      </div>

      <div className="bg-white border border-stone-300 rounded p-5 mb-4">
        <div className="flex items-start gap-5">
          <div className="flex-shrink-0">
            <HexLines u={u} l={l} change={change} size="lg" />
          </div>
          <div className="flex-1">
            <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{t.result.ben} · 第 {ben.n} 卦</div>
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-3xl font-serif text-stone-900" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{ben.zh}</span>
              <span className="text-stone-600 italic">{ben.py}</span>
            </div>
            <div className="text-stone-800 mb-3">{hexName(ben, lang)}</div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <TrigramSummary tn={u} label={t.result.upper} t={t} lang={lang} />
              <TrigramSummary tn={l} label={t.result.lower} t={t} lang={lang} />
            </div>

            <div className="border-t border-stone-200 pt-3 space-y-2">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-0.5">{t.result.judgment} · 卦辭</div>
                <div className="text-rose-900 font-serif mb-1" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{ben.jZh}</div>
                <div className="text-sm text-stone-800">{hexJudg(ben, lang)}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-0.5">{t.result.image} · 象</div>
                <div className="text-sm text-stone-700 italic">{hexImg(ben, lang)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-rose-50/50 border border-rose-200 rounded p-5 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] uppercase tracking-widest text-rose-700">{t.result.dong} · {t.result.dongZh}</span>
        </div>
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-2xl font-serif text-rose-900" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>第 {change} 爻</span>
          <span className="text-sm text-stone-600">{t.result.line} {change}</span>
        </div>
        <div className="text-sm text-stone-700">{t.result.lineMeanings[change - 1]}</div>
      </div>

      <div className={`border-l-4 ${outcomeColor.split(' ').filter(c => c.startsWith('border-')).join(' ')} bg-white border border-stone-300 rounded p-5`}>
        <h3 className="text-base font-serif text-stone-900 mb-4">{t.result.tiYong} · 體用論斷</h3>

        <div className="text-xs text-stone-600 mb-4 italic">
          {ty.yongIsLower ? t.result.yongInLower : t.result.yongInUpper}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="bg-stone-50 border border-stone-300 rounded p-3">
            <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{t.result.ti} · 體 · {t.result.tiSub}</div>
            <div className="flex items-center gap-2 mb-2">
              <TrigramLines n={ty.ti} size="sm" />
              <div>
                <div className="font-serif text-stone-900" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{ty.tiT.zh} {ty.tiT.sym}</div>
                <div className="text-xs text-stone-600">{trigName(ty.tiT, lang)}</div>
              </div>
            </div>
            <div className="text-xs text-stone-600">
              <span className="text-rose-900">{t.elements[ty.tiT.el]}</span>
            </div>
          </div>

          <div className="bg-stone-50 border border-stone-300 rounded p-3">
            <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{t.result.yong} · 用 · {t.result.yongSub}</div>
            <div className="flex items-center gap-2 mb-2">
              <TrigramLines n={ty.yong} size="sm" />
              <div>
                <div className="font-serif text-stone-900" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{ty.yongT.zh} {ty.yongT.sym}</div>
                <div className="text-xs text-stone-600">{trigName(ty.yongT, lang)}</div>
              </div>
            </div>
            <div className="text-xs text-stone-600">
              <span className="text-rose-900">{t.elements[ty.yongT.el]}</span>
            </div>
          </div>
        </div>

        <div className={`p-4 border ${outcomeColor} rounded`}>
          <div className="text-[10px] uppercase tracking-widest mb-1 opacity-70">{t.result.relation}</div>
          <div className="font-medium mb-2">{outcomeText}</div>
          <div className="text-sm leading-relaxed">{t.rel[ty.rel]}</div>
        </div>
      </div>
    </div>
  );
}
