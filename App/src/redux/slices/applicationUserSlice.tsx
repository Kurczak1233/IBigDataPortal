import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApplicationUser } from "interfaces/Models/Users/IApplicationUser";

interface IApplicationUserState {
  user: ApplicationUser | null;
}

const initialState: IApplicationUserState = {
  user: null,
};

const applicationUserSlice = createSlice({
  name: "applicationUser",
  initialState,
  reducers: {
    updateApplicationUser: (state, action: PayloadAction<ApplicationUser>) => {
      state.user = action.payload;
    },
    removeApplicationUser: (state) => {
      state.user = null;
    },
  },
});

export const { updateApplicationUser, removeApplicationUser } =
  applicationUserSlice.actions;
export default applicationUserSlice.reducer;
