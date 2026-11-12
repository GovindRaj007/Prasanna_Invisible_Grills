/// <reference types="node" />
/**
 * Server entry used only at build time by scripts/prerender.mjs.
 * Renders each route to static HTML (with its own <title>, meta, canonical and
 * JSON-LD) so crawlers that don't run JavaScript – Bingbot, GPTBot, ClaudeBot,
 * PerplexityBot – and Google's first-wave indexing get the full page.
 */
import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import type { HelmetServerState } from "react-helmet-async";
import { AppProviders, AppRoutes } from "./App";
import { ScrollToTop } from "@/components/common/ScrollToTop";

export { ALL_ROUTES, LOCATION_ROUTES, SERVICE_ROUTES, STATIC_ROUTES } from "./routes";
export { SERVICES, LOCATIONS } from "./config/seo.constants";
export { BRANCHES, BUSINESS, PHONES, SITE_URL, branchFullAddress } from "./config/business";

export interface RenderResult {
  html: string;
  head: string;
  htmlAttributes: string;
}

export function render(url: string): Promise<RenderResult> {
  const helmetContext: { helmet?: HelmetServerState } = {};

  return new Promise((resolve, reject) => {
    let html = "";
    const sink = new PassThrough();
    sink.on("data", (chunk: Buffer) => (html += chunk.toString()));
    sink.on("end", () => {
      const h = helmetContext.helmet;
      const head = h
        ? [h.title, h.meta, h.link, h.script].map((part) => part.toString()).join("\n    ")
        : "";
      resolve({ html, head, htmlAttributes: h ? h.htmlAttributes.toString() : "" });
    });
    sink.on("error", reject);

    const { pipe } = renderToPipeableStream(
      <AppProviders helmetContext={helmetContext}>
        <StaticRouter location={url}>
          <ScrollToTop />
          <AppRoutes />
        </StaticRouter>
      </AppProviders>,
      {
        // Wait for every lazy route chunk so the full page (not the loader) is emitted.
        onAllReady() {
          pipe(sink);
        },
        onShellError: reject,
        onError(err) {
          reject(err);
        },
      }
    );
  });
}
