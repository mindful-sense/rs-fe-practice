import "server-only";
import { getErrorMessage, selectUsers } from "@/lib/server";
import { type UserForList } from "@/lib/shared";

export const getUsers = (): { users?: UserForList[]; message?: string } => {
  try {
    return { users: selectUsers() };
  } catch (error) {
    return { message: getErrorMessage(error) };
  }
};
