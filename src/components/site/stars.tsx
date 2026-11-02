import { Star } from "lucide-react";

interface StarsProps {
  rating: number;
  className?: string;
  starClass?: string;
}

/** Fractional star rating (e.g. 4.3/5) rendered with a gold overlay. */
export function Stars({ rating, className, starClass = "h-4 w-4" }: StarsProps) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  return (
    <span
      className={`relative inline-flex ${className ?? ""}`}
      role="img"
      aria-label={`Rated ${rating} out of 5 stars`}
    >
      <span className="flex gap-0.5 text-foreground/25">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`${starClass} fill-current`} aria-hidden="true" />
        ))}
      </span>
      <span
        className="absolute inset-0 flex gap-0.5 overflow-hidden text-[#e0b64f]"
        style={{ width: `${pct}%` }}
        aria-hidden="true"
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`${starClass} fill-current shrink-0`} />
        ))}
      </span>
    </span>
  );
}
