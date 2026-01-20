import path from "node:path";
import { fileURLToPath } from "node:url";
import knex, { type Knex } from "knex";
import { env } from "../config/env.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const migrationsDir = path.join(__dirname, "migrations");

const client = env.dbClient === "postgres" ? "pg" : "mysql2";

const config: Knex.Config = {
  client,
  connection: {
    host: env.dbHost,
    port: env.dbPort,
    user: env.dbUser,
    password: env.dbPassword,
    database: env.dbName
  },
  migrations: {
    directory: migrationsDir
  }
};

export const db = knex(config);
