export interface Env {
  port: number;
  apiAllowedOrigin: string;
  dbClient: "mariadb" | "postgres";
  dbHost: string;
  dbPort: number;
  dbUser: string;
  dbPassword: string;
  dbName: string;
  sessionSecret: string;
  sessionName: string;
  isProd: boolean;
}

function parseNumber(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? fallback : parsed;
}

function parseDbClient(value: string | undefined): "mariadb" | "postgres" {
  if (value === "postgres") return "postgres";
  return "mariadb";
}

const dbClient = parseDbClient(process.env.DB_CLIENT);
const dbPort = parseNumber(
  process.env.DB_PORT,
  dbClient === "postgres" ? 5432 : 3306
);

export const env: Env = {
  port: parseNumber(process.env.PORT, 4000),
  apiAllowedOrigin: process.env.API_ALLOWED_ORIGIN ?? "http://localhost:4321",
  dbClient,
  dbHost: process.env.DB_HOST ?? "127.0.0.1",
  dbPort,
  dbUser: process.env.DB_USER ?? "root",
  dbPassword: process.env.DB_PASSWORD ?? "",
  dbName: process.env.DB_NAME ?? "astro_template",
  sessionSecret: process.env.SESSION_SECRET ?? "change-me",
  sessionName: process.env.SESSION_NAME ?? "astro_session",
  isProd: process.env.NODE_ENV === "production"
};
