import { z } from "zod";

export const EVENT_TYPES = [
  "Wedding / Barat",
  "Walima / Reception",
  "Mehndi / Sangeet",
  "Corporate Event",
  "Birthday / Private Party",
  "Other",
] as const;

/** Normalizes a Pakistani mobile number: keeps leading +, digits only. */
export function normalizePhone(raw: string): string {
  return raw.replace(/[\s\-()]/g, "").trim();
}

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const enquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(80, "Name is too long"),
  phone: z
    .string()
    .trim()
    .transform(normalizePhone)
    .refine(
      (v) => /^(?:\+?92|0)3\d{9}$/.test(v),
      "Enter a valid WhatsApp mobile number (e.g. 0300 1234567)"
    ),
  eventType: z.enum(EVENT_TYPES, { message: "Select your event type" }),
  guests: z.coerce
    .number({ message: "Enter an estimated guest count" })
    .int("Guest count must be a whole number")
    .min(20, "Minimum booking is 20 guests")
    .max(2000, "For gatherings above 2,000 please call us directly"),
  eventDate: z
    .string()
    .trim()
    .regex(dateRegex, "Please choose your preferred date")
    .refine((v) => {
      const d = new Date(`${v}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return !Number.isNaN(d.getTime()) && d >= today;
    }, "Preferred date must be today or later"),
  altDate: z
    .union([z.literal(""), z.string().trim().regex(dateRegex, "Use the date picker")])
    .optional(),
  message: z.string().trim().max(1000, "Message is too long (max 1000 characters)").optional(),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type EnquiryData = z.output<typeof enquirySchema>;
