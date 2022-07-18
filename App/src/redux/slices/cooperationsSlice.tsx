import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CooperationVm } from "interfaces/Models/Cooperations/ViewModels/CooperationVm";

interface ICooperationsSlice {
  cooperations: CooperationVm[];
  showArchived: boolean;
}

const initialState: ICooperationsSlice = {
  cooperations: [],
  showArchived: false,
};

const cooperationsSlice = createSlice({
  name: "cooperations",
  initialState,
  reducers: {
    updateCooperations: (state, action: PayloadAction<CooperationVm[]>) => {
      state.cooperations = action.payload;
    },
    updateShowArchived: (state, action: PayloadAction<boolean>) => {
      state.showArchived = action.payload;
    },
  },
});

export const { updateCooperations, updateShowArchived } =
  cooperationsSlice.actions;
export default cooperationsSlice.reducer;
