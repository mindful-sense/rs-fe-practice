"use client";

import {
  closeModal,
  selectIsOpen,
  selectView,
  useAppDispatch,
  useAppSelector,
} from "@/lib/client";
import { MODAL_VIEW } from "../constants";
import { DeletePostModal } from "./DeletePostModal";

export function Modal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsOpen);
  const view = useAppSelector(selectView);

  if (!isOpen) return null;

  const renderContent = () => {
    switch (view) {
      case MODAL_VIEW.DELETE_COMMENT:
        return 0;
      case MODAL_VIEW.DELETE_POST:
        return <DeletePostModal />;
      case MODAL_VIEW.EDIT_POST:
        return 2;
      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={() => dispatch(closeModal())}
    >
      <div onClick={(e) => e.stopPropagation()}>{renderContent()}</div>
    </div>
  );
}
