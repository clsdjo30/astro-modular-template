export interface Env {
  publicSiteName: string;
}

export const env: Env = {
  publicSiteName: import.meta.env.PUBLIC_SITE_NAME ?? "Site"
};
