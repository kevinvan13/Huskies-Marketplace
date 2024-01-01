import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { AuthTokenProvider } from "./context/AuthTokenContext.js";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: `${window.location.origin}/verify`,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    }}
  >
    <React.StrictMode>
      <AuthTokenProvider>
        <App />
      </AuthTokenProvider>
    </React.StrictMode>
  </Auth0Provider>
);
