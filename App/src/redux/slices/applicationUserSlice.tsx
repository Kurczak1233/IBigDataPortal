import { createSlice } from "@reduxjs/toolkit";
import { IApplicationUser } from "interfaces/Models/Users/IApplicationUser";

interface IApplicationUserState {
  user: IApplicationUser | null;
}

const initialState: IApplicationUserState = {
  user: null,
};

const counterSlice = createSlice({
  name: "applicationUser",
  initialState,
  reducers: {
    // incremented: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
    decremented: () => {
      //   state.value -= 1;
    },
  },
});

export const { decremented } = counterSlice.actions;
