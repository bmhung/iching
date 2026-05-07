import { hexBinary } from "../domain/trigrams.js";

export default function HexLines({ u, l, change, size = "md" }) {
  const W = size === "sm" ? 36 : size === "lg" ? 80 : 56;
  const H_ = size === "sm" ? 4 : size === "lg" ? 9 : 6;
  const G = size === "sm" ? 7 : size === "lg" ? 14 : 10;
  const yinGap = Math.floor(W * 0.18);
  const totalH = 6 * H_ + 5 * G;
  const bin = hexBinary(u, l);
  const lines = [];
  for (let i = 0; i < 6; i++) {
    const y = totalH - (i + 1) * H_ - i * G;
    const isYang = bin[i] === "1";
    const isChange = change === i + 1;
    if (isYang) {
      lines.push(<rect key={"y" + i} x={0} y={y} width={W} height={H_} fill="#1c1410" rx={1} />);
    } else {
      lines.push(<rect key={"a" + i} x={0} y={y} width={(W - yinGap) / 2} height={H_} fill="#1c1410" rx={1} />);
      lines.push(<rect key={"b" + i} x={(W + yinGap) / 2} y={y} width={(W - yinGap) / 2} height={H_} fill="#1c1410" rx={1} />);
    }
    if (isChange) {
      lines.push(<circle key={"c" + i} cx={W / 2} cy={y + H_ / 2} r={H_ * 0.85} fill="none" stroke="#9d2933" strokeWidth={1.4} />);
    }
  }
  return <svg width={W} height={totalH} viewBox={`0 0 ${W} ${totalH}`} style={{ display: "block" }}>{lines}</svg>;
}
