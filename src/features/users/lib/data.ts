import "server-only";

import type { PublicUser, TableUser, UserId } from "@/lib/shared";

import {
  getErrorMessage,
  selectPublicUserById,
  selectUsers,
} from "@/lib/server";

export const getUsers = (): TableUser[] | { error: string } => {
  try {
    return selectUsers();
  } catch (error) {
    console.error(error);
    return { error: getErrorMessage(error) };
  }
};

export const getPublicUser = (userId: UserId): PublicUser | null => {
  try {
    return selectPublicUserById(userId);
  } catch (error) {
    console.error(error);
    return null;
  }
};
