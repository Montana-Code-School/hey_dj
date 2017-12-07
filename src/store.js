import { createStore, combineReducers, applyMiddleware } from "redux";
import exampleReducer from "./reducers/exampleReducer";
import userReducer from "./reducers/userReducer";
import musicSetReducer from "./reducers/musicSetReducers";
import tokenReducer from "./reducers/tokenReducer";
import spotifySongsReducer from "./reducers/spotifySongsReducer";
import { routerReducer, routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";

export const history = createHistory();
const middleware = routerMiddleware(history);

let rootReducer = combineReducers({
  userReducer,
  musicSetReducer,
  exampleReducer,
  tokenReducer,
  spotifySongsReducer,
  router: routerReducer
});

export const store = createStore(
  rootReducer,
  applyMiddleware(middleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
