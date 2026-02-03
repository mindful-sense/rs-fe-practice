"use server";
import "server-only";

import type { RoleId, UserId } from "@/lib/shared";

import { revalidatePath } from "next/cache";

import { getCurrentUser } from "@/features/auth/server";
import { deleteUser, updateRole } from "@/lib/server";
import { ROLES, ROUTE_PATHS } from "@/lib/shared";

const handleAdminActions = async (action: () => void): Promise<void> => {
  try {
    const user = await getCurrentUser();
    if (user?.roleId !== ROLES.ADMIN) throw new Error("Unauthorized");

    action();
  } catch (error) {
    console.error(error);
  }
  revalidatePath(ROUTE_PATHS.USERS);
};

export const saveChanges = async (
  userId: UserId,
  roleId: RoleId,
): Promise<void> => handleAdminActions(() => updateRole(userId, roleId));

export const removeUser = async (userId: UserId): Promise<void> =>
  handleAdminActions(() => deleteUser(userId));
