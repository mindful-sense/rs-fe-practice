import * as z from "zod";

export const getErrorMessage = (error: unknown): string =>
  error instanceof z.ZodError
    ? z.prettifyError(error)
    : error instanceof Error
      ? error.message
      : String(error);

export const getTimestamp = ({
  date,
  withTime,
}: {
  date: Date;
  withTime: boolean;
}): string =>
  withTime
    ? date.toISOString().slice(0, 16).replace("T", " ")
    : date.toISOString().split("T")[0];
