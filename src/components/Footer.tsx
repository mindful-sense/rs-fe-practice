import { getWeather } from "@/data/queries";

const CITY = "London";

export async function Footer() {
  const now = new Date();
  const weather = await getWeather(CITY);

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
          <span>{CITY}, </span>
          <time dateTime={now.toISOString().slice(0, 10)}>
            {new Intl.DateTimeFormat("en-GB", {
              month: "short",
              day: "2-digit",
            }).format(now)}
          </time>
        </p>
        {weather ? (
          <p>
            {weather.temperature.toFixed(1)}℃, {weather.description}
          </p>
        ) : (
          <p>Weather data unavalaible</p>
        )}
      </div>
    </footer>
  );
}
