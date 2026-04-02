import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initMixpanel } from "./lib/mixpanel.ts";

// Initialize Mixpanel Analytics
initMixpanel();

createRoot(document.getElementById("root")!).render(<App />);
