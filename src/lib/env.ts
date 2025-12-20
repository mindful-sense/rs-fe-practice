import "server-only";
import * as z from "zod";

const envSchema = z
  .object({
    OPENWEATHER: z.string().min(1, { error: "OPENWEATHER" }),
  })
  .readonly();

export const ENV = envSchema.parse(process.env);
