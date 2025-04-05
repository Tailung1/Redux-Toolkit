import { Action } from "redux";

interface IInitalState {
balance:number,
loan:number,
loanPurpose:string
}

const accountInitialState: IInitalState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
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

type accountActionTypes =
  | depositAction
  | withdrawAction
  | requestLoanAction
  | payLoanAction;


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

 export function deposit(amount: number): depositAction {
    return { type: "account/deposit", payload: amount };
  }
 export function withdraw(amount: number): withdrawAction {
    return { type: "account/withdraw", payload: amount };
  }
 export function requestLoan(
    amount: number,
    purpose: string
  ): requestLoanAction {
    return {
      type: "account/requestLoan",
      payload: { amount, purpose },
    };
  }
 export function payLoan(): payLoanAction {
    return { type: "account/payLoan" };
  }