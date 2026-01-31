export const delay = async (ms = 500): Promise<void> =>
  await new Promise((resolve) => setTimeout(resolve, ms));

const TIME_MS = {
  YEAR: 365.25 * 24 * 60 * 60 * 1000,
  MONTH: 30.4375 * 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  HOUR: 60 * 60 * 1000,
  MINUTE: 60 * 1000,
};

const UNITS: { unit: Intl.RelativeTimeFormatUnit; ms: number }[] = [
  { unit: "year", ms: TIME_MS.YEAR },
  { unit: "month", ms: TIME_MS.MONTH },
  { unit: "week", ms: TIME_MS.WEEK },
  { unit: "day", ms: TIME_MS.DAY },
  { unit: "hour", ms: TIME_MS.HOUR },
  { unit: "minute", ms: TIME_MS.MINUTE },
];

const FORMATTER = new Intl.RelativeTimeFormat("en");

export const getPassedTime = (dateMs: number): string => {
  const timeDiff = Math.abs(Date.now() - dateMs);

  if (timeDiff < TIME_MS.MINUTE) return "now";

  for (const { unit, ms } of UNITS) {
    if (timeDiff >= ms) {
      const value = Math.trunc(timeDiff / ms);
      return FORMATTER.format(-value, unit);
    }
  }

  return FORMATTER.format(-1, "minute");
};

export const getTimestamp = (date: Date): string =>
  date.toISOString().slice(0, 16).replace("T", " ");

export const getTimestampWithoutTime = (date: Date): string =>
  date.toISOString().split("T")[0];

export const toTitleCase = (text: string): string =>
  text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

export const truncateMiddle = ({
  text,
  startChars = 4,
  endChars = 4,
  maxLength = 12,
}: {
  text: string;
  startChars?: number;
  endChars?: number;
  maxLength?: number;
}): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, startChars)}...${text.slice(-endChars)}`;
};
