import * as z from "zod";

export const weatherDataSchema = z.object({
  main: z.object({ temp: z.number() }),
  weather: z.tuple([z.object({ description: z.string().trim().min(1) })]),
});

export type WeatherData = z.infer<typeof weatherDataSchema>;
