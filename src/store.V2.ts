import { applyMiddleware, combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerRedcuer from "./features/customers/customerSlice";

import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerRedcuer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export type rootReducerType = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
