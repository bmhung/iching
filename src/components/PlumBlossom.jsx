export default function PlumBlossom({ size = 24, color = "#9d2933" }) {
  const r = size / 2;
  const petals = [];
  for (let i = 0; i < 5; i++) {
    const angle = (i * 72 - 90) * Math.PI / 180;
    const cx = r + Math.cos(angle) * (r * 0.45);
    const cy = r + Math.sin(angle) * (r * 0.45);
    petals.push(
      <ellipse key={i} cx={cx} cy={cy} rx={r * 0.32} ry={r * 0.4}
        fill={color} opacity="0.85"
        transform={`rotate(${i * 72 + 90} ${cx} ${cy})`} />
    );
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {petals}
      <circle cx={r} cy={r} r={r * 0.18} fill="#fcd34d" />
    </svg>
  );
}
