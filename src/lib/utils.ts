import * as z from "zod";

export const getErrorMessage = (error: unknown): string =>
  error instanceof z.ZodError
    ? z.prettifyError(error)
    : error instanceof Error
      ? error.message
      : String(error);

export const getEnvVar = (name: string): string => {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} environment variable is not set`);
  }

  return value;
};

export const getTimestamp = (date: Date, withTime = false): string =>
  withTime
    ? date.toISOString().slice(0, 16).replace("T", " ")
    : date.toISOString().split("T")[0];

export const capitalizeWords = (text: string): string =>
  text
    ?.trim()
    .split(/\s+/)
    .map(
      (word) => `${word[0]?.toUpperCase() ?? ""}${word.slice(1).toLowerCase()}`,
    )
    .join(" ") ?? "";

const DATE_FORMAT_OPTIONS = {
  month: "short",
  day: "2-digit",
} as const satisfies Intl.DateTimeFormatOptions;

export const formatDate = (
  date: Date,
  options: Intl.DateTimeFormatOptions = DATE_FORMAT_OPTIONS,
  locale: Intl.LocalesArgument = "en-GB",
): string => new Intl.DateTimeFormat(locale, options).format(date);

export const formatTemperature = (celsius: number): string =>
  `${celsius.toFixed(1)}℃`;
