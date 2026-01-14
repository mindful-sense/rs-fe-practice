"use server";
import "server-only";

import { getCurrentUser } from "@/features/auth/server";
import { deleteUser, getErrorMessage, updateRole } from "@/lib/server";
import { type RoleId, type UserId, ROLES, ROUTE_PATHS } from "@/lib/shared";
import { revalidatePath } from "next/cache";

const handleAdminActions = async (action: () => void): Promise<void> => {
  try {
    const user = await getCurrentUser();
    if (user?.roleId !== ROLES.ADMIN) throw new Error("Unauthorized");

    action();
  } catch (error) {
    console.error(`${getErrorMessage(error)}. Try again`);
  }
  revalidatePath(ROUTE_PATHS.USERS);
};

export const saveChanges = async (
  userId: UserId,
  roleId: RoleId,
): Promise<void> => handleAdminActions(() => updateRole(userId, roleId));

export const removeUser = async (userId: UserId): Promise<void> =>
  handleAdminActions(() => deleteUser(userId));
