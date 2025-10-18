import * as z from "zod";

export const getErrorMessage = (error: unknown): string =>
  error instanceof z.ZodError
    ? z.prettifyError(error)
    : error instanceof Error
      ? error.message
      : String(error);

export const createStringSchema = (
  min: number,
  max: number,
  fieldName: string,
) =>
  z
    .string()
    .trim()
    .min(min, {
      message: `${fieldName} must be at least ${min} characters long`,
    })
    .max(max, {
      message: `${fieldName} must be at most ${max} characters long`,
    });
