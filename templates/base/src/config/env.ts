export interface Env {
  publicSiteName: string;
  publicFormsActionUrl: string;
}

export const env: Env = {
  publicSiteName: import.meta.env.PUBLIC_SITE_NAME ?? "Site",
  publicFormsActionUrl: import.meta.env.PUBLIC_FORMS_ACTION_URL ?? ""
};
