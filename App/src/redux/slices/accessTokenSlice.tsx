import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAccessTokenSet {
  accessTokenSet: boolean;
}

const initialState: IAccessTokenSet = {
  accessTokenSet: false,
};

const accessTokenSet = createSlice({
  name: "accessTokenSet",
  initialState,
  reducers: {
    updateAccessTokenWasSet: (state, action: PayloadAction<boolean>) => {
      state.accessTokenSet = action.payload;
    },
  },
});

export const { updateAccessTokenWasSet } = accessTokenSet.actions;
export default accessTokenSet.reducer;
