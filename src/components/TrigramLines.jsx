import { TRIGRAMS } from "../domain/trigrams.js";

export default function TrigramLines({ trigramNumber, size = "md" }) {
  const width      = size === "sm" ? 30 : 48;
  const lineHeight = size === "sm" ? 4  : 6;
  const gap        = size === "sm" ? 6  : 9;
  const yinGap = Math.floor(width * 0.2);
  const totalHeight = 3 * lineHeight + 2 * gap;
  const binary = TRIGRAMS[trigramNumber].bin;
  const elements = [];
  for (let i = 0; i < 3; i++) {
    const y = totalHeight - (i + 1) * lineHeight - i * gap;
    if (binary[i] === "1") {
      elements.push(<rect key={i} x={0} y={y} width={width} height={lineHeight} fill="#1c1410" rx={1} />);
    } else {
      elements.push(<rect key={"a" + i} x={0} y={y} width={(width - yinGap) / 2} height={lineHeight} fill="#1c1410" rx={1} />);
      elements.push(<rect key={"b" + i} x={(width + yinGap) / 2} y={y} width={(width - yinGap) / 2} height={lineHeight} fill="#1c1410" rx={1} />);
    }
  }
  return (
    <svg width={width} height={totalHeight} viewBox={`0 0 ${width} ${totalHeight}`} style={{ display: "block" }}>
      {elements}
    </svg>
  );
}
