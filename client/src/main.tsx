import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./index.css";
import { AccountProvider } from "./context/AccountContext";
import { SocketProvider } from "./context/SocketContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <AccountProvider>
          <SocketProvider>
            <App />
          </SocketProvider>
        </AccountProvider>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
