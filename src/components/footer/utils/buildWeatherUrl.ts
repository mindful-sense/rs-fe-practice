export function buildWeatherUrl(city: string, apiKey: string): string {
  const params = new URLSearchParams({
    q: city,
    units: "metric",
    appid: apiKey,
  });
  return `https://api.openweathermap.org/data/2.5/weather?${params}`;
}
