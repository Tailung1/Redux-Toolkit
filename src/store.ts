import { combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerRedcuer from "./features/customers/customerSlice";
import { useDispatch } from "react-redux";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerRedcuer,
});
const store = createStore(rootReducer);

export type rootReducer = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
