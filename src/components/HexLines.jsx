import { hexBinary } from "../domain/trigrams.js";

export default function HexLines({ upper, lower, changingLine, size = "md" }) {
  const width      = size === "sm" ? 36 : size === "lg" ? 80 : 56;
  const lineHeight = size === "sm" ? 4  : size === "lg" ? 9  : 6;
  const gap        = size === "sm" ? 7  : size === "lg" ? 14 : 10;
  const yinGap = Math.floor(width * 0.18);
  const totalHeight = 6 * lineHeight + 5 * gap;
  const binary = hexBinary(upper, lower);
  const elements = [];
  for (let i = 0; i < 6; i++) {
    const y = totalHeight - (i + 1) * lineHeight - i * gap;
    const isYang = binary[i] === "1";
    const isChanging = changingLine === i + 1;
    if (isYang) {
      elements.push(<rect key={"y" + i} x={0} y={y} width={width} height={lineHeight} fill="#1c1410" rx={1} />);
    } else {
      elements.push(<rect key={"a" + i} x={0} y={y} width={(width - yinGap) / 2} height={lineHeight} fill="#1c1410" rx={1} />);
      elements.push(<rect key={"b" + i} x={(width + yinGap) / 2} y={y} width={(width - yinGap) / 2} height={lineHeight} fill="#1c1410" rx={1} />);
    }
    if (isChanging) {
      elements.push(<circle key={"c" + i} cx={width / 2} cy={y + lineHeight / 2} r={lineHeight * 0.85} fill="none" stroke="#9d2933" strokeWidth={1.4} />);
    }
  }
  return (
    <svg width={width} height={totalHeight} viewBox={`0 0 ${width} ${totalHeight}`} style={{ display: "block" }}>
      {elements}
    </svg>
  );
}
