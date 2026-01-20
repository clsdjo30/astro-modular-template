import { env } from "./env";

export interface AppConfig {
  siteName: string;
  modules: {
    forms: {
      actionUrl: string;
    };
  };
}

export const appConfig: AppConfig = {
  siteName: env.publicSiteName,
  modules: {
    forms: {
      actionUrl: env.publicFormsActionUrl
    }
  }
};
