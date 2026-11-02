import { Check, Minus, Sparkles } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

type Cell = string | boolean;

interface Tier {
  name: string;
  rate: string;
  blurb: string;
  popular?: boolean;
}

const TIERS: Tier[] = [
  { name: "Standard", rate: "Rs. 1,350–1,650", blurb: "Beautiful essentials, flawlessly served." },
  {
    name: "Premium",
    rate: "Rs. 1,850–2,250",
    blurb: "Our most-booked celebration package.",
    popular: true,
  },
  { name: "Royal", rate: "Rs. 2,550–3,200", blurb: "A signature, nothing-spared production." },
];

const ROWS: { feature: string; standard: Cell; premium: Cell; royal: Cell }[] = [
  {
    feature: "Indicative per-guest rate",
    standard: "Rs. 1,350–1,650",
    premium: "Rs. 1,850–2,250",
    royal: "Rs. 2,550–3,200",
  },
  {
    feature: "Buffet menu",
    standard: "4 salan, rice, breads, dessert & drink",
    premium: "Extended 8+ dish menu",
    royal: "Chef-curated signature menu",
  },
  {
    feature: "Live food counters",
    standard: false,
    premium: "BBQ & chat counters",
    royal: "BBQ, continental & dessert bars",
  },
  {
    feature: "Stage & venue decor",
    standard: "Classic floral stage",
    premium: "Premium stage + cake table",
    royal: "Signature themed decor",
  },
  {
    feature: "Entrance & welcome decor",
    standard: "Standard welcome board",
    premium: "Styled entrance & pathway",
    royal: "Grand themed entrance",
  },
  {
    feature: "Sound system & lighting",
    standard: "Professional sound",
    premium: "DJ sound + mood lighting",
    royal: "Designer lighting show",
  },
  { feature: "LED screen", standard: false, premium: true, royal: true },
  { feature: "Dedicated event coordinator", standard: false, premium: true, royal: true },
  { feature: "Bridal room & VIP lounge", standard: false, premium: false, royal: true },
  { feature: "Cold sparks & grand effects", standard: false, premium: false, royal: true },
  { feature: "Valet parking", standard: true, premium: true, royal: "Priority valet" },
];

function CellValue({ value }: { value: Cell }) {
  if (value === true) return <Check className="mx-auto h-5 w-5 text-primary" aria-label="Included" />;
  if (value === false) return <Minus className="mx-auto h-5 w-5 text-foreground/25" aria-label="Not included" />;
  return <span className="text-sm text-foreground/90">{value}</span>;
}

export function Packages() {
  return (
    <section id="packages" className="py-20 sm:py-28" aria-labelledby="packages-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Transparent Packages"
          title="Menu Tiers & What's Included"
          description="Know exactly what each tier includes before you call — so your enquiry starts one step ahead. Final quotes are always confirmed in writing by our event manager."
        />

        {/* Desktop comparison table */}
        <Reveal className="hidden md:block">
          <div className="card-luxury rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">
                  Package tier comparison: Standard, Premium and Royal
                </caption>
                <thead>
                  <tr className="border-b border-border">
                    <th scope="col" className="p-5 text-sm font-medium uppercase tracking-wider text-muted-foreground w-1/4">
                      Features
                    </th>
                    {TIERS.map((tier) => (
                      <th
                        key={tier.name}
                        scope="colgroup"
                        className={cn(
                          "p-5 text-center w-1/4",
                          tier.popular && "bg-primary/[0.06] border-x border-primary/20"
                        )}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <span className="font-display text-xl font-semibold text-foreground">
                            {tier.name}
                          </span>
                          {tier.popular && (
                            <span className="inline-flex items-center gap-1 rounded-full gold-gradient-bg px-2.5 py-0.5 text-[0.65rem] font-bold uppercase tracking-wider text-primary-foreground">
                              <Sparkles className="h-3 w-3" aria-hidden="true" /> Popular
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground font-normal normal-case tracking-normal">
                          {tier.blurb}
                        </p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row, idx) => (
                    <tr
                      key={row.feature}
                      className={cn("border-b border-border/50", idx % 2 === 1 && "bg-white/[0.015]")}
                    >
                      <th scope="row" className="p-4 pl-5 text-sm font-medium text-foreground/90">
                        {row.feature}
                      </th>
                      <td className="p-4 text-center">
                        <CellValue value={row.standard} />
                      </td>
                      <td className="p-4 text-center bg-primary/[0.06] border-x border-primary/10">
                        <CellValue value={row.premium} />
                      </td>
                      <td className="p-4 text-center">
                        <CellValue value={row.royal} />
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td className="p-5" colSpan={4}>
                      <div className="flex justify-center">
                        <a
                          href="#booking"
                          className="inline-flex items-center justify-center rounded-sm gold-gradient-bg px-8 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 hover:scale-[1.02] transition-all"
                        >
                          Get my exact quote
                        </a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        {/* Mobile package cards */}
        <div className="md:hidden grid gap-5">
          {TIERS.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.1}>
              <article
                className={cn(
                  "card-luxury rounded-lg p-5",
                  tier.popular && "border-primary/50 shadow-[0_0_35px_-10px_rgba(201,162,75,0.35)]"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-display text-xl font-semibold text-foreground">{tier.name}</h3>
                  {tier.popular && (
                    <span className="inline-flex items-center gap-1 rounded-full gold-gradient-bg px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider text-primary-foreground">
                      <Sparkles className="h-3 w-3" aria-hidden="true" /> Popular
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-2xl font-semibold gold-text">
                  {tier.rate}
                  <span className="ml-1 text-xs font-normal text-muted-foreground">/ guest</span>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{tier.blurb}</p>
                <ul className="mt-4 space-y-2.5 border-t border-border/60 pt-4">
                  {ROWS.slice(1).map((row) => {
                    const value = row[tier.name.toLowerCase() as "standard" | "premium" | "royal"];
                    return (
                      <li key={row.feature} className="flex items-start justify-between gap-3 text-sm">
                        <span className="text-foreground/80">{row.feature}</span>
                        <span className="shrink-0 text-right max-w-[55%]">
                          {typeof value === "boolean" ? (
                            value ? (
                              <Check className="ml-auto h-5 w-5 text-primary" aria-label="Included" />
                            ) : (
                              <Minus className="ml-auto h-5 w-5 text-foreground/25" aria-label="Not included" />
                            )
                          ) : (
                            <span className="text-foreground/90 text-xs leading-snug">{value}</span>
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <a
                  href="#booking"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-sm gold-gradient-bg px-4 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  Get my exact quote
                </a>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-8 text-center text-xs text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Rates are indicative per-guest ranges for the current season and vary with date, hall,
            menu selection and guest count. Your final quote is confirmed transparently by our event
            manager — no hidden charges.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
