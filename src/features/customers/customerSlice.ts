import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface initialStateTypes {
  fullName: string;
  nationalID: number | string;
  createdAT: number | string;
}

const initialState: initialStateTypes = {
  fullName: "",
  nationalID: "",
  createdAT: "",
};

interface createCustomerAction {
  fullName: string;
  nationalID: number;
}

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalID) {
        return { payload: { fullName, nationalID } };
      },
      reducer(state, action: PayloadAction<createCustomerAction>) {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
      },
    },
    changeCustomerName(state, action: PayloadAction<string>) {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, changeCustomerName } =
  customerSlice.actions;
export default customerSlice.reducer;

// import { Action } from "redux";

// interface createCustomerAction extends Action {
//   type: "customer/createCustomer";
//   payload: {
//     fullName: string;
//     nationalID: string;
//     createdAT: string;
//   };
// }
// interface changeCustomerNameAction extends Action {
//   type: "customer/changeCustomerName";
//   payload: { fullName: string };
// }

// type customerActionsTypes =
//   | createCustomerAction
//   | changeCustomerNameAction;

// export default function customerRedcuer(
//   state = customerInitialState,
//   action: customerActionsTypes
// ) {
//   switch (action.type) {
//     case "customer/createCustomer":
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationalID: action.payload.nationalID,
//         createdAT: action.payload.createdAT,
//       };
//     case "customer/changeCustomerName":
//       return { ...state, fullName: action.payload };
//     default:
//       return state;
//   }
// }

// export function createCustomer(
//   fullName: string,
//   nationalID: string
// ): createCustomerAction {
//   return {
//     type: "customer/createCustomer",
//     payload: {
//       fullName,
//       nationalID,
//       createdAT: new Date().toISOString(),
//     },
//   };
// }
// export function changeCustomerName(
//   fullName: string
// ): changeCustomerNameAction {
//   return {
//     type: "customer/changeCustomerName",
//     payload: { fullName },
//   };
// }
