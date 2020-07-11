import { combineReducers } from "redux";

import execution from "./Execute";

export default combineReducers({
  executionReducer: execution,
});
