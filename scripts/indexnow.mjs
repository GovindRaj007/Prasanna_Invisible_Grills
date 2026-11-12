#!/usr/bin/env node
/**
 * Notify Bing / Yandex / Seznam / Naver (IndexNow) about every URL in the sitemap.
 * Bing powers ChatGPT search and Copilot, so fast Bing indexing matters for AI answers.
 *
 * Usage (after a deploy is live):  npm run indexnow
 * The key file public/e51447b081a6763f30a26a8de761a35a.txt must be reachable at the site root.
 */
const SITE = "https://prasannainvisible.in";
const KEY = "e51447b081a6763f30a26a8de761a35a";

const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).filter((u) => u.startsWith(SITE + "/") || u === SITE + "/");

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: submitted ${urlList.length} URLs -> HTTP ${res.status}`);
if (!res.ok && res.status !== 202) process.exit(1);
