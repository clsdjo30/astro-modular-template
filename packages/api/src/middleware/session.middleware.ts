import session from "express-session";
import type { RequestHandler } from "express";
import MySQLSessionFactory from "express-mysql-session";
import { env } from "../config/env.js";

const MySQLStore = MySQLSessionFactory(session);

const baseOptions: session.SessionOptions = {
  name: env.sessionName,
  secret: env.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: env.isProd
  }
};

export function buildSessionMiddleware(): RequestHandler {
  if (!env.isProd) {
    return session({
      ...baseOptions,
      store: new session.MemoryStore()
    });
  }

  const store = new MySQLStore({
    host: env.dbHost,
    port: env.dbPort,
    user: env.dbUser,
    password: env.dbPassword,
    database: env.dbName,
    createDatabaseTable: true
  });

  return session({
    ...baseOptions,
    store
  });
}
