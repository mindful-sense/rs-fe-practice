import "server-only";

import type { UserId } from "@/lib/shared";
import type { PublicUser, TableUser } from "./schema";

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
