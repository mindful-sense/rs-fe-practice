import type { PayloadAction } from "@reduxjs/toolkit";
import type { DeletePost, DeleteComment } from "@/features/post/shared";

import { createSlice } from "@reduxjs/toolkit";
import { MODAL_VIEW } from "@/features/modal/shared";

type ModalState =
  | { isOpen: false; view: null; data: null }
  | {
      isOpen: true;
      view: typeof MODAL_VIEW.DELETE_COMMENT;
      data: DeleteComment;
    }
  | {
      isOpen: true;
      view: typeof MODAL_VIEW.DELETE_POST;
      data: DeletePost;
    }
  | {
      isOpen: true;
      view: typeof MODAL_VIEW.EDIT_POST;
      data: undefined;
    };

const initialState: ModalState = {
  isOpen: false,
  view: null,
  data: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialState as ModalState,
  reducers: {
    openModal: (state, action: PayloadAction<Omit<ModalState, "isOpen">>) => {
      state.isOpen = true;
      state.view = action.payload.view;
      state.data = action.payload.data || null;
    },
    closeModal: () => initialState,
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
