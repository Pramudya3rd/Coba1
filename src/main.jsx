import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// Import Bootstrap first
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Import custom styles after Bootstrap so they can override it
import "./styles/main.css";

// Clear localStorage when app is first opened (not on refresh)
if (window.performance) {
  if (performance.navigation.type !== 1) {
    // Only clear if not a page refresh
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
