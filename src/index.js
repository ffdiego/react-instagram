import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import FirebaseContext from "./context/firebase";
import { firebase, FieldValue } from "./lib/firebase";
import "./styles/app.css";
import "react-loading-skeleton/dist/skeleton.css";

ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase, FieldValue }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
