import { useState } from "react";
import { castTime, castNumber, castSound, castSpont, castNumberTime } from "../domain/casting.js";
import { solarToLunar, yearBranchOf } from "../domain/lunar.js";
import { saveReading } from "../storage/local.js";
import { notifyLocalWrite } from "../sync/engine.js";
import ReadingDisplay from "./ReadingDisplay.jsx";

export default function CastView({ t, lang, reading, setReading }) {
  const [method, setMethod] = useState(null);
  const [firstNumber, setFirstNumber]   = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [text, setText] = useState("");
  const [singleNumber, setSingleNumber] = useState("");
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");
  const [saveStatus, setSaveStatus] = useState(null); // null | 'saving' | 'saved' | 'error' | 'no-storage'
  const initialNow = new Date();
  const [year, setYear]   = useState(initialNow.getFullYear());
  const [month, setMonth] = useState(initialNow.getMonth() + 1);
  const [day, setDay]     = useState(initialNow.getDate());
  const [hour, setHour]   = useState(initialNow.getHours());
  const [calendar, setCalendar] = useState("solar");

  const dtLabels = ({
    vi: { year: "Năm", month: "Tháng", day: "Ngày", hour: "Giờ (0–23)", useNow: "↻ Dùng giờ hiện tại", title: "Thời điểm dựng quẻ", solar: "Dương lịch", lunar: "Âm lịch", convNote: "→ Đổi sang Âm lịch:", leap: "nhuận" },
    en: { year: "Year", month: "Month", day: "Day", hour: "Hour (0–23)", useNow: "↻ Use current time", title: "Cast for this moment", solar: "Solar", lunar: "Lunar", convNote: "→ Converted to lunar:", leap: "leap" },
    zh: { year: "年", month: "月", day: "日", hour: "時 (0–23)", useNow: "↻ 用當下時間", title: "起卦時點", solar: "陽曆", lunar: "農曆", convNote: "→ 換為農曆:", leap: "閏" },
  })[lang];

  function resetNow() {
    const now = new Date();
    setYear(now.getFullYear()); setMonth(now.getMonth() + 1);
    setDay(now.getDate()); setHour(now.getHours());
    setCalendar("solar");
  }

  // Live preview when in solar mode
  let lunarPreview = null;
  if (calendar === "solar" && method === "time") {
    try {
      const parsedYear = parseInt(year), parsedMonth = parseInt(month), parsedDay = parseInt(day);
      if (Number.isFinite(parsedYear) && parsedYear > 1800 && parsedYear < 2300 && parsedMonth >= 1 && parsedMonth <= 12 && parsedDay >= 1 && parsedDay <= 31) {
        lunarPreview = solarToLunar(parsedDay, parsedMonth, parsedYear, 7);
      }
    } catch {}
  }

  function doCast() {
    setError("");
    let castResult = null;
    if (method === "time") {
      const parsedYear  = parseInt(year);
      const parsedMonth = parseInt(month);
      const parsedDay   = parseInt(day);
      const parsedHour  = parseInt(hour);
      if (!Number.isFinite(parsedYear) || !Number.isFinite(parsedMonth) || !Number.isFinite(parsedDay) || !Number.isFinite(parsedHour) ||
          parsedMonth < 1 || parsedMonth > 12 || parsedDay < 1 || parsedDay > 31 || parsedHour < 0 || parsedHour > 23) {
        setError(t.cast.enterNums); return;
      }
      castResult = castTime(parsedYear, parsedMonth, parsedDay, parsedHour, calendar === "lunar");
    } else if (method === "number") {
      const parsedFirst  = parseInt(firstNumber);
      const parsedSecond = parseInt(secondNumber);
      if (!parsedFirst || !parsedSecond || parsedFirst < 1 || parsedSecond < 1) { setError(t.cast.enterNums); return; }
      castResult = castNumber(parsedFirst, parsedSecond);
    } else if (method === "sound") {
      castResult = castSound(text);
      if (!castResult) { setError(t.cast.tooShort); return; }
    } else if (method === "numberTime") {
      const parsedNumber = parseInt(singleNumber);
      const parsedHour   = parseInt(hour);
      if (!parsedNumber || parsedNumber < 1 || !Number.isFinite(parsedHour) || parsedHour < 0 || parsedHour > 23) {
        setError(t.cast.enterNums); return;
      }
      castResult = castNumberTime(parsedNumber, parsedHour);
    } else if (method === "spont") castResult = castSpont();
    if (castResult) {
      castResult.question = question;
      setReading(castResult);
      setSaveStatus('saving');
      saveReading(castResult).then(res => {
        setSaveStatus(res.ok ? 'saved' : res.reason);
        if (res.ok) notifyLocalWrite();
      });
    }
  }

  function reset() {
    setReading(null); setMethod(null); setFirstNumber(""); setSecondNumber(""); setText(""); setSingleNumber(""); setError("");
    setSaveStatus(null);
    resetNow();
  }

  if (reading) return <ReadingDisplay t={t} lang={lang} reading={reading} onAgain={reset} saveStatus={saveStatus} />;

  const methods = [
    { id: "time",       icon: "時", title: t.cast.time,       zh: t.cast.timeZh,       desc: t.cast.timeDesc       },
    { id: "number",     icon: "數", title: t.cast.number,     zh: t.cast.numberZh,     desc: t.cast.numberDesc     },
    { id: "sound",      icon: "聲", title: t.cast.sound,      zh: t.cast.soundZh,      desc: t.cast.soundDesc      },
    { id: "numberTime", icon: "時數", title: t.cast.numberTime, zh: t.cast.numberTimeZh, desc: t.cast.numberTimeDesc },
    { id: "spont",      icon: "應", title: t.cast.spont,      zh: t.cast.spontZh,      desc: t.cast.spontDesc      },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <h2 className="text-2xl font-serif text-stone-900 mb-6">{t.cast.title}</h2>

      {!method && (
        <div className="grid md:grid-cols-2 gap-3">
          {methods.map(m => (
            <button key={m.id} onClick={() => setMethod(m.id)}
              className="text-left p-5 bg-white border border-stone-300 hover:border-rose-900 hover:bg-rose-50/30 transition-colors rounded">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-2xl font-serif text-rose-900" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{m.icon}</span>
                <span className="text-base font-medium text-stone-900">{m.title}</span>
              </div>
              <div className="text-xs text-stone-500 font-serif mb-1" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{m.zh}</div>
              <div className="text-sm text-stone-600 leading-relaxed">{m.desc}</div>
            </button>
          ))}
        </div>
      )}

      {method && (
        <div className="bg-white border border-stone-300 rounded p-6">
          <div className="mb-5">
            <button onClick={() => setMethod(null)} className="text-xs text-stone-500 hover:text-rose-900 mb-3">←</button>
            <div className="text-xs uppercase tracking-widest text-stone-500 mb-1">{t.result.methodNames[method]}</div>
            <div className="text-base text-stone-900">{methods.find(m => m.id === method).desc}</div>
          </div>

          <div className="mb-4">
            <label className="block text-sm text-stone-600 mb-1.5">{t.cast.question}</label>
            <input value={question} onChange={e => setQuestion(e.target.value)} placeholder={t.cast.questionPh}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-300 focus:border-rose-900 outline-none rounded text-sm" />
          </div>

          {method === "time" && (
            <div className="mb-4">
              <div className="flex items-baseline justify-between mb-2">
                <label className="block text-sm text-stone-600">{dtLabels.title}</label>
                <button type="button" onClick={resetNow} className="text-xs text-stone-500 hover:text-rose-900 transition-colors">
                  {dtLabels.useNow}
                </button>
              </div>

              <div className="flex gap-1 mb-2 text-xs">
                <button type="button" onClick={() => setCalendar("solar")}
                  className={`px-3 py-1.5 rounded transition-colors ${calendar === "solar" ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"}`}>
                  {dtLabels.solar}
                </button>
                <button type="button" onClick={() => setCalendar("lunar")}
                  className={`px-3 py-1.5 rounded transition-colors ${calendar === "lunar" ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"}`}>
                  {dtLabels.lunar}
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="block text-[11px] text-stone-500 mb-0.5">{dtLabels.year}</label>
                  <input type="number" value={year} onChange={e => setYear(e.target.value)}
                    className="w-full px-2 py-1.5 bg-stone-50 border border-stone-300 focus:border-rose-900 outline-none rounded text-sm" />
                </div>
                <div>
                  <label className="block text-[11px] text-stone-500 mb-0.5">{dtLabels.month}</label>
                  <input type="number" min="1" max="12" value={month} onChange={e => setMonth(e.target.value)}
                    className="w-full px-2 py-1.5 bg-stone-50 border border-stone-300 focus:border-rose-900 outline-none rounded text-sm" />
                </div>
                <div>
                  <label className="block text-[11px] text-stone-500 mb-0.5">{dtLabels.day}</label>
                  <input type="number" min="1" max="31" value={day} onChange={e => setDay(e.target.value)}
                    className="w-full px-2 py-1.5 bg-stone-50 border border-stone-300 focus:border-rose-900 outline-none rounded text-sm" />
                </div>
                <div>
                  <label className="block text-[11px] text-stone-500 mb-0.5">{dtLabels.hour}</label>
                  <input type="number" min="0" max="23" value={hour} onChange={e => setHour(e.target.value)}
                    className="w-full px-2 py-1.5 bg-stone-50 border border-stone-300 focus:border-rose-900 outline-none rounded text-sm" />
                </div>
              </div>

              {lunarPreview && (
                <div className="text-xs text-stone-600 mt-2 font-mono">
                  <span className="text-rose-700">{dtLabels.convNote}</span>{" "}
                  {t.branches[yearBranchOf(lunarPreview.year)-1]} ({yearBranchOf(lunarPreview.year)})
                  {" · "}{dtLabels.month} {lunarPreview.month}{lunarPreview.leap ? ` (${dtLabels.leap})` : ""}
                  {" · "}{dtLabels.day} {lunarPreview.day}
                </div>
              )}
            </div>
          )}

          {method === "number" && (
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div>
                <label className="block text-sm text-stone-600 mb-1.5">{t.cast.firstNumber}</label>
                <input type="number" value={firstNumber} onChange={e => setFirstNumber(e.target.value)} min="1"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 focus:border-rose-900 outline-none rounded" />
              </div>
              <div>
                <label className="block text-sm text-stone-600 mb-1.5">{t.cast.secondNumber}</label>
                <input type="number" value={secondNumber} onChange={e => setSecondNumber(e.target.value)} min="1"
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-300 focus:border-rose-900 outline-none rounded" />
              </div>
            </div>
          )}

          {method === "sound" && (
            <div className="mb-4">
              <label className="block text-sm text-stone-600 mb-1.5">{t.cast.text}</label>
              <input value={text} onChange={e => setText(e.target.value)} placeholder={t.cast.textPh}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 focus:border-rose-900 outline-none rounded" />
            </div>
          )}

          {method === "numberTime" && (
            <div className="mb-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-stone-600 mb-1.5">{t.cast.number}</label>
                  <input type="number" value={singleNumber} onChange={e => setSingleNumber(e.target.value)} min="1"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 focus:border-rose-900 outline-none rounded" />
                </div>
                <div>
                  <div className="flex items-baseline justify-between mb-1.5">
                    <label className="block text-sm text-stone-600">{dtLabels.hour}</label>
                    <button type="button" onClick={() => setHour(new Date().getHours())} className="text-[11px] text-stone-500 hover:text-rose-900 transition-colors">
                      {dtLabels.useNow}
                    </button>
                  </div>
                  <input type="number" min="0" max="23" value={hour} onChange={e => setHour(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-300 focus:border-rose-900 outline-none rounded" />
                </div>
              </div>
            </div>
          )}

          {error && <div className="text-rose-700 text-sm mb-3">{error}</div>}

          <button onClick={doCast}
            className="w-full px-5 py-3 bg-stone-900 text-stone-50 hover:bg-rose-900 transition-colors text-sm tracking-wide rounded">
            {method === "spont" ? t.cast.castNow : t.cast.castBtn}
          </button>
        </div>
      )}
    </div>
  );
}
