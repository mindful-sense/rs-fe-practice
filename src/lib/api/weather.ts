import "server-only";
import { ENV } from "../env";
import { getErrorMessage } from "../utils.server";
import { type WeatherData, weatherDataSchema } from "./schema";

const API = {
  ENDPOINT: "https://api.openweathermap.org/data/2.5/weather",
  UNITS: "metric",
  STALE_TIME: 600,
} as const;

const fetchWeatherByCity = async (city: string): Promise<WeatherData> => {
  const url = new URL(API.ENDPOINT);
  url.search = new URLSearchParams({
    q: city,
    units: API.UNITS,
    appid: ENV.OPENWEATHER,
  }).toString();

  const response = await fetch(url.toString(), {
    next: { revalidate: API.STALE_TIME },
  });

  if (!response.ok) {
    const statusText = response.statusText || "Unknown Error";
    throw new Error(`Weather API Error ${response.status}: ${statusText}`);
  }

  return weatherDataSchema.parse(await response.json());
};

export const getWeather = async (
  city: string,
): Promise<{
  temperature: number;
  description: string;
} | null> => {
  try {
    const trimmedCity = city?.trim();
    if (!trimmedCity) throw new Error("City name is required");

    const {
      main: { temp: temperature },
      weather: [{ description }],
    } = await fetchWeatherByCity(trimmedCity);

    return { temperature, description };
  } catch (error) {
    console.error(`Failed to fetch weather ${city}: ${getErrorMessage(error)}`);
    return null;
  }
};
