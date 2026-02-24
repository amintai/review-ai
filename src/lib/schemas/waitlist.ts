import * as z from 'zod';

/**
 * Validation schema for waitlist signup
 * Used by both client-side form validation and server-side API validation
 */
export const waitlistSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email is too long" }),
  source: z.string().max(100).optional(),
});

/**
 * TypeScript type inferred from the validation schema
 */
export type WaitlistFormData = z.infer<typeof waitlistSchema>;

/**
 * Database type for waitlist entries
 */
export interface WaitlistEntry {
  id: string;
  email: string;
  created_at: string;
  notified: boolean;
  source: string | null;
}
