import { TRIGRAMS } from "../domain/trigrams.js";

export default function CastCalculation({ reading, lang, t }) {
  const { method, inputs, upper, lower, changingLine } = reading;

  const L = ({
    vi: { title: "Cách dựng quẻ (起卦演算)", inputs: "Đầu vào", upper: "Thượng quái", lower: "Hạ quái", changing: "Động hào", rem: "dư", arrow: "→", year: "Năm-chi", month: "Tháng", day: "Ngày", hour: "Giờ-chi", firstNumber: "Số 1", secondNumber: "Số 2", chars: "Số chữ", firstHalf: "Nửa đầu", secondHalf: "Nửa sau", text: "Câu", solarLabel: "Dương lịch", lunarLabel: "Âm lịch", lunarConverted: "→ Đổi sang Âm lịch", leap: "nhuận", noteTime: "Mai Hoa Dịch dùng Âm lịch. Nếu nhập Dương lịch, hệ thống tự đổi sang Âm rồi mới dựng quẻ.", note: "Quái: chia 8 lấy số dư (nếu dư 0 thì lấy 8). Động hào: chia 6 lấy số dư (nếu dư 0 thì lấy 6).", random: "Hệ thống chọn ngẫu nhiên — không có công thức." },
    en: { title: "Derivation", inputs: "Inputs", upper: "Upper", lower: "Lower", changing: "Changing line", rem: "rem", arrow: "→", year: "Year branch", month: "Month", day: "Day", hour: "Hour branch", firstNumber: "Number 1", secondNumber: "Number 2", chars: "Total chars", firstHalf: "First half", secondHalf: "Second half", text: "Phrase", solarLabel: "Solar", lunarLabel: "Lunar", lunarConverted: "→ Converted to lunar", leap: "leap", noteTime: "Plum Blossom uses the lunar calendar. Solar input is auto-converted to lunar before computing.", note: "Trigrams: divide by 8, use remainder (rem 0 means 8). Changing line: divide by 6, use remainder (rem 0 means 6).", random: "Cast randomly by the system — no formula." },
    zh: { title: "起卦演算", inputs: "輸入", upper: "上卦", lower: "下卦", changing: "動爻", rem: "餘", arrow: "→", year: "年支", month: "月", day: "日", hour: "時支", firstNumber: "數一", secondNumber: "數二", chars: "字數", firstHalf: "前半", secondHalf: "後半", text: "字句", solarLabel: "陽曆", lunarLabel: "農曆", lunarConverted: "→ 換為農曆", leap: "閏", noteTime: "梅花用農曆。輸入陽曆者先換為農曆,再起卦。", note: "卦:除8取餘(餘0則為8)。動爻:除6取餘(餘0則為6)。", random: "由系統隨機起卦,無公式。" },
  })[lang];

  function divide(sum, divisor, useWhenZero) {
    const quotient = Math.floor(sum / divisor);
    const remainder = sum % divisor;
    return { quotient, remainder, result: remainder === 0 ? useWhenZero : remainder };
  }

  let inputItems = [];
  let upperEq = null, lowerEq = null, changingEq = null;
  let timeBlock = null;

  if (method === "time") {
    const lunar = inputs.lunar || { year: inputs.year, month: inputs.month, day: inputs.day, leap: 0 };
    const solar = inputs.solar;
    const yearBranch = inputs.yearBranch;
    const lunarMonth = lunar.month;
    const lunarDay = lunar.day;
    const hourBranch = inputs.hourBranch;
    timeBlock = { lunar, solar, yearBranch, hourBranch, hour: inputs.hour };
    const upperSum = yearBranch + lunarMonth + lunarDay;
    const lowerSum = upperSum + hourBranch;
    upperEq    = { expr: `${yearBranch} + ${lunarMonth} + ${lunarDay}`,                  sum: upperSum, divisor: 8, ...divide(upperSum, 8, 8) };
    lowerEq    = { expr: `${yearBranch} + ${lunarMonth} + ${lunarDay} + ${hourBranch}`,  sum: lowerSum, divisor: 8, ...divide(lowerSum, 8, 8) };
    changingEq = { expr: `${lowerSum}`,                                                   sum: lowerSum, divisor: 6, simple: true, ...divide(lowerSum, 6, 6) };
  } else if (method === "number") {
    const { firstNumber, secondNumber } = inputs;
    inputItems = [{ k: L.firstNumber, v: firstNumber }, { k: L.secondNumber, v: secondNumber }];
    upperEq    = { expr: `${firstNumber}`,                       sum: firstNumber,                 divisor: 8, simple: true, ...divide(firstNumber, 8, 8) };
    lowerEq    = { expr: `${secondNumber}`,                      sum: secondNumber,                divisor: 8, simple: true, ...divide(secondNumber, 8, 8) };
    changingEq = { expr: `${firstNumber} + ${secondNumber}`,     sum: firstNumber + secondNumber,  divisor: 6,               ...divide(firstNumber + secondNumber, 6, 6) };
  } else if (method === "sound") {
    const { firstHalf, secondHalf } = inputs;
    inputItems = [
      { k: L.text,       v: `"${(inputs.text || "").slice(0, 30)}"` },
      { k: L.chars,      v: inputs.length },
      { k: L.firstHalf,  v: firstHalf },
      { k: L.secondHalf, v: secondHalf },
    ];
    upperEq    = { expr: `${firstHalf}`,                       sum: firstHalf,              divisor: 8, simple: true, ...divide(firstHalf, 8, 8) };
    lowerEq    = { expr: `${secondHalf}`,                      sum: secondHalf,             divisor: 8, simple: true, ...divide(secondHalf, 8, 8) };
    changingEq = { expr: `${firstHalf} + ${secondHalf}`,       sum: firstHalf + secondHalf, divisor: 6,               ...divide(firstHalf + secondHalf, 6, 6) };
  } else if (method === "numberTime") {
    const { number, hour, hourBranch } = inputs;
    const sum = number + hourBranch;
    inputItems = [
      { k: L.firstNumber, v: number },
      { k: L.hour,        v: `${String(hour).padStart(2,"0")}:00 → ${t.branches[hourBranch - 1]} (${hourBranch})` },
    ];
    upperEq    = { expr: `${number}`,                  sum: number, divisor: 8, simple: true, ...divide(number, 8, 8) };
    lowerEq    = { expr: `${number} + ${hourBranch}`,  sum,         divisor: 8,               ...divide(sum, 8, 8) };
    changingEq = { expr: `${number} + ${hourBranch}`,  sum,         divisor: 6,               ...divide(sum, 6, 6) };
  }

  function EqRow({ label, equation, trigram }) {
    if (!equation) return null;
    return (
      <div className="flex items-baseline gap-x-2 gap-y-1 flex-wrap text-sm py-1">
        <span className="text-stone-500 w-24 sm:w-28 flex-shrink-0">{label}</span>
        <span className="font-mono text-stone-700 text-xs sm:text-sm">
          {equation.simple ? equation.expr : `(${equation.expr})`} ÷ {equation.divisor} = {equation.quotient} {L.rem} <span className="text-stone-900 font-semibold">{equation.remainder}</span>
        </span>
        <span className="text-stone-400">{L.arrow}</span>
        <span className="font-mono text-rose-900 font-semibold">{equation.result}</span>
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
          <div>{L.upper}: {upper} = <span className="font-serif" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{TRIGRAMS[upper].zh}</span> {TRIGRAMS[upper].sym}</div>
          <div>{L.lower}: {lower} = <span className="font-serif" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{TRIGRAMS[lower].zh}</span> {TRIGRAMS[lower].sym}</div>
          <div>{L.changing}: {changingLine}</div>
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
              {t.branches[timeBlock.yearBranch-1]} ({timeBlock.yearBranch})
              {" · "}{L.month} {timeBlock.lunar.month}{timeBlock.lunar.leap ? ` (${L.leap})` : ""}
              {" · "}{L.day} {timeBlock.lunar.day}
              {" · "}{t.branches[timeBlock.hourBranch-1]} ({timeBlock.hourBranch})
            </span>
          </div>
          <div className="text-[11px] text-stone-500 italic pt-1">{L.noteTime}</div>
        </div>
      )}

      {!timeBlock && inputItems.length > 0 && (
        <div className="mb-3 pb-3 border-b border-stone-200">
          <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1.5">{L.inputs}</div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {inputItems.map((item, i) => (
              <div key={i}>
                <span className="text-stone-500">{item.k}: </span>
                <span className="text-stone-900 font-mono">{item.v}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <EqRow label={L.upper}    equation={upperEq}    trigram={TRIGRAMS[upper]} />
        <EqRow label={L.lower}    equation={lowerEq}    trigram={TRIGRAMS[lower]} />
        <EqRow label={L.changing} equation={changingEq} />
      </div>

      <div className="text-[11px] text-stone-500 italic mt-3 pt-3 border-t border-stone-200">{L.note}</div>
    </div>
  );
}
