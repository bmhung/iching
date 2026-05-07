import HexLines from "./HexLines.jsx";
import { hexName } from "../domain/trigrams.js";

export default function HexCard({ hex, lang, label, labelZh, desc, changingLine }) {
  return (
    <div className="bg-white border border-stone-300 rounded p-3 sm:p-4 flex flex-col items-center text-center h-full">
      <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-0.5">{label}</div>
      <div className="text-xs font-serif text-rose-900 mb-3" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{labelZh}</div>
      <div className="my-1"><HexLines upper={hex.upper} lower={hex.lower} changingLine={changingLine} size="md" /></div>
      <div className="mt-3 text-xl sm:text-2xl font-serif text-stone-900" style={{fontFamily:'"Songti SC","STSong","SimSun",serif'}}>{hex.zh}</div>
      <div className="text-xs sm:text-sm text-stone-700 mt-0.5 leading-tight">{hexName(hex, lang)}</div>
      <div className="text-[10px] text-stone-400 mt-1">#{hex.n}</div>
      <div className="text-[10px] text-stone-500 italic mt-2 leading-snug">{desc}</div>
    </div>
  );
}
