import { fetchWeatherByCity } from "@/lib/server";
import { getTimestamp, capitalizeWords } from "@/lib/shared";

const DEFAULT_CITY = "London";
const CONTACT_EMAIL = "arsen.is.working@gmail.com";
const DATE_FORMAT_OPTIONS = {
  month: "short",
  day: "2-digit",
} as const satisfies Intl.DateTimeFormatOptions;

const formatDate = ({
  date,
  options = DATE_FORMAT_OPTIONS,
  locale = "en-GB",
}: {
  date: Date;
  options?: Intl.DateTimeFormatOptions;
  locale?: Intl.LocalesArgument;
}): string => new Intl.DateTimeFormat(locale, options).format(date);

const formatTemperature = (celsius: number): string => `${celsius.toFixed(1)}℃`;

const getWeatherSummary = async (city: string): Promise<string> => {
  const weather = await fetchWeatherByCity(city);

  if (!weather) {
    return "Weather data unavailable";
  }

  return `${formatTemperature(weather.temperature)}${capitalizeWords(weather.description)}`;
};

export async function Footer() {
  const date = new Date();
  const dateTime = getTimestamp(date);
  const formattedDate = formatDate({ date });
  const weatherSummary = await getWeatherSummary(DEFAULT_CITY);

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
        <p>{weatherSummary}</p>
      </div>
    </footer>
  );
}
