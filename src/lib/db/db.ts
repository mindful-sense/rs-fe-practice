import { createClient } from "@libsql/client";

if (!process.env.DB_URL) {
  throw new Error("DB_URL variable is not set");
}

export const client = createClient({ url: process.env.DB_URL });
