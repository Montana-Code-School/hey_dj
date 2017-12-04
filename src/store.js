// import { createStore } from "redux";
// import reducer from "./reducers/userReducer";
// const defaultState = {
//   username: "gabe",
//   error: "",
//   userId: "5a205111477de213a0c7be43"
// };

import { createStore, combineReducers } from "redux";
import exampleReducer from "./reducers/exampleReducer";
import userReducer from "./reducers/userReducer";
import musicSetReducer from "./reducers/musicSetReducers";
import tokenReducer from "./reducers/tokenReducer";
import spotifySongsReducer from "./reducers/spotifySongsReducer";

let rootReducer = combineReducers({
  userReducer,
  musicSetReducer,
  exampleReducer,
  tokenReducer,
  spotifySongsReducer
});

export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
