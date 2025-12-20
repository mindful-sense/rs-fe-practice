import * as z from "zod";
import { SqliteError } from "better-sqlite3";

export const getErrorMessage = (error: unknown): string => {
  if (
    error instanceof SqliteError &&
    error.code === "SQLITE_CONSTRAINT_UNIQUE"
  ) {
    return "Username is already taken";
  }
  if (error instanceof z.ZodError) return z.prettifyError(error);
  if (error instanceof Error) return error.message;
  return String(error);
};
