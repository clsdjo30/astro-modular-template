import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

const escapeXml = (value: string): string =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const GET: APIRoute = async ({ site }) => {
  const base = site?.toString() ?? "https://example.com/";
  const posts = (await getCollection("posts")).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  const items = posts
    .map((post) => {
      const link = `${base}blog/${post.slug}`;
      return [
        "<item>",
        `<title>${escapeXml(post.data.title)}</title>`,
        `<link>${link}</link>`,
        `<guid>${link}</guid>`,
        `<pubDate>${post.data.pubDate.toUTCString()}</pubDate>`,
        `<description>${escapeXml(post.data.description)}</description>`,
        "</item>"
      ].join("");
    })
    .join("");

  const rss = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    "<rss version=\"2.0\">",
    "<channel>",
    "<title>Blog</title>",
    `<link>${base}</link>`,
    "<description>Blog feed</description>",
    items,
    "</channel>",
    "</rss>"
  ].join("");

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8"
    }
  });
};
