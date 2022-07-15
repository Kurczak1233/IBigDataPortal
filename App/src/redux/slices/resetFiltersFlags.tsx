import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IResetFiltersFlags {
  resetSimpleFilters: boolean;
  resetAdvancedFilters: boolean;
}

const initialState: IResetFiltersFlags = {
  resetSimpleFilters: false,
  resetAdvancedFilters: false,
};

const resetFiltersFlagsSlice = createSlice({
  name: "resetFiltersFlags",
  initialState,
  reducers: {
    updateResetAdvancedFilters: (state, action: PayloadAction<boolean>) => {
      state.resetAdvancedFilters = action.payload;
    },
    updateResetSimpleFilters: (state, action: PayloadAction<boolean>) => {
      state.resetSimpleFilters = action.payload;
    },
  },
});

export const { updateResetSimpleFilters, updateResetAdvancedFilters } =
  resetFiltersFlagsSlice.actions;
export default resetFiltersFlagsSlice.reducer;
