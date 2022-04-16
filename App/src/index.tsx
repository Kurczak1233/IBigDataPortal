/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
import auth from "./authenticationConfig.json";
import { Toaster } from "react-hot-toast";

ReactDOM.render(
  <Auth0Provider
    domain={auth.domain}
    clientId={auth.clientID}
    scope={auth.scope}
    redirectUri={window.location.origin}
    audience={auth.audience}
  >
    <Toaster />
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
