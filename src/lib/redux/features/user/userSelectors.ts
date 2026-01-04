import { type RootState } from "@/lib/shared";

export const selectUserId = (state: RootState) => state.user.userId;
export const selectLogin = (state: RootState) => state.user.login;
export const selectRoleId = (state: RootState) => state.user.roleId;
export const selectRegisteredAt = (state: RootState) => state.user.registeredAt;
export const selectUpdatedAt = (state: RootState) => state.user.updatedAt;
