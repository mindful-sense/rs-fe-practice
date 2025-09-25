import * as z from "zod";

export const APIWeatherData = z.looseObject({
  main: z.looseObject({ temp: z.number() }),
  weather: z.array(z.looseObject({ description: z.string() })).length(1),
});

export const APIWeatherDataError = z.looseObject({ message: z.string() });

export const WeatherData = z.strictObject({
  temperature: z.number(),
  description: z.string(),
});
