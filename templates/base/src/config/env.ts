export interface Env {
  publicSiteName: string;
  publicFormsActionUrl: string;
  publicApiBaseUrl: string;
}

export const env: Env = {
  publicSiteName: import.meta.env.PUBLIC_SITE_NAME ?? "Site",
  publicFormsActionUrl: import.meta.env.PUBLIC_FORMS_ACTION_URL ?? "",
  publicApiBaseUrl: import.meta.env.PUBLIC_API_BASE_URL ?? "http://localhost:4000"
};
