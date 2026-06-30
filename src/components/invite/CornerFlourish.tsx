type Props = {
  position: "tl" | "tr" | "bl" | "br";
  size?: number;
};

export function CornerFlourish({ position, size = 56 }: Props) {
  const positions: Record<Props["position"], string> = {
    tl: "top-4 left-4",
    tr: "top-4 right-4",
    bl: "bottom-4 left-4",
    br: "bottom-4 right-4",
  };
  const rotations: Record<Props["position"], string> = {
    tl: "rotate(0deg)",
    tr: "rotate(90deg)",
    br: "rotate(180deg)",
    bl: "rotate(270deg)",
  };
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute ${positions[position]}`}
      style={{ width: size, height: size, transform: rotations[position] }}
    >
      <svg viewBox="0 0 56 56" fill="none" stroke="#d4af37" strokeWidth="1">
        <path d="M2 22 L2 2 L22 2" />
        <path d="M2 14 L8 14 M14 2 L14 8" opacity="0.6" />
      </svg>
    </span>
  );
}
