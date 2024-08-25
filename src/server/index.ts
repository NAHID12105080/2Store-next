import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

config({ path: ".env" }); // or .env.local
import * as schema from "@/server/schema";

const sql = neon(process.env.DATABASE_URL!);

export const db = drizzle(sql, { schema, logger: true });
