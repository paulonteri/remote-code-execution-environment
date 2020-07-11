import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};
const middleware = [thunk];

var md = null;

if (process.env.NODE_ENV === `development`) {
  const { createLogger } = require(`redux-logger`);
  const { composeWithDevTools } = require("redux-devtools-extension");

  const logger = createLogger({
    // ...options
  });

  middleware.push(logger);
  md = composeWithDevTools(applyMiddleware(...middleware));
} else {
  md = applyMiddleware(...middleware);
}

const store = createStore(rootReducer, initialState, md);

export default store;
