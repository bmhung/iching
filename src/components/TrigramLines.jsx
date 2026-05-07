import { TRIGRAMS } from "../domain/trigrams.js";

export default function TrigramLines({ n, size = "md" }) {
  const W = size === "sm" ? 30 : 48;
  const H_ = size === "sm" ? 4 : 6;
  const G = size === "sm" ? 6 : 9;
  const yinGap = Math.floor(W * 0.2);
  const totalH = 3 * H_ + 2 * G;
  const bin = TRIGRAMS[n].bin;
  const lines = [];
  for (let i = 0; i < 3; i++) {
    const y = totalH - (i + 1) * H_ - i * G;
    if (bin[i] === "1") {
      lines.push(<rect key={i} x={0} y={y} width={W} height={H_} fill="#1c1410" rx={1} />);
    } else {
      lines.push(<rect key={"a" + i} x={0} y={y} width={(W - yinGap) / 2} height={H_} fill="#1c1410" rx={1} />);
      lines.push(<rect key={"b" + i} x={(W + yinGap) / 2} y={y} width={(W - yinGap) / 2} height={H_} fill="#1c1410" rx={1} />);
    }
  }
  return <svg width={W} height={totalH} viewBox={`0 0 ${W} ${totalH}`} style={{ display: "block" }}>{lines}</svg>;
}
