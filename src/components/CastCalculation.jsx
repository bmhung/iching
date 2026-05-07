import { TRIGRAMS } from "../domain/trigrams.js";

export default function CastCalculation({ reading, lang, t }) {
  const { method, inputs, u, l, change } = reading;

  const L = ({
    vi: { title: "Cách dựng quẻ (起卦演算)", inputs: "Đầu vào", upper: "Thượng quái", lower: "Hạ quái", changing: "Động hào", rem: "dư", arrow: "→", year: "Năm-chi", month: "Tháng", day: "Ngày", hour: "Giờ-chi", n1: "Số 1", n2: "Số 2", chars: "Số chữ", half1: "Nửa đầu", half2: "Nửa sau", text: "Câu", solarLabel: "Dương lịch", lunarLabel: "Âm lịch", lunarConverted: "→ Đổi sang Âm lịch", leap: "nhuận", noteTime: "Mai Hoa Dịch dùng Âm lịch. Nếu nhập Dương lịch, hệ thống tự đổi sang Âm rồi mới dựng quẻ.", note: "Quái: chia 8 lấy số dư (nếu dư 0 thì lấy 8). Động hào: chia 6 lấy số dư (nếu dư 0 thì lấy 6).", random: "Hệ thống chọn ngẫu nhiên — không có công thức." },
    en: { title: "Derivation", inputs: "Inputs", upper: "Upper", lower: "Lower", changing: "Changing line", rem: "rem", arrow: "→", year: "Year branch", month: "Month", day: "Day", hour: "Hour branch", n1: "Number 1", n2: "Number 2", chars: "Total chars", half1: "First half", half2: "Second half", text: "Phrase", solarLabel: "Solar", lunarLabel: "Lunar", lunarConverted: "→ Converted to lunar", leap: "leap", noteTime: "Plum Blossom uses the lunar calendar. Solar input is auto-converted to lunar before computing.", note: "Trigrams: divide by 8, use remainder (rem 0 means 8). Changing line: divide by 6, use remainder (rem 0 means 6).", random: "Cast randomly by the system — no formula." },
    zh: { title: "起卦演算", inputs: "輸入", upper: "上卦", lower: "下卦", changing: "動爻", rem: "餘", arrow: "→", year: "年支", month: "月", day: "日", hour: "時支", n1: "數一", n2: "數二", chars: "字數", half1: "前半", half2: "後半", text: "字句", solarLabel: "陽曆", lunarLabel: "農曆", lunarConverted: "→ 換為農曆", leap: "閏", noteTime: "梅花用農曆。輸入陽曆者先換為農曆,再起卦。", note: "卦:除8取餘(餘0則為8)。動爻:除6取餘(餘0則為6)。", random: "由系統隨機起卦,無公式。" },
  })[lang];

  function div(sum, divisor, useWhenZero) {
    const q = Math.floor(sum / divisor);
    const r = sum % divisor;
    return { q, r, result: r === 0 ? useWhenZero : r };
  }

  let inputItems = [];
  let upperEq = null, lowerEq = null, changeEq = null;
  let timeBlock = null;

  if (method === "time") {
    const lunar = inputs.lunar || { year: inputs.year, month: inputs.month, day: inputs.day, leap: 0 };
    const solar = inputs.solar;
    const yb = inputs.yearBranch;
    const m = lunar.month, d = lunar.day, ch = inputs.chHour;
    timeBlock = { lunar, solar, yb, ch, hour: inputs.hour };
    const s1 = yb + m + d;
    const s2 = s1 + ch;
    upperEq = { expr: `${yb} + ${m} + ${d}`, sum: s1, divisor: 8, ...div(s1, 8, 8) };
    lowerEq = { expr: `${yb} + ${m} + ${d} + ${ch}`, sum: s2, divisor: 8, ...div(s2, 8, 8) };
    changeEq = { expr: `${s2}`, sum: s2, divisor: 6, simple: true, ...div(s2, 6, 6) };
  } else if (method === "number") {
    const n1 = inputs.n1, n2 = inputs.n2;
    inputItems = [{ k: L.n1, v: n1 }, { k: L.n2, v: n2 }];
    upperEq = { expr: `${n1}`, sum: n1, divisor: 8, simple: true, ...div(n1, 8, 8) };
    lowerEq = { expr: `${n2}`, sum: n2, divisor: 8, simple: true, ...div(n2, 8, 8) };
    changeEq = { expr: `${n1} + ${n2}`, sum: n1 + n2, divisor: 6, ...div(n1 + n2, 6, 6) };
  } else if (method === "sound") {
    const h1 = inputs.half1, h2 = inputs.half2;
    inputItems = [
      { k: L.text, v: `"${(inputs.text || "").slice(0, 30)}"` },
      { k: L.chars, v: inputs.len },
      { k: L.half1, v: h1 },
      { k: L.half2, v: h2 },
    ];
    upperEq = { expr: `${h1}`, sum: h1, divisor: 8, simple: true, ...div(h1, 8, 8) };
    lowerEq = { expr: `${h2}`, sum: h2, divisor: 8, simple: true, ...div(h2, 8, 8) };
    changeEq = { expr: `${h1} + ${h2}`, sum: h1 + h2, divisor: 6, ...div(h1 + h2, 6, 6) };
  }

  function EqRow({ label, eq, trigram }) {
    if (!eq) return null;
    return (
      <div className="flex items-baseline gap-x-2 gap-y-1 flex-wrap text-sm py-1">
        <span className="text-stone-500 w-24 sm:w-28 flex-shrink-0">{label}</span>
        <span className="font-mono text-stone-700 text-xs sm:text-sm">
          {eq.simple ? eq.expr : `(${eq.expr})`} ÷ {eq.divisor} = {eq.q} {L.rem} <span className="text-stone-900 font-semibold">{eq.r}</span>
        </span>
        <span className="text-stone-400">{L.arrow}</span>
        <span className="font-mono text-rose-900 font-semibold">{eq.result}</span>
        {trigram && (
          <span className="text-stone-700 text-sm">= <span className="font-serif" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{trigram.zh}</span> {trigram.sym}</span>
        )}
      </div>
    );
  }

  if (method === "spont") {
    return (
      <div className="bg-stone-50/60 border border-stone-200 rounded p-4 mb-6">
        <h3 className="text-sm font-medium text-stone-800 mb-2">{L.title}</h3>
        <div className="text-sm text-stone-600 italic mb-2">{L.random}</div>
        <div className="text-xs text-stone-600 font-mono space-y-0.5">
          <div>{L.upper}: {u} = <span className="font-serif" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{TRIGRAMS[u].zh}</span> {TRIGRAMS[u].sym}</div>
          <div>{L.lower}: {l} = <span className="font-serif" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{TRIGRAMS[l].zh}</span> {TRIGRAMS[l].sym}</div>
          <div>{L.changing}: {change}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-50/60 border border-stone-200 rounded p-4 mb-6">
      <h3 className="text-sm font-medium text-stone-800 mb-3">{L.title}</h3>

      {timeBlock && (
        <div className="mb-3 pb-3 border-b border-stone-200 space-y-1.5">
          {timeBlock.solar && (
            <div className="text-sm">
              <span className="text-stone-500">{L.solarLabel}: </span>
              <span className="font-mono text-stone-900">
                {timeBlock.solar.year}-{String(timeBlock.solar.month).padStart(2,'0')}-{String(timeBlock.solar.day).padStart(2,'0')}
                {" · "}{String(timeBlock.hour).padStart(2,'0')}:00
              </span>
            </div>
          )}
          <div className="text-sm">
            <span className={timeBlock.solar ? "text-rose-700 font-medium" : "text-stone-500"}>
              {timeBlock.solar ? L.lunarConverted : L.lunarLabel}:{" "}
            </span>
            <span className="font-mono text-stone-900">
              {t.branches[timeBlock.yb-1]} ({timeBlock.yb})
              {" · "}{L.month} {timeBlock.lunar.month}{timeBlock.lunar.leap ? ` (${L.leap})` : ""}
              {" · "}{L.day} {timeBlock.lunar.day}
              {" · "}{t.branches[timeBlock.ch-1]} ({timeBlock.ch})
            </span>
          </div>
          <div className="text-[11px] text-stone-500 italic pt-1">{L.noteTime}</div>
        </div>
      )}

      {!timeBlock && inputItems.length > 0 && (
        <div className="mb-3 pb-3 border-b border-stone-200">
          <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1.5">{L.inputs}</div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {inputItems.map((it, i) => (
              <div key={i}>
                <span className="text-stone-500">{it.k}: </span>
                <span className="text-stone-900 font-mono">{it.v}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <EqRow label={L.upper} eq={upperEq} trigram={TRIGRAMS[u]} />
        <EqRow label={L.lower} eq={lowerEq} trigram={TRIGRAMS[l]} />
        <EqRow label={L.changing} eq={changeEq} />
      </div>

      <div className="text-[11px] text-stone-500 italic mt-3 pt-3 border-t border-stone-200">{L.note}</div>
    </div>
  );
}
