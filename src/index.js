import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import store from "./store";
import { Provider } from "react-redux";
import Login from "./components/login/login";

ReactDOM.render(
  <Provider store={store}>
    <Login />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
