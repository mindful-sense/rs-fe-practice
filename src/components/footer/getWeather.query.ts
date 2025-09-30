import * as z from "zod";
import { weatherDataSchema, weatherErrorSchema } from "./schema";
import { Weather } from "./types";
import { buildWeatherUrl } from "./utils";

export async function getWeather(city: string): Promise<Weather | null> {
  if (!city?.trim()) {
    console.error("City name is required");
    return null;
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    console.error("OPENWEATHER_API_KEY is not found");
    return null;
  }

  try {
    const response = await fetch(buildWeatherUrl(city, apiKey));

    if (!response.ok) {
      const { message } = weatherErrorSchema.parse(await response.json());
      throw new Error(message || `HTTP ${response.status}`);
    }

    const data = weatherDataSchema.parse(await response.json());

    return {
      temperature: data.main.temp,
      description: data.weather[0].description,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(z.prettifyError(error));
    } else {
      console.error(`Failed to fetch weather for ${city}: ${error}`);
    }
    return null;
  }
}
