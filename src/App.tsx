import "./App.css";

import "./index.css";
import { Provider, useSelector } from "react-redux";
import AccountOperations from "./features/accounts/AccountOperations.tsx";
import CreateCustomer from "./features/customers/CreateCustomer.tsx";
import Customer from "./features/customers/Customer.tsx";
import ShowBalance from "./features/accounts/ShowBalance.tsx";
import store, { rootReducer } from "./store.ts";




function App() {
    const customer = useSelector(
      (store: rootReducer) => store.customer
    );
  return (
    <>
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
    </>
  );
}

export default App;
