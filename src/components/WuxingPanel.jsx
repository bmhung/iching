import { yearBranchOf, solarToLunar } from "../domain/lunar.js";
import {
  BRANCH_ELEMENT,
  monthBranchFromLunarMonth,
  seasonElement,
  seasonalEnergy,
  dayBranchFromSolar,
} from "../domain/wuxing.js";

// Hour 0..23 → earthly branch index 1..12 (same map used by castTime).
const HOUR_TO_BRANCH = [1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,1];

// Build the four-pillar context for the reading. For time-method casts the
// stored time is authoritative; for other methods we fall back to the moment
// the panel is rendered.
function buildContext(reading) {
  if (reading.method === "time") {
    const { yearBranch, lunar, solar, hour, hourBranch } = reading.inputs;
    return {
      basedOnCastTime: true,
      yearBranch,
      lunarMonth: lunar.month,
      lunarDay: lunar.day,
      solar: solar || null,
      hour,
      hourBranch,
    };
  }
  const now = new Date();
  const lunar = solarToLunar(now.getDate(), now.getMonth() + 1, now.getFullYear(), 7);
  return {
    basedOnCastTime: false,
    yearBranch: yearBranchOf(lunar.year),
    lunarMonth: lunar.month,
    lunarDay: lunar.day,
    solar: { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() },
    hour: now.getHours(),
    hourBranch: HOUR_TO_BRANCH[now.getHours()],
  };
}

function stateColor(state) {
  switch (state) {
    case "wang":  return "bg-emerald-50  border-emerald-700 text-emerald-900";
    case "xiang": return "bg-emerald-50  border-emerald-500 text-emerald-800";
    case "xiu":   return "bg-stone-100   border-stone-500   text-stone-700";
    case "qiu":   return "bg-amber-50    border-amber-700   text-amber-900";
    case "si":    return "bg-rose-50     border-rose-700    text-rose-900";
    default:      return "bg-stone-100   border-stone-500   text-stone-700";
  }
}

function PillarBox({ label, branchName, branchNumber, element, sub, t }) {
  return (
    <div className="bg-stone-50 border border-stone-300 rounded p-2.5">
      <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">{label}</div>
      <div className="font-serif text-stone-900 leading-tight" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>
        {branchName}{branchNumber ? <span className="text-stone-400 text-xs ml-1">({branchNumber})</span> : null}
      </div>
      {sub && <div className="text-[10px] text-stone-500 mt-0.5">{sub}</div>}
      {element && (
        <div className="text-[11px] text-rose-900 mt-1">{t.elements[element]}</div>
      )}
    </div>
  );
}

function ElementStateBox({ label, element, state, t }) {
  const stateInfo = state ? t.wuxing.states[state] : null;
  const color = stateColor(state);
  return (
    <div className={`border rounded p-3 ${color}`}>
      <div className="text-[10px] uppercase tracking-widest mb-1 opacity-70">{label}</div>
      <div className="flex items-baseline gap-2 mb-1.5">
        <span className="font-medium">{t.elements[element]}</span>
        {stateInfo && (
          <span className="text-sm">
            {stateInfo.name} <span className="font-serif" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{stateInfo.zh}</span>
          </span>
        )}
      </div>
      {stateInfo && <div className="text-xs leading-relaxed opacity-90">{stateInfo.desc}</div>}
    </div>
  );
}

export default function WuxingPanel({ tiTrigram, yongTrigram, reading, t }) {
  const ctx = buildContext(reading);
  const monthBranch = monthBranchFromLunarMonth(ctx.lunarMonth);
  const yearElement  = BRANCH_ELEMENT[ctx.yearBranch];
  const monthElement = BRANCH_ELEMENT[monthBranch];
  const hourElement  = BRANCH_ELEMENT[ctx.hourBranch];
  const dayBranch    = ctx.solar ? dayBranchFromSolar(ctx.solar.day, ctx.solar.month, ctx.solar.year) : null;
  const dayElement   = dayBranch ? BRANCH_ELEMENT[dayBranch] : null;
  const season       = seasonElement(ctx.lunarMonth);

  const tiState   = seasonalEnergy(tiTrigram.el,   season);
  const yongState = seasonalEnergy(yongTrigram.el, season);
  const w = t.wuxing;

  return (
    <div className="bg-white border border-stone-300 rounded p-4 sm:p-5 mb-4">
      <h3 className="text-base font-serif text-stone-900 mb-1">{w.title} · 五行旺衰</h3>
      <div className="text-xs text-stone-600 mb-4 italic">
        {ctx.basedOnCastTime ? w.pillarsBasedOnCast : w.pillarsBasedOnNow}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        <PillarBox
          label={w.pillars.year}
          branchName={t.branches[ctx.yearBranch - 1]}
          branchNumber={ctx.yearBranch}
          element={yearElement}
          t={t}
        />
        <PillarBox
          label={w.pillars.month}
          branchName={t.branches[monthBranch - 1]}
          branchNumber={monthBranch}
          element={monthElement}
          sub={`${w.pillars.month} ${ctx.lunarMonth}`}
          t={t}
        />
        {dayBranch ? (
          <PillarBox
            label={w.pillars.day}
            branchName={t.branches[dayBranch - 1]}
            branchNumber={dayBranch}
            element={dayElement}
            sub={ctx.solar ? `${ctx.solar.year}-${String(ctx.solar.month).padStart(2,"0")}-${String(ctx.solar.day).padStart(2,"0")}` : null}
            t={t}
          />
        ) : (
          <PillarBox
            label={w.pillars.day}
            branchName={w.noDayBranch}
            element={null}
            sub={`${w.pillars.day} ${ctx.lunarDay}`}
            t={t}
          />
        )}
        <PillarBox
          label={w.pillars.hour}
          branchName={t.branches[ctx.hourBranch - 1]}
          branchNumber={ctx.hourBranch}
          element={hourElement}
          sub={`${String(ctx.hour).padStart(2,"0")}:00`}
          t={t}
        />
      </div>

      <div className="text-xs text-stone-600 mb-4">
        {w.season}: <span className="text-rose-900 font-medium">{t.elements[season]}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <ElementStateBox
          label={`${t.result.ti} · 體 — ${w.tiSelf}`}
          element={tiTrigram.el}
          state={tiState}
          t={t}
        />
        <ElementStateBox
          label={`${t.result.yong} · 用 — ${w.yongSelf}`}
          element={yongTrigram.el}
          state={yongState}
          t={t}
        />
      </div>
    </div>
  );
}
