import { createStore } from "redux";
import reducer from "./reducers/userReducer";
const defaultState = {
  username: "",
  error: "",
  userId: ""
};

export default createStore(reducer, defaultState);
