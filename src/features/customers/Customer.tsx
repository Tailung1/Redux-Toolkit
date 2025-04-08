import { useSelector } from "react-redux";
import { rootReducerType } from "../../store";

export default function Customer() {
  const costumerName = useSelector(
    (store: rootReducerType) => store.customer.fullName
  );
  
  return (
    <div>
      <h1>Welcome,{costumerName as string}</h1>
    </div>
  );
}
