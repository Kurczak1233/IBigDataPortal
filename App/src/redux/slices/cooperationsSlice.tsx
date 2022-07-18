import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CooperationVm } from "interfaces/Models/Cooperations/ViewModels/CooperationVm";

interface ICooperationsSlice {
  cooperations: CooperationVm[];
  selectedCoopreation: CooperationVm | null;
  showArchived: boolean;
  cooperationsCount: number;
}

const initialState: ICooperationsSlice = {
  cooperations: [],
  selectedCoopreation: null,
  showArchived: false,
  cooperationsCount: 0,
};

const cooperationsSlice = createSlice({
  name: "cooperations",
  initialState,
  reducers: {
    updateCooperations: (state, action: PayloadAction<CooperationVm[]>) => {
      state.cooperations = action.payload;
    },
    calculateCooperationsLenght: (state) => {
      const numOfActiveItems = state.cooperations.filter(
        (item) => !item.isArchived
      );
      state.cooperationsCount = numOfActiveItems.length;
    },
    updateShowArchived: (state, action: PayloadAction<boolean>) => {
      state.showArchived = action.payload;
    },
    selectCooperation: (state, action: PayloadAction<number>) => {
      const foundItem = state.cooperations.find(
        (item) => item.id === action.payload
      );

      if (foundItem) {
        state.selectedCoopreation = foundItem;
      }
    },
    updateCooperationsIsArchived: (state, action: PayloadAction<number>) => {
      const foundCooperation = state.cooperations.find(
        (item) => item.id === action.payload
      );
      if (!foundCooperation) {
        return;
      }
      foundCooperation.isArchived = true;
      const arrayLenght = state.cooperations.filter(
        (item) => !item.isArchived
      ).length;
      arrayLenght > 0
        ? (state.cooperationsCount -= 1)
        : (state.cooperationsCount = 0);
    },
  },
});

export const {
  updateCooperations,
  updateShowArchived,
  selectCooperation,
  updateCooperationsIsArchived,
  calculateCooperationsLenght,
} = cooperationsSlice.actions;
export default cooperationsSlice.reducer;
