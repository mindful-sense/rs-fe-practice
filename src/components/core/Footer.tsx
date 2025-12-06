import { fetchWeatherByCity } from "@/lib/server";
import { getTimestamp, capitalizeWords } from "@/lib/shared";

const CONFIG = {
  CITY: "London",
  EMAIL: "arsen.is.working@gmail.com",
} as const;

export async function Footer() {
  const weather = await fetchWeatherByCity(CONFIG.CITY);
  const weatherSummary = weather
    ? `${weather.temperature.toFixed(1)}℃, ${capitalizeWords(weather.description)}`
    : "Weather data unavailable";

  const date = new Date();
  const dateTime = getTimestamp(date);
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    month: "short",
    day: "2-digit",
  }).format(date);

  return (
    <footer className="fixed bottom-5 left-1/2 flex h-13 w-150 -translate-x-1/2 items-center justify-between rounded-2xl bg-white/70 px-4 text-sm/4 shadow-xs shadow-black/3 backdrop-blur-md">
      <div>
        <h3>For Inquiries:</h3>
        <address>
          <a
            href={`mailto:${CONFIG.EMAIL}`}
            className="hover:text-accent focus:text-accent not-italic outline-0 transition-colors duration-300"
          >
            {CONFIG.EMAIL}
          </a>
        </address>
      </div>

      <div className="text-right">
        <p>
          {CONFIG.CITY}, <time dateTime={dateTime}>{formattedDate}</time>
        </p>
        <p>{weatherSummary}</p>
      </div>
    </footer>
  );
}
