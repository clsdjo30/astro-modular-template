import { env } from "./env";

export interface AppConfig {
  siteName: string;
}

export const appConfig: AppConfig = {
  siteName: env.publicSiteName
};
