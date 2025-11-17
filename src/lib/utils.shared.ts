import * as z from "zod";

export const getDelay = async (ms = 1000): Promise<void> =>
  await new Promise((resolve) => setTimeout(resolve, ms));

export const getErrorMessage = (error: unknown): string =>
  error instanceof z.ZodError
    ? z.prettifyError(error)
    : error instanceof Error
      ? error.message
      : String(error);

export const getTimestamp = (date: Date): string =>
  date.toISOString().slice(0, 16).replace("T", " ");

export const getTimestampWithoutTime = (date: Date): string =>
  date.toISOString().split("T")[0];

export const capitalizeWords = (text: string): string =>
  text
    ?.trim()
    .split(/\s+/)
    .map(
      (word) => `${word[0]?.toUpperCase() ?? ""}${word.slice(1).toLowerCase()}`,
    )
    .join(" ") ?? "";
