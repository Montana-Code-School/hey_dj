import { createStore } from "redux";
import reducer from "./reducers/userReducer";
const defaultState = {
  username: ""
};

export default createStore(reducer, defaultState);
