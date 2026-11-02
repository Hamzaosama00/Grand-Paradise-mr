import { Reveal } from "./reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}

export function SectionHeading({ eyebrow, title, description, align = "center" }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal className={`max-w-3xl ${centered ? "mx-auto text-center" : ""} mb-10 sm:mb-14`}>
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight font-semibold text-foreground">
        {title}
      </h2>
      <div
        className={`section-divider mt-5 ${centered ? "max-w-xs mx-auto" : "max-w-[220px]"}`}
        aria-hidden="true"
      >
        <span className="text-primary text-xs rotate-45 inline-block">◆</span>
      </div>
      {description ? (
        <p className="mt-5 text-muted-foreground text-base sm:text-lg leading-relaxed">{description}</p>
      ) : null}
    </Reveal>
  );
}
