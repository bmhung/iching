import PlumBlossom from "../components/PlumBlossom.jsx";

export default function HomeView({ t, setView }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="text-center mb-10">
        <div className="flex justify-center mb-4">
          <PlumBlossom size={48} />
        </div>
        <div className="text-xs tracking-widest uppercase text-stone-500 mb-2" style={{letterSpacing:"0.3em"}}>{t.home.tag}</div>
        <h1 className="text-3xl md:text-5xl font-serif text-stone-900 mb-3" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>
          {t.home.welcome}
        </h1>
        <div className="text-lg text-rose-900 font-serif tracking-wider" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>
          梅 花 易 數
        </div>
      </div>

      <p className="text-stone-700 leading-relaxed mb-8 text-justify">{t.home.lead}</p>

      <div className="grid md:grid-cols-3 gap-3 mb-12">
        <button onClick={() => setView("cast")} className="px-5 py-4 bg-stone-900 text-stone-50 hover:bg-rose-900 transition-colors text-sm tracking-wide rounded">
          {t.home.btnCast}
        </button>
        <button onClick={() => setView("learn")} className="px-5 py-4 bg-white border border-stone-400 text-stone-800 hover:border-rose-900 hover:text-rose-900 transition-colors text-sm tracking-wide rounded">
          {t.home.btnLearn}
        </button>
        <button onClick={() => setView("ref")} className="px-5 py-4 bg-white border border-stone-400 text-stone-800 hover:border-rose-900 hover:text-rose-900 transition-colors text-sm tracking-wide rounded">
          {t.home.btnRef}
        </button>
      </div>

      <div className="space-y-8">
        <section className="border-l-2 border-rose-900 pl-5">
          <h2 className="text-lg font-serif text-stone-900 mb-2">{t.home.legendT}</h2>
          <p className="text-stone-700 leading-relaxed text-sm">{t.home.legend}</p>
        </section>
        <section className="border-l-2 border-amber-700 pl-5">
          <h2 className="text-lg font-serif text-stone-900 mb-2">{t.home.principleT}</h2>
          <p className="text-stone-700 leading-relaxed text-sm">{t.home.principle}</p>
        </section>
      </div>
    </div>
  );
}
