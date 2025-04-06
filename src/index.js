import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import configureStore from "./store";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "parsleyjs";
import "./lang/i18n";

// Get the root element
const rootElement = document.getElementById("root");

// Create the root
const root = ReactDOM.createRoot(rootElement);

// Render the application
root.render(
    <Provider store={configureStore()}>
      <App />
    </Provider>
);


reportWebVitals();
