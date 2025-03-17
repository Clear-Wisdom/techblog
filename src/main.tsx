import "./tailwind.css";
import React from "react";
import { createRoot } from "react-dom/client";
import Index from "./index";

const container = document.getElementById("root");

if (container) {
    createRoot(container).render(
        <React.StrictMode>
            <Index />
        </React.StrictMode>
    );
}
