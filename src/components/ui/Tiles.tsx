type Tile = { top?: number | string; left?: number | string; right?: number | string; bottom?: number | string; delay: number };

/**
 * Soft brick-red wash from one corner plus translucent squares that pulse.
 * Purely decorative; sits behind section content.
 */
export function Tiles({
  corner = "top-left",
  tiles,
  dark = false,
  size = 112,
  strength = 0.12,
}: {
  corner?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  tiles: Tile[];
  dark?: boolean;
  size?: number;
  strength?: number;
}) {
  const at = { "top-left": "0% 0%", "top-right": "100% 0%", "bottom-left": "0% 100%", "bottom-right": "100% 100%" }[corner];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse 45% 55% at ${at}, rgba(194,46,34,${strength}) 0%, rgba(194,46,34,0) 100%)` }}
      />
      {tiles.map((t, i) => (
        <div
          key={i}
          className={`absolute origin-top-left animate-pulse-tile max-md:scale-[.6] max-md:[animation-duration:10s] ${i > 0 ? "max-md:hidden" : ""}`}
          style={{
            top: t.top,
            left: t.left,
            right: t.right,
            bottom: t.bottom,
            width: size,
            height: size,
            background: dark ? "rgba(194,46,34,.32)" : "rgba(194,46,34,.13)",
            animationDelay: `${t.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
