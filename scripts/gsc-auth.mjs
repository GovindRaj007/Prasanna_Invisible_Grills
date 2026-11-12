#!/usr/bin/env node
/**
 * One-time Google Search Console sign-in (OAuth 2.0, read-only scope).
 *
 * Usage:
 *   node scripts/gsc-auth.mjs "C:/path/to/client_secret_XXXX.json"
 *
 * - Uses the OAuth client JSON downloaded from Google Cloud Console
 *   (type "Desktop app" recommended; "Web application" also works if
 *   http://localhost:53682 is added as an authorised redirect URI).
 * - Opens Google sign-in in your browser, receives the code on localhost,
 *   and stores a refresh token in  %USERPROFILE%/.gsc-prasanna/credentials.json
 *   (outside the repo – never committed).
 * - Scope: https://www.googleapis.com/auth/webmasters.readonly (read-only).
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";
import crypto from "node:crypto";
import { exec } from "node:child_process";

const PORT = 53682;
const REDIRECT_URI = `http://localhost:${PORT}`;
const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";
const STORE_DIR = path.join(os.homedir(), ".gsc-prasanna");
const STORE_FILE = path.join(STORE_DIR, "credentials.json");

const secretPath = process.argv[2];
if (!secretPath || !fs.existsSync(secretPath)) {
  console.error('Usage: node scripts/gsc-auth.mjs "C:/path/to/client_secret.json"');
  console.error(secretPath ? `File not found: ${secretPath}` : "Missing path to the client secret JSON.");
  process.exit(1);
}

const raw = JSON.parse(fs.readFileSync(secretPath, "utf8"));
const cfg = raw.installed ?? raw.web;
if (!cfg?.client_id || !cfg?.client_secret) {
  console.error("This JSON is not an OAuth client secret (expected an 'installed' or 'web' section).");
  console.error("If it is a *service account* key, add its client_email as a user in Search Console instead and tell Claude.");
  process.exit(1);
}
if (raw.web && !(cfg.redirect_uris ?? []).some((u) => u.replace(/\/$/, "") === REDIRECT_URI)) {
  console.warn(`\n⚠  This is a "Web application" client. Add this Authorised redirect URI in Cloud Console first:\n   ${REDIRECT_URI}\n`);
}

const state = crypto.randomBytes(16).toString("hex");
const verifier = crypto.randomBytes(32).toString("base64url");
const challenge = crypto.createHash("sha256").update(verifier).digest("base64url");

const authUrl =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    client_id: cfg.client_id,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: SCOPE,
    access_type: "offline",
    prompt: "consent",
    state,
    code_challenge: challenge,
    code_challenge_method: "S256",
  });

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT_URI);
  if (url.pathname !== "/") return res.writeHead(404).end();
  const error = url.searchParams.get("error");
  const code = url.searchParams.get("code");
  if (error || !code || url.searchParams.get("state") !== state) {
    res.writeHead(400, { "Content-Type": "text/plain" }).end(`Sign-in failed: ${error ?? "invalid response"}`);
    console.error(`Sign-in failed: ${error ?? "invalid state/code"}`);
    server.close();
    process.exitCode = 1;
    return;
  }
  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: cfg.client_id,
        client_secret: cfg.client_secret,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
        code_verifier: verifier,
      }),
    });
    const tokens = await tokenRes.json();
    if (!tokenRes.ok || !tokens.refresh_token) throw new Error(JSON.stringify(tokens));

    fs.mkdirSync(STORE_DIR, { recursive: true });
    fs.writeFileSync(
      STORE_FILE,
      JSON.stringify(
        { client_id: cfg.client_id, client_secret: cfg.client_secret, refresh_token: tokens.refresh_token, scope: SCOPE },
        null,
        2
      ),
      { mode: 0o600 }
    );
    res.writeHead(200, { "Content-Type": "text/html" }).end(
      "<h2>Search Console connected ✔</h2><p>You can close this tab and return to the terminal.</p>"
    );
    console.log(`\n✔ Connected. Credentials saved to ${STORE_FILE}`);
    console.log("  Test it with:  node scripts/gsc.mjs sites");
  } catch (e) {
    res.writeHead(500, { "Content-Type": "text/plain" }).end("Token exchange failed – see terminal.");
    console.error("Token exchange failed:", e.message);
    process.exitCode = 1;
  } finally {
    server.close();
  }
});

server.listen(PORT, () => {
  console.log("\nOpen this URL to sign in with the Google account that owns the Search Console property:\n");
  console.log(authUrl + "\n");
  const opener = process.platform === "win32" ? `start "" "${authUrl}"` : process.platform === "darwin" ? `open "${authUrl}"` : `xdg-open "${authUrl}"`;
  exec(opener, () => {});
});
