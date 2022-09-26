import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ModalProvider } from "./context/ModalContext";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./index.css";
import { AccountProvider } from "./context/AccountContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <ModalProvider>
      <React.StrictMode>
        <BrowserRouter>
          <AccountProvider>
            <App />
          </AccountProvider>
        </BrowserRouter>
      </React.StrictMode>
    </ModalProvider>
  </Provider>
);
