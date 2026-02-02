import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type ModalView } from "@/features/modal/constants";

interface ModalState {
  isOpen: boolean;
  view: ModalView;
  data: unknown;
}

const initialState: ModalState = {
  isOpen: false,
  view: null,
  data: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<Omit<ModalState, "isOpen">>) => {
      state.isOpen = true;
      state.view = action.payload.view;
      state.data = action.payload.data || null;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.view = null;
      state.data = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
