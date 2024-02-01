import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./app/store";
import "./index.css";
import { AccountProvider } from "./context/AccountContext";
import { SocketProvider } from "./context/SocketContext";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SocketProvider>
        <React.StrictMode>
          <BrowserRouter>
            <AccountProvider>
              <App />
            </AccountProvider>
          </BrowserRouter>
        </React.StrictMode>
      </SocketProvider>
    </PersistGate>
  </Provider>
);
