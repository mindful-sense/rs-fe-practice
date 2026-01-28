import { getWeather } from "@/lib/server";
import { toTitleCase, getTimestamp } from "@/lib/shared";

const CONFIG = {
  CITY: "London",
  EMAIL: "arsen.is.working@gmail.com",
} as const;

export async function Footer() {
  const weather = await getWeather(CONFIG.CITY);
  const weatherSummary = weather
    ? `${weather.temperature.toFixed(1)}°C, ${toTitleCase(weather.description)}`
    : "Weather data unavailable";

  const date = new Date();
  const dateTime = getTimestamp(date);
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    month: "short",
    day: "2-digit",
  }).format(date);

  return (
    <footer className="fixed bottom-2 left-1/2 z-50 flex h-14 w-lg -translate-x-1/2 items-center justify-between rounded-2xl border border-neutral-50 bg-white/70 px-4 text-sm/tight backdrop-blur-sm">
      <div>
        <h3>For Inquiries:</h3>

        <address>
          <a
            href={`mailto:${CONFIG.EMAIL}`}
            className="hover:text-accent focus:text-accent not-italic transition-colors duration-300 outline-none"
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
