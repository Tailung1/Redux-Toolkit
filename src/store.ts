import { Action, combineReducers, createStore } from "redux";
// import { configureStore } from "@reduxjs/toolkit";

const accountInitialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};
const customerInitialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

interface depositAction extends Action {
  type: "account/deposit";
  payload: number;
}
interface withdrawAction extends Action {
  type: "account/withdraw";
  payload: number;
}
interface requestLoanAction extends Action {
  type: "account/requestLoan";
  payload: {
    amount: number;
    purpose: string;
  };
}
interface payLoanAction extends Action {
  type: "account/payLoan";
}

interface createCustomerAction extends Action {
  type: "customer/createCustomer";
  payload: {
    fullName: string;
    nationalID: string;
    createdAT: string;
  };
}
interface changeCustomerNameAction extends Action {
  type: "customer,changeCustomerName";
  payload: string;
}

type accountActionTypes =
  | depositAction
  | withdrawAction
  | requestLoanAction
  | payLoanAction;

type customerActionsTypes =
  | createCustomerAction
  | changeCustomerNameAction;

export default function accountReducer(
  state = accountInitialState,
  action: accountActionTypes
) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      if (action.payload > state.balance) return;
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
      };
    default:
      return state;
  }
}

function customerRedcuer(
  state = customerInitialState,
  action: customerActionsTypes
) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalID,
        createdAT: action.payload.createdAT,
      };
  }
}

export const store = createStore(accountReducer);

const rootReducer = combineReducers({
  account: accountReducer,
  custom: customerRedcuer,
});

function deposit(amount: number): depositAction {
  return { type: "account/deposit", payload: amount };
}
function withdraw(amount: number): withdrawAction {
  return { type: "account/withdraw", payload: amount };
}
function requestLoan(
  amount: number,
  purpose: string
): requestLoanAction {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}
function payLoan(): payLoanAction {
  return { type: "account/payLoan" };
}

function createCustomer(fullName: string, nationalID: string) {
  return {
    type: "customer/createCustomer",
    payload: {
      fullName,
      nationalID,
      createdAT: new Date(),
    },
  };
}
function changeCustomerName(fullName: string) {
  return { type: "customer/changeCustomerName", payload: fullName };
}

store.dispatch(deposit(2999));
console.log(store.getState());
