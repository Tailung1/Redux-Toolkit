import { useSelector } from "react-redux";
import { rootReducer } from "../../store";

export default function Customer() {
  const costumerName = useSelector(
    (store: rootReducer) => store.customer.fullName
  );
  return (
    <div>
      <h1>Welcome,{costumerName as string}</h1>
    </div>
  );
}
