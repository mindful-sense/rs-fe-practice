import * as z from "zod";

export const createRangeStringSchema = (
  min: number,
  max: number,
  fieldName: string,
): z.ZodString =>
  z
    .string()
    .trim()
    .min(min, {
      error: `${fieldName} must be at least ${min} characters long`,
    })
    .max(max, {
      error: `${fieldName} must be at most ${max} characters long`,
    });

export const createNonEmptyStringSchema = (fieldName: string): z.ZodString =>
  z
    .string()
    .trim()
    .nonempty({ error: `Fill in your ${fieldName}` });
