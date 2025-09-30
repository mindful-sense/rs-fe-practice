import { CITY, DATE_FORMAT_OPTIONS } from "./constants";
import { getWeather } from "./getWeather.query";
import { capitalizeWords, formatTemperature } from "./utils";

export async function Footer() {
  const now = new Date();
  const weather = await getWeather(CITY);

  const dateTime = now.toISOString().split("T")[0];
  const formattedDate = new Intl.DateTimeFormat(
    "en-GB",
    DATE_FORMAT_OPTIONS,
  ).format(now);

  return (
    <footer className="fixed bottom-5 left-1/2 flex h-14 w-150 -translate-x-1/2 items-center justify-between rounded-2xl bg-white/70 px-5 text-sm/4 font-medium backdrop-blur-md">
      <div>
        <h3>For Inquiries:</h3>
        <address>
          <a
            href="mailto:arsen.is.working@gmail.com"
            className="hover:text-accent not-italic transition-colors duration-500"
          >
            arsen.is.working@gmail.com
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
          <p>Weather data unavalaible</p>
        )}
      </div>
    </footer>
  );
}
