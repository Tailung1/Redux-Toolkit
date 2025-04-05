import { useState } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../store";
import { deposit } from "./accountSlice";
import { withdraw } from "./accountSlice";

export default function AccountOperations() {
  const dispatch = useDispatch<AppDispatch>();
  const [depositAmount, setDepositAmount] = useState<number | string>(
    ""
  );
  const [withdrawAmount, setWithdrawAmount] = useState<
    number | string
  >("");
  const [loanAmount, setLoanAmount] = useState<number | string>("");
  const [loanPurpose, setLoanPurpose] = useState<string>("");
  const [currency, setCurrency] = useState<string>("");

  return (
    <div>
      <div>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value={"USD"}>USD</option>
          <option value={"EUR"}>EUR</option>
          <option value={"GBP"}>GBP</option>
        </select>
        <input
          value={depositAmount}
          type='number'
          onChange={(e) => setDepositAmount(+e.target.value)}
        />
        <button
          onClick={() => {
            if (!depositAmount) {
              return;
            } else {
              dispatch(deposit(+depositAmount)), setDepositAmount("");
            }
          }}
        >
          Deposit
        </button>
      </div>
      <div>
        <input
          type='text'
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(+e.target.value)}
        />

        <button
          onClick={() => {
            if (!withdrawAmount) {
              return;
            } else {
              dispatch(withdraw(+withdrawAmount));
              setWithdrawAmount("");
            }
          }}
        >
          Withdraw
        </button>
      </div>
      <div>
        <input
          type='number'
          onChange={(e) => setLoanAmount(+e.target.value)}
        />
        <input
          type='text'
          onChange={(e) => setLoanPurpose(e.target.value)}
        />
        <button>Request Loan</button>
      </div>
      <button>Pay loan</button>
    </div>
  );
}
