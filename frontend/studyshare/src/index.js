import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import store from "./store";
import sagas from "./sagas/sagas";
import { sagaMiddleware } from "./middleware";
//https://geekrodion.com/blog/redux-saga-cra

import StudyShareSnackbarProvider from "./components/StudyShareSnackbarProvider";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <StudyShareSnackbarProvider>
        <App />
      </StudyShareSnackbarProvider>
    </React.StrictMode>
  </Provider>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
sagaMiddleware.run(sagas);
