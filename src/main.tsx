import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const container = document.getElementById("root")!;

// Pages are prerendered to static HTML at build time (scripts/prerender.mjs);
// hydrate that markup instead of re-rendering it. Dev server has an empty root.
if (container.hasChildNodes()) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
