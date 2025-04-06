import accountReducer from "./features/accounts/accountSlice";
import customerRedcuer from "./features/customers/customerSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerRedcuer,
  },
});

export type rootReducerType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
