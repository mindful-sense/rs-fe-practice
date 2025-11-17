import "server-only";
import { createClient } from "@libsql/client";
import { getEnvVar } from "@/lib/server";

export const client = createClient({ url: getEnvVar("DB_URL") });
