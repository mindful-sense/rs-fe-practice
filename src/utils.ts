export const getTimestamp = ({
  date,
  withTime,
}: {
  date: Date;
  withTime: boolean;
}) =>
  withTime
    ? date.toISOString().slice(0, 16).replace("T", " ")
    : date.toISOString().split("T")[0];

export const getWeekDate = () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

export const capitalizeWords = (text: string): string =>
  text
    ?.trim()
    .split(/\s+/)
    .map((word) => `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`)
    .join(" ") || "";
