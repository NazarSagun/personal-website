import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import React from "react";

import { Provider } from "react-redux";
import { setupStore } from "./redux/app/store";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

const store = setupStore();
const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
