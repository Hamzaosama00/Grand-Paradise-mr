"use client";

import { useCallback, useMemo, useState } from "react";
import {
  CalendarCheck,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Phone,
  ShieldCheck,
  Clock,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SITE, waLink } from "@/lib/site-config";
import { enquirySchema, EVENT_TYPES, type EnquiryInput } from "@/lib/validation";
import { Reveal } from "./reveal";

type FormState = Partial<Record<keyof EnquiryInput, string>>;

const EMPTY: FormState = {
  name: "",
  phone: "",
  eventType: "",
  guests: "",
  eventDate: "",
  altDate: "",
  message: "",
};

const TRUST_POINTS = [
  { icon: Clock, text: "Response within a few hours — 7 days a week" },
  { icon: ShieldCheck, text: "No obligation — dates are only reserved on confirmation" },
  { icon: CalendarCheck, text: "Peak-season dates go fast — check yours today" },
];

export function Booking() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState<string>("");
  // "stored" = enquiry saved to the venue's database. When hosting without a
  // database (e.g. Vercel), the API returns stored:false plus a pre-filled
  // WhatsApp link — the visitor then sends the enquiry with one tap.
  const [stored, setStored] = useState(true);
  const [waFallback, setWaFallback] = useState<string>("");

  /** Set the min date directly on the DOM after mount (avoids SSR/client mismatch). */
  const minDateRef = useCallback((el: HTMLInputElement | null) => {
    if (el) {
      const d = new Date();
      el.min = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    }
  }, []);

  const set = (key: keyof EnquiryInput) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      if (!e[key]) return e;
      const next = { ...e };
      delete next[key];
      return next;
    });
  };

  const whatsappSummary = useMemo(() => {
    return waLink(
      `Hi, I just submitted a date availability request on your website.\n\nName: ${form.name}\nEvent: ${form.eventType}\nGuests: ${form.guests}\nPreferred date: ${form.eventDate}${form.altDate ? `\nAlternate date: ${form.altDate}` : ""}`
    );
  }, [form]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const parsed = enquirySchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      setServerMessage("");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setServerMessage("");

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok && data.ok) {
        setStored(data.stored !== false);
        setWaFallback(typeof data.waLink === "string" ? data.waLink : "");
        setStatus("success");
      } else {
        if (data.errors) setErrors(data.errors);
        setServerMessage(data.message ?? "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setServerMessage(
        "Network error — please check your connection, try again, or reach us directly on WhatsApp."
      );
      setStatus("error");
    }
  }

  const inputClass = (field: string) =>
    cnInput(errors[field]);

  return (
    <section id="booking" className="py-20 sm:py-28 bg-secondary/40" aria-labelledby="booking-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-14 items-start">
          {/* Left: pitch + trust */}
          <Reveal className="lg:col-span-2">
            <p className="eyebrow mb-3">Book Your Date</p>
            <h2 id="booking-heading" className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight font-semibold">
              Check Date <span className="gold-text italic">Availability</span>
            </h2>
            <div className="section-divider mt-5 max-w-[220px]" aria-hidden="true">
              <span className="text-primary text-xs rotate-45 inline-block">◆</span>
            </div>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Tell us about your event and our event manager will personally confirm
              availability, hall options and a transparent written quote — over WhatsApp or a
              quick call, whichever you prefer.
            </p>

            <ul className="mt-7 space-y-4">
              {TRUST_POINTS.map((t) => (
                <li key={t.text} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/35 bg-primary/10">
                    <t.icon className="h-4 w-4 text-primary" aria-hidden="true" />
                  </span>
                  <span className="text-sm sm:text-base text-foreground/85 leading-relaxed pt-1.5">{t.text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                variant="outline"
                className="flex-1 rounded-sm border-primary/40 text-primary hover:bg-primary/10 h-12"
              >
                <a href={SITE.phoneHref}>
                  <Phone className="mr-2 h-4 w-4" aria-hidden="true" /> {SITE.phone}
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="flex-1 rounded-sm border-primary/40 text-primary hover:bg-primary/10 h-12"
              >
                <a href={waLink()} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" /> WhatsApp us
                </a>
              </Button>
            </div>
          </Reveal>

          {/* Right: form card */}
          <Reveal delay={0.15} className="lg:col-span-3">
            <div className="card-luxury rounded-lg p-5 sm:p-8 relative overflow-hidden">
              <div
                className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent"
                aria-hidden="true"
              />

              {status === "success" ? (
                <div className="py-10 text-center" role="status" aria-live="polite">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 border border-primary/50">
                    <CheckCircle2 className="h-8 w-8 text-primary" aria-hidden="true" />
                  </span>
                  {stored ? (
                    <>
                      <h3 className="mt-5 font-display text-2xl sm:text-3xl font-semibold text-foreground">
                        Shukriya, {(form.name ?? "").split(" ")[0] || "friend"}!
                      </h3>
                      <p className="mx-auto mt-3 max-w-md text-muted-foreground leading-relaxed">
                        Thank you! Our event manager has received your request and will follow up
                        via WhatsApp shortly.
                      </p>
                    </>
                  ) : (
                    <>
                      <h3 className="mt-5 font-display text-2xl sm:text-3xl font-semibold text-foreground">
                        Almost there, {(form.name ?? "").split(" ")[0] || "friend"}!
                      </h3>
                      <p className="mx-auto mt-3 max-w-md text-muted-foreground leading-relaxed">
                        Your request is ready — tap the button below to send it to us on
                        WhatsApp and our event manager will confirm your date right away.
                      </p>
                    </>
                  )}

                  <dl className="mx-auto mt-6 max-w-sm rounded-md border border-border bg-black/30 p-4 text-left text-sm space-y-2">
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">Event</dt>
                      <dd className="text-foreground font-medium text-right">{form.eventType}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">Guests</dt>
                      <dd className="text-foreground font-medium">{form.guests}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">Preferred date</dt>
                      <dd className="text-foreground font-medium">{form.eventDate}</dd>
                    </div>
                    {form.altDate ? (
                      <div className="flex justify-between gap-4">
                        <dt className="text-muted-foreground">Alternate date</dt>
                        <dd className="text-foreground font-medium">{form.altDate}</dd>
                      </div>
                    ) : null}
                  </dl>

                  <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3">
                    <Button
                      asChild
                      className="gold-gradient-bg text-primary-foreground font-semibold rounded-sm h-11 px-6"
                    >
                      <a
                        href={stored ? whatsappSummary : waFallback || whatsappSummary}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
                        {stored ? "Continue on WhatsApp" : "Send request on WhatsApp"}
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-sm border-border text-foreground hover:text-primary hover:border-primary h-11 px-6"
                      onClick={() => {
                        setForm(EMPTY);
                        setErrors({});
                        setStored(true);
                        setWaFallback("");
                        setStatus("idle");
                      }}
                    >
                      Submit another enquiry
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground">
                    Request a callback — it takes 30 seconds
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    Fields marked <span className="text-primary">*</span> are required.
                  </p>

                  <div className="mt-6 grid sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="bk-name" className="text-sm text-foreground/90">
                        Full name <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="bk-name"
                        name="name"
                        autoComplete="name"
                        placeholder="e.g. Ali Raza"
                        value={form.name ?? ""}
                        onChange={(e) => set("name")(e.target.value)}
                        aria-invalid={!!errors.name}
                        className={inputClass("name") + " h-11"}
                      />
                      {errors.name && <FieldError msg={errors.name} />}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="bk-phone" className="text-sm text-foreground/90">
                        WhatsApp number <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="bk-phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="0300 1234567"
                        value={form.phone ?? ""}
                        onChange={(e) => set("phone")(e.target.value)}
                        aria-invalid={!!errors.phone}
                        className={inputClass("phone") + " h-11"}
                      />
                      {errors.phone && <FieldError msg={errors.phone} />}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="bk-event" className="text-sm text-foreground/90">
                        Event type <span className="text-primary">*</span>
                      </Label>
                      <Select
                        value={form.eventType ?? ""}
                        onValueChange={(v) => set("eventType")(v)}
                      >
                        <SelectTrigger
                          id="bk-event"
                          aria-invalid={!!errors.eventType}
                          className={inputClass("eventType") + " h-11 w-full"}
                        >
                          <SelectValue placeholder="Select your event" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#101613] border-border">
                          {EVENT_TYPES.map((t) => (
                            <SelectItem key={t} value={t} className="focus:bg-primary/15 focus:text-primary">
                              {t}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.eventType && <FieldError msg={errors.eventType} />}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="bk-guests" className="text-sm text-foreground/90">
                        Estimated guests <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="bk-guests"
                        name="guests"
                        type="number"
                        inputMode="numeric"
                        min={20}
                        max={2000}
                        step={10}
                        placeholder="e.g. 500"
                        value={form.guests ?? ""}
                        onChange={(e) => set("guests")(e.target.value)}
                        aria-invalid={!!errors.guests}
                        className={inputClass("guests") + " h-11"}
                      />
                      {errors.guests && <FieldError msg={errors.guests} />}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="bk-date" className="text-sm text-foreground/90">
                        Preferred date <span className="text-primary">*</span>
                      </Label>
                      <Input
                        id="bk-date"
                        name="eventDate"
                        type="date"
                        ref={minDateRef}
                        value={form.eventDate ?? ""}
                        onChange={(e) => set("eventDate")(e.target.value)}
                        aria-invalid={!!errors.eventDate}
                        className={inputClass("eventDate") + " h-11 [color-scheme:dark]"}
                      />
                      {errors.eventDate && <FieldError msg={errors.eventDate} />}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="bk-alt-date" className="text-sm text-foreground/90">
                        Alternate date{" "}
                        <span className="text-muted-foreground/60">(optional)</span>
                      </Label>
                      <Input
                        id="bk-alt-date"
                        name="altDate"
                        type="date"
                        ref={minDateRef}
                        value={form.altDate ?? ""}
                        onChange={(e) => set("altDate")(e.target.value)}
                        aria-invalid={!!errors.altDate}
                        className={inputClass("altDate") + " h-11 [color-scheme:dark]"}
                      />
                      {errors.altDate && <FieldError msg={errors.altDate} />}
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <Label htmlFor="bk-message" className="text-sm text-foreground/90">
                        Anything we should know?{" "}
                        <span className="text-muted-foreground/60">(optional)</span>
                      </Label>
                      <Textarea
                        id="bk-message"
                        name="message"
                        rows={3}
                        placeholder="e.g. Need Royal Hall for a walima, interested in Premium package with BBQ counter…"
                        value={form.message ?? ""}
                        onChange={(e) => set("message")(e.target.value)}
                        aria-invalid={!!errors.message}
                        className={inputClass("message") + " min-h-[80px] resize-y"}
                      />
                      {errors.message && <FieldError msg={errors.message} />}
                    </div>
                  </div>

                  {status === "error" && serverMessage ? (
                    <p
                      role="alert"
                      className="mt-5 rounded-md border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-red-300"
                    >
                      {serverMessage}
                    </p>
                  ) : null}

                  <Button
                    type="submit"
                    disabled={status === "submitting"}
                    className="mt-6 w-full gold-gradient-bg text-primary-foreground font-semibold tracking-wide rounded-sm h-12 text-base hover:opacity-90 transition-all disabled:opacity-60"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                        Sending your request…
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" aria-hidden="true" />
                        Check My Date Availability
                      </>
                    )}
                  </Button>
                  <p className="mt-3 text-center text-xs text-muted-foreground/80">
                    By submitting, you agree to be contacted about your enquiry. We never share
                    your details.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FieldError({ msg }: { msg: string }) {
  return (
    <p role="alert" className="text-xs text-red-400 mt-1">
      {msg}
    </p>
  );
}

function cnInput(hasError?: string) {
  return hasError
    ? "border-destructive/70 focus-visible:ring-destructive/50 bg-black/30"
    : "border-input bg-black/30 placeholder:text-muted-foreground/50";
}
