import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";     // Base styles
import "./styles/tailwind.css"; // Tailwind (if used)
import "./styles/animations.css"; // Keyframe animations
import "aos/dist/aos.css"; // AOS animations (optional)

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
