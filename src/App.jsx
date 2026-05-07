import { useState } from "react";
import PlumBlossom from "./components/PlumBlossom.jsx";
import AuthBar from "./components/AuthBar.jsx";
import HomeView from "./views/HomeView.jsx";
import CastView from "./views/CastView.jsx";
import RefView from "./views/RefView.jsx";
import LearnView from "./views/LearnView.jsx";
import HistoryView from "./views/HistoryView.jsx";
import { STR } from "./i18n/strings.js";

export default function App() {
  const [view, setView] = useState("home");
  const [lang, setLang] = useState("vi");
  const [reading, setReading] = useState(null);
  const t = STR[lang];

  const langOptions = [
    { code: "vi", label: "VI" },
    { code: "en", label: "EN" },
    { code: "zh", label: "中" },
  ];

  return (
    <div className="min-h-screen" style={{
      background: "linear-gradient(180deg, #f7f1e3 0%, #f0e7d3 100%)",
      color: "#1c1410",
    }}>
      <header className="border-b border-stone-300/60 backdrop-blur-sm sticky top-0 z-10" style={{background:"rgba(247,241,227,0.85)"}}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-2">
          <button onClick={() => { setView("home"); setReading(null); }} className="flex items-center gap-3 group min-w-0">
            <PlumBlossom size={28} />
            <div className="text-left min-w-0">
              <div className="text-base font-serif text-stone-900 leading-tight truncate" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>
                {t.title}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-stone-500 truncate hidden sm:block">{t.subtitle}</div>
            </div>
          </button>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <AuthBar t={t} />
            <div className="flex gap-1 text-xs">
              {langOptions.map(o => (
                <button key={o.code} onClick={() => setLang(o.code)}
                  className={`px-2 sm:px-2.5 py-1 rounded transition-colors ${lang === o.code ? "bg-stone-900 text-stone-50" : "text-stone-600 hover:text-stone-900"}`}>
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex gap-1 border-t border-stone-200 overflow-x-auto">
          {[
            { id: "home",    label: t.nav.home },
            { id: "cast",    label: t.nav.cast },
            { id: "ref",     label: t.nav.ref },
            { id: "learn",   label: t.nav.learn },
            { id: "history", label: ({ vi: "Lịch sử", en: "History", zh: "歷史" })[lang] },
          ].map(item => (
            <button key={item.id} onClick={() => { setView(item.id); if (item.id !== "cast") setReading(null); }}
              className={`px-4 py-2 text-sm transition-colors border-b-2 whitespace-nowrap ${view === item.id ? "border-rose-900 text-rose-900 font-medium" : "border-transparent text-stone-600 hover:text-stone-900"}`}>
              {item.label}
            </button>
          ))}
        </div>
      </header>

      <main>
        {view === "home" && <HomeView t={t} setView={setView} />}
        {view === "cast" && <CastView t={t} lang={lang} reading={reading} setReading={setReading} />}
        {view === "ref" && <RefView t={t} lang={lang} />}
        {view === "learn" && <LearnView t={t} lang={lang} />}
        {view === "history" && <HistoryView t={t} lang={lang} />}
      </main>

      <footer className="border-t border-stone-300/60 mt-12 py-6 text-center text-xs text-stone-500">
        梅花易數 · Mai Hoa Dịch Số · Plum Blossom Oracle
      </footer>
    </div>
  );
}
