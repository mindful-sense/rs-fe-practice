"use server";
import "server-only";

import { getCurrentUser } from "@/features/auth/server";
import { deleteUser, getErrorMessage, updateRole } from "@/lib/server";
import { type RoleId, type UserId, ROLES, ROUTE_PATHS } from "@/lib/shared";
import { revalidatePath } from "next/cache";

export const saveChanges = async (
  userId: UserId,
  roleId: RoleId,
): Promise<void> => {
  try {
    const user = await getCurrentUser();
    if (!user) throw new Error("You need to be logged in to change roles");
    if (user.roleId !== ROLES.ADMIN) throw new Error("You need to be an admin");

    updateRole(userId, roleId);
  } catch (error) {
    console.error(`${getErrorMessage(error)}. Try again`);
  }
  revalidatePath(ROUTE_PATHS.USERS);
};

export const removeUser = async (userId: UserId): Promise<void> => {
  try {
    const user = await getCurrentUser();
    if (!user) throw new Error("You need to be logged in to delete a user");
    if (user.roleId !== ROLES.ADMIN) throw new Error("You need to be an admin");

    deleteUser(userId);
  } catch (error) {
    console.error(`${getErrorMessage(error)}. Try again`);
  }
  revalidatePath(ROUTE_PATHS.USERS);
};
