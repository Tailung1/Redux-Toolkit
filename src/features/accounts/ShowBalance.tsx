import { useSelector } from "react-redux";
import { rootReducerType } from "../../store";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export default function ShowBalance() {
  const balance = useSelector(
    (store: rootReducerType) => store.account?.balance
  );

  return (
    <div>
      <h1>{formatCurrency(balance as number)}</h1>
    </div>
  );
}
