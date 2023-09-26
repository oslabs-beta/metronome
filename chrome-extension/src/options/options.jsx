import * as React from "react";
import { createRoot } from "react-dom/client";

const test = <img src="metronome.png" />;

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(test);
