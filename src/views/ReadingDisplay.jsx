import HexLines from "../components/HexLines.jsx";
import HexCard from "../components/HexCard.jsx";
import TrigramSummary from "../components/TrigramSummary.jsx";
import CastCalculation from "../components/CastCalculation.jsx";
import TiYongPanel from "../components/TiYongPanel.jsx";
import WuxingPanel from "../components/WuxingPanel.jsx";
import HexCommentary from "../components/HexCommentary.jsx";
import HexDetailCard from "../components/HexDetailCard.jsx";
import CopyForAIButton from "../components/CopyForAIButton.jsx";
import { getHex, hexName, hexJudg, hexImg } from "../domain/trigrams.js";
import { getNuclear, getTransformed, tiYongAnalysis } from "../domain/analysis.js";

export default function ReadingDisplay({ t, lang, reading, onAgain, saveStatus }) {
  const { upper, lower, changingLine } = reading;
  const originalHex = getHex(upper, lower);
  const nuclearCoords = getNuclear(upper, lower);
  const nuclearHex = getHex(nuclearCoords.upper, nuclearCoords.lower);
  const transformedCoords = getTransformed(upper, lower, changingLine);
  const transformedHex = getHex(transformedCoords.upper, transformedCoords.lower);
  const tiYongOriginal = tiYongAnalysis(upper, lower, changingLine);
  // Ti-Yong of the transformed: same Ti/Yong positions (the changing line
  // position is unchanged), but the Yong trigram has flipped → new element
  // relationship → represents how the situation evolves.
  const tiYongTransformed = tiYongAnalysis(transformedCoords.upper, transformedCoords.lower, changingLine);

  const inputsLine = reading.method === "time"
    ? `${t.branches[reading.inputs.yearBranch - 1]}年 · ${reading.inputs.month}月 · ${reading.inputs.day}日 · ${t.branches[reading.inputs.hourBranch - 1]}時`
    : reading.method === "number"
    ? `${reading.inputs.firstNumber} , ${reading.inputs.secondNumber}`
    : reading.method === "sound"
    ? `"${reading.inputs.text}" (${reading.inputs.length})`
    : reading.method === "numberTime"
    ? `${reading.inputs.number} · ${t.branches[reading.inputs.hourBranch - 1]}時`
    : "—";

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div className="min-w-0">
          <div className="text-xs uppercase tracking-widest text-stone-500 mb-1">{t.result.yourReading}</div>
          <div className="flex items-baseline gap-2 text-sm text-stone-600 flex-wrap">
            <span>{t.result.method}:</span>
            <span className="text-stone-900">{t.result.methodNames[reading.method]}</span>
            <span className="text-stone-300">·</span>
            <span className="text-stone-700 break-words">{inputsLine}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <CopyForAIButton reading={reading} lang={lang} t={t} />
          <button onClick={onAgain} className="text-xs px-3 py-1.5 border border-stone-400 hover:border-rose-900 hover:text-rose-900 rounded transition-colors">
            {t.cast.again}
          </button>
        </div>
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
        <HexCard hex={originalHex}    lang={lang} label={t.result.original}    labelZh={t.result.originalZh}    desc={t.result.originalDesc}    changingLine={changingLine} />
        <HexCard hex={nuclearHex}     lang={lang} label={t.result.nuclear}     labelZh={t.result.nuclearZh}     desc={t.result.nuclearDesc} />
        <HexCard hex={transformedHex} lang={lang} label={t.result.transformed} labelZh={t.result.transformedZh} desc={t.result.transformedDesc} />
      </div>

      <div className="bg-white border border-stone-300 rounded p-4 sm:p-5 mb-4">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
          <div className="flex-shrink-0">
            <HexLines upper={upper} lower={lower} changingLine={changingLine} size="lg" />
          </div>
          <div className="flex-1 w-full min-w-0">
            <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{t.result.original} · 第 {originalHex.n} 卦</div>
            <div className="flex items-baseline gap-3 mb-1 flex-wrap">
              <span className="text-3xl font-serif text-stone-900" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{originalHex.zh}</span>
              <span className="text-stone-600 italic">{originalHex.py}</span>
            </div>
            <div className="text-stone-800 mb-3">{hexName(originalHex, lang)}</div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <TrigramSummary trigramNumber={upper} label={t.result.upper} t={t} lang={lang} />
              <TrigramSummary trigramNumber={lower} label={t.result.lower} t={t} lang={lang} />
            </div>

            <div className="border-t border-stone-200 pt-3 space-y-2">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-0.5">{t.result.judgment} · 卦辭</div>
                <div className="text-rose-900 font-serif mb-1" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{originalHex.jZh}</div>
                <div className="text-sm text-stone-800">{hexJudg(originalHex, lang)}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-0.5">{t.result.image} · 象</div>
                <div className="text-sm text-stone-700 italic">{hexImg(originalHex, lang)}</div>
              </div>
            </div>
          </div>
        </div>
        {lang === "vi" && (
          <div className="border-t border-stone-200 pt-4 mt-4">
            <HexCommentary hex={originalHex} lang={lang} />
          </div>
        )}
      </div>

      <HexDetailCard hex={nuclearHex}     t={t} lang={lang} label={t.result.nuclear}     labelZh={t.result.nuclearZh} />
      <HexDetailCard hex={transformedHex} t={t} lang={lang} label={t.result.transformed} labelZh={t.result.transformedZh} />

      <div className="bg-rose-50/50 border border-rose-200 rounded p-5 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] uppercase tracking-widest text-rose-700">{t.result.dong} · {t.result.dongZh}</span>
        </div>
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-2xl font-serif text-rose-900" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>第 {changingLine} 爻</span>
          <span className="text-sm text-stone-600">{t.result.line} {changingLine}</span>
        </div>
        <div className="text-sm text-stone-700">{t.result.lineMeanings[changingLine - 1]}</div>
      </div>

      <TiYongPanel
        t={t}
        lang={lang}
        yongIsLower={tiYongOriginal.yongIsLower}
        sections={[
          { label: t.result.original,    labelZh: t.result.originalZh,    analysis: tiYongOriginal    },
          { label: t.result.transformed, labelZh: t.result.transformedZh, analysis: tiYongTransformed },
        ]}
      />

      <div className="mt-4">
        <WuxingPanel
          tiTrigram={tiYongOriginal.tiTrigram}
          yongTrigram={tiYongOriginal.yongTrigram}
          reading={reading}
          t={t}
        />
      </div>
    </div>
  );
}
