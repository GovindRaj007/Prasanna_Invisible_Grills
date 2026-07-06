import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { addResourceHints, measureLCP } from "@/lib/performanceUtils";

// Initialize performance optimizations
addResourceHints();
measureLCP();

createRoot(document.getElementById("root")!).render(<App />);
