export const capitalizeWords = (text: string): string =>
  text.replace(/\b\w/g, (char) => char.toUpperCase());

export const delay = async (ms = 500): Promise<void> =>
  await new Promise((resolve) => setTimeout(resolve, ms));

export const getTimestamp = (date: Date): string =>
  date.toISOString().slice(0, 16).replace("T", " ");

export const getTimestampWithoutTime = (date: Date): string =>
  date.toISOString().split("T")[0];

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
