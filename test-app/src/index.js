import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Profiler } from "react";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

function onRender(
  id,
  phase,
  actualDuration,
  baseDuration,
  startTime,
  commitTime
) {
  console.log("id ", id);
  console.log("phase ", phase);
  console.log("actualDuration", actualDuration);
  console.log("baseDuration", baseDuration);
  console.log("startTime", startTime);
  console.log("commitTime", commitTime);
}

root.render(<App />);
