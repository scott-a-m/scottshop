import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { UserProvider } from "./context/User_Context";
import { StoreProvider } from "./context/Store_Context";

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <StoreProvider>
        <App />
      </StoreProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
