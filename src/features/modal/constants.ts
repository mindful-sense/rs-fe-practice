export const MODAL_VIEW = {
  DELETE_COMMENT: "delete/comment",
  DELETE_POST: "delete/post",
  EDIT_POST: "edit/post",
  NONE: null,
} as const;

export type ModalView = (typeof MODAL_VIEW)[keyof typeof MODAL_VIEW];
