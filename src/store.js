import { createStore } from "redux";
import reducer from "./reducers/userReducer";
const defaultState = {
  username: "",
  error: ""
};

export default createStore(reducer, defaultState);
