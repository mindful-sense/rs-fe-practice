import { fetchWeatherByCity } from "@/lib/api/weather";
import {
  getTimestamp,
  capitalizeWords,
  formatDate,
  formatTemperature,
} from "@/lib/utils";

const DEFAULT_CITY = "London";
const CONTACT_EMAIL = "arsen.is.working@gmail.com";

export async function Footer() {
  const now = new Date();
  const dateTime = getTimestamp(now, true);
  const formattedDate = formatDate(now);
  const weather = await fetchWeatherByCity(DEFAULT_CITY);

  return (
    <footer className="fixed bottom-5 left-1/2 flex h-13 w-150 -translate-x-1/2 items-center justify-between rounded-2xl bg-white/70 px-4 text-sm/4 shadow-xs shadow-black/3 backdrop-blur-md">
      <div>
        <h3>For Inquiries:</h3>
        <address>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="hover:text-accent focus:text-accent not-italic outline-0 transition-colors duration-300"
          >
            {CONTACT_EMAIL}
          </a>
        </address>
      </div>

      <div className="text-right">
        <p>
          {DEFAULT_CITY}, <time dateTime={dateTime}>{formattedDate}</time>
        </p>
        <p>
          {weather
            ? `${formatTemperature(weather.temperature)}${capitalizeWords(weather.description)}`
            : "Weather data unavailable"}
        </p>
      </div>
    </footer>
  );
}
