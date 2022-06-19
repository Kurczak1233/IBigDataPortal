import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IApplicationUser } from "interfaces/Models/Users/IApplicationUser";

interface IApplicationUserState {
  user: IApplicationUser | null;
}

const initialState: IApplicationUserState = {
  user: null,
};

const applicationUserSlice = createSlice({
  name: "applicationUser",
  initialState,
  reducers: {
    updateApplicationUser: (state, action: PayloadAction<IApplicationUser>) => {
      state.user = action.payload;
    },
  },
});

export const { updateApplicationUser } = applicationUserSlice.actions;
export default applicationUserSlice.reducer;
