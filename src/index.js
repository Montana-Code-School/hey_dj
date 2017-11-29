import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import store from "./store";
import { Provider } from "react-redux";
import NewUser from "./components/newUser/newUser";

ReactDOM.render(
  <Provider store={store}>
    <NewUser />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
