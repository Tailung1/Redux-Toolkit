import { useState } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../store";
import { deposit } from "./accountSlice";
import { withdraw } from "./accountSlice";
import { requestLoan } from "./accountSlice";

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
  const [currency, setCurrency] = useState<string>("USD");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value={"USD"}>USD</option>
            <option value={"EUR"}>EUR</option>
            <option value={"GBP"}>GBP</option>
          </select>{" "}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label>Deposit</label>
            <input
              value={depositAmount}
              type='number'
              onChange={(e) => setDepositAmount(+e.target.value)}
            />
          </div>
          <button
            onClick={() => {
              if (!depositAmount) {
                return;
              } else {
                dispatch(deposit(+depositAmount,currency)),
                  setDepositAmount("");
              }
            }}
          >
            Deposit
          </button>
        </div>
      </div>
      <div>
        <label htmlFor=''>Withdraw</label>
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
      <div style={{ display: "flex", gap: "10px" }}>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <label htmlFor=''>Loan Amount</label>
          <input
            type='number'
            onChange={(e) => setLoanAmount(+e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          {" "}
          <label htmlFor=''>Loan Purpose</label>
          <input
            type='text'
            onChange={(e) => setLoanPurpose(e.target.value)}
          />
        </div>
        <button
          onClick={() => {
            if (!loanAmount || !loanPurpose) {
              return;
            } else {
              dispatch(requestLoan(+loanAmount, loanPurpose));
              setLoanAmount("");
              setLoanPurpose("");
            }
          }}
        >
          Request Loan
        </button>
      </div>
      <button>Pay loan</button>
    </div>
  );
}
