import { combineReducers } from "redux";
import generic from "./generic/reducer";
import settings from "./settings/reducer";
import meetings from "./meetings/reducer";

const appReducer = combineReducers({
  generic,
  settings,
  meetings,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
