import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./section-18/App";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./section-10/store/auth-context";
import { Provider } from "react-redux";
import { store } from "./section-18/store/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </AuthContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
