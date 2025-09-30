import * as z from "zod";

export const weatherDataSchema = z.object({
  main: z.object({ temp: z.number() }),
  weather: z.tuple([z.object({ description: z.string() })]),
});

export const weatherErrorSchema = z.object({ message: z.string() });
