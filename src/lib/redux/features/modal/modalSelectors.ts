import { type RootState } from "@/lib/redux/store";

export const selectIsOpen = (state: RootState) => state.modal.isOpen;
export const selectView = (state: RootState) => state.modal.view;
export const selectData = (state: RootState) => state.modal.data;
