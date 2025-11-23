import "server-only";
import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "src", "data", "blog.db");
const db = new Database(dbPath, {
  verbose: console.log,
  fileMustExist: true,
});
db.pragma("journal_mode = WAL");

export { db };
