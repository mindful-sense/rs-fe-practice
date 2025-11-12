import { createClient } from "@libsql/client";
import { getEnvVar } from "@/lib/utils";

export const client = createClient({ url: getEnvVar("DB_URL") });
