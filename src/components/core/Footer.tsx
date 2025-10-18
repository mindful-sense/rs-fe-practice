import { fetchWeatherByCity } from "@/lib/api/weather";
import { capitalizeWords, getTimestamp } from "@/utils";

const CITY = "London";
const CONTACT_EMAIL = "arsen.is.working@gmail.com";
const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  month: "short",
  day: "2-digit",
};
const REGION = "en-GB";

const formatDate = (date: Date): string =>
  new Intl.DateTimeFormat(REGION, DATE_FORMAT_OPTIONS).format(date);

const formatTemperature = (celsius: number): string => `${celsius.toFixed(1)}℃`;

export async function Footer() {
  const now = new Date();
  const dateTime = getTimestamp({ date: now, withTime: true });
  const formattedDate = formatDate(now);
  const weather = await fetchWeatherByCity(CITY);

  return (
    <footer className="fixed bottom-5 left-1/2 flex h-14 w-150 -translate-x-1/2 items-center justify-between rounded-2xl bg-white/70 px-5 text-sm/4 font-medium backdrop-blur-md">
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
          {CITY}, <time dateTime={dateTime}>{formattedDate}</time>
        </p>
        {weather ? (
          <p>
            {formatTemperature(weather.temperature)},{" "}
            {capitalizeWords(weather.description)}
          </p>
        ) : (
          <p>Weather data unavailable</p>
        )}
      </div>
    </footer>
  );
}
