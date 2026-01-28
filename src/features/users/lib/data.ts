import "server-only";
import { getErrorMessage, selectUsers } from "@/lib/server";
import { type TableUser } from "@/lib/shared";

export const getUsers = (): TableUser[] | { error: string } => {
  try {
    return selectUsers();
  } catch (error) {
    console.error(error);
    return { error: getErrorMessage(error) };
  }
};
