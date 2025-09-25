import { type NextRequest, NextResponse } from "next/server";
import { APIWeatherData, APIWeatherDataError } from "@/data/schemas";

export async function GET(request: NextRequest) {
  const city = request.nextUrl.searchParams.get("city");
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      const { message } = APIWeatherDataError.parse(await response.json());
      return NextResponse.json(
        { error: message || "Couldn't fetch weather data" },
        { status: response.status },
      );
    }

    const data = APIWeatherData.parse(await response.json());
    return NextResponse.json({
      temperature: data.main.temp,
      description: data.weather[0].description,
    });
  } catch {
    return NextResponse.json(
      { error: "An internal error occured" },
      { status: 500 },
    );
  }
}
