import * as ReactDOMClient from "react-dom/client";
import { App } from "./app";

const container = document.getElementById("app");

if (!container) {
  throw new Error("Missing #app");
}

const root = ReactDOMClient.createRoot(container);
root.render(<App />);
