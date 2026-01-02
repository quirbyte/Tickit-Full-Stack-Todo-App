import { StrictMode } from "react";
import { RecoilRoot } from "recoil";
import { createRoot } from "react-dom/client";
import "../src/styles/index.css";
import App from "../src/App/App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </StrictMode>
);
