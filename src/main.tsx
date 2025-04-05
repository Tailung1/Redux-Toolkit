import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider, useSelector } from "react-redux";
import AccountOperations from "./features/accounts/AccountOperations.tsx";
import CreateCustomer from "./features/customers/CreateCustomer.tsx";
import Customer from "./features/customers/Customer.tsx";
import ShowBalance from "./features/accounts/ShowBalance.tsx";
import store, { rootReducer } from "./store.ts";

const customer = useSelector((store: rootReducer) => store.customer);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <CreateCustomer />
      {customer.fullName && (
        <>
          {" "}
          <Customer />
          <ShowBalance />
          <AccountOperations />
        </>
      )}
    </Provider>
  </StrictMode>
);
