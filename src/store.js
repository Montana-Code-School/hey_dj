import { createStore } from "redux";
import reducer from "./reducers/userReducer";
const defaultState = {
  username: "gabe",
  error: "",
  userId: "5a205111477de213a0c7be43"
};

export default createStore(reducer, defaultState);
