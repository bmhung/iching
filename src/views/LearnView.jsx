import TrigramLines from "../components/TrigramLines.jsx";
import { TRIGRAMS, trigName, trigAttr, trigFam, trigDir } from "../domain/trigrams.js";

export default function LearnView({ t, lang }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <h2 className="text-2xl font-serif text-stone-900 mb-8">{t.learn.title}</h2>

      <section className="mb-10">
        <h3 className="text-lg font-serif text-stone-900 mb-2">{t.learn.baguaT}</h3>
        <p className="text-sm text-stone-700 mb-4">{t.learn.bagua}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[1,2,3,4,5,6,7,8].map(i => {
            const tg = TRIGRAMS[i];
            return (
              <div key={i} className="bg-white border border-stone-300 rounded p-3">
                <div className="flex items-center gap-2 mb-2">
                  <TrigramLines n={i} size="sm" />
                  <div>
                    <div className="font-serif text-stone-900" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{tg.zh} <span className="text-stone-500 text-sm">{i}</span></div>
                    <div className="text-xs text-stone-600">{trigName(tg, lang)}</div>
                  </div>
                </div>
                <div className="text-[11px] text-stone-600 space-y-0.5 border-t border-stone-200 pt-2">
                  <div>{t.result.element}: <span className="text-rose-900">{t.elements[tg.el]}</span></div>
                  <div>{t.result.attribute}: {trigAttr(tg, lang)}</div>
                  <div>{t.result.family}: {trigFam(tg, lang)}</div>
                  <div>{t.result.direction}: {trigDir(tg, lang)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-lg font-serif text-stone-900 mb-3">{t.learn.nguT}</h3>
        <div className="space-y-2">
          <div className="p-3 bg-emerald-50 border-l-2 border-emerald-700 rounded-r text-sm text-stone-700">{t.learn.nguG}</div>
          <div className="p-3 bg-rose-50 border-l-2 border-rose-700 rounded-r text-sm text-stone-700">{t.learn.nguK}</div>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-lg font-serif text-stone-900 mb-3">{t.learn.methodsT}</h3>
        <div className="space-y-3 text-sm text-stone-700">
          <div className="bg-white border border-stone-200 rounded p-4">
            <div className="font-medium text-stone-900 mb-1">{t.cast.time} · {t.cast.timeZh}</div>
            <div>{t.learn.mTime}</div>
          </div>
          <div className="bg-white border border-stone-200 rounded p-4">
            <div className="font-medium text-stone-900 mb-1">{t.cast.number} · {t.cast.numberZh}</div>
            <div>{t.learn.mNumber}</div>
          </div>
          <div className="bg-white border border-stone-200 rounded p-4">
            <div className="font-medium text-stone-900 mb-1">{t.cast.sound} · {t.cast.soundZh}</div>
            <div>{t.learn.mSound}</div>
          </div>
          <div className="bg-white border border-stone-200 rounded p-4">
            <div className="font-medium text-stone-900 mb-1">{t.cast.spont} · {t.cast.spontZh}</div>
            <div>{t.learn.mSpont}</div>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-lg font-serif text-stone-900 mb-3">{t.learn.hexT}</h3>
        <div className="space-y-2 text-sm text-stone-700">
          <div className="border-l-2 border-stone-700 pl-3">{t.learn.benDef}</div>
          <div className="border-l-2 border-amber-700 pl-3">{t.learn.huDef}</div>
          <div className="border-l-2 border-rose-700 pl-3">{t.learn.bienDef}</div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-serif text-stone-900 mb-3">{t.learn.tiyongT}</h3>
        <p className="text-sm text-stone-700 leading-relaxed">{t.learn.tiyong}</p>
      </section>
    </div>
  );
}
