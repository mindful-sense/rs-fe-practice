import * as z from "zod";
import { AUTH_CONFIG } from "@/lib/constants";

export const sessionSchema = z.strictObject({
  sessionId: z
    .string()
    .length(AUTH_CONFIG.SESSION_BYTES * 2, "Session ID must be 64 characters")
    .regex(/^[0-9A-Fa-f]+$/, "Invalid HEX format"),
  userId: z.uuid(),
  expiresAt: z.number().refine((timestamp) => timestamp > Date.now(), {
    error: "Expiration date should be set into the future",
  }),
});

export const updateSessionSchema = sessionSchema.omit({ userId: true });

export type Session = z.infer<typeof sessionSchema>;
export type UpdateSession = z.infer<typeof updateSessionSchema>;

export type SessionId = Session["sessionId"];
