import { createStore } from "redux";
import reducer from "./reducers/exampleReducer";
const defaultState = {
  username: "",
  count: 0
};

export default createStore(
  reducer,
  defaultState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
