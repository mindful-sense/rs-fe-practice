"use client";

import { deleteCommentSchema, removeComment } from "@/features/comment/shared";
import { deletePostSchema, removePost } from "@/features/post/shared";
import {
  closeModal,
  selectIsOpen,
  selectView,
  useAppDispatch,
  useAppSelector,
} from "@/lib/client";

import { MODAL_VIEW } from "../constants";
import { DeleteModal } from "./DeleteModal";

export function Modal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsOpen);
  const view = useAppSelector(selectView);

  if (!isOpen) return null;

  const renderContent = () => {
    switch (view) {
      case MODAL_VIEW.DELETE_COMMENT:
        return (
          <DeleteModal
            title="Delete comment?"
            schema={deleteCommentSchema}
            action={removeComment}
          />
        );
      case MODAL_VIEW.DELETE_POST:
        return (
          <DeleteModal
            title="Delete post?"
            schema={deletePostSchema}
            action={removePost}
          />
        );
      case MODAL_VIEW.EDIT_POST:
        return null;
      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={() => dispatch(closeModal())}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-elembg flex w-full max-w-sm flex-col gap-20 rounded-3xl p-8"
      >
        {renderContent()}
      </div>
    </div>
  );
}
