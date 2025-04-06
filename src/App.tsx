import "./App.css";

import "./index.css";
import { useSelector } from "react-redux";
import AccountOperations from "./features/accounts/AccountOperations.tsx";
import CreateCustomer from "./features/customers/CreateCustomer.tsx";
import Customer from "./features/customers/Customer.tsx";
import ShowBalance from "./features/accounts/ShowBalance.tsx";
import { rootReducerType } from "./store.ts";

function App() {
  const customer = useSelector(
    (store: rootReducerType) => store.customer
  );
  return (
    <>
      {!customer.fullName ? (
        <CreateCustomer />
      ) : (
        <>
          {" "}
          <Customer />
          <ShowBalance />
          <AccountOperations />
        </>
      )}{" "}
    </>
  );
}

export default App;
