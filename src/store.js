import { createStore, combineReducers } from "redux";
import exampleReducer from "./reducers/exampleReducer";
import userReducer from "./reducers/userReducer";
import musicSetReducer from "./reducers/musicSetReducers";
import tokenReducer from "./reducers/tokenReducer";

let rootReducer = combineReducers({
  userReducer,
  musicSetReducer,
  exampleReducer,
  tokenReducer
});

export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
