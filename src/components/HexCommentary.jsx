import { COMMENTARY_VI } from "../domain/commentary_vi.js";

// Renders the "Ý nghĩa" + "Lời bình" block for one hexagram. Vietnamese only;
// returns null in en/zh mode.
export default function HexCommentary({ hex, lang }) {
  if (lang !== "vi") return null;
  const c = COMMENTARY_VI[hex.n];
  if (!c) return null;

  return (
    <div className="space-y-3">
      <div>
        <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">
          Ý nghĩa giản lược
        </div>
        <div className="text-sm text-stone-800 leading-relaxed">{c.meaning}</div>
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">
          Lời bình
        </div>
        <div className="text-sm text-stone-700 leading-relaxed space-y-2">
          {c.comment.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
