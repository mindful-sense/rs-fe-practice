import { APIWeatherData, APIWeatherDataError } from "@/data/schemas";

interface Weather {
  temperature: number;
  description: string;
}

export async function getWeather(city: string): Promise<Weather | null> {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      const { message } = APIWeatherDataError.parse(await response.json());
      throw new Error(message || "Failed to fetch weather data");
    }

    const weatherData = APIWeatherData.parse(await response.json());

    return {
      temperature: weatherData.main.temp,
      description: weatherData.weather[0].description,
    };
  } catch (error) {
    console.error(`Error while fetching weather data: ${error}.`);
    return null;
  }
}
