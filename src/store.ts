import { combineReducers, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerRedcuer from "./features/customers/customerSlice";
import { deposit } from "./features/accounts/accountSlice";
// import { withdraw } from "./features/accounts/accountSlice";
// import { requestLoan } from "./features/accounts/accountSlice";
// import { payLoan } from "./features/accounts/accountSlice";
import { createCustomer } from "./features/customers/customerSlice";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerRedcuer,
});
export const store = createStore(rootReducer);
store.dispatch(deposit(1000))
store.dispatch(createCustomer("chicha", "121212"));
console.log(store.getState());
