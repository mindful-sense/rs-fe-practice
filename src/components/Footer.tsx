"use client";
import { useEffect, useState } from "react";
import { WeatherData } from "@/data/schemas";

const CITY = "London";

export function Footer() {
  const [dataTemp, setDataTemp] = useState<number | undefined>();
  const [dataDesc, setDataDesc] = useState<string | undefined>();

  const now = new Date();

  useEffect(() => {
    async function getWeather() {
      try {
        const response = await fetch(`/api/weather?city=${CITY}`);
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const { temperature, description } = WeatherData.parse(
          await response.json(),
        );
        setDataTemp(temperature);
        setDataDesc(description);
      } catch (error) {
        console.error(`Error while fetching weather data: ${error}.`);
      }
    }
    getWeather();
  }, []);

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
        <p>
          {dataTemp?.toFixed(1)}℃, {dataDesc}
        </p>
      </div>
    </footer>
  );
}
