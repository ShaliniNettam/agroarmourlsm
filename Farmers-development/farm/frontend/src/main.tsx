import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initMixpanel } from "./lib/mixpanel.ts";
import { initAmplitude } from "./lib/amplitude.ts";

// Initialize Analytics
initMixpanel();
initAmplitude();

createRoot(document.getElementById("root")!).render(<App />);
