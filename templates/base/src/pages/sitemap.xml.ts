import type { APIRoute } from "astro";

const routes = ["/", "/about", "/services", "/contact", "/blog"];

export const GET: APIRoute = ({ site }) => {
  const base = site?.toString() ?? "https://example.com/";
  const urls = routes
    .map((route) => `<url><loc>${new globalThis.URL(route, base).toString()}</loc></url>`)
    .join("");

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    "</urlset>"
  ].join("");

  return new globalThis.Response(sitemap, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
};
