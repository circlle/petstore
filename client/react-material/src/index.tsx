import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import CustomThemeProvider from "./components/shared/CustomThemeProvider";
import App from "./App";
import { RestfulProvider } from "restful-react";

const RESTFUL_BASE = "http://localhost:4000";

ReactDOM.render(
  <React.StrictMode>
    <CustomThemeProvider>
      <RestfulProvider base={RESTFUL_BASE}>
        <App />
      </RestfulProvider>
    </CustomThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
