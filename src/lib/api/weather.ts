import { getErrorMessage, getEnvVar } from "@/lib/utils";
import { weatherDataSchema, weatherErrorSchema } from "./schema";

interface Weather {
  temperature: number;
  description: string;
}

const API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_UNITS = "metric";
const API_REVALIDATION_SECONDS = 600;

const getApiUrl = (city: string, apiKey: string): string => {
  const params = new URLSearchParams({
    q: city,
    units: API_UNITS,
    appid: apiKey,
  });
  return `${API_BASE_URL}?${String(params)}`;
};

export const fetchWeatherByCity = async (
  city: string,
): Promise<Weather | null> => {
  const trimmedCity = city?.trim();

  try {
    if (!trimmedCity) {
      throw new Error("City name is required");
    }

    const apiKey = getEnvVar("OPENWEATHER_API_KEY");
    const response = await fetch(getApiUrl(trimmedCity, apiKey), {
      next: { revalidate: API_REVALIDATION_SECONDS },
    });
    const data: unknown = await response.json();

    if (!response.ok) {
      const result = weatherErrorSchema.safeParse(data);
      const message = result.success
        ? result.data.message
        : `API: ${response.status}`;

      throw new Error(message);
    }

    const {
      main: { temp: temperature },
      weather: [{ description }],
    } = weatherDataSchema.parse(data);

    return { temperature, description };
  } catch (error) {
    console.error(
      `fetchWeatherByCity: Failed to fetch weather for ${trimmedCity}: ${getErrorMessage(error)}`,
    );
    return null;
  }
};
