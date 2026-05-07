import { COMMENTARY_VI } from "../domain/commentary_vi.js";

// Renders the "Ý nghĩa" + "Lời bình" block for one hexagram. Vietnamese only;
// returns null in en/zh mode.
export default function HexCommentary({ hex, lang }) {
  if (lang !== "vi") return null;
  const commentary = COMMENTARY_VI[hex.n];
  if (!commentary) return null;

  return (
    <div className="space-y-3">
      <div>
        <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">
          Ý nghĩa giản lược
        </div>
        <div className="text-sm text-stone-800 leading-relaxed">{commentary.meaning}</div>
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">
          Lời bình
        </div>
        <div className="text-sm text-stone-700 leading-relaxed space-y-2">
          {commentary.comment.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
