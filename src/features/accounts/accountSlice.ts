import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store";

interface IInitalState {
  balance: number;
  loan: number;
  loanPurpose: string;
  isLoading: boolean;
}

interface payLoadAction {
  amount: number;
  purpose: string;
}

const initialState: IInitalState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action: PayloadAction<number>) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action: PayloadAction<number>) {
      if (state.balance < action.payload) return;
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount: number, purpose: string) {
        return { payload: { amount, purpose } };
      },
      reducer(state, action: PayloadAction<payLoadAction>) {
        if (state.loan > 1) return;
        state.loan = action.payload.amount
          state.loanPurpose = action.payload.purpose
      },
    },

    payLoan(state) {
      if (state.loan > state.balance) return;
      state.balance -= state.loan;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});
export const { withdraw, requestLoan, payLoan } =
  accountSlice.actions;

export default accountSlice.reducer;

export function depositAsync(amount: number, currency: string) {
  if (currency === "USD")
    return {
      type: "account/deposit",
      payload: amount,
    };
  return async function (dispatch: AppDispatch) {
    dispatch({ type: "account/convertingCurrency" });
    const response = await fetch(
      `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`
    );
    const data = await response.json();
    const converted = amount * data.rates.USD;

    dispatch({
      type: "account/deposit",
      payload: converted,
      // currency !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    });
  };
}

// import { Action } from "redux";
// import { ThunkAction } from "redux-thunk";
// import { AppDispatch } from "../../store";
// import { rootReducerType } from "../../store";

// type ThunkResult = ThunkAction<
//   void,
//   rootReducerType,
//   undefined,
//   AnyAction
// >;

// interface IInitalState {
//   balance: number;
//   loan: number;
//   loanPurpose: string;
//   isLoading: boolean;
// }

// const accountInitialState: IInitalState = {
//   balance: 0,
//   loan: 0,
//   loanPurpose: "",
//   isLoading: false,
// };

// interface depositAction extends Action {
//   type: "account/deposit";
//   payload: {
//     amount: number;
//     currency: string;
//   };
// }
// interface withdrawAction extends Action {
//   type: "account/withdraw";
//   payload: number;
// }
// interface requestLoanAction extends Action {
//   type: "account/requestLoan";
//   payload: {
//     amount: number;
//     purpose: string;
//   };
// }
// interface payLoanAction extends Action {
//   type: "account/payLoan";
// }
// interface isLoadingAction extends Action {
//   type: "account/isLoading";
// }

// type accountActionTypes =
//   | depositAction
//   | withdrawAction
//   | requestLoanAction
//   | payLoanAction
//   | isLoadingAction;

// export default function accountReducer(
//   state = accountInitialState,
//   action: accountActionTypes
// ) {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload.amount,
//         isLoading:false
//       };
//     case "account/withdraw":
//       if (action.payload > state.balance) return state;
//       return { ...state, balance: state.balance - action.payload };
//     case "account/requestLoan":
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//       };
//     case "account/payLoan":
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: "",
//       };
//     case "account/isLoading":
//       return { ...state, isLoading: true };
//     default:
//       return state;
//   }
// }

// export function deposit(
//   amount: number,
//   currency: string
// ): depositAction | ThunkResult {
//   if (currency === "USD")
//     return {
//       type: "account/deposit",
//       payload: {
//         amount,
//         currency,
//       },
//     };
//   return async function (dispatch: AppDispatch) {
//     dispatch({ type: "account/isLoading" });
//     const response = await fetch(
//       `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`
//     );
//     const data = await response.json();
//     const converted = amount * data.rates.USD;

//     dispatch({
//       type: "account/deposit",
//       payload: {
//         amount: converted,
//         // currency !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//       },
//     });
//   };
// }
// export function withdraw(amount: number): withdrawAction {
//   return { type: "account/withdraw", payload: amount };
// }
// export function requestLoan(
//   amount: number,
//   purpose: string
// ): requestLoanAction {
//   return {
//     type: "account/requestLoan",
//     payload: { amount, purpose },
//   };
// }
// export function payLoan(): payLoanAction {
//   return { type: "account/payLoan" };
// }
