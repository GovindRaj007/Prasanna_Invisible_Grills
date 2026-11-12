#!/usr/bin/env node
/**
 * Read-only Google Search Console client (uses credentials from scripts/gsc-auth.mjs).
 *
 *   node scripts/gsc.mjs sites
 *   node scripts/gsc.mjs analytics [days=90] [dimensions=query,page] [rowLimit=5000]
 *   node scripts/gsc.mjs sitemaps
 *   node scripts/gsc.mjs inspect <url> [url...]
 *   node scripts/gsc.mjs inspect-sitemap            # inspects every URL in the live sitemap.xml
 *
 * Env: GSC_SITE  – property, e.g. "sc-domain:prasannainvisible.in" or "https://prasannainvisible.in/"
 *                  (auto-detected from `sites` when omitted)
 *      GSC_OUT   – directory for JSON output (default: ./gsc-data, git-ignored)
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const CRED = path.join(os.homedir(), ".gsc-prasanna", "credentials.json");
if (!fs.existsSync(CRED)) {
  console.error(`Not connected. Run: node scripts/gsc-auth.mjs "<path to client_secret.json>"`);
  process.exit(1);
}
const cred = JSON.parse(fs.readFileSync(CRED, "utf8"));
const OUT = process.env.GSC_OUT || path.resolve("gsc-data");
fs.mkdirSync(OUT, { recursive: true });

async function token() {
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: cred.client_id,
      client_secret: cred.client_secret,
      refresh_token: cred.refresh_token,
      grant_type: "refresh_token",
    }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(`Token refresh failed: ${JSON.stringify(j)} – re-run gsc-auth.mjs`);
  return j.access_token;
}

const access = await token();
async function api(method, url, body) {
  const r = await fetch(url, {
    method,
    headers: { Authorization: `Bearer ${access}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(`${r.status} ${url}\n${JSON.stringify(j, null, 2)}`);
  return j;
}

const WM = "https://www.googleapis.com/webmasters/v3";
const save = (name, data) => {
  const f = path.join(OUT, name);
  fs.writeFileSync(f, JSON.stringify(data, null, 2));
  return f;
};

async function resolveSite() {
  if (process.env.GSC_SITE) return process.env.GSC_SITE;
  const { siteEntry = [] } = await api("GET", `${WM}/sites`);
  const match =
    siteEntry.find((s) => s.siteUrl === "sc-domain:prasannainvisible.in") ??
    siteEntry.find((s) => s.siteUrl.includes("prasannainvisible.in"));
  if (!match) throw new Error(`No prasannainvisible.in property found. Available: ${siteEntry.map((s) => s.siteUrl).join(", ")}`);
  return match.siteUrl;
}

const ymd = (d) => d.toISOString().slice(0, 10);
const [cmd = "sites", ...args] = process.argv.slice(2);

if (cmd === "sites") {
  const j = await api("GET", `${WM}/sites`);
  console.log(JSON.stringify(j.siteEntry ?? [], null, 2));
} else if (cmd === "analytics") {
  const site = await resolveSite();
  const days = Number(args[0] ?? 90);
  const dimensions = (args[1] ?? "query,page").split(",");
  const rowLimit = Number(args[2] ?? 5000);
  const end = new Date(Date.now() - 2 * 864e5);
  const start = new Date(end.getTime() - days * 864e5);
  let rows = [];
  for (let startRow = 0; ; startRow += 25000) {
    const j = await api("POST", `${WM}/sites/${encodeURIComponent(site)}/searchAnalytics/query`, {
      startDate: ymd(start),
      endDate: ymd(end),
      dimensions,
      rowLimit: Math.min(rowLimit - rows.length, 25000),
      startRow,
      dataState: "all",
    });
    rows = rows.concat(j.rows ?? []);
    if (!j.rows || j.rows.length < 25000 || rows.length >= rowLimit) break;
  }
  const f = save(`analytics_${dimensions.join("-")}_${days}d.json`, { site, startDate: ymd(start), endDate: ymd(end), dimensions, rows });
  console.log(`${rows.length} rows (${ymd(start)} → ${ymd(end)}) saved to ${f}`);
} else if (cmd === "sitemaps") {
  const site = await resolveSite();
  const j = await api("GET", `${WM}/sites/${encodeURIComponent(site)}/sitemaps`);
  console.log(JSON.stringify(j.sitemap ?? [], null, 2));
} else if (cmd === "inspect" || cmd === "inspect-sitemap") {
  const site = await resolveSite();
  let urls = args;
  if (cmd === "inspect-sitemap") {
    const xml = await (await fetch("https://prasannainvisible.in/sitemap.xml")).text();
    urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).filter((u) => !/\.(jpg|png|webp)$/.test(u));
  }
  const results = [];
  for (const url of urls) {
    try {
      const j = await api("POST", "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
        inspectionUrl: url,
        siteUrl: site,
        languageCode: "en-IN",
      });
      const r = j.inspectionResult?.indexStatusResult ?? {};
      results.push({
        url,
        verdict: r.verdict,
        coverageState: r.coverageState,
        indexingState: r.indexingState,
        robotsTxtState: r.robotsTxtState,
        pageFetchState: r.pageFetchState,
        lastCrawlTime: r.lastCrawlTime,
        crawledAs: r.crawledAs,
        googleCanonical: r.googleCanonical,
        userCanonical: r.userCanonical,
        sitemap: r.sitemap,
        referringUrls: r.referringUrls,
      });
      process.stdout.write(`${r.verdict ?? "?"}\t${r.coverageState ?? ""}\t${url}\n`);
    } catch (e) {
      results.push({ url, error: e.message.split("\n")[0] });
      process.stdout.write(`ERROR\t${e.message.split("\n")[0]}\t${url}\n`);
    }
  }
  const f = save(`inspection_${Date.now()}.json`, results);
  console.log(`\nSaved ${results.length} inspection results to ${f}`);
} else {
  console.error(`Unknown command "${cmd}". See header of scripts/gsc.mjs for usage.`);
  process.exit(1);
}
