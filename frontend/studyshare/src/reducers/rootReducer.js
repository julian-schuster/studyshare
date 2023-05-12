import { combineReducers } from "redux";

import { CLEAR_STORE } from "../types/rootTypes";
import loginReducer from "./logInReducer";
import groupReducer from "./groupReducer";
import notifierReducer from "./notifierReducer";
import inventoryReducer from "./inventoryReducer";
import notificationReducer from "./notificationReducer";
import groupDetailReducer from "./groupDetailReducer";
const appReducer = combineReducers({
  login: loginReducer,
  groups: groupReducer,
  notifier: notifierReducer,
  inventory: inventoryReducer,
  notifications: notificationReducer,
  group: groupDetailReducer,
});

const rootReducer = (state, action) => {
  if (action.type === CLEAR_STORE) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
