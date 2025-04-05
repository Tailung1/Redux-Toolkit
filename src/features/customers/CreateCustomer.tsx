import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { rootReducer } from "../../store";
import { useState } from "react";
import { createCustomer } from "./customerSlice";

export default function CreateCustomer() {
  const dispatch = useDispatch<AppDispatch>();
  const customer = useSelector(
    (store: rootReducer) => store.customer
  );
  const [fullName, setFullName] = useState("");
  const [nationalID, setNationalID] = useState("");
  console.log(customer);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if(!fullName || ! nationalID) return
    dispatch(createCustomer(fullName, nationalID));
  };
  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "600px",
          gap: "10px",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor='fullName'>fullName</label>
        <input
          id='fullName'
          type='text'
          onChange={(e) => setFullName(e.target.value)}
        />
        <label htmlFor='nationalID'>nationalID</label>
        <input
          id='nationalID'
          type='text'
          onChange={(e) => setNationalID(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}
